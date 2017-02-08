import m from 'mithril';
import API from '../../components/api';
import {Spinner,Button} from '../../components/ui';
import {MSoat} from './models';

export const Soat = {
    vm(p){
        return {
            result: m.prop(false),
            print: () => {

                let doc = new jsPDF();
                let source = document.getElementById('tblToPdf');
                let specialElementHandlers = {
                    '#bypassme': function (element, renderer) {
                        return true;
                    }
                };
                doc.fromHTML(source, 0.5, 0.5, {
                    'width': 75,'elementHandlers': specialElementHandlers
                });
                doc.output("dataurlnewwindow");

            },
            end: () => {
                p.soat(new MSoat());
                p.openPay(!p.openPay()); 
            },
            validateDate: (date) => {
                let d1 = new Date();
                let d2 = new Date(date);
                return d2.getTime() >= d1.getTime();
            },
            working: m.prop(false),
            fetchSubtypeVehicle: (idSubtypeVehicle) => {
                return API.get(`subtype_vehicles/${idSubtypeVehicle}`);
            },
            subtype_vehicle: m.prop(false),
            showMessageDate: m.prop(false),
            currentCreatedAt: m.prop('--'),
            formatDate: (date) => {
                let objDate = new Date(date); 
                return objDate.getDate() + "/" + (objDate.getMonth()+1) + "/" + objDate.getFullYear() + "   " + objDate.getHours() + ":" + objDate.getMinutes() + ":" + objDate.getSeconds();
            }
        }
    },
    controller(p){
        this.vm = Soat.vm(p);

        this.getPrima = () => {
            this.vm.fetchSubtypeVehicle(p.vehicle().subtype_vehicle_id())
                .then(this.vm.subtype_vehicle)
                .then(()=>m.redraw());
        }


        this.submit = (event) => {
            event.preventDefault();

            if(this.vm.working()){
                return;
            }

            if(!this.vm.validateDate(p.soat().date_end_cart())){
                this.vm.showMessageDate(true);
                return;
            }

            let payload = {
                id: p.soat().id(), 
                number_cart: p.soat().number_cart(),
                holder_cart: p.soat().holder_cart(),
                date_end_cart: p.soat().date_end_cart(),
                code_card: p.soat().code_card(),
                number_quotas: p.soat().number_quotas(),
                vehicle_id: p.vehicle().id()
            }
            
            this.vm.working(true);
            API.post('soats',payload)
                .then((r)=>{
                    this.vm.currentCreatedAt(this.vm.formatDate(r.created_at));
                    p.soat(new MSoat())
                })
                .then(()=>{
                    API.get(`soats/showWithPlate/${p.plate()}`).then((r)=>{
                        if(r != null){p.soats(r)}else{p.soats([])}
                    }).then(()=>p.refresh()).then(()=>this.getPrima());  
                })
                .then((r) => this.vm.working(false))
                .then(()=>this.vm.result(true))
                .then(()=>p.refresh());
        }
    },
    view(c,p){

        let pResult = <div id="scrollBottom"></div>;

        let pMessageDate;

        if(c.vm.showMessageDate()){
            pMessageDate = <div class="message-invalid-date">La Targeta Esta vencida, por favor indique otra, o verifique este dato.</div>      
        }

        let btnSend;

        if(p.vehicle().id() != false){
            btnSend = (
                <div class="text-center">
                    <Button loading={c.vm.working()} type="submit">Guardar</Button>
                    {pMessageDate}
                </div>
            )
        }else{
            btnSend = <div style="color: red;" class="text-center">Debe guardar datos del vehículo, para activar opciones de envío acá</div>;
        }
        
        let prima = 0;

        if(c.vm.subtype_vehicle() != false){
            prima = c.vm.subtype_vehicle().prima;
            if(c.vm.result()){
                pResult = (
                    <div id="scrollBottom" class="result">
                        <div class="row">
                            <div class="col-md-12">
                                <h3>Datos Compra del Soat</h3>
                                <table class="table" id="tblToPdf" >
                                   <tbody>
                                        <tr>
                                            <td>
                                                Valor prima<br/>
                                                ${prima}
                                            </td>
                                            <td>
                                                Contribución Fosyga<br/>
                                                ${parseInt(parseInt(prima) * 0.5)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Tasa RUNT<br/>
                                                $1.610
                                            </td>
                                            <td>
                                                Total<br/>
                                                ${parseInt(prima) + (parseInt(parseInt(prima) * 0.5)) + 1610}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <b>Coberturas:</b><br />
                                                <p>
                                                    ■ Muerte y gastos funerarios: 750 SMLDV<br/>
                                                    ■ Gastos médicos: 800 SMLDV<br/>
                                                    ■ Incapacidad permanente: 180 SMLDV<br/>
                                                    ■ Gastos de transporte: 10 SMLDV<br/>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" >
                                                <b>Inicio de vigencia</b> {c.vm.currentCreatedAt()}
                                                <br/><i style="color: blue;">Esta fecha de inicio se ajusta automaticamente, despues de la vigente y/o posteriores compras, si estas existen.</i>
                                            </td>    
                                        </tr>
                                   </tbody>
                                </table>
                            </div>
                            <div class="col-md-4 col-sm-4">
                                <Button small fill intent="default" onclick={c.vm.end.bind(c.vm)}>Finalizar</Button>
                            </div>
                            <div class="col-md-4 col-sm-4">
                                <Button small fill onclick={c.vm.print.bind(c.vm)}>Descargar en Pdf</Button>
                            </div>
                        </div>
                    </div>
                );
            }
        }else{
            if(!p.openPay()){
                pResult = <div id="scrollBottom" class="text-center"><Spinner /></div>;
            }
        }



        
        return (
            <div class="soat">
                <div class={!c.vm.result() ? '':'hidden'}>
                    <div class="panel panel-default">
                        <div class="panel-body custom-background-form">
                            <form onsubmit={c.submit.bind(c)} >

                                <label class="pt-label">
                                    Número de la Targeta
                                    <input
                                        type="text"
                                        class="pt-input pt-fill"
                                        name="number_cart"
                                        oninput={m.withAttr('value', p.soat().number_cart)}
                                        value={p.soat().number_cart()}
                                        placeholder=""
                                        required
                                    />
                                </label>

                                <label class="pt-label">
                                    Títular
                                    <input
                                        type="text"
                                        class="pt-input pt-fill"
                                        name="holder_cart"
                                        oninput={m.withAttr('value', p.soat().holder_cart)}
                                        value={p.soat().holder_cart()}
                                        placeholder=""
                                        required
                                    />
                                </label>

                                <label class="pt-label">
                                    Vencimiento
                                    <input
                                        type="date"
                                        class="pt-input pt-fill"
                                        name="date_end_cart"
                                        oninput={m.withAttr('value', p.soat().date_end_cart)}
                                        value={p.soat().date_end_cart()}
                                        placeholder=""
                                        required
                                    />
                                </label>

                                <label class="pt-label">
                                    Código de seguridad
                                    <input
                                        type="text"
                                        class="pt-input pt-fill"
                                        name="code_card"
                                        oninput={m.withAttr('value', p.soat().code_card)}
                                        value={p.soat().code_card()}
                                        placeholder=""
                                        required
                                    />
                                </label>

                                <label class="pt-label">
                                    Número de cuotas
                                    <input
                                        type="number"
                                        class="pt-input pt-fill"
                                        name="number_quotas"
                                        oninput={m.withAttr('value', p.soat().number_quotas)}
                                        value={p.soat().number_quotas()}
                                        placeholder="Solo números"
                                        required
                                    />
                                </label>
                                {btnSend}
                            </form>
                        </div>
                    </div>
                </div>
                {pResult}
            </div>
        )
    }
}


export default Soat;

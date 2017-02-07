import m from 'mithril';
import API from '../../components/api';
import {Spinner,Button} from '../../components/ui';
import {MSoat} from './models';

export const Soat = {
    vm(p){
        return {
            result: m.prop(false),
            print: () => {
                let tmpElemento = document.createElement('a');
                let data_type = 'data:application/pdf';
                let tabla_div = document.getElementById('tblToPdf');

                let tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
                tmpElemento.href = data_type + ', ' + tabla_html;

                tmpElemento.download = 'Datos Compra Soat.pdf';
                tmpElemento.click();
            },
            end: () => {
                p.soat(m.prop(new MSoat()));
                p.openPay(!p.openPay()); 
                p.soats();
            },
            validateDate: (date) => {
                let d1 = new Date();
                let d2 = new Date(date);
                return d2.getTime() >== d1.getTime();
            },
            working: m.prop(false),
            fetchSubtypeVehicle: (idSubtypeVehicle) => {
                return API.get(`subtype_vehicles/${idSubtypeVehicle}`);
            },
            subtype_vehicle: m.prop(false),
            showMessageDate: m.prop(false)
        }
    },
    controller(p){
        this.vm = Soat.vm(p);
        this.vm.fetchSubtypeVehicle(p.vehicle().subtype_vehicle())
            .then(this.vm.subtype_vehicle)
            .then(()=>m.redraw());

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
            API.post('soats',payload).then((r)=>{p.soat(new MSoat(r))}).then((r) => this.vm.working(false)).then(()=>this.vm.result(true));
        }
    },
    view(c,p){

        let pResult;

        let pMessageDate;

        if(c.vm.showMessageDate()){
            pMessageDate = <div class="message-invalid-date">La Targeta Esta vencida, por favor indique otra, o verifique este dato.</div>      
        }

        if(c.vm.result()){
            pResult = (
                <div class="row">
                    <div class="col-md-12">
                        <h3>Datos Compra del Soat</h3>
                        <table class="table" id="tblToPdf" >
                           <tbody>
                                <tr>
                                    <td>
                                        Valor prima<br/>
                                        ${c.vm.subtype_vehicle().prima}
                                    </td>
                                    <td>
                                        Contribución Fosyga<br/>
                                        ${parse(parseInt(c.vm.subtype_vehicle().prima) * 0.5)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Tasa RUNT<br/>
                                        $1.610
                                    </td>
                                    <td>
                                        Total<br/>
                                        ${parseInt(c.vm.subtype_vehicle().prima) + (parseInt(parseInt(c.vm.subtype_vehicle().prima) * 0.5)) + 1610}
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
                                        <b>Inicio de vigencia</b> {p.soat().created_at()}
                                    </td>    
                                </tr>
                           </tbody>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <Button onclick={c.vm.end.bind(c.vm)}>Finalizar</Button>
                    </div>
                    <div class="col-md-6">
                        <Button onclick={c.vm.print.bind(c.vm)}>Descargar en Pdf</Button>
                    </div>
                </div>
            );
        }
        
        return (
            <div class="soat">
                <div class={!c.vm.result() ? '':'hidden'}>
                    <div class="panel panel-default">
                        <div class="panel-body">
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

                                <div class="text-center">
                                    <Button loading={c.vm.working()} type="submit">Guardar</Button>
                                    {pMessageDate}
                                </div>
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

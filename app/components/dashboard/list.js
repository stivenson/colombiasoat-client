import m from 'mithril';
import API from '../../components/api';
import {Spinner} from '../../components/ui';
import {MSoat} from '../soat/models';

export const DashboardList = {
    vm(p){
        return {
            listSoats: m.prop('empty'),
            working: m.prop(false),
            detail: m.prop(false),
            fetchSoats: () => {
                return API.get('soats',{type: MSoat});
            }
        }
    },
    controller(p){
        this.vm = DashboardList.vm(p);
        this.vm.working(true);
        this.vm.fetchSoats().then(this.vm.listSoats).then(()=>this.vm.working(false)).then(()=>m.redraw());
    },
    view(c,p){

        if(localStorage.getItem('user') == 'false' || localStorage.getItem('user') == null){
            m.route("/");
        }

        let spin = <div class="text-center"><Spinner /></div>;

        let tableSoats = spin;

        if(c.vm.listSoats() != 'empty' && c.vm.listSoats().length < 1){
            tableSoats = <div class="text-center"><br/><br/><b>No se encontraron soats</b><br/><br/></div>
        }else {
            if (c.vm.listSoats() != 'empty'){
                tableSoats = (
                    <div class="table-responsive">
                        <table class="table" >
                           <thead>
                            <th># Targeta</th><th>Títular</th><th># Cuotas</th><th>Fecha Compra</th><th>Fecha Vencimiento</th><th></th>
                           </thead>
                           <tbody>
                            {c.vm.listSoats().map((s) => {
                                return (
                                    <tr>
                                        <td>{s.number_cart()}</td>
                                        <td>{s.holder_cart()}</td>
                                        <td>{s.created_at()}</td>
                                        <td>{s.expiration()}</td>
                                        <td>
                                            <a onclick={c.vm.detail.bind(c.vm,s.id())}><span class="pt-icon-remove-row-top"></span> Detallar Soar</a>
                                            <br/>
                                            <div class={c.vm.detail() == s.id()?'':'hidden'}>
                                                <h3>Detalle Soat</h3>
                                                <table class="table" >
                                                   <tbody>
                                                        <tr>
                                                            <td>
                                                                Valor prima<br/>
                                                                ${s.prima}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Contribución Fosyga<br/>
                                                                ${parse(parseInt(s.prima) * 0.5)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Tasa RUNT<br/>
                                                                $1.610
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Total<br/>
                                                                ${parseInt(s.prima) + (parseInt(parseInt(s.prima) * 0.5)) + 1610}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
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
                                                            <td>
                                                                <b>Inicio de vigencia</b><br/> {s.created_at()}
                                                            </td>    
                                                        </tr>
                                                   </tbody>
                                                </table>  
                                            </div>                                         
                                        </td>
                                    </tr>
                                )
                            })}
                           </tbody>
                        </table>
                    </div>
                )
            }
        }


        return( 
            <div class="list">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h3>Listado de Soats</h3>
                        <br/><br/>
                        {tableSoats}
                    </div>
                </div>
            </div>
        );
    }
}


export default DashboardList;

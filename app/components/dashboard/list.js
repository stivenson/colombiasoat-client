import m from 'mithril';
import API from '../../components/api';
import {Spinner} from '../../components/ui';
import {MSoat} from '../soat/models';

export const DashboardList = {
    vm(p){
        return {
            listSoats: m.prop('empty'),
            working: m.prop(false),
            fetchSoats: () => {
                return API.get('soats/index',{type: MSoat});
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
                            <th># Targeta</th><th>Títular</th><th># Cuotas</th><th>Fecha Compra</th><th>Fecha Vencimiento</th>
                           </thead>
                           <tbody>
                            {c.vm.listSoats().map((s) => {
                                return <tr><td>{s.number_cart()}</td><td>{s.holder_cart()}</td><td>{s.created_at()}</td><td>{s.expiration()}</td></tr>
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

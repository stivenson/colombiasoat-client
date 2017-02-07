import m from 'mithril';
import API from '../../components/api';
import {Button, Spinner} from '../../components/ui';
import Soat from './soat';
import {MSoat} from './models';

export const Soats = {
    vm(p){
        return {
            soat: m.prop(new MSoat()),
            openPay: m.prop(false),
            listSoats: m.prop('empty'),
            working: m.prop(false),
            fetchSoats: (idVehicle) => {
                return API.get(`soats/indexOfVehicle/${idVehicle}`,{type: MSoat});
            }
        }
    },
    controller(p){
        this.vm = Soats.vm(p);
        this.vm.working(true);
        this.vm.fetchSoats(p.vehicle().id()).then(this.vm.listSoats).then(()=>this.vm.working(false)).then(()=>m.redraw());
    },
    view(c,p){

        let spin = <div class="text-center"><Spinner /></div>;

        let pPay;
        let tableSoats = spin;

        if(c.vm.openPay()){
            pPay = <Soat soats={p.soats} openPay={c.vm.openPay.bind(c.vm)} soat={c.vm.soat.bind(c.vm)} vehicle={p.vehicle} />;
        }

        if(c.vm.listSoats() != 'empty'){
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

        if(p.vehicle().id() == false){
            tableSoats = <div class="text-center"><br/><br/><b> Sin Soats Registrados </b><br/><br/></div>
        }

        return( 
            <div class="soats">
                <Button onclick={c.vm.openPay.bind(c.vm,!c.vm.openPay())}><span class="pt-icon-standard pt-icon-credit-card"></span> Generar/Renovar Soat</Button>
                <br/>
                {pPay}
                <br/>
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h3>Soats vinculados al vehículo</h3>
                        {tableSoats}
                    </div>
                </div>
            </div>
        );
    }
}


export default Soats;

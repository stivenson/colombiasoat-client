import m from 'mithril';
import Plate from '../../components/soat/plate';


const Soat = {
    vm(){
        return {
            plate: m.prop('empty'),
            working: m.prop(false),
            user: m.prop(false),
            vehicle: m.prop(false),
            soats: m.prop('Empty'),
            refresh: () => {m.redraw()},
            refreshSoats: (v) => {
            	this.soats(v);
            	m.redraw();
            }
        }
    },
    controller(){
        this.vm = Soat.vm();
    },
    view(c){
        return (
            <div class="soat">
            	<Plate 
            	plate={c.vm.plate.bind(c.vm)} 
            	working={c.vm.working.bind(c.vm)} 
            	user={c.vm.user.bind(c.vm)} 
            	vehicle={c.vm.vehicle.bind(c.vm)} 
            	soats={c.vm.refreshSoats.bind(c.vm)}
            	refresh={c.vm.refresh.bind(c.vm)} />
            	<div class="row">
            		<div class="col-md-6 col-sm-6 col-xs-12">
            			<Vehicle working={c.vm.working.bind(c.vm)} vehicle={c.vm.vehicle.bind(c.vm)}  />
            		</div>	
            		<div class="col-md-6 col-sm-6 col-xs-12">
            			<User working={c.vm.working.bind(c.vm)}  user={c.vm.user.bind(c.vm)} />
            		</div>
            	</div>
            	<div class="row">
            		<div class="col-md-12">
            			<Soats working={c.vm.working.bind(c.vm)} soats={c.vm.refreshSoats.bind(c.vm)} />
            		</div>	
            	</div>
            </div>
        )
    }
}


export default Soat;

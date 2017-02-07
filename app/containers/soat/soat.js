import m from 'mithril';
import Plate from '../../components/soat/plate';
import Vehicle from '../../components/soat/vehicle';
import User from '../../components/soat/user';
import Soats from '../../components/soat/soats';
import {MUser,MVehicle} from '../../components/soat/models';


const Soat = {
    vm(){
        return {
            plate: m.prop(''),
            working: m.prop(false),
            user: m.prop(new MUser()),
            vehicle: m.prop(new MVehicle()),
            soats: m.prop('empty'),
            refresh: () => {m.redraw()},
            info: m.prop(false)
        }
    },
    controller(){
        this.vm = Soat.vm();
    },
    view(c){
        return (
            <div class="soat">
            	<Plate 
                info={c.vm.info.bind(c.vm)}
            	plate={c.vm.plate.bind(c.vm)} 
            	working={c.vm.working.bind(c.vm)} 
            	user={c.vm.user.bind(c.vm)} 
            	vehicle={c.vm.vehicle.bind(c.vm)} 
            	soats={c.vm.soats.bind(c.vm)}
            	refresh={c.vm.refresh.bind(c.vm)} />
            	<div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <User plate={c.vm.plate.bind(c.vm)}  working={c.vm.working.bind(c.vm)}  user={c.vm.user.bind(c.vm)} />
                    </div>
            		<div class="col-md-6 col-sm-6 col-xs-12">
            			<Vehicle plate={c.vm.plate.bind(c.vm)}  working={c.vm.working.bind(c.vm)}  vehicle={c.vm.vehicle.bind(c.vm)} user={c.vm.user.bind(c.vm)} />
            		</div>	
            	</div>
            	<div class="row">
            		<div class="col-md-12">
            			<Soats working={c.vm.working.bind(c.vm)} soats={c.vm.soats.bind(c.vm)} refresh={c.vm.refresh.bind(c.vm)} vehicle={c.vm.vehicle.bind(c.vm)} plate={c.vm.plate.bind(c.vm)} />
            		</div>	
            	</div>
            </div>
        )
    }
}


export default Soat;

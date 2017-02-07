import m from 'mithril';
import API from '../../components/api';
import {Spinner} from '../../components/ui';
import {User,Vehicle} from '../../components/soat/models';

export const Plate = {
    vm(p){
        return {
            getInfo: (e) => {
                if(e.keyCode == 13) {
                    console.log('enter');
                    if(p.plate().trim() != ''){
                        p.working(true);
                        API.get(`users/showWithPlate/${p.plate()}`,User).then(p.user).then(()=>p.working(false)).then(()=>p.refresh());
                        p.working(true);
                        API.get(`vehicles/showWithPlate/${p.plate()}`,Vehicle).then(p.vehicle).then(()=>p.working(false)).then(()=>p.refresh());
                        p.working(true);
                        API.get(`soats/showWithPlate/${p.plate()}`).then(p.soats).then(()=>p.working(false));
                    }
                }
            }
        }
    },
    controller(p){
        this.vm = Plate.vm(p);
    },
    view(c,p){

        let spin = <div class="text-center"><Spinner /></div>;

        let pplate = spin;

        if(!p.working()){
            pplate = (
                <div class="plate">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <label class="pt-label">
                                Indique su placa <i class="message-plate">(y finalize con enter para buscar información)</i>
                                <input
                                    type="text"
                                    class="pt-input pt-fill"
                                    name="plate"
                                    oninput={m.withAttr('value',p.plate)}
                                    onKeyPress={c.vm.getInfo.bind(c.vm)}
                                    value={p.plate()}
                                    placeholder="Solo números y letras"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            )
        }

        return pplate;
        
    }
}


export default Plate;

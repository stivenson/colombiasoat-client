import m from 'mithril';
import API from '../../components/api';
import {Spinner} from '../../components/ui';

export const Plate = {
    vm(p){
        return {
            getInfo: () => {
                this.working(true);
                API.get(`users/showWithPlate/${p.plate}`).then(p.user).then(()=>p.working(false)).then(()=>p.refresh());
                this.working(true);
                API.get(`vehicles/showWithPlate/${p.plate}`).then(p.vehicle).then(()=>p.working(false)).then(()=>p.refresh());
                this.working(true);
                API.get(`soats/showWithPlate/${p.plate}`).then(p.soats).then(()=>p.working(false));
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
                            <form>
                                <label class="pt-label">
                                    Indique su placa <i>(y finalize con enter para buscar información)</i>
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
                            </form>
                        </div>
                    </div>
                </div>
            )
        }

        return pplate;
        
    }
}


export default Plate;

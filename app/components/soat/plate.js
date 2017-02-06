import m from 'mithril';
import API from '../../components/api';
import {Spinner} from '../../components/ui';

export const Plate = {
    vm(){
        return {
            plate: m.prop(''),
            working: m.prop(false),
            user: m.prop(false),
            vehicle: m.prop(false),
            soats: m.prop('Empty'),
            getInfo: () => {
                this.working(true);
                console.log('Call API with this.plate(plate)');
                this.working(false);
            }
        }
    },
    controller(){
        this.vm = Plate.vm();
    },
    view(c){

        let spin = <div class="text-center"><Spinner /></div>;

        let pplate = spin;

        if(!c.vm.working()){
            pplate = (
                <div class="plate">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form>
                                <label class="pt-label">
                                    Indique su placa <i>(y un enter para busca información)</i>
                                    <input
                                        type="text"
                                        class="pt-input pt-fill"
                                        name="plate"
                                        oninput={m.withAttr('value',c.vm.plate)}
                                        onKeyPress={c.vm.getInfo.bind(c.vm)}
                                        value={c.vm.plate()}
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

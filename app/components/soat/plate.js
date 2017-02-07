import m from 'mithril';
import API from '../../components/api';
import {Spinner,Button} from '../../components/ui';
import {User,Vehicle} from '../../components/soat/models';
import {MUser,MVehicle} from './models';

export const Plate = {
    vm(p){
        return {
            getInfo: () => {
                if(p.plate().trim() != ''){
                    p.working(true);
                    API.get(`users/showWithPlate/${p.plate()}`,User).then((r) => {
                        p.info(true);
                        if(r != null){p.user(new MUser(r))}else{p.user(new MUser())}
                    }).then(()=>p.working(false)).then(()=>p.refresh());
                    p.working(true);
                    API.get(`vehicles/showWithPlate/${p.plate()}`,Vehicle).then((r) => {
                        if(r != null){p.vehicle(new MVehicle(r))}else{p.vehicle(new MVehicle({plate:p.plate()}))}
                    }).then(()=>p.working(false)).then(()=>p.refresh());
                    p.working(true);
                    API.get(`soats/showWithPlate/${p.plate()}`).then((r)=>{
                        if(r != null){p.soats(r)}else{p.soats([])}
                    }).then(()=>p.working(false)).then(()=>p.refresh());   
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

        let message;


        if(p.info()){
            if(p.user().id() == false){
                message = <span style="color: green;">Nueva placa</span>;
            }else{
                message = <span style="color: blue;">Placa Existente</span>; 
            }  
        }

        if(!p.working()){
            pplate = (
                <div class="plate">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <label class="pt-label">
                                Primero, indique su placa <i>( y oprima buscar )</i>
                                <input
                                    type="text"
                                    class="pt-input pt-fill"
                                    name="plate"
                                    oninput={m.withAttr('value',p.plate)}
                                    value={p.plate()}
                                    placeholder="Solo números y letras"
                                />
                                <div class="row">
                                    <div class="col-md-6">
                                        {message}
                                    </div>
                                    <div class="col-md-6">
                                        <div class="text-right">
                                            <Button type="button" small onclick={c.vm.getInfo.bind(c.vm)} ><span class="pt-icon-standard pt-icon-search"></span></Button>
                                        </div>
                                    </div>
                                </div>
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

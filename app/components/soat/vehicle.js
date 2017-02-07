import m from 'mithril';
import API from '../../components/api';
import {Spinner,Button} from '../../components/ui';
import {MVehicle} from './models';

export const Vehicle = {
    vm(p){
        return {
            fetchTypeVehicles: () => {
                return API.get('type_vehicles');
            },
            fetchSubtypeVehicles: (idTypeVehicle) => {
                return API.get(`subtype_vehicles/indexOfTypeVehicle/${idTypeVehicle}`);
            },
            type_vehicles: m.prop([]),
            subtype_vehicles: m.prop([]),
            working: m.prop(false)
        }
    },
    controller(p){
        this.vm = Vehicle.vm(p);
        this.vm.fetchTypeVehicles().then(this.vm.type_vehicles).then(()=>m.redraw());

        this.getSubtypeVehicles = (v) => {
            p.vehicle().type_vehicle(v);
            this.vm.fetchSubtypeVehicles(p.vehicle().type_vehicle()).then(this.vm.subtype_vehicles).then(()=>m.redraw());
        };

        this.submit = (event) => {
            event.preventDefault();

            if(this.vm.working()){
                return;
            }

            let payload = {
                id: p.vehicle().id(), 
                age: p.vehicle().age(),
                subtype_vehicle_id: p.vehicle().subtype_vehicle_id(),
                n_passengers: p.vehicle().n_passengers(),
                cylinder: p.vehicle().cylinder(),
                tonnes: p.vehicle().tonnes(),
                user_id: p.user().id()
            }
            this.vm.working(true);
            API.post('vehicles',payload).then((r)=>{p.vehicle(new MVehicle(r))}).then((r) => this.vm.working(false));
        }
    },
    view(c,p){
        
        return (
            <div class="user">
                <div>
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form onsubmit={c.submit.bind(c)} >
                                
                                <label class="pt-select">
                                    Tipo Vehículo &nbsp;&nbsp;&nbsp;
                                    <select name="type_vehicle" 
                                            onchange={m.withAttr('value', v => c.getSubtypeVehicles(v))} 
                                            required>
                                        <option> -- </option>
                                        {c.vm.type_vehicles().map((t) => {
                                            return (
                                                <option selected={t.id == p.vehicle().type_vehicle()} value={t.id} >{t.name}</option>
                                            );
                                        })}
                                    </select>
                                </label>


                                <label class="pt-select">
                                    Subtipo Vehículo &nbsp;&nbsp;&nbsp;
                                    <select name="subtype_vehicle_id" 
                                            onchange={m.withAttr('value', v => c.getSubtypeVehicles(v))} 
                                            required>
                                        <option> -- </option>
                                        {c.vm.subtype_vehicles().map((t) => {
                                            return (
                                                <option selected={t.id == p.vehicle().subtype_vehicle_id()} value={t.id}>{t.description}</option>
                                            );
                                        })}
                                    </select>
                                    <br/>
                                    <i><small>Debe seleccionar un tipo, para poder seleccionar un subtipo</small></i>
                                </label>
                                <br/><br/>
                                <label class="pt-label">
                                    Edad Vehículo (años)
                                    <input
                                        type="number"
                                        class="pt-input pt-fill"
                                        name="age"
                                        oninput={m.withAttr('value', p.vehicle().age)}
                                        value={p.vehicle().age()}
                                        placeholder="Solo números"
                                        required
                                    />
                                </label>


                                <label class="pt-label">
                                    Número de pasajeros
                                    <input
                                        type="number"
                                        class="pt-input pt-fill"
                                        name="n_passengers"
                                        oninput={m.withAttr('value', p.vehicle().n_passengers)}
                                        value={p.vehicle().n_passengers()}
                                        placeholder="Opcional, Solo números"
                                    />
                                </label>

                                <label class="pt-label">
                                    Cilindraje
                                    <input
                                        type="number"
                                        class="pt-input pt-fill"
                                        name="cylinder"
                                        oninput={m.withAttr('value', p.vehicle().cylinder)}
                                        value={p.vehicle().cylinder()}
                                        placeholder="Opcional, Solo números"
                                        
                                    />
                                </label>

                                <label class="pt-label">
                                    Toneladas 
                                    <input
                                        type="number"
                                        step="0.01"
                                        class="pt-input pt-fill"
                                        name="tonnes"
                                        oninput={m.withAttr('value', p.vehicle().tonnes)}
                                        value={p.vehicle().tonnes()}
                                        placeholder="Opcional, Solo números, puede tener dos decimales"
                                    />
                                </label>


                                <div class="text-center">
                                    <Button loading={c.vm.working()} type="submit">Guardar</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Vehicle;

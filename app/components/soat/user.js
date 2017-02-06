import m from 'mithril';
import API from '../../components/api';
import {Spinner,Button} from '../../components/ui';

export const User = {
    vm(){
        return {
            cc: m.prop(''),
            names: m.prop(''),
            surnames: m.prop(''),
            email: m.prop(''),
            password: m.prop(''),
            saving: m.prop(false)
        }
    },
    controller(){
        this.vm = User.vm();

        this.submit = (event) => {
            event.preventDefault();

            if(this.vm.saving()){
                return;
            }

            let payload = {
                cc: this.vm.cc(),
                names: this.vm.names(),
                surnames: this.vm.surnames(),
                email: this.vm.email(),
                password: this.vm.password(),
                role_id: 2
            }
            this.vm.saving(true);
            API.post('users',payload).then((r) => this.vm.saving(false)).then(() => m.route('/dashboard'));
        }

        this.toReturn = () => {m.route('/dashboard')}
    },
    view(c){

        if(localStorage.getItem('user') == 'false' || localStorage.getItem('user') == null){
            m.route("/");
        }
        
        return (
            <div class="user">
                <div class="customs-dashboard-forms">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form onsubmit={c.submit.bind(c)} >

                                <label class="pt-label">
                                    Número Cédula
                                    <input
                                        type="number"
                                        class="pt-input pt-fill"
                                        name="cc"
                                        oninput={m.withAttr('value', c.vm.cc)}
                                        value={c.vm.cc()}
                                        placeholder="Solo números"
                                        required
                                    />
                                </label>


                                <label class="pt-label">
                                    Nombres
                                    <input
                                        type="text"
                                        class="pt-input pt-fill"
                                        name="names"
                                        oninput={m.withAttr('value', c.vm.names)}
                                        value={c.vm.names()}
                                        placeholder=""
                                        required
                                    />
                                </label>

                                <label class="pt-label">
                                    Apellidos
                                    <input
                                        type="text"
                                        class="pt-input pt-fill"
                                        name="surnames"
                                        oninput={m.withAttr('value', c.vm.surnames)}
                                        value={c.vm.surnames()}
                                        placeholder=""
                                        required
                                    />
                                </label>

                                <label class="pt-label">
                                    Correo electrónico
                                    <input
                                        type="email"
                                        class="pt-input pt-fill"
                                        name="email"
                                        oninput={m.withAttr('value', c.vm.email)}
                                        value={c.vm.email()}
                                        placeholder="Nombres"
                                        required
                                    />
                                </label>


                                <label class="pt-label">
                                    Contraseña
                                    <input
                                        type="password"
                                        class="pt-input pt-fill"
                                        name="password"
                                        oninput={m.withAttr('value', c.vm.password)}
                                        value={c.vm.password()}
                                        placeholder=""
                                        required
                                    />
                                </label>

                                <div class="text-center">
                                    <Button type="button" intent="default" onclick={c.toReturn.bind(c)}>Atrás</Button>
                                    <Button loading={c.vm.saving()} type="submit">Guardar</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default User;

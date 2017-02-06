import m from 'mithril';
import API from '../../components/api';
import {Spinner,Button} from '../../components/ui';

export const User = {
    vm(p){
        return {
            names: m.prop(''),
            surnames: m.prop(''),
            email: m.prop(''),
            password: m.prop(''),
            type_document: m.prop(''),
            number_document: m.prop(''),
            phone: m.prop(''),
            saving: m.prop(false),
            fetchTypeDocuments: () => {
                return API.get('type_documents');
            },
            type_documents: m.prop('empty')
        }
    },
    controller(p){
        this.vm = User.vm(p);
        this.vm.fetchTypeDocuments().then(type_documents).then(()=>m.redraw());

        this.submit = (event) => {
            event.preventDefault();

            if(this.vm.saving()){
                return;
            }

            let payload = {
                names: this.vm.names(),
                surnames: this.vm.surnames(),
                email: this.vm.email(),
                password: this.vm.password(),
                rol: 2,
                type_document: this.vm.type_document(),
                number_document: this.vm.number_document(),
                phone: this.vm.phone()
            }
            this.vm.saving(true);
            API.post('users',payload).then(p.user).then((r) => this.vm.saving(false));
        }
    },
    view(c){
        
        return (
            <div class="user">
                <div class="customs-dashboard-forms">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form onsubmit={c.submit.bind(c)} >
                                
                                <label class="pt-select">
                                    Tipo Documento
                                    <select name="type_document" 
                                            onchange={m.withAttr('value', c.vm.type_document)} 
                                            required>
                                        <option> -- </option>
                                        {c.vm.type_documents().map((t) => {
                                            return (
                                                <option value={t.id} >{t.name}</option>
                                            );
                                        })}
                                    </select>
                                </label>

                                <label class="pt-label">
                                    Número Documento
                                    <input
                                        type="number"
                                        class="pt-input pt-fill"
                                        name="number_document"
                                        oninput={m.withAttr('value', c.vm.number_document)}
                                        value={c.vm.number_document()}
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
                                    # télefono fijo o móvil
                                    <input
                                        type="number"
                                        class="pt-input pt-fill"
                                        name="phone"
                                        oninput={m.withAttr('value', c.vm.phone)}
                                        value={c.vm.phone()}
                                        placeholder="Solo números"
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

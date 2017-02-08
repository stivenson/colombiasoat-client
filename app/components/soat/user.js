import m from 'mithril';
import API from '../../components/api';
import {Spinner,Button} from '../../components/ui';
import {MUser} from './models';

export const User = {
    vm(p){
        return {
            fetchTypeDocuments: () => {
                return API.get('type_documents');
            },
            type_documents: m.prop([]),
            working: m.prop(false)
        }
    },
    controller(p){
        this.vm = User.vm(p);
        this.vm.fetchTypeDocuments().then(this.vm.type_documents).then(()=>m.redraw());

        this.submit = (event) => {
            event.preventDefault();

            if(this.vm.working()){
                return;
            }

            let payload = {
                id: p.user().id(),
                names: p.user().names(),
                surnames: p.user().surnames(),
                email: p.user().email(),
                password: p.user().password(),
                rol_id: 2,
                type_document_id: p.user().type_document_id(),
                number_document: p.user().number_document(),
                phone: p.user().phone()
            }
            this.vm.working(true);
            let updated = false;
            API.post('users',payload).then((r)=>{
                    if(r != false && r != 'false' && r != true && r != 'true'){p.user(new MUser(r))}else{updated=true}
                }).then((r) => this.vm.working(false)).then(()=>{m.redraw()});
        }
    },
    view(c,p){

        let btnSend = <div style="color: red;" class="text-center">Debe indicar y buscar una placa para activar opciones de envío acá</div>;

        if(p.plate() != false){
            btnSend = (
                <div class="text-center">
                    <Button loading={c.vm.working()} type="submit">Guardar</Button>
                </div>
            )
        }
        
        return (
            <div class="user">
                <div>
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form onsubmit={c.submit.bind(c)} >
                                
                                <label class="pt-select">
                                    Tipo Documento &nbsp;&nbsp;&nbsp;
                                    <select name="type_document" 
                                            onchange={m.withAttr('value', p.user().type_document_id)} 
                                            required>
                                        <option value=""> Seleccione... </option>
                                        {c.vm.type_documents().map((t) => {
                                            return (
                                                <option selected={p.user().type_document_id() == t.id} value={t.id} >{t.name}</option>
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
                                        oninput={m.withAttr('value', p.user().number_document)}
                                        value={p.user().number_document()}
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
                                        oninput={m.withAttr('value', p.user().names)}
                                        value={p.user().names()}
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
                                        oninput={m.withAttr('value', p.user().surnames)}
                                        value={p.user().surnames()}
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
                                        oninput={m.withAttr('value', p.user().phone)}
                                        value={p.user().phone()}
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
                                        oninput={m.withAttr('value', p.user().email)}
                                        value={p.user().email()}
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
                                        oninput={m.withAttr('value', p.user().password)}
                                        value={p.user().password()}
                                        placeholder=""
                                        required
                                    />
                                </label>
                                {btnSend}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default User;

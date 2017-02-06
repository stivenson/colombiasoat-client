import m from 'mithril';
import {Button} from '../../components/ui';
import API from '../../components/api';


const Login = {
    controller() {
        this.state = {
            email: m.prop(""),
            password: m.prop(""),
            role: m.prop(1)
        };

        this.login = (event) => {
            event.preventDefault();
            API.post('login',{email:this.state.email(),password: this.state.password(), role_id: this.state.role()})
                .then((r)=>{
                    if(r != null && r != false ){
                        localStorage.setItem('user',JSON.stringify(r));
                        m.route('/dashboard') 
                    }else{
                        localStorage.setItem('user',false);
                        m.route('/') 
                    }
                })
        }
    },
    view(c) {
        return (
            <div class="cont-login">
                <div class="login">
                    <br />
                    <br />
                    <form class="form-login" onsubmit={c.login.bind(c)}>
                        <fieldset>
                            <h1>Colombia<b>Soat</b><br/><small>Acceso Administración</small></h1>
                            <h3>Sistema de pólizas</h3>
                            <div class="pt-control-group pt-vertical">
                                <div class="pt-input-group pt-large">
                                    <span class="pt-icon pt-icon-person"></span>
                                    <input type="email" name="email" class="pt-input" placeholder="Correo electrónico" value={c.state.email()} onchange={m.withAttr('value', c.state.email)} required />
                                </div>
                                <div class="pt-input-group pt-large">
                                    <span class="pt-icon pt-icon-lock"></span>
                                    <input type="password" name="password" class="pt-input" placeholder="Contraseña" value={c.state.password()} onchange={m.withAttr('value', c.state.password)} required />
                                </div>
                                <Button large type="submit" >Iniciar sesión</Button>
                            </div>
                        </fieldset>
                        <br/>
                        <h3><i>By Stivenson Rincón<br/> <br/> Testeado en <b>Google Chrome <br/></b></i></h3>

                    </form>
                </div>
            </div>
        );
    }
};

export default Login;
import login from "../page_model/login";
import register from "../page_model/register";

const pagelogin = new login();
const pageRegis = new register();

fixture `Tests de Automatizacion`
    .page `http://localhost:3000/LogIn`;

test('Inicio de sesion con gmail para completar formulario', async t => {
    await t
        .wait(1000)
        .typeText(pagelogin.userName, 'alexoman0512@gmail.com') // Ingresar Usuario
        .wait(1000)
        .typeText(pagelogin.password, '123') // Ingresar contraseña
        .wait(1000)
        .click(pagelogin.submitUser)
        .wait(5000)
});
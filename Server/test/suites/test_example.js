import login from "../page_model/login";
const pagelogin = new login();

fixture`Ejemplo page Object Model`
 .page`http://localhost:3000/LogIn`;
 test.only('Inicio de sesion con gmail para completar formulario', async t => {
    await t
    .wait(1000)   
    .typeText(pagelogin.userName, 'alexosman0512@gmail.com') // Ingresar Usuario
    .wait(1000)   
    .typeText(pagelogin.password, '123') // Ingresar contraseña
    .wait(1000)
    .click(pagelogin.submitUser)
    .wait(1000) 
 });

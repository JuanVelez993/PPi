import register from "../page_model/register";

const pageRegis = new register();

fixture `Tests de Automatizacion`
    .page `http://localhost:3000/Registro`;
test('Registro de un usuario nuevo', async t => {
    await t
        .wait(1000)
        .typeText(pageRegis.firstName, 'Fredy') // Ingresar Nombre
        .wait(2000)
        .typeText(pageRegis.firstLastName, 'Osman') // Ingresar Primer Apellido
        .wait(2000)
        .typeText(pageRegis.secondLastName, 'Londoño') // Ingresar Segundo Apellido
        .wait(2000)
        .typeText(pageRegis.phone, '2705455') // Ingresar Telefono
        .wait(1000)
        .typeText(pageRegis.email, 'alexoman0512@gmail.com') // Ingresar Correo 
        .wait(1000)
        .typeText(pageRegis.adress, 'Cra 27 sur 33') // Ingresar Direccion
        .wait(1000)
        .typeText(pageRegis.id, '1037258963') // Ingresar Documento
        .wait(1000)
        .typeText(pageRegis.password, '123') // Ingresar Contraseña
        .wait(1000)
        .click(pageRegis.registerUser)
        .wait(3000)
        .expect(pageRegis.msgConfirm.innerText).eql('Usuario creado correctamente'); // Comprobar resultado
});
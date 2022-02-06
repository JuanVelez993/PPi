const login = require('../src/services/logIn')

describe("Filter function", () => {
    test("it should filter by a search term (link)", async () => {
        
        const input = await login.logIn({uname: "alexoman0512@gmail.com", psw: "123"})

        const output = {
            idUsuario: 1,
            primerNombre: 'fredy',
            segundoNombre: 'alexander',
            primerApellido: 'osman',
            segundoApellido: 'ramirez',
            telefono: '3045997917',
            correo: 'alexoman0512@gmail.com',
            direccion: 'calle 40',
            identificacion: '1037644905',
            password: '123',
            cargo: 1
          };

        expect(input).toEqual(output);
    });

   
});


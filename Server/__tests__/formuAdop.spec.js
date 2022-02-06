const form = require('../src/services/perro')

describe("crea una solicitud de adopcion", () => {
    test("generar una solicitud de adopcion", async() => {
        const data = {
            idPerro: 11,
            mov_adop: "Para las pruebas unitarias",
            ani_cas: "1",
            ani_ant: "1",
            hijos: "1",
            habit_cas: "4",
            salario: "3000000",
            est_civ: "casado",
            ale_fam: "ninguna",
            ref: "pruebas gomez 1234",

        }
        const idUsuario = 11

        const input = await form.crearFormularioAdopcion(data, idUsuario)
        const output = true

        expect(input).toEqual(output);
    });


});
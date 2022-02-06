const user = require('../src/services/User')

describe("create user", () => {
    test("create user (link)", async () => {
        const data = {
            nombre: "Dulce",
            nombre2: "Maria",
            apel: "osman",
            apel2: "rodriguez",
            tel: "222222",
            email: "jibhbchebce",
            dir: "twdgwvdhued",
            doc: "122221",
            pwd: "123",
        }
        const input = await user.createUser(data)
        const output = true

        expect(input).toEqual(output);
    });
});
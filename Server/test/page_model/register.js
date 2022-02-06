import { Selector } from "testcafe";
export default class register {
    constructor() {
        this.firstName = Selector('#form > fieldset > div:nth-child(2) > label.name > input');
        this.firstLastName = Selector('#form > fieldset > div:nth-child(3) > label.lname > input');
        this.secondLastName = Selector('#form > fieldset > div:nth-child(3) > label.lname2 > input');
        this.phone = Selector('#form > fieldset > div:nth-child(4) > label.phone > input');
        this.email = Selector('#form > fieldset > div:nth-child(4) > label.email > input');
        this.adress = Selector('#form > fieldset > div:nth-child(5) > label.dir > input');
        this.id = Selector('#form > fieldset > div:nth-child(5) > label.doc > input');
        this.password = Selector('#pwd');
        this.registerUser = Selector('#form > fieldset > div:nth-child(9) > button:nth-child(1)');
        this.msgConfirm = Selector('#msgConfirm')

    }
}
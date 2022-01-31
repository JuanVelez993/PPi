import { Selector } from "testcafe";
export default class register {
    constructor() {
        this.msgConfirm = Selector('#form > fieldset > label:nth-child(11)')
    }
}
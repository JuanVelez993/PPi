import { Selector } from "testcafe";
export default class login {
  constructor() {
    this.userName = Selector('#form > fieldset > div.container > input[type=text]:nth-child(2)');
    this.password = Selector('#form > fieldset > div.container > input[type=password]:nth-child(4)');
    this.submitUser = Selector('#form > fieldset > div.container > button');
  }
}
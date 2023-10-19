import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import RegisterPage from "../../pages/registerPage";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import * as data from "../../helper/util/test-data/registerUser.json"

let registerPage: RegisterPage;
let assert: Assert;

Given('I navigate to the register page', async function () {
  registerPage = new RegisterPage(fixture.page);
  assert = new Assert(fixture.page);
  await registerPage.navigateToRegisterPage();

});

When('I create a new User', async function () {
  const username = data.userName + Date.now().toString();
  await registerPage.registerUser(data.firstName, data.lastName, username, data.password, data.confirmPassword, "m")

});

Then('I confirm the user registration is successful', async function () {

  await assert.assertURL("https://bookcart.azurewebsites.net/login");

});

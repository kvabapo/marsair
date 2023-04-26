import { Selector } from "testcafe";

const label = Selector("label");

class Page {
  constructor() {
    this.departField = Selector("#departing");
    this.departJuly = Selector("#departing > option:nth-child(2)");
    this.returnField = Selector("#returning");
    this.returnJulyNextYr = Selector("#returning > option:nth-child(4)");
    this.returnDecember = Selector("#returning > option:nth-child(3)");
    this.returnDecember2yrs = Selector("#returning > option:nth-child(7)");
    this.promoCodeField = Selector("#promotional_code");
    this.searchButton = Selector(
      "#content > form > dl:nth-child(5) > dd > input[type=submit]"
    );
    this.submitButton = Selector("#submit-button");

    this.logo = Selector("#app > h1 > a");
    this.bookATicketLink = Selector("#content > form > h3");
  }
}

export default new Page();

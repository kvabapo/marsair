import { Selector } from "testcafe";
import page from "./page-model";

const homeURL = "https://marsair.recruiting.thoughtworks.net/KarloAbapo";
const seatAvailableText = Selector("#content > p:nth-child(2)");
const callNowText = Selector("#content > p:nth-child(3)");
const promoCodeMsg = Selector("#content > p.promo_code");

fixture`A suite of tests for search page`.page(homeURL);

// Tests
test("Search available seats", async (t) => {
  await t
    .click(page.departField)
    .click(page.departJuly)
    .click(page.returnField)
    .click(page.returnDecember2yrs)
    .click(page.searchButton);

  await t
    .expect(seatAvailableText.innerText)
    .eql("Seats available!")
    .expect(callNowText.innerText)
    .eql("Call now on 0800 MARSAIR to book!");
});
test("Search unavailable seats", async (t) => {
  await t
    .click(page.departField)
    .click(page.departJuly)
    .click(page.returnField)
    .click(page.returnJulyNextYr)
    .click(page.searchButton);

  await t
    .expect(seatAvailableText.innerText)
    .eql("Sorry, there are no more seats available.");
});
test("Search seats but invalid return date", async (t) => {
  await t
    .click(page.departField)
    .click(page.departJuly)
    .click(page.returnField)
    .click(page.returnDecember)
    .click(page.searchButton);

  await t
    .expect(seatAvailableText.innerText)
    .eql("Unfortunately, this schedule is not possible. Please try again.");
});
test("Search available seats with valid promo code", async (t) => {
  await t
    .click(page.departField)
    .click(page.departJuly)
    .click(page.returnField)
    .click(page.returnDecember2yrs)
    .typeText(page.promoCodeField, "AF3-FJK-418")
    .click(page.searchButton);

  await t
    .expect(promoCodeMsg.innerText)
    .eql("Promotional code AF3-FJK-418 used: 30% discount!");
});
test("Search available seats with invalid promo code - wrong check digit", async (t) => {
  await t
    .click(page.departField)
    .click(page.departJuly)
    .click(page.returnField)
    .click(page.returnDecember2yrs)
    .typeText(page.promoCodeField, "AF3-FJK-412")
    .click(page.searchButton);

  await t
    .expect(promoCodeMsg.innerText)
    .eql("Sorry, code AF3-FJK-412 is not valid");
});
test("Search available seats with invalid promo code - wrong format", async (t) => {
  await t
    .click(page.departField)
    .click(page.departJuly)
    .click(page.returnField)
    .click(page.returnDecember2yrs)
    .typeText(page.promoCodeField, "adgrsf-r")
    .click(page.searchButton);

  await t
    .expect(promoCodeMsg.innerText)
    .eql("Sorry, code adgrsf-r is not valid");
});
test("Search available seats with invalid promo code - wrong discount", async (t) => {
  await t
    .click(page.departField)
    .click(page.departJuly)
    .click(page.returnField)
    .click(page.returnDecember2yrs)
    .typeText(page.promoCodeField, "AFF-FJK-418")
    .click(page.searchButton);

  await t
    .expect(promoCodeMsg.innerText)
    .eql("Sorry, code AFF-FJK-418 is not valid");
});

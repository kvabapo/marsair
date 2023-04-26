import { link } from "fs";
import page from "./page-model";
import { ClientFunction } from "testcafe";

const homeURL = "https://marsair.recruiting.thoughtworks.net/KarloAbapo";
const getURL = ClientFunction(() => window.location.href);

fixture`A suite of tests for page navigation`.page(homeURL);

// Tests
test("Click “Book a ticket to the red planet now!” link", async (t) => {
  await t
    .expect(page.bookATicketLink)
    .eql(linkElement)
    .click(page.bookATicketLink)
    .expect(getURL())
    .eql("https://marsair.recruiting.thoughtworks.net/KarloAbapo");
});

test("Click MarsAir logo", async (t) => {
  await t
    .click(page.logo)
    .expect(getURL())
    .eql("https://marsair.recruiting.thoughtworks.net/KarloAbapo");
});

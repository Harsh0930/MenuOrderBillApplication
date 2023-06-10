const expect = require("chai").expect;
const fs = require("fs");
const axios = require("axios");
const axiosMock = require("axios-mock-adapter");
const { JSDOM } = require("jsdom");

describe("Order module", function () {
    let scriptFileContents;
    let script;
    let jsDom;
    before(function () {
        scriptFileContents = fs.readFileSync("./solution/js/order.js", 'utf8');
        fs.writeFileSync("./solution/js/order.js", "\nconst axios = require('axios');\n" + scriptFileContents, () => { });
        return JSDOM.fromFile('./solution/order.html')
        .then((dom) => {
            global.window = dom.window;
            global.document = window.document;
            jsDom = dom;
        });
    });
    
    it("should have function with the name `submitOrder`", function () {
        script = require("../solution/js/order");
        expect(typeof script.submitOrder).to.be.equal("function");
    });

    it("should save order to server when submitOrder() function is called", function (done) {
        let order = {
            "orderID": "1001",
            "customerName": "Michael Williams",
            "emailId": "Michael123@yahoo.com",
            "contactNumber": "9865212512",
            "orderDate": "2022-07-13",
            "address": "Hopton Street,501m,FL",
            "orderItemDetails": [
              {
                "categoryInput": "Starters",
                "item": "Mix Salad Bowl",
                "price": "4",
                "quantity": "2",
                "amount": "8"
              },
              {
                "categoryInput": "Main Course",
                "item": "Fruit Pizza",
                "price": "5",
                "quantity": "1",
                "amount": "5"
              }
            ],
            "totalAmount": 13,
            "id": 1
          };
        new axiosMock(axios).onPost("http://localhost:3002/order").reply(201, order);
        script.submitOrder(new jsDom.window.Event("click"));
        setTimeout(() => {
            expect(document.body.innerHTML).to.contain(`Total amount to be paid: $13`);
            done();
        });
    });
    after(function () {
        script = null;
        fs.writeFileSync("./solution/js/order.js", scriptFileContents);
    });
});
const expect = require("chai").expect;
const fs = require("fs");
const axios = require("axios");
const axiosMock = require("axios-mock-adapter");
const { JSDOM } = require("jsdom");

describe("Customer module", function () {
    let scriptFileContents;
    let script;

    before(function () {
        scriptFileContents = fs.readFileSync("./solution/js/customer.js", 'utf8');
        fs.writeFileSync("./solution/js/customer.js", "\nconst axios = require('axios');\n" + scriptFileContents, () => { });
        script = require("../solution/js/customer");
        return JSDOM.fromFile('./solution/customer.html')
            .then((dom) => {
                global.window = dom.window;
                global.document = window.document;
                jsDom = dom;
            });
    });

    it("should have function with the name `setPasswordConfirmValidity`", function () {
        expect(typeof script.setPasswordConfirmValidity).to.be.equal("function");
    });
    it("should have function with the name `submitCustomerDetail`", function () {
        expect(typeof script.submitCustomerDetail).to.be.equal("function");
    });
    it("should post customer details to server when submitCustomerDetail() function is called", function (done) {
        let customer = {
            customerID: 45768,
            customerName: "Ryan Alice",
            password: "ryan@12345",
            customerEmail: "ryan@gmail.com",
            contactNumber: "+12348786543",
            address: "San Jose - CA"
        };
        new axiosMock(axios).onPost("http://localhost:3001/customers").reply(201, customer);
        script.submitCustomerDetail(new jsDom.window.Event("click"));
        setTimeout(()=>{
            expect(document.body.innerHTML).to.contain("You have successfully registered !");
            done();
        });
});
after(function () {
    script = null;
    fs.writeFileSync("./solution/js/customer.js", scriptFileContents);
});
});
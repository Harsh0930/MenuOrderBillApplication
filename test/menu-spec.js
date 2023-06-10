const expect = require("chai").expect;
const fs = require("fs");
const axios = require("axios");
const axiosMock = require("axios-mock-adapter");
const { JSDOM } = require("jsdom");

describe("Menu module", function () {
    let scriptFileContents;
    let script;

    before(function () {
        scriptFileContents = fs.readFileSync("./solution/js/menu.js", 'utf8');
        fs.writeFileSync("./solution/js/menu.js", "\nconst axios = require('axios');\n" + scriptFileContents, () => { });
        return JSDOM.fromFile('./solution/menu.html')
        .then((dom) => {
            global.window = dom.window;
            global.document = window.document;
            jsDom = dom;
        });
    });
    
    it("should have function with the name `fetchMenuItemsFromServer`", function () {
        script = require("../solution/js/menu");
        expect(typeof script.fetchMenuItemsFromServer).to.be.equal("function");
    });

    it("should fetch menu items for all categories from server when fetchMenuItemsFromServer() function is called", function (done) {
        let menuItems = [{
            "id": 101,
            "category": "Starters",
            "itemName": "Garlic chilly cheese toastie",
            "price": 5.5,
            "cuisine": "Asian"
        }];
        new axiosMock(axios).onGet("http://localhost:3000/menu").reply(200, menuItems);
        script.fetchMenuItemsFromServer();
        setTimeout(() => {
            expect(document.body.innerHTML).to.contain("Garlic chilly cheese toastie");
            done();
        });
    });
    after(function () {
        script = null;
        fs.writeFileSync("./solution/js/menu.js", scriptFileContents);
    });
});
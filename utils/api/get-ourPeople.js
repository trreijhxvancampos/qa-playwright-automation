const {expect, test} = require("@playwright/test");
const playwright = require("@playwright/test");
const {ENV} = require("../setup/env");

const envUtil = new ENV();

class GetOurPeople {
    constructor(page) {
        this.page = page;
    }

    async getEmployee(accessToken, employeeToken) {
        const request = await playwright.request.newContext();
        return await request.get(`${envUtil.getApiBaseUrl()}/twisthrm/api/v1/employee/${employeeToken}`, {
            headers: {Authorization: `Bearer ${accessToken}`},
        })


    }
}

module.exports = {GetOurPeople};

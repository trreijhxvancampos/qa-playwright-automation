const {expect, test} = require("@playwright/test");
const playwright = require("@playwright/test");
const {ENV} = require("../setup/env");


const envUtil = new ENV();

class GetAdmin {
    constructor(page) {
        this.page = page;
    }

    async searchSkills(accessToken, skill) {
        const request = await playwright.request.newContext();
        return await request.get(`${envUtil.getApiBaseUrl()}/twisthrm/api/v1/skill?keyword=${skill}&page=1&pageSize=10&sort=name ASC`, {
            headers: {Authorization: `Bearer ${accessToken}`},
        })

    }
}

module.exports = {GetAdmin};

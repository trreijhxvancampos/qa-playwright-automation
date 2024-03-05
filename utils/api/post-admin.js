const { expect, test} = require("@playwright/test");
const playwright = require("@playwright/test");
const { ENV } = require("../setup/env");

const envUtil = new ENV();

class PostAdmin {
  constructor(page) {
    this.page = page;
  }

  async addSkill(accessToken, skill) {
    const request = await playwright.request.newContext();

    return await request.post(`${envUtil.getApiBaseUrl()}/twisthrm/api/v1/skill/create`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        name: [skill]
      }
    })



  }
}

module.exports = { PostAdmin };

const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");
const { ENV } = require("../setup/env");

const envUtil = new ENV();

class PostNewsFeed {
  constructor(page) {
    this.page = page;
  }

  async postNewsFeed(accessToken) {
    const request = await playwright.request.newContext();
    const response = await request.post(`${envUtil.getApiBaseUrl()}/twisthrm/api/v1/new-newsfeed/create`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: { content: "Hi from API", groupId: "staging", postType: "standard" },
    });

    return response;
  }
}

module.exports = { PostNewsFeed };

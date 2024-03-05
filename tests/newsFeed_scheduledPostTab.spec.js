const {test, expect} = require("@playwright/test");
const {LoginPageObject} = require("../utils/modules/login-pageObject");
const {NewsFeedPageObject} = require("../utils/modules/newsFeed-pageObject");



require("@playwright/test");
const {ENV} = require("../utils/setup/env");

require("../test-data/post-data.json");


test.describe("UI Automation Tests", () => {
    let page, envUtil, loginPageObject, context, token;

    test.beforeEach(async ({browser}) => {
        envUtil = new ENV();

        context = await browser.newContext({
            httpCredentials: {
                username: envUtil.getHttpCredentialsUsername(),
                password: envUtil.getHttpCredentialsPassword(),
            },
            //   viewport: { width: 1920, height: 1080 },
        });
        page = await context.newPage();

        loginPageObject = new LoginPageObject(page);

        token = await loginPageObject.loginAs(envUtil.getUserToken());
    });

    test("Login test", async () => {
        await test.step("Given I am on the News Feed Page", async () => {
            await page.goto(envUtil.getBaseUrl());
        });
    });

    test("Scheduled Posts Tab should displayed correctly on the News Feed Page", async () => {
        //elements in scheduled posts tab
        const div_scheduledPosts = '//div[@class="m-2 mx-0 my-2 rounded bg-amber-50 p-4 shadow-lg"]'
        const img_userImageFromScheduledPosts = '//img[@data-testid="scheduledpost-post-user-image"]'
        const text_nameFromScheduledPosts = '//span[@data-testid="scheduledpost-post-name"]'
        const text_contentFromScheduledPosts = '//p[@data-testid="scheduledpost-post-content"]'

        await test.step("Given I am on the News Feed Page", async () => {
            await page.goto(envUtil.getBaseUrl());
        });
        await test.step("Click on the scheduled posts tab", async () => {
            const newsFeedObject = new NewsFeedPageObject(page);
            await newsFeedObject.navigateToScheduledPostTab();

        })
        await test.step("Assert scheduled post is displayed", async() => {
            await expect(page.locator(div_scheduledPosts).nth(0)).toBeVisible();

        })
        await test.step("Assert elements are displayed properly", async() => {
            await expect(page.locator(img_userImageFromScheduledPosts).nth(0)).toBeVisible();
            await expect(page.locator(text_nameFromScheduledPosts).nth(0)).toBeVisible();
            await expect(page.locator(text_contentFromScheduledPosts).nth(0)).toBeVisible();
        })

    });
});


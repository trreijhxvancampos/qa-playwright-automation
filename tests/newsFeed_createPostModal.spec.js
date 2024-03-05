const {test, expect} = require("@playwright/test");
const {LoginPageObject} = require("../utils/modules/login-pageObject");
const {NewsFeedPageObject} = require("../utils/modules/newsFeed-pageObject");



require("@playwright/test");
const {ENV} = require("../utils/setup/env");

const postData = require("../test-data/post-data.json")
const catImage = "../test-data/cat-image.jpg"


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

    test("I should be able to create a scheduled post", async () => {
        const newsFeedObject = new NewsFeedPageObject(page)

        await test.step("Given I am on the News Feed Page", async () => {
            await page.goto(envUtil.getBaseUrl());
        });
        await test.step("Create a scheduled post", async () => {
            await newsFeedObject.createScheduledPost(postData);
        })

        await test.step("Assert scheduled post is created successfully", async() => {
            await expect(page.getByText('Scheduled post successfully set')).toBeVisible();
        })

    });

    test("I should be able to create a text with a photo post", async () => {
        const newsFeedObject = new NewsFeedPageObject(page);
        const text_fromCreatedPost = '//p[@data-testid="news-feed-post-content"]'
        const img_fromCreatedPost = '//img[@data-testid="news-feed-post-image"]'

        await test.step("Given I am on the News Feed Page", async () => {
            await page.goto(envUtil.getBaseUrl());
        });
        await test.step("Create text with photo post", async () => {
            await newsFeedObject.createPostWithImage('../' + catImage, postData);
        })
        await test.step("Assert created post with photo is displayed", async() => {
            await expect(page.locator(text_fromCreatedPost).nth(0)).toBeVisible();
            await expect(page.locator(img_fromCreatedPost).nth(0)).toBeVisible()

        })


    })
});


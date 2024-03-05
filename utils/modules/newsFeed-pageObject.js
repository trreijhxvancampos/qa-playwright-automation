const {test, expect} = require("@playwright/test");
const playwright = require("@playwright/test");
const {ENV} = require("../setup/env");
const path = require('path')

const envUtil = new ENV();

class NewsFeedPageObject {
    constructor(page) {
        this.page = page;
        this.button_navigateToScheduledPosts = '//*[@id="root"]/div/div[2]/div/div/div[2]/div/div[1]/div/div/button[2]'
        this.section_whatsOnYourMind = '//div[@data-testid="create-post"]'
        this.textArea_createPostContent = '//textarea[@data-testid="create-post-content"]'
        //post modal
        this.button_post = '//button[@data-testid="create-new-post-button"]'
        //post modal with schedule post
        this.button_schedule = '//div[@aria-label="Schedule"]'
        this.input_date = '//input[@placeholder="mm/dd/yyyy"]'
        this.input_time = '//input[@class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedEnd MuiAutocomplete-input MuiAutocomplete-inputFocused css-b52kj1"]'
        //post modal with add photo
        this.button_attachPhoto = '//div[@aria-label="Attach Photo"]'
        this.fileUpload_attachPhoto = '//label[@for="mediaFileUpload"]'
        this.input_WhatsTheTitleOfTheAlbum = '//input[@class="MuiInputBase-input MuiOutlinedInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused css-1x5jdmq"]'
        this.button_createAlbum = '//button[contains(text(), "Create") or contains(text(), "Add")]'

    }

    async createScheduledPost(postData) {
        await test.step("Display create post modal", async () => {
            await this.page.locator(this.section_whatsOnYourMind).click();
        });
        await test.step("Enter text on post modal field", async () => {
            await this.page.locator(this.textArea_createPostContent).fill(postData.scheduleContent)
        });
        await test.step("Click the schedule icon", async () => {
            await this.page.locator(this.button_schedule).click();
        })
        await test.step("Select a future time", async () => {
            await this.page.locator(this.input_date).fill(postData.date)
            await this.page.locator(this.input_time).fill(postData.time)
            await this.page.keyboard.press('ArrowUp')
            await this.page.keyboard.press('Enter')
        })
        await test.step("Click on schedule post button", async () => {
            await this.page.locator(this.button_post).click()

        })
    }

    async navigateToScheduledPostTab() {
        await test.step("Click on scheduled posts tab", async() => {
            await this.page.locator(this.button_navigateToScheduledPosts).click()
        })

    }

    async createPostWithImage(testImage, postData) {
        await test.step("Display create post modal", async () => {
            await this.page.locator(this.section_whatsOnYourMind).click();
        });

        await test.step("Create text with photo post", async () => {
            const currentFilePath = __dirname;
            const imagePath = path.join(currentFilePath, testImage);

            await this.page.locator(this.textArea_createPostContent).fill(postData.defaultContent)
            await this.page.locator(this.button_attachPhoto).click();
            await this.page.locator(this.fileUpload_attachPhoto).setInputFiles(imagePath);

        });

        await test.step("Click post button", async () => {
            await this.page.locator(this.button_post).click()
            await this.page.locator(this.input_WhatsTheTitleOfTheAlbum).fill(postData.albumTitle)
            await this.page.keyboard.press('Escape')

            await this.page.locator(this.button_createAlbum).click();

        })

    }

}

module.exports = {NewsFeedPageObject};

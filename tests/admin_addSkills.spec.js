const {test, expect} = require("@playwright/test");


const {PostLogin} = require("../utils/api/post-login.js");

const {PostAdmin} = require("../utils/api/post-admin");
const {GetAdmin} = require("../utils/api/get-admin");
require("@playwright/test");
const {ENV} = require("../utils/setup/env");

const adminData = require("../test-data/admin-data.json")


test.describe("API Automation Tests", () => {
    let envUtil;

    test.beforeEach(async () => {
        envUtil = new ENV();
    });

    test("I should be able to add skills upon passing valid tokens", async () => {
        const postLoginApi = new PostLogin()
        const postAdminApi = new PostAdmin();
        const accessToken = await postLoginApi.login(envUtil.getUserToken())
        const skillToAdd = adminData.skillToAdd
        let response;

        await test.step("Add skill", async () => {
            response = await postAdminApi.addSkill(accessToken, skillToAdd);
        })

        await test.step("Assert skill is added", async () => {
            const responseJson = await response.json()

            expect(response.status()).toBe(200)
            expect(responseJson['message']).toBe("Successfully saved!")
            expect(responseJson['affectedRows']).toBe(1)
        })


    })

    test("Search result must be related to the search keyword", async () => {
        const postLoginApi = new PostLogin()
        const getAdminApi = new GetAdmin();
        const accessToken = await postLoginApi.login(envUtil.getUserToken())
        const skillToSearch = adminData.skillToSearch
        let response;

        await test.step("Search skill", async () => {
            response = await getAdminApi.searchSkills(accessToken, skillToSearch);
        })

        await test.step("Assert skill can be searched", async () => {
            await expect(response.status()).toBe(200);
            const responseJson = await response.json();
            const skills = responseJson['skills'].map(skill => {
                return skill['name']
            })

            expect(response.status()).toBe(200)
            expect(skills).toContain(skillToSearch)

        })


    })
});

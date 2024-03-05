const {test, expect} = require("@playwright/test");


const {PostLogin} = require("../utils/api/post-login.js");


const {GetOurPeople} = require("../utils/api/get-ourPeople");
require("@playwright/test");
const {ENV} = require("../utils/setup/env");

const employeeData = require("../test-data/employee-data.json")


test.describe("API Automation Tests", () => {
    let envUtil;

    test.beforeEach(async () => {
        envUtil = new ENV();
    });

    test("I should be able to fetch a specific employee using a valid token", async () => {
        const postLoginApi = new PostLogin()
        const getOurPeopleApi = new GetOurPeople();
        const accessToken = await postLoginApi.login(envUtil.getUserToken())
        const employeeToken = employeeData.SystemID
        const employeeName = employeeData.FirstName
        let response;

        await test.step("Search employee", async () => {
            response = await getOurPeopleApi.getEmployee(accessToken, employeeToken);
        })

        await test.step("Assert employee can be searched", async () => {
            const responseJson = await response.json()
            const employees = responseJson.map(employee => {
                return employee['firstName']
            })

            expect(response.status()).toBe(200)
            expect(employees).toContain(employeeName)
        })

    })
});

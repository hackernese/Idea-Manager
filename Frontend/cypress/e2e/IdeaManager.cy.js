// // Component 1 : Authentication / Authorization
// describe("Authentication / Authorization", () => {
//   // Testcase 1: Checking if fake credentials output any error
//   it("passes", () => {
//     cy.visit("http://localhost:3000/");
//     cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
//       .click()
//       .type("admin");
//     cy.get(
//       "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
//     )
//       .click()
//       .type("random");
//     cy.get("#root > div.Login_content__0Pfph > button").click();
//     cy.contains("Invalid credentials");
//   });

//   // Test case 2: Checking if the prompt shows "Empty username."
//   it("passes", () => {
//     cy.visit("http://localhost:3000/");
//     cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
//       .click()
//       .type("staff");
//     cy.get("#root > div.Login_content__0Pfph > button").click();
//     cy.contains("Empty username.");
//   });

//   // Test case 4: Check for "empty password" quote
//   it("passes", () => {
//     cy.visit("http://localhost:3000/");
//     cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
//       .click()
//       .type("staff");
//     cy.get("#root > div.Login_content__0Pfph > button").click();
//     cy.contains("Empty password.");
//   });

//   // Test case 5: CHeck for valid credentials
//   it("passes", () => {
//     cy.visit("http://localhost:3000/");
//     cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
//       .click()
//       .type("staff");
//     cy.get(
//       "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
//     )
//       .click()
//       .type("staff");
//     cy.get("#root > div.Login_content__0Pfph > button").click();
//     cy.contains("Welcome to Idea Manager");
//   });

//   // Test case 5: Checking to see if the application authorize users as staff
//   it("passes", () => {
//     cy.visit("http://localhost:3000/");
//     cy.viewport(1920, 1080); // Set viewport to 550px x 750px

//     cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
//       .click()
//       .type("staff");
//     cy.get(
//       "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
//     )
//       .click()
//       .type("staff");
//     cy.get("#root > div.Login_content__0Pfph > button").click();

//     cy.get("#root > div.container > div.Header_container__Rp4A9").contains(
//       "Staff Submission"
//     );

//     cy.get("#root > div.container > div.Header_container__Rp4A9")
//       .contains("Statistic")
//       .should("not.exist");
//     cy.get("#root > div.container > div.Header_container__Rp4A9")
//       .contains("Role")
//       .should("not.exist");
//     cy.get("#root > div.container > div.Header_container__Rp4A9")
//       .contains("User")
//       .should("not.exist");
//     cy.get("#root > div.container > div.Header_container__Rp4A9")
//       .contains("Department")
//       .should("not.exist");
//     cy.get("#root > div.container > div.Header_container__Rp4A9")
//       .contains("Category")
//       .should("not.exist");

//     cy.contains("Welcome to Idea Manager");
//   });

//   // Test case 6: Checking to see if the application authorize users as manager
//   it("passes", () => {
//     cy.visit("http://localhost:3000/");
//     cy.viewport(1920, 1080); // Set viewport to 550px x 750px

//     cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
//       .click()
//       .type("manager");
//     cy.get(
//       "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
//     )
//       .click()
//       .type("manager");
//     cy.get("#root > div.Login_content__0Pfph > button").click();

//     cy.get("#root > div.container > div.Header_container__Rp4A9").contains(
//       "Staff Submission"
//     );

//     cy.get("#root > div.container > div.Header_container__Rp4A9").contains(
//       "Statistic"
//     );

//     cy.contains("Welcome to Idea Manager");
//   });

//   // Test case 7 : Checking if the application authorize users as administrator
//   it("passes", () => {
//     cy.visit("http://localhost:3000/");
//     cy.viewport(1920, 1080); // Set viewport to 550px x 750px

//     cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
//       .click()
//       .type("admin");
//     cy.get(
//       "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
//     )
//       .click()
//       .type("admin");
//     cy.get("#root > div.Login_content__0Pfph > button").click();

//     cy.get("#root > div.container > div.Header_container__Rp4A9").contains(
//       "Role"
//     );
//     cy.get("#root > div.container > div.Header_container__Rp4A9").contains(
//       "User"
//     );
//     cy.get("#root > div.container > div.Header_container__Rp4A9").contains(
//       "Department"
//     );
//     cy.get("#root > div.container > div.Header_container__Rp4A9").contains(
//       "Category"
//     );

//     cy.contains("Welcome to Idea Manager");
//   });
// });

// Component 2 : Staff submission
// describe("Staff submission testing", () => {
//   // Testcase 1: Adding idea on submission
//   it("passes", () => {
//     cy.viewport(1920, 1080); // Set viewport to 550px x 750px
//     cy.visit("http://localhost:3000/");
//     // Logging in
//     cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
//       .click()
//       .type("admin");
//     cy.get(
//       "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
//     )
//       .click()
//       .type("admin");
//     cy.c;
//     cy.get("#root > div.Login_content__0Pfph > button").click();

//     // Finished logging in

//     // Click on first submission
//     cy.get(
//       "#root > div.container > div.Header_container__Rp4A9 > div > div.Header_Toggle-responsive__djCJm.Header_col-10__OwENv.Header_d-flex__DVmD5.Header_f-wrap__KCqHF > div.Header_col-9__CCygv > div > ul > li:nth-child(6)"
//     ).click();
//     cy.get(
//       "#root > div.container > div.content > div > div > div > div:nth-child(2) > div:nth-child(1) > div > svg"
//     ).click();

//     // Add new idea

//     cy.get('#root > div.container > div.content > div > div > div.subid_addbtn__LgMcy').click();

//   });
// });
describe("CRUD operations on users", () => {
  // var user_id;
  // var authToken = undefined;
  // beforeEach(() => {
  //   if (!authToken)
  //     cy.request({
  //       method: "POST",
  //       url: "http://localhost:5000/api/auth/login",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: {
  //         name: "admin",
  //         passwd: "admin",
  //       },
  //     }).then((resp) => {
  //       authToken = resp.body.token;
  //     });
  // });
  // // Test case 1 : Authorized request
  // it("Testing unauthorized access", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/user/add",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: {
  //       email: "john.doe@example.com",
  //       passwd: "password",
  //       department: 1,
  //       name: "Johnathan",
  //       role: 2,
  //     },
  //   }).then((resp) => {
  //     // expect(resp.body)
  //     expect(resp.body.status).to.eq("FAIL");
  //   });
  // });
  // // Test case 2 : Adding user as admin
  // it("Create new user", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/user/add",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //       // Replace this with a valid token of admin
  //     },
  //     body: {
  //       email: "john.doe@example.com",
  //       passwd: "password",
  //       department: 1,
  //       name: "Johnathan",
  //       role: 2,
  //     },
  //   }).then((resp) => {
  //     console.log(resp);
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // it("Listing users to check for new user.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/user/list",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //       // Replace this with a valid token of admin
  //     },
  //     body: {
  //       page: 0,
  //     },
  //   }).then((resp) => {
  //     const temp = resp.body.find((e) => e.name === "Johnathan");
  //     user_id = temp.id;
  //     expect(temp).to.be.exist;
  //   });
  // });
  // it("Update user information.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: `http://localhost:5000/api/user/update/${user_id}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //     body: {
  //       address: "Testing address here",
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // it("Get user information.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: `http://localhost:5000/api/user/get/${user_id}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   }).then((resp) => {
  //     console.log(resp.body.data);
  //     expect(resp.body.data.address).to.eq("Testing address here");
  //   });
  // });
  // it("Delete user.", () => {
  //   cy.request({
  //     method: "DELETE",
  //     url: `http://localhost:5000/api/user/delete/${user_id}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // after(() => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/auth/logout",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   });
  // });
});
describe("CRUD operations on departments", () => {
  // var id_;
  // var authToken = undefined;
  // beforeEach(() => {
  //   if (!authToken)
  //     cy.request({
  //       method: "POST",
  //       url: "http://localhost:5000/api/auth/login",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: {
  //         name: "admin",
  //         passwd: "admin",
  //       },
  //     }).then((resp) => {
  //       authToken = resp.body.token;
  //     });
  // });
  // // Test case 1 : Authorized request
  // it("Testing unauthorized access", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/department/add",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: {
  //       email: "Q&A",
  //     },
  //   }).then((resp) => {
  //     // expect(resp.body)
  //     expect(resp.body.status).to.eq("FAIL");
  //   });
  // });
  // // Test case 2 : Adding user as admin
  // it("Create new department", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/department/add",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //       // Replace this with a valid token of admin
  //     },
  //     body: {
  //       name: "Q&A",
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // // Test case 2 : Adding user as admin
  // it("Testing integrity of new department", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/department/add",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //       // Replace this with a valid token of admin
  //     },
  //     body: {
  //       name: "Q&A",
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("FAIL");
  //   });
  // });
  // it("Listing departments to check for new department.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/department/list",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //     body: {
  //       page: 0,
  //     },
  //   }).then((resp) => {
  //     const temp = resp.body.msg.find((e) => e.name === "Q&A");
  //     id_ = temp.id;
  //     expect(temp).to.be.exist;
  //   });
  // });
  // it("Update department information.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: `http://localhost:5000/api/department/update/${id_}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //     body: {
  //       name: "Marketing",
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // it("Get department information.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: `http://localhost:5000/api/department/get/${id_}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.name).to.eq("Marketing");
  //   });
  // });
  // it("Delete department.", () => {
  //   cy.request({
  //     method: "DELETE",
  //     url: `http://localhost:5000/api/department/delete/${id_}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // after(() => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/auth/logout",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   });
  // });
});
describe("CRUD operations on roles", () => {
  // var id_;
  // var authToken = undefined;
  // beforeEach(() => {
  //   if (!authToken)
  //     cy.request({
  //       method: "POST",
  //       url: "http://localhost:5000/api/auth/login",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: {
  //         name: "admin",
  //         passwd: "admin",
  //       },
  //     }).then((resp) => {
  //       authToken = resp.body.token;
  //     });
  // });
  // // Test case 1 : Authorized request
  // it("Testing unauthorized access", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/role/add",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: {
  //       role: "Q&A",
  //     },
  //   }).then((resp) => {
  //     // expect(resp.body)
  //     expect(resp.body.status).to.eq("FAIL");
  //   });
  // });
  // // Test case 2 : Adding user as admin
  // it("Create new role", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/role/add",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //       // Replace this with a valid token of admin
  //     },
  //     body: {
  //       role: "Student",
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // // Test case 2 : Adding user as admin
  // it("Testing integrity of new role", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/role/add",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //       // Replace this with a valid token of admin
  //     },
  //     body: {
  //       role: "Student",
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("FAIL");
  //   });
  // });
  // it("Listing roles to check for new role.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/role/list",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //     body: {
  //       page: 0,
  //     },
  //   }).then((resp) => {
  //     const temp = resp.body.data.find((e) => e.name === "Student");
  //     id_ = temp.id;
  //     expect(temp).to.be.exist;
  //   });
  // });
  // it("Update role information.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: `http://localhost:5000/api/role/update/${id_}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //     body: {
  //       name: "Guest",
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // it("Get new role information.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: `http://localhost:5000/api/role/get/${id_}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.data.name).to.eq("Guest");
  //   });
  // });
  // it("Delete role.", () => {
  //   cy.request({
  //     method: "DELETE",
  //     url: `http://localhost:5000/api/role/delete/${id_}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // after(() => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/auth/logout",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   });
  // });
});
describe("CRUD operations on category", () => {
  // var id_;
  // var authToken = undefined;
  // beforeEach(() => {
  //   if (!authToken)
  //     cy.request({
  //       method: "POST",
  //       url: "http://localhost:5000/api/auth/login",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: {
  //         name: "admin",
  //         passwd: "admin",
  //       },
  //     }).then((resp) => {
  //       authToken = resp.body.token;
  //     });
  // });
  // it("Testing unauthorized access", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/category/add",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: {
  //       category: "Test",
  //     },
  //   }).then((resp) => {
  //     // expect(resp.body)
  //     expect(resp.body.status).to.eq("FAIL");
  //   });
  // });
  // it("Create new category", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/category/add",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //     body: {
  //       name: "Document",
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // it("Testing integrity of new category", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/category/add",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //       // Replace this with a valid token of admin
  //     },
  //     body: {
  //       name: "Document",
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("FAIL");
  //   });
  // });
  // it("Listing roles to check for new role.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/category/list",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   }).then((resp) => {
  //     const temp = resp.body.msg.find((e) => e.name === "Document");
  //     id_ = temp.id;
  //     expect(temp).to.be.exist;
  //   });
  // });
  // it("Update category information.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: `http://localhost:5000/api/category/update/${id_}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //     body: {
  //       name: "Manifesto",
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // it("Get new category information.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: `http://localhost:5000/api/category/get/${id_}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.msg[0].name).to.eq("Manifesto");
  //   });
  // });
  // it("Delete category.", () => {
  //   cy.request({
  //     method: "DELETE",
  //     url: `http://localhost:5000/api/category/delete/${id_}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // after(() => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/auth/logout",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   });
  // });
});
describe("CRUD operations on submission", () => {
  // var id_;
  // var authToken = undefined;
  // beforeEach(() => {
  //   if (!authToken)
  //     cy.request({
  //       method: "POST",
  //       url: "http://localhost:5000/api/auth/login",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: {
  //         name: "admin",
  //         passwd: "admin",
  //       },
  //     }).then((resp) => {
  //       authToken = resp.body.token;
  //     });
  // });
  // it("Testing unauthorized access", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/submission/add",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((resp) => {
  //     // expect(resp.body)
  //     expect(resp.body.status).to.eq("FAIL");
  //   });
  // });
  // it("Create new submission", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/submission/add",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //     body: {
  //       name: "API Test submission",
  //       deadline1: "2023-04-18T05:41:01.359Z",
  //       deadline2: "2023-04-23T05:41:01.359Z",
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // it("Listing all submissions to check for new one.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/submission/list",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   }).then((resp) => {
  //     const temp = resp.body.msg.find((e) => e.name === "API Test submission");
  //     id_ = temp.id;
  //     expect(temp).to.be.exist;
  //   });
  // });
  // it("Update submission information.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: `http://localhost:5000/api/submission/update/${id_}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //     body: {
  //       name: "Staff Idea",
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // it("Get new category information.", () => {
  //   cy.request({
  //     method: "POST",
  //     url: `http://localhost:5000/api/submission/get/${id_}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.name).to.eq("Staff Idea");
  //   });
  // });
  // it("Delete category.", () => {
  //   cy.request({
  //     method: "DELETE",
  //     url: `http://localhost:5000/api/submission/delete/${id_}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   }).then((resp) => {
  //     expect(resp.body.status).to.eq("OK");
  //   });
  // });
  // after(() => {
  //   cy.request({
  //     method: "POST",
  //     url: "http://localhost:5000/api/auth/logout",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //   });
  // });
});

var total_testing_submissions = [];

describe("Creating ideas", () => {
  var id_;
  var authToken = undefined;
  const test_idea_sub = [
    {
      title: "Test Idea 1",
      brief: "Brief idea 1",
      content: "Testing content 1",
      is_anonymous: false,
      category_id: 1,
    },

    {
      title: "Test Idea 2",
      brief: "Brief idea 2",
      content: "Testing content 2",
      is_anonymous: false,
      category_id: 2,
    },
    // {
    //   title: "Test Idea 3",
    //   brief: "Brief idea 3",
    //   content: "Testing content 3",
    //   is_anonymous: true,
    //   category_id: 3,
    // },
  ];
  beforeEach(() => {
    if (!authToken)
      cy.request({
        method: "POST",
        url: "http://localhost:5000/api/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name: "admin",
          passwd: "admin",
        },
      }).then((resp) => {
        authToken = resp.body.token;
      });
  });
  it("Create new testing submission", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/submission/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        name: "Submission test 1",
        deadline1: "2023-04-29 04:13:49.000000",
        deadline2: "2023-05-17 04:13:49.000000",
      },
    });
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/submission/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        name: "Submission test 2",
        deadline1: "2023-04-17 04:14:13.000000",
        deadline2: "2023-04-18 04:14:13.169000",
      },
    });
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/submission/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        name: "Submission test 3",
        deadline1: "2023-04-18 04:14:34.453000",
        deadline2: "2023-04-21 04:14:34.000000",
      },
    });
  });
  it("Listing testing submissions", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/submission/list",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }).then((resp) => {
      total_testing_submissions = resp.body.msg;
    });
  });
  it("Create test categories", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/category/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        name: "Education",
      },
    });
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/category/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        name: "Technology",
      },
    });
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/category/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        name: "Material",
      },
    });
  });

  it("Creating testing ideas for submission 1", () => {
    for (const i of test_idea_sub) {
      console.log(i);
      cy.request({
        method: "POST",
        url: "http://localhost:5000/api/submission/1/idea/add",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: {
          title: i.title,
          brief: i.brief,
          content: i.content,
          is_anonymous: i.is_anonymous,
          category_id: i.category_id,
        },
      });
    }
  });
  it("Creating testing ideas for submission 2", () => {
    for (const i of test_idea_sub) {
      console.log(i);
      cy.request({
        method: "POST",
        url: "http://localhost:5000/api/submission/2/idea/add",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: {
          title: i.title,
          brief: i.brief,
          content: i.content,
          is_anonymous: i.is_anonymous,
          category_id: i.category_id,
        },
      });
    }
  });
  // it("Creating testing ideas for submission 3", () => {
  //   for (const i of test_idea_sub) {
  //     console.log(i);
  //     cy.request({
  //       method: "POST",
  //       url: "http://localhost:5000/api/submission/3/idea/add",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: authToken,
  //       },
  //       body: {
  //         title: i.title,
  //         brief: i.brief,
  //         content: i.content,
  //         is_anonymous: i.is_anonymous,
  //         category_id: i.category_id,
  //       },
  //     });
  //   }
  // });
  after(() => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/auth/logout",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    });
  });
});

describe("Staff submission interface testing", () => {
  var id_;
  var authToken = undefined;
  beforeEach(() => {
    if (!authToken)
      cy.request({
        method: "POST",
        url: "http://localhost:5000/api/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name: "admin",
          passwd: "admin",
        },
      }).then((resp) => {
        authToken = resp.body.token;
      });
  });

  it("Something", () => {});

  after(() => {
    // for (const i of total_testing_submissions) {
    //   cy.request({
    //     method: "DELETE",
    //     url: `http://localhost:5000/api/submission/delete/${i.id}`,
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: authToken,
    //     },
    //   }).then((resp) => {
    //     expect(resp.body.status).to.eq("OK");
    //   });
    // }

    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/auth/logout",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    });
  });
});

describe("Manager Statistics", () => {});

describe("Personal settings", () => {});

describe("Static pages", () => {});

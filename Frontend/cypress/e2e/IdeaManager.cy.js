// Component 1 : Authentication / Authorization
describe("Authentication / Authorization", () => {
  // Testcase 1: Checking if fake credentials output any error
  it("Fake credentials", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("admin");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("random");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.contains("Invalid credentials");
  });
  // Test case 2: Checking if the prompt shows "Empty username."
  it("Empty username error", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("staff");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.contains("Empty password.");
  });
  // Test case 4: Check for "empty password" quote
  it("Empty password error", () => {
    cy.visit("http://localhost:3000/");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("staff");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.contains("Empty username.");
  });
  // Test case 5: CHeck for valid credentials
  it("Valid credentials", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("staff");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("staff");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.contains("Welcome to Idea Manager");
  });
  // Test case 5: Checking to see if the application authorize users as staff
  it("Authorization", () => {
    cy.visit("http://localhost:3000/");
    cy.viewport(1920, 1080); // Set viewport to 550px x 750px
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("staff");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("staff");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.get("#root > div.container > div.Header_container__Rp4A9").contains(
      "Staff Submission"
    );
    cy.get("#root > div.container > div.Header_container__Rp4A9")
      .contains("Statistic")
      .should("not.exist");
    cy.get("#root > div.container > div.Header_container__Rp4A9")
      .contains("Role")
      .should("not.exist");
    cy.get("#root > div.container > div.Header_container__Rp4A9")
      .contains("User")
      .should("not.exist");
    cy.get("#root > div.container > div.Header_container__Rp4A9")
      .contains("Department")
      .should("not.exist");
    cy.get("#root > div.container > div.Header_container__Rp4A9")
      .contains("Category")
      .should("not.exist");
    cy.contains("Welcome to Idea Manager");
  });
  // Test case 6: Checking to see if the application authorize users as manager
  it("Authorized as manager", () => {
    cy.visit("http://localhost:3000/");
    cy.viewport(1920, 1080); // Set viewport to 550px x 750px
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("manager");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("manager");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.get("#root > div.container > div.Header_container__Rp4A9").contains(
      "Staff Submission"
    );
    cy.get("#root > div.container > div.Header_container__Rp4A9").contains(
      "Statistic"
    );
    cy.contains("Welcome to Idea Manager");
  });
  // Test case 7 : Checking if the application authorize users as administrator
  it("Authorized as administrator", () => {
    cy.visit("http://localhost:3000/");
    cy.viewport(1920, 1080); // Set viewport to 550px x 750px
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("admin");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("admin");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.get("#root > div.container > div.Header_container__Rp4A9").contains(
      "Role"
    );
    cy.get("#root > div.container > div.Header_container__Rp4A9").contains(
      "User"
    );
    cy.get("#root > div.container > div.Header_container__Rp4A9").contains(
      "Department"
    );
    cy.get("#root > div.container > div.Header_container__Rp4A9").contains(
      "Category"
    );
    cy.contains("Welcome to Idea Manager");
  });
});

describe("CRUD operations on users", () => {
  var user_id;
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
  // Test case 1 : Authorized request
  it("Testing unauthorized access", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/user/add",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: "john.doe@example.com",
        passwd: "password",
        department: 1,
        name: "Johnathan",
        role: 2,
      },
    }).then((resp) => {
      // expect(resp.body)
      expect(resp.body.status).to.eq("FAIL");
    });
  });
  // Test case 2 : Adding user as admin
  it("Create new user", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/user/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
        // Replace this with a valid token of admin
      },
      body: {
        email: "john.doe@example.com",
        passwd: "password",
        department: 1,
        name: "Johnathan",
        role: 2,
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
  // Test case 3 : Listing all current user
  it("Listing users to check for new user.", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/user/list",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
        // Replace this with a valid token of admin
      },
      body: {
        page: 0,
      },
    }).then((resp) => {
      const temp = resp.body.find((e) => e.name === "Johnathan");
      user_id = temp.id;
      expect(temp).to.be.exist;
    });
  });
  // Test case 4 : Update a specific user information
  it("Update user information.", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:5000/api/user/update/${user_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        address: "Testing address here",
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
  // Test case 5 : Get a specific user information
  it("Get user information.", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:5000/api/user/get/${user_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }).then((resp) => {
      expect(resp.body.data.address).to.eq("Testing address here");
    });
  });
  // Test case 6 : Delete a specific user
  it("Delete user.", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:5000/api/user/delete/${user_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
  // Run something afterward
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
describe("CRUD operations on departments", () => {
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
  // Test case 1 : Authorized request
  it("Testing unauthorized access", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/department/add",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: "Q&A",
      },
    }).then((resp) => {
      // expect(resp.body)
      expect(resp.body.status).to.eq("FAIL");
    });
  });
  // Test case 2 : Adding user as admin
  it("Create new department", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/department/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
        // Replace this with a valid token of admin
      },
      body: {
        name: "Q&A",
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
  // Test case 2 : Adding user as admin
  it("Testing integrity of new department", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/department/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
        // Replace this with a valid token of admin
      },
      body: {
        name: "Q&A",
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("FAIL");
    });
  });
  it("Listing departments to check for new department.", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/department/list",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        page: 0,
      },
    }).then((resp) => {
      const temp = resp.body.msg.find((e) => e.name === "Q&A");
      id_ = temp.id;
      expect(temp).to.be.exist;
    });
  });
  it("Update department information.", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:5000/api/department/update/${id_}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        name: "Marketing",
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
  it("Get department information.", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:5000/api/department/get/${id_}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }).then((resp) => {
      expect(resp.body.name).to.eq("Marketing");
    });
  });
  it("Delete department.", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:5000/api/department/delete/${id_}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
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
describe("CRUD operations on roles", () => {
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
  // Test case 1 : Authorized request
  it("Testing unauthorized access", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/role/add",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        role: "Q&A",
      },
    }).then((resp) => {
      // expect(resp.body)
      expect(resp.body.status).to.eq("FAIL");
    });
  });
  // Test case 2 : Adding user as admin
  it("Create new role", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/role/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
        // Replace this with a valid token of admin
      },
      body: {
        role: "Student",
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
  // Test case 2 : Adding user as admin
  it("Testing integrity of new role", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/role/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
        // Replace this with a valid token of admin
      },
      body: {
        role: "Student",
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("FAIL");
    });
  });
  it("Listing roles to check for new role.", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/role/list",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        page: 0,
      },
    }).then((resp) => {
      const temp = resp.body.data.find((e) => e.name === "Student");
      id_ = temp.id;
      expect(temp).to.be.exist;
    });
  });
  it("Update role information.", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:5000/api/role/update/${id_}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        name: "Guest",
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
  it("Get new role information.", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:5000/api/role/get/${id_}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }).then((resp) => {
      expect(resp.body.data.name).to.eq("Guest");
    });
  });
  it("Delete role.", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:5000/api/role/delete/${id_}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
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
describe("CRUD operations on category", () => {
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
  it("Testing unauthorized access", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/category/add",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        category: "Test",
      },
    }).then((resp) => {
      // expect(resp.body)
      expect(resp.body.status).to.eq("FAIL");
    });
  });
  it("Create new category", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/category/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        name: "Document",
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
  it("Testing integrity of new category", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/category/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
        // Replace this with a valid token of admin
      },
      body: {
        name: "Document",
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("FAIL");
    });
  });
  it("Listing roles to check for new role.", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/category/list",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }).then((resp) => {
      const temp = resp.body.msg.find((e) => e.name === "Document");
      id_ = temp.id;
      expect(temp).to.be.exist;
    });
  });
  it("Update category information.", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:5000/api/category/update/${id_}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        name: "Manifesto",
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
  it("Get new category information.", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:5000/api/category/get/${id_}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }).then((resp) => {
      expect(resp.body.msg[0].name).to.eq("Manifesto");
    });
  });
  it("Delete category.", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:5000/api/category/delete/${id_}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
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
describe("CRUD operations on submission", () => {
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
  it("Testing unauthorized access", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/submission/add",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      // expect(resp.body)
      expect(resp.body.status).to.eq("FAIL");
    });
  });
  it("Create new submission", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/submission/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        name: "API Test submission",
        deadline1: "2023-04-18T05:41:01.359Z",
        deadline2: "2023-04-23T05:41:01.359Z",
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
  it("Listing all submissions to check for new one.", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/submission/list",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }).then((resp) => {
      const temp = resp.body.msg.find((e) => e.name === "API Test submission");
      id_ = temp.id;
      expect(temp).to.be.exist;
    });
  });
  it("Update submission information.", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:5000/api/submission/update/${id_}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: {
        name: "Staff Idea",
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
  it("Get new category information.", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:5000/api/submission/get/${id_}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }).then((resp) => {
      expect(resp.body.name).to.eq("Staff Idea");
    });
  });
  it("Delete submission.", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:5000/api/submission/delete/${id_}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });
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

var total_testing_submissions = [];

describe("Creating ideas", () => {
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
    {
      title: "Test Idea 3",
      brief: "Brief idea 3",
      content: "Testing content 3",
      is_anonymous: true,
      category_id: 3,
    },
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
  it("Creating testing ideas for submission 3", () => {
    for (const i of test_idea_sub) {
      cy.request({
        method: "POST",
        url: "http://localhost:5000/api/submission/3/idea/add",
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
  it("Trying to add idea on submission with deadline 1 over", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("admin");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("admin");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.get(
      "#root > div.container > div.Header_container__Rp4A9 > div > div.Header_Toggle-responsive__djCJm.Header_col-10__OwENv.Header_d-flex__DVmD5.Header_f-wrap__KCqHF > div.Header_col-9__CCygv > div > ul > li:nth-child(6)"
    ).click();
    cy.get(
      "#root > div.container > div.content > div > div > div > div:nth-child(2) > div:nth-child(3) > div > svg"
    ).click();
    cy.get(".subid_addbtn__LgMcy").should("not.exist");
  });
  it("Trying to see if there is any idea added on submission 3", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("admin");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("admin");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.get(
      "#root > div.container > div.Header_container__Rp4A9 > div > div.Header_Toggle-responsive__djCJm.Header_col-10__OwENv.Header_d-flex__DVmD5.Header_f-wrap__KCqHF > div.Header_col-9__CCygv > div > ul > li:nth-child(6)"
    ).click();
    cy.get(
      "#root > div.container > div.content > div > div > div > div:nth-child(2) > div:nth-child(3) > div > svg"
    ).click();
    cy.contains("No ideas found.");
  });
  it("Trying to like an idea on submission 1", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("admin");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("admin");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.get(
      "#root > div.container > div.Header_container__Rp4A9 > div > div.Header_Toggle-responsive__djCJm.Header_col-10__OwENv.Header_d-flex__DVmD5.Header_f-wrap__KCqHF > div.Header_col-9__CCygv > div > ul > li:nth-child(6)"
    ).click();
    cy.get(
      "#root > div.container > div.content > div > div > div > div:nth-child(2) > div:nth-child(1) > div > svg"
    ).click();
    cy.get(".subid_addbtn__LgMcy").should("exist");
    cy.get(
      "#root > div.container > div.content > div > div > div.subid_table__EmmTC > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > svg"
    ).click();
    cy.get(
      "#root > div.container > div.content > div > div > div.subid_table__EmmTC > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > label"
    ).contains("1");
  });
  it("Trying to view an idea on submission 1", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("admin");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("admin");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.get(
      "#root > div.container > div.Header_container__Rp4A9 > div > div.Header_Toggle-responsive__djCJm.Header_col-10__OwENv.Header_d-flex__DVmD5.Header_f-wrap__KCqHF > div.Header_col-9__CCygv > div > ul > li:nth-child(6)"
    ).click();
    cy.get(
      "#root > div.container > div.content > div > div > div > div:nth-child(2) > div:nth-child(1) > div > svg"
    ).click();
    cy.get(".subid_addbtn__LgMcy").should("exist");
    cy.get(
      "#root > div.container > div.content > div > div > div.subid_table__EmmTC > div:nth-child(2) > div:nth-child(1)"
    ).click();
    cy.get(
      "#root > div.container > div.content > div > div > div.style_header__dmA-f > svg"
    ).should("exist");
    cy.get(
      "#root > div.container > div.content > div > div > div.style_header__dmA-f > svg"
    ).click();
    cy.get(
      "#root > div.container > div.content > div > div > div.subid_table__EmmTC > div:nth-child(2) > div:nth-child(1) > label:nth-child(4)"
    ).contains("1");
  });
  it("Trying to comment on an idea on submission 1", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("admin");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("admin");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.get(
      "#root > div.container > div.Header_container__Rp4A9 > div > div.Header_Toggle-responsive__djCJm.Header_col-10__OwENv.Header_d-flex__DVmD5.Header_f-wrap__KCqHF > div.Header_col-9__CCygv > div > ul > li:nth-child(6)"
    ).click();
    cy.get(
      "#root > div.container > div.content > div > div > div > div:nth-child(2) > div:nth-child(1) > div > svg"
    ).click();
    cy.get(".subid_addbtn__LgMcy").should("exist");
    cy.get(
      "#root > div.container > div.content > div > div > div.subid_table__EmmTC > div:nth-child(2) > div:nth-child(1)"
    ).click();
    cy.get(
      "#root > div.container > div.content > div > div > div.style_header__dmA-f > svg"
    ).should("exist");
    cy.get(
      "#root > div.container > div.content > div > div > div.style_comments__6P1xX > section > div > div.style_i__lgXCO.style_anime__SbHMY > input[type=text]"
    )
      .click()
      .type("New comment here");
    cy.get(
      "#root > div.container > div.content > div > div > div.style_comments__6P1xX > section > div > div:nth-child(2) > button"
    ).click();
    // Afterward, wait for the comment to apper
    cy.get(
      "#root > div.container > div.content > div > div > div.style_comments__6P1xX > div > div"
    ).should("exist");
    cy.get(
      "#root > div.container > div.content > div > div > div.style_comments__6P1xX > div > div > p"
    ).contains("New comment here");
  });
  it("Download zip file as manager", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("manager");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("manager");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.get(
      "#root > div.container > div.Header_container__Rp4A9 > div > div.Header_Toggle-responsive__djCJm.Header_col-10__OwENv.Header_d-flex__DVmD5.Header_f-wrap__KCqHF > div.Header_col-9__CCygv > div > ul > li:nth-child(7)"
    ).click();
    cy.get(
      "#root > div.container > div.content > div > div > div > div:nth-child(2) > div:nth-child(1) > div > svg.svg-inline--fa.fa-file-zipper"
    ).click();
    cy.verifyDownload("Submission-1.zip");
  });
});

describe("Manager Statistics", () => {
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
          name: "manager",
          passwd: "manager",
        },
      }).then((resp) => {
        authToken = resp.body.token;
      });
  });
  it("Trying to access manager/statistics as manager", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("manager");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("manager");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.get(
      "#root > div.container > div.Header_container__Rp4A9 > div > div.Header_Toggle-responsive__djCJm.Header_col-10__OwENv.Header_d-flex__DVmD5.Header_f-wrap__KCqHF > div.Header_col-9__CCygv > div > ul > li:nth-child(6)"
    ).click();
    cy.get(
      "#root > div.wrapper > div.Container > div > div > div > div > div:nth-child(2) > div:nth-child(3) > label:nth-child(3)"
    ).contains(3);
  });
  it("Create a new idea and recheck the statistic", () => {});
  it("Deleting testing submissions", () => {
    for (const i of total_testing_submissions) {
      cy.request({
        method: "DELETE",
        url: `http://localhost:5000/api/submission/delete/${i.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      }).then((resp) => {
        expect(resp.body.status).to.eq("OK");
      });
    }
  });
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

describe("Personal settings", () => {
  var authToken = undefined;
  var user_id;

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

  it("Creating test user.", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/user/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
        // Replace this with a valid token of admin
      },
      body: {
        email: "john.doe@example.com",
        passwd: "password",
        department: 1,
        name: "Johnathan",
        role: 2,
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });

  it("Extract user id", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/user/list",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
        // Replace this with a valid token of admin
      },
      body: {
        page: 0,
      },
    }).then((resp) => {
      const temp = resp.body.find((e) => e.name === "Johnathan");
      user_id = temp.id;
      expect(temp).to.be.exist;
    });
  });

  it("Update personal address", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("Johnathan");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("password");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.get(".Header_user-logo__MBeeY > svg").click();
    cy.get(".Header_d-flex__DVmD5 > ul > a:nth-child(1)").click();

    cy.get(
      "#root > div.wrapper > div.Container > div > div > div > div.profile_col-9__ZAryT > div.profile_content__xbAiL > div > div > div:nth-child(1) > div:nth-child(4) > input[type=text]"
    )
      .click()
      .type("New Home Address");

    cy.get(
      "#root > div.wrapper > div.Container > div > div > div > div.profile_col-9__ZAryT > div.profile_content__xbAiL > div > div > div:nth-child(1) > div:nth-child(6) > button"
    ).click();

    cy.contains("Successfully updated user info");
  });

  it("Update current theme", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("Johnathan");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("password");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.get(".Header_user-logo__MBeeY > svg").click();
    cy.get(".Header_d-flex__DVmD5 > ul > a:nth-child(1)").click();

    cy.get(
      "#root > div.wrapper > div.Container > div > div > div > div.profile_col-9__ZAryT > div.profile_content__xbAiL > div > div > div:nth-child(1) > div:nth-child(4) > input[type=text]"
    );
    cy.get(
      "#root > div.wrapper > div.Container > div > div > div > div.profile_col-3__Qz9Ph > div > ul > a.profile_selected__8UQ8n"
    ).click();
    cy.get(".profile_col-3__Qz9Ph > div > ul > a:nth-child(4)").click();
    cy.get(".style_dark__DSjPm").click();
    cy.get("body")
      .should("have.css", "background-color")
      .and("eq", "rgb(44, 44, 44)");
  });

  it("Update current language", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
    cy.get("#root > div.Login_content__0Pfph > input.Login_input-name__T409R")
      .click()
      .type("Johnathan");
    cy.get(
      "#root > div.Login_content__0Pfph > input.Login_input-password__0xWJj"
    )
      .click()
      .type("password");
    cy.get("#root > div.Login_content__0Pfph > button").click();
    cy.get(".Header_user-logo__MBeeY > svg").click();
    cy.get(".Header_d-flex__DVmD5 > ul > a:nth-child(1)").click();

    cy.get(
      "#root > div.wrapper > div.Container > div > div > div > div.profile_col-9__ZAryT > div.profile_content__xbAiL > div > div > div:nth-child(1) > div:nth-child(4) > input[type=text]"
    );
    cy.get(
      "#root > div.wrapper > div.Container > div > div > div > div.profile_col-3__Qz9Ph > div > ul > a.profile_selected__8UQ8n"
    ).click();

    cy.get(
      "#root > div.wrapper > div.Container > div > div > div > div.profile_col-9__ZAryT > div.profile_content__xbAiL > div > div > div:nth-child(3) > div > div"
    ).click();

    cy.get(
      "#root > div.wrapper > div.Container > div > div > div > div.profile_col-9__ZAryT > div.profile_content__xbAiL > div > div > div:nth-child(3) > div > section > label:nth-child(2)"
    ).click();

    cy.contains("Đã chuyển sang ngôn ngữ Tiếng Việt");
    cy.contains("Hồ sơ cá nhân");
    cy.contains("Tài khoản");
    cy.contains("Bảo mật");
    cy.contains("Giao diện");
  });

  it("Delete test user", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:5000/api/user/delete/${user_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }).then((resp) => {
      expect(resp.body.status).to.eq("OK");
    });
  });

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

describe("Static pages", () => {
  it("Testing not found page", () => {
    cy.visit("http://localhost:3000/something/notexist");
    cy.contains("Not Found");
  });
  it("Testing term and condition page.", () => {
    cy.visit("http://localhost:3000/term-and-condition");
    cy.contains("Term of Service");
    cy.contains("Content Ownership");
  });
});

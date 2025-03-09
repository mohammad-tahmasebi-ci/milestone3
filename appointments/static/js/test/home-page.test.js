/**
 * @jest-environment jsdom
 */

beforeEach(() => {
	let fs = require("fs");
	let fileContent = fs.readFileSync("appointments/templates/home_page.html");
	document.open();
	document.write(fileContent);
	document.close();
});

describe("DOM tests", () => {
	test("expects to find a tags on the page", () => {
		expect(document.getElementsByTagName("a").length).toEqual(3);
	});
	
	test("expects to find div tags on the page", () => {
		expect(document.getElementsByTagName("div").length).toEqual(7);
	});

	test("expects to find h3 tags on the page", () => {
		expect(document.getElementsByTagName("h3").length).toEqual(1);
	});
	
	test("expects to find p tag on the page", () => {
		expect(document.getElementsByTagName("p").length).toEqual(1);
	});

	test("expects to find form tag on the page", () => {
		expect(document.getElementsByTagName("form").length).toEqual(1);
	});
	
	test("expects to find input tags on the page", () => {
		expect(document.getElementsByTagName("input").length).toEqual(2);
	});
	
	test("expects to find textarea tag on the page", () => {
		expect(document.getElementsByTagName("textarea").length).toEqual(1);
	});

	test("expects to find a tag href for Appointment menu option", () => {
		expect(document.getElementsByTagName("a")[0].getAttribute("href", "{{ url_for('view_appointments') }}"));
	});
	
	test("expects to find a tag text for Appointment menu option", () => {
		expect(document.getElementsByTagName("a")[0].innerHTML).toBe("Appointments");
	});

	test("expects to find a tag href for Logout menu option", () => {
		expect(document.getElementsByTagName("a")[1].getAttribute("href", "{{ url_for('logout') }}"));
	});
	
	test("expects to find a tag text for Logout menu option", () => {
		expect(document.getElementsByTagName("a")[1].innerHTML).toBe("Logout");
	});

	test("expects to find h3 tag text", () => {
		expect(document.getElementsByTagName("h3")[0].innerHTML).toBe("Welcome to the Local Community Surgery");
	});

	test("expects to find action for the form", () => {
		expect(document.getElementsByTagName("form")[0].getAttribute("action", "{{ url_for('home_page') }}"));
	});
	
	test("expects to find action method for the form", () => {
		expect(document.getElementsByTagName("form")[0].getAttribute("method", "POST"));
	});
	
	test("expects to find text type input tag on the page", () => {
		expect(document.getElementsByTagName("input")[0].getAttribute("type", "text"));
	});
	
	test("expects to find input tag name", () => {
		expect(document.getElementsByTagName("input")[0].getAttribute("name", "fullname"));
	});
	
	test("expects to find input field for fullname to be required", () => {
		expect(document.getElementsByTagName("input")[0].getAttribute("required")).toBeTruthy;
	});
	
	test("expects to find email type of input tag on the page", () => {
		expect(document.getElementsByTagName("input")[1].getAttribute("type", "email"));
	});
	
	test("expects to find input tag name", () => {
		expect(document.getElementsByTagName("input")[1].getAttribute("name", "email"));
	});	
	
	test("expects to find input field for email to be required", () => {
		expect(document.getElementsByTagName("input")[1].getAttribute("required")).toBeTruthy;
	});
	
	test("expects to find type of textarea tag on the page", () => {
		expect(document.getElementsByTagName("textarea")[0].getAttribute("type", "text"));
	});
	
	test("expects to find name of textarea tag on the page", () => {
		expect(document.getElementsByTagName("textarea")[0].getAttribute("name", "Comments"));
	});
	
	test("expects to find textarea field for Comments to be required", () => {
		expect(document.getElementsByTagName("textarea")[0].getAttribute("required")).toBeTruthy;
	});
	
	test("expects to find href of a tag for Send option on the page", () => {
		expect(document.getElementsByTagName("textarea")[0].getAttribute("href", "{{ url_for( 'form_submitted' )}}"));
	});	
	
	test("expects to find text of a tag for Send option", () => {
		expect(document.getElementsByTagName("a")[2].innerHTML).toBe("Send");
	});

});
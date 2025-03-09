/**
 * @jest-environment jsdom
 */

beforeEach(() => {
	let fs = require("fs");
	let fileContent = fs.readFileSync("appointments/templates/signup.html");
	document.open();
	document.write(fileContent);
	document.close();
});

describe("DOM tests", () => {
	test("expects to find a form on the signup page", () => {
		expect(document.getElementsByTagName("form").length).toEqual(1);
	});
	
	test("expects form action to be {{ url_for('signup') }}", () => {
		expect(document.getElementsByTagName("form")[0].getAttribute("action", "{{ url_for('signon') }}"));
	});
	
	test("expects to find method for signup form to be POST", () => {
		expect(document.getElementsByTagName("input")[0].getAttribute("method", "POST"));
	});
	
	test("expects to find 9 input fields on the page", () => {
		expect(document.getElementsByTagName("input").length).toEqual(10);
	});

	test("expects to find input field for first name", () => {
		expect(document.getElementsByTagName("input")[0].getAttribute("name", "fname"));
	});
	
	test("expects to find input field type for first name to be text", () => {
		expect(document.getElementsByTagName("input")[0].getAttribute("type", "text"));
	});
	
	test("expects to find input field for fname to be required", () => {
		expect(document.getElementsByTagName("input")[0].getAttribute("required")).toBeTruthy;
	});
	
	test("expects to find input field for last name", () => {
		expect(document.getElementsByTagName("input")[1].getAttribute("name", "lname"));
	});
	
	test("expects to find input field type for first name to be text", () => {
		expect(document.getElementsByTagName("input")[1].getAttribute("type", "text"));
	});
	
	test("expects to find input fields for last name to be required", () => {
		expect(document.getElementsByTagName("input")[1].getAttribute("required")).toBeTruthy;
	});
	
	test("expects to find input field for password", () => {
		expect(document.getElementsByTagName("input")[2].getAttribute("name", "passw"));
	});
	
	test("expects to find input field type for password to be password", () => {
		expect(document.getElementsByTagName("input")[2].getAttribute("type", "password"));
	});
	
	test("expects to find input pattern for password", () => {
		expect(document.getElementsByTagName("input")[2].getAttribute("pattern", "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"));
	});
	
	test("expects to find input field for password to be required", () => {
		expect(document.getElementsByTagName("input")[2].getAttribute("required")).toBeTruthy;
	});
	
	test("expects to find input field for date of birt", () => {
		expect(document.getElementsByTagName("input")[3].getAttribute("name", "bday"));
	});
	
	test("expects to find input field type for birthday to be text", () => {
		expect(document.getElementsByTagName("input")[3].getAttribute("type", "text"));
	});
	
	test("expects to find input pattern for date of birth", () => {
		expect(document.getElementsByTagName("input")[3].getAttribute("pattern", "\d{2}-\m{2}-\d{4}"));
	});

	
	test("expects to find input field for date of birth to be required", () => {
		expect(document.getElementsByTagName("input")[3].getAttribute("required")).toBeTruthy;
	});
	
	test("expects to find input field for house number", () => {
		expect(document.getElementsByTagName("input")[4].getAttribute("name", "housenum"));
	});
	
	test("expects to find input field type for house number to be text", () => {
		expect(document.getElementsByTagName("input")[4].getAttribute("type", "text"));
	});
	
	test("expects to find input field for house number to be required", () => {
		expect(document.getElementsByTagName("input")[4].getAttribute("required")).toBeTruthy;
	});
	
	test("expects to find input field for street name", () => {
		expect(document.getElementsByTagName("input")[5].getAttribute("name", "street"));
	});
	
	test("expects to find input field type for street to be text", () => {
		expect(document.getElementsByTagName("input")[5].getAttribute("type", "text"));
	});
	
	test("expects to find input field for street to be required", () => {
		expect(document.getElementsByTagName("input")[5].getAttribute("required")).toBeTruthy;
	});
	
	test("expects to find input field for postcode", () => {
		expect(document.getElementsByTagName("input")[6].getAttribute("name", "pcode"));
	});
	
	test("expects to find input field type for postcode to be text", () => {
		expect(document.getElementsByTagName("input")[6].getAttribute("type", "text"));
	});
	
	test("expects to find input field for postcode to be required", () => {
		expect(document.getElementsByTagName("input")[6].getAttribute("required")).toBeTruthy;
	});
	
	test("expects to find input field for allergies", () => {
		expect(document.getElementsByTagName("input")[7].getAttribute("name", "allergies"));
	});
	
	test("expects to find input field type for allergies to be text", () => {
		expect(document.getElementsByTagName("input")[7].getAttribute("type", "text"));
	});
	
	test("expects to find input field for allergies to be required", () => {
		expect(document.getElementsByTagName("input")[7].getAttribute("required")).toBeTruthy;
	});
	
	test("expects to find input field type for submit to be submit", () => {
		expect(document.getElementsByTagName("input")[8].getAttribute("type", "submit"));
	});
	
	test("expects to find value for submit to be Signup", () => {
		expect(document.getElementsByTagName("input")[8].getAttribute("value", "Signup"));
	});
});

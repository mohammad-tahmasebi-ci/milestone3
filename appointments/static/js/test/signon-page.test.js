/**
 * @jest-environment jsdom
 */

beforeEach(() => {
	let fs = require("fs");
	let fileContent = fs.readFileSync("appointments/templates/signon.html");
	document.open();
	document.write(fileContent);
	document.close();
});

describe("DOM tests", () => {
	test("expects to find a form on the signon page", () => {
		expect(document.getElementsByTagName("form").length).toEqual(1);
	});
	
	test("expects form action to be {{ url_for('signon') }}", () => {
		expect(document.getElementsByTagName("form")[0].getAttribute("action", "{{ url_for('signon') }}"));
	});
	
	test("expects to find method for signon form to be POST", () => {
		expect(document.getElementsByTagName("input")[0].getAttribute("method", "POST"));
	});
	
	test("expects to find 4 input fields on the page", () => {
		expect(document.getElementsByTagName("input").length).toEqual(4);
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
	
	test("expects to find input field type for submit to be submit", () => {
		expect(document.getElementsByTagName("input")[3].getAttribute("type", "submit"));
	});
	
	test("expects to find value for submit to be Login", () => {
		expect(document.getElementsByTagName("input")[3].getAttribute("value", "Login"));
	});
});
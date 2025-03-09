/**
 * @jest-environment jsdom
 */

beforeEach(() => {
	let fs = require("fs");
	let fileContent = fs.readFileSync("appointments/templates/choose_doctor.html");
	document.open();
	document.write(fileContent);
	document.close();
});

describe("DOM tests", () => {
	test("expects to find a tags for menu options on the page", () => {
		expect(document.getElementsByTagName("a").length).toEqual(2);
	});

	test("expects to find a tag referencing Home menu option", () => {
		expect(document.getElementsByTagName("a")[0].getAttribute("href", "{{ url_for('home_page') }}"));
	});
	
	test("expects to find a tag referenceing Logout menu option", () => {
		expect(document.getElementsByTagName("a")[1].getAttribute("href", "{{ url_for('logout') }}"));
	});
	
	test("expects to find h5 on the base page", () => {
		expect(document.getElementsByTagName("h3").length).toEqual(1);
	});
		
	test("expects to find h5 to be Select Appointment Date And Time", () => {
		expect(document.getElementsByTagName("h3")[0].innerHTML).toBe("Choose A Doctor");
	});
	
	test("expects to find a div tag on the page", () => {
		expect(document.getElementsByTagName("div").length).toEqual(2);
	});
	
	test("expects to find a form on the page", () => {
		expect(document.getElementsByTagName("form").length).toEqual(1);
	});
	
	test("expects to find action for the form", () => {
		expect(document.getElementsByTagName("form")[0].getAttribute("action", "{{ url_for('choose_doctor') }}"));
	});
	
	test("expects to find action method for the form", () => {
		expect(document.getElementsByTagName("form")[0].getAttribute("method", "POST"));
	});
	
	test("expects to find p tags on the page", () => {
		expect(document.getElementsByTagName("p").length).toEqual(4);
	});
	
	test("expects to find label tags on the page", () => {
		expect(document.getElementsByTagName("label").length).toEqual(4);
	});
	
	test("expects to find input tags on the page", () => {
		expect(document.getElementsByTagName("input").length).toEqual(5);
	});
	
	test("expects to find span tags on the page", () => {
		expect(document.getElementsByTagName("span").length).toEqual(5);
	});
	
	test("expects to find input tag name", () => {
		expect(document.getElementsByTagName("input")[0].getAttribute("name", "doctors_list"));
	});
	
	test("expects to find input tag type", () => {
		expect(document.getElementsByTagName("input")[0].getAttribute("type", "radio"));
	});
	
	test("expects to find input tag value", () => {
		expect(document.getElementsByTagName("input")[0].getAttribute("value", "{{ doctor.DoctorId }}"));
	});
	
	test("expects to find input tag name", () => {
		expect(document.getElementsByTagName("input")[1].getAttribute("name", "doctors_list"));
	});
	
	test("expects to find input tag type", () => {
		expect(document.getElementsByTagName("input")[1].getAttribute("type", "radio"));
	});
	
	test("expects to find input tag value", () => {
		expect(document.getElementsByTagName("input")[1].getAttribute("value", "{{ doctor.DoctorId }}"));
	});	
	
	test("expects to find span tag text", () => {
		expect(document.getElementsByTagName("span")[2].innerHTML).toBe("Special Requirement?");
	});

	test("expects to find input tag name", () => {
		expect(document.getElementsByTagName("input")[2].getAttribute("name", "symptoms"));
	});
	
	test("expects to find input tag type", () => {
		expect(document.getElementsByTagName("input")[2].getAttribute("type", "text"));
	});
	
	test("expects to find span tag text", () => {
		expect(document.getElementsByTagName("span")[3].innerHTML).toBe("Symptoms");
	});

	test("expects to find input tag name", () => {
		expect(document.getElementsByTagName("input")[4].getAttribute("name", "urgent"));
	});
	
	test("expects to find input tag type", () => {
		expect(document.getElementsByTagName("input")[4].getAttribute("type", "checkbox"));
	});
	
	test("expects to find span tag text", () => {
		expect(document.getElementsByTagName("span")[4].innerHTML).toBe("Is Urgent?");
	});
	
	test("expects to find submit button tags on the page", () => {
		expect(document.getElementsByTagName("button").length).toEqual(1);
	});
	
	test("expects to find button tag type", () => {
		expect(document.getElementsByTagName("button")[0].getAttribute("type", "submit"));
	});
	
		test("expects to find button tag type", () => {
		expect(document.getElementsByTagName("button")[0].innerHTML).toBe("Next");
	});

});
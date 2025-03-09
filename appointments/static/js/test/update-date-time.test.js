/**
 * @jest-environment jsdom
 */

beforeEach(() => {
	let fs = require("fs");
	let fileContent = fs.readFileSync("appointments/templates/update_date_time.html");
	document.open();
	document.write(fileContent);
	document.close();
});

describe("DOM tests", () => {
	test("expects to find a tags for menu options on the page", () => {
		expect(document.getElementsByTagName("a").length).toEqual(2);
	});

	test("expects to find a tag referencing Home menu option`", () => {
		expect(document.getElementsByTagName("a")[0].getAttribute("href", "{{ url_for('home_page') }}"));
	});
	
	test("expects to find a tag referenceing Logout menu option", () => {
		expect(document.getElementsByTagName("a")[1].getAttribute("href", "{{ url_for('logout') }}"));
	});

	test("expects to find a div tag on the page", () => {
		expect(document.getElementsByTagName("div").length).toEqual(1);
	});
	
	test("expects to find a container tag on the page", () => {
		expect(document.getElementsByClassName("container").length).toEqual(1);
	});
	
	test("expects to find h5 on the base page", () => {
		expect(document.getElementsByTagName("h5").length).toEqual(1);
	});
		
	test("expects to find h5 to be Select Appointment Date And Time", () => {
		expect(document.getElementsByTagName("h5")[0].innerHTML).toBe("Select Appointment Date And Time");
	});
	
	test("expects to find a form on the page", () => {
		expect(document.getElementsByTagName("form").length).toEqual(1);
	});
	
	test("expects to find action for the form", () => {
		expect(document.getElementsByTagName("form")[0].getAttribute("action", "{{ url_for('update_date_time') }}"));
	});
	
	test("expects to find action method for the form", () => {
		expect(document.getElementsByTagName("form")[0].getAttribute("method", "POST"));
	});
	
	test("expects to find select tags on the page", () => {
		expect(document.getElementsByTagName("select").length).toEqual(2);
	});
	
	test("expects to find select tag name", () => {
		expect(document.getElementsByTagName("select")[0].getAttribute("name", "appointment_date"));
	});
	
	test("expects to find select tag name", () => {
		expect(document.getElementsByTagName("select")[1].getAttribute("name", "appointment_time"));
	});
	
	test("expects to find options for the selects tags on the page", () => {
		expect(document.getElementsByTagName("option").length).toEqual(4);
	});
	
	test("expects to find option tag value", () => {
		expect(document.getElementsByTagName("option")[0].getAttribute("value", "{{ adate.AvailableDays }}"));
	});
	
	test("expects to find option tag text", () => {
		expect(document.getElementsByTagName("option")[0].innerHTML).toBe("{{ adate.AvailableDays }}");
	});
	
	test("expects to find option tag value", () => {
		expect(document.getElementsByTagName("option")[1].getAttribute("value", "{{ adate.AvailableDays }}"));
	});
	
	test("expects to find option tag text", () => {
		expect(document.getElementsByTagName("option")[1].innerHTML).toBe("{{ adate.AvailableDays }}");
	});

	test("expects to find option tag value", () => {
		expect(document.getElementsByTagName("option")[2].getAttribute("value", "{{ atime.AvailableTimes }}"));
	});
	
	test("expects to find option tag text", () => {
		expect(document.getElementsByTagName("option")[2].innerHTML).toBe("{{ atime.AvailableTimes }}");
	});
	
	test("expects to find option tag value", () => {
		expect(document.getElementsByTagName("option")[3].getAttribute("value", "{{ atime.AvailableTimes }}"));
	});
	
	test("expects to find option tag text", () => {
		expect(document.getElementsByTagName("option")[3].innerHTML).toBe("{{ atime.AvailableTimes }}");
	});
	
	test("expects to find submit button tags on the page", () => {
		expect(document.getElementsByTagName("button").length).toEqual(1);
	});
	
	test("expects to find button tag type", () => {
		expect(document.getElementsByTagName("button")[0].getAttribute("type", "submit"));
	});
	
	test("expects to find button tag text", () => {
		expect(document.getElementsByTagName("button")[0].innerHTML).toBe("Next");
	});

});
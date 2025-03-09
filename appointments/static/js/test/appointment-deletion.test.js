/**
 * @jest-environment jsdom
 */

beforeEach(() => {
	let fs = require("fs");
	let fileContent = fs.readFileSync("appointments/templates/confirm_appointment_deletion.html");
	document.open();
	document.write(fileContent);
	document.close();
});

describe("DOM tests", () => {
	test("expects to find div tags on the page", () => {
		expect(document.getElementsByTagName("div").length).toEqual(5);
	});
	
	test("expects to find a h4 tag on the page", () => {
		expect(document.getElementsByTagName("h4").length).toEqual(1);
	});
	
	test("expects to find p tags on the page", () => {
		expect(document.getElementsByTagName("p").length).toEqual(2);
	});
	
	test("expects to find a tag on the page", () => {
		expect(document.getElementsByTagName("a").length).toEqual(1);
	});

	test("expects to find p tag text", () => {
		expect(document.getElementsByTagName("p")[0].innerHTML).toBe("Doctor: {{ appointment_to_delete.FirstName }} {{ appointment_to_delete.LastName }} ");
	});
	
	test("expects to find p tag text", () => {
		expect(document.getElementsByTagName("p")[1].innerHTML).toBe("On/At: {{ appointment_to_delete.AppointmentDate }} {{ appointment_to_delete.AppointmentTime }} ");
	});

	test("expects to find a form on the page", () => {
		expect(document.getElementsByTagName("form").length).toEqual(1);
	});

	test("expects to find action for the form", () => {
		expect(document.getElementsByTagName("form")[0].getAttribute("action", "{{ url_for('delete_appointment', appointment=appointment_to_delete.AppointmentId) }}"));
	});
	
	test("expects to find action method for the form", () => {
		expect(document.getElementsByTagName("form")[0].getAttribute("method", "POST"));
	});
	
	test("expects to find a button tag on the page", () => {
		expect(document.getElementsByTagName("button").length).toEqual(1);
	});
	
	test("expects to find button tag type", () => {
		expect(document.getElementsByTagName("button")[0].getAttribute("type", "submit"));
	});
	
	test("expects to find button tag text", () => {
		expect(document.getElementsByTagName("button")[0].innerHTML).toBe("Delete");
	});
	
	test("expects to find href of a tag for Cancel option", () => {
		expect(document.getElementsByTagName("a")[0].getAttribute("href", "{{ url_for('view_appointments') }}"));
	});
	
	test("expects to find text of a tag for Cancel option", () => {
		expect(document.getElementsByTagName("a")[0].innerHTML).toBe("Cancel");
	});

});
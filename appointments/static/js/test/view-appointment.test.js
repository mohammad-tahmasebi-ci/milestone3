/**
 * @jest-environment jsdom
 */

beforeEach(() => {
	let fs = require("fs");
	let fileContent = fs.readFileSync("appointments/templates/view_appointments.html");
	document.open();
	document.write(fileContent);
	document.close();
});

describe("DOM tests", () => {
	test("expects to find a tags for menu options on the page", () => {
		expect(document.getElementsByTagName("a").length).toEqual(5);
	});

	test("expects to find a tag referencing Home menu option", () => {
		expect(document.getElementsByTagName("a")[0].getAttribute("href", "{{ url_for('home_page') }}"));
	});
	
	test("expects to find a tag referenceing Logout menu option", () => {
		expect(document.getElementsByTagName("a")[1].getAttribute("href", "{{ url_for('logout') }}"));
	});

	test("expects to find h3 tag on the page", () => {
		expect(document.getElementsByTagName("h3").length).toEqual(1);
	});

	test("expects to find text for the h3 tag", () => {
		expect(document.getElementsByTagName("h3")[0].innerHTML).toBe("Appointments");
	});
	
	test("expects to find a div tag on the page", () => {
		expect(document.getElementsByTagName("div").length).toEqual(7);
	});

	test("expects to find class row on the page", () => {
		expect(document.getElementsByClassName("row").length).toEqual(2);
	});

	test("expects to find class col on the page", () => {
		expect(document.getElementsByClassName("col").length).toEqual(2);
	});

	test("expects to find href for a tag for adding appointments", () => {
		expect(document.getElementsByTagName("a")[2].getAttribute("href", "{{ url_for('choose_date_time')}}"));
	});

	test("expects to find class for a tag for adding appointments", () => {
		expect(document.getElementsByTagName("a")[2].getAttribute("class", "btn-large light-blue darken-2"));
	});

	test("expects to find text for a tag for adding appointments", () => {
		expect(document.getElementsByTagName("a")[2].innerHTML).toBe("Add Appointments <i class=\"fas fa-plus-square right\"></i>");
	});
	
	test("expects to find a card class on the page", () => {
		expect(document.getElementsByClassName("card").length).toEqual(1);
	});

	test("expects to find a card-content class on the page", () => {
		expect(document.getElementsByClassName("card-content").length).toEqual(1);
	});

	test("expects to find a p tag on the page", () => {
		expect(document.getElementsByTagName("p").length).toEqual(2);
	});

	test("expects to find text for the p tags", () => {
		expect(document.getElementsByTagName("p")[0].innerHTML).toBe("Doctor: {{ a.FirstName }} {{ a.LastName }} ");
	});

	test("expects to find text for the p tags", () => {
		expect(document.getElementsByTagName("p")[1].innerHTML).toBe("On/At: {{ a.AppointmentDate }} {{ a.AppointmentTime }} ");
	});

	test("expects to find a card-action class on the page", () => {
		expect(document.getElementsByClassName("card-action").length).toEqual(1);
	});

	test("expects to find input tag on the page", () => {
		expect(document.getElementsByTagName("input").length).toEqual(1);
	});

	test("expects to find name for input tag on the page", () => {
		expect(document.getElementsByTagName("input")[0].getAttribute("name", "card_id"));
	});

	test("expects to find value for input tag", () => {
		expect(document.getElementsByTagName("input")[0].getAttribute("value", "{{ a.AppointmentId }}"));
	});

	test("expects to find type for input tag", () => {
		expect(document.getElementsByTagName("input")[0].getAttribute("type", "hidden"));
	});

	test("expects to find href for a tag", () => {
		expect(document.getElementsByTagName("a")[3].getAttribute("href", "{{ url_for('confirm_appointment_update', appointment=a.AppointmentId) }}"));
	});

	test("expects to find class for a tag", () => {
		expect(document.getElementsByTagName("a")[3].innerHTML).toBe("Update");
	});

	test("expects to find class for a tag", () => {
		expect(document.getElementsByTagName("a")[3].getAttribute("class", "btn green"));
	});

	test("expects to find href for a tag", () => {
		expect(document.getElementsByTagName("a")[4].getAttribute("href", "{{ url_for('confirm_appointment_deletion', appointment=a.AppointmentId) }}"));
	});

	test("expects to find class for a tag", () => {
		expect(document.getElementsByTagName("a")[4].innerHTML).toBe("Delete");
	});
	
	test("expects to find class for a tag", () => {
		expect(document.getElementsByTagName("a")[4].getAttribute("class", "btn red"));
	});

});
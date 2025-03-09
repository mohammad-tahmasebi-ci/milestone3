/**
 * @jest-environment jsdom
 */

beforeEach(() => {
	let fs = require("fs");
	let fileContent = fs.readFileSync("appointments/templates/user_message.html");
	document.open();
	document.write(fileContent);
	document.close();
});

describe("DOM tests", () => {
	test("expects to find a div tag on the page", () => {
		expect(document.getElementsByTagName("div").length).toEqual(5);
	});
	
	test("expects to find a container class on the page", () => {
		expect(document.getElementsByClassName("container").length).toEqual(1);
	});

	test("expects to find a modal class on the page", () => {
		expect(document.getElementsByClassName("modal").length).toEqual(1);
	});	

	test("expects to find a modal-content class on the page", () => {
		expect(document.getElementsByClassName("modal-content").length).toEqual(1);
	});	

	test("expects to find a moda-body class on the page", () => {
		expect(document.getElementsByClassName("modal-body").length).toEqual(1);
	});	
	
	test("expects to find a moda-footer class on the page", () => {
		expect(document.getElementsByClassName("modal-footer").length).toEqual(1);
	});		
	
	test("expects to find p tag on the page", () => {
		expect(document.getElementsByTagName("p").length).toEqual(1);
	});
	
	test("expects to find text for the p tag", () => {
		expect(document.getElementsByTagName("p")[0].innerHTML).toBe("{{ user_message }}");
	});
	
	test("expects to find a tag on the page", () => {
		expect(document.getElementsByTagName("a").length).toEqual(1);
	});
	
	test("expects to find href for a tag", () => {
		expect(document.getElementsByTagName("a")[0].getAttribute("href", "{{ url_for( frwrd_page )}}"));
	});
	
	test("expects to find class of a tag", () => {
		expect(document.getElementsByTagName("a")[0].getAttribute("class", "modal-close waves-effect waves-green btn-flat blue-text text-darken-2"));
	});
	
	test("expects to find text for the a tag", () => {
		expect(document.getElementsByTagName("a")[0].innerHTML).toBe("Close");
	});

});
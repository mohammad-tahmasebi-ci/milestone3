/**
 * @jest-environment jsdom
 */

beforeEach(() => {
	let fs = require("fs");
	let fileContent = fs.readFileSync("appointments/templates/base.html");
	document.open();
	document.write(fileContent);
	document.close();
});

describe("DOM tests", () => {
	test("expects to find lang setting on the base page", () => {
		expect(document.getElementsByTagName("html").length).toEqual(1);
	});
	
	test("expects to find lang setting to be 'en'", () => {
		expect(document.getElementsByTagName("html")[0].getAttribute("lang", "en"));
	});
	
	test("expects to find meta declarations on the base page", () => {
		expect(document.getElementsByTagName("meta").length).toEqual(2);
	});

	test("expects to find meta declaration with charset to UTF-8", () => {
		expect(document.getElementsByTagName("meta")[0].getAttribute("charset", "UTF-8"));
	});
	
	test("expects to find meta declaration for viewport", () => {
		expect(document.getElementsByTagName("meta")[1].getAttribute("name", "viewport"));
	});
	
	test("expects to find link declarations on the base page", () => {
		expect(document.getElementsByTagName("link").length).toEqual(4);
	});
	
	test("expects to find styleSheet for Materialize", () => {
		expect(document.getElementsByTagName("link")[0].getAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"));
	});
	
	test("expects to find styleSheet for googleapi", () => {
		expect(document.getElementsByTagName("link")[1].getAttribute("href", "https://fonts.googleapis.com/icon?family=Material+Icons"));
	});
	
	test("expects to find styleSheet for fontawesome", () => {
		expect(document.getElementsByTagName("link")[2].getAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css"));
	});

	test("expects to find custom stylesheet for appointments project", () => {
		expect(document.getElementsByTagName("link")[3].getAttribute("href", "{{ url_for('static', filename='css/style.css') }}"));
	});
	
	test("expects to find title on the base page", () => {
		expect(document.getElementsByTagName("title").length).toEqual(1);
	});
		
	test("expects to find title to be Suregery Practice", () => {
		expect(document.getElementsByTagName("title")[0].innerHTML).toBe("Surgery Practice");
	});
	
	test("expects to find header section on the base page", () => {
		expect(document.getElementsByTagName("header").length).toEqual(1);
	});
	
	test("expects to find nav section on the base page", () => {
		expect(document.getElementsByTagName("nav").length).toEqual(1);
	});
	
	test("expects to find div tag on the base page", () => {
		expect(document.getElementsByTagName("div").length).toEqual(2);
	});	
	
	test("expects to find anchor tags on the base page", () => {
		expect(document.getElementsByTagName("a").length).toEqual(8);
	});
	
	test("expects to find ul tags on the base page", () => {
		expect(document.getElementsByTagName("ul").length).toEqual(2);
	});
	
	test("expects to find li tags on the base page", () => {
		expect(document.getElementsByTagName("li").length).toEqual(5);
	});
	
	test("expects to find a tag for signon page", () => {
		expect(document.getElementsByTagName("a")[0].getAttribute("href", "{{ url_for('signon') }}"));
	});
	
	test("expects to find a tag for mobile nav", () => {
		expect(document.getElementsByTagName("a")[1].getAttribute("data-target", "mobile-demo"));
	});
	
	test("expects to find a tag for mobile menu Signon option", () => {
		expect(document.getElementsByTagName("a")[2].getAttribute("href", "{{ url_for('signon') }}"));
	});
	
	test("expects to find a tag for mobile menu Signup option", () => {
		expect(document.getElementsByTagName("a")[3].getAttribute("href", "{{ url_for('signup') }}"));
	});
	
	test("expects to find a tag for mobile menu Home option", () => {
		expect(document.getElementsByTagName("a")[4].getAttribute("href", "{{ url_for('home_page') }}"));
	});
	
	test("expects to find a tag for mobile menu Appointments option", () => {
		expect(document.getElementsByTagName("a")[5].getAttribute("href", "{{ url_for('view_appointments') }}"));
	});
	
	test("expects to find a tag for mobile menu Logout option", () => {
		expect(document.getElementsByTagName("a")[6].getAttribute("href", "{{ url_for('logout') }}"));
	});
	
	test("expects to find a main tag on the base page", () => {
		expect(document.getElementsByTagName("main").length).toEqual(1);
	});
	
	test("expects to find a footer tag on the base page", () => {
		expect(document.getElementsByTagName("footer").length).toEqual(1);
	});
	
	test("expects to find footer a tag", () => {
		expect(document.getElementsByTagName("a")[7].getAttribute("innerHTML", "&copy; Local Community Surgery "));
	});
		
	test("expects to find script tags on the page", () => {
		expect(document.getElementsByTagName("script").length).toEqual(3);
	});
	
	test("expects to find jquery script src", () => {
		expect(document.getElementsByTagName("script")[0].getAttribute("src", "https://code.jquery.com/jquery-3.6.0.min.js"));
	});
	
	test("expects to find Materialize script src", () => {
		expect(document.getElementsByTagName("script")[1].getAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"));
	});
	
	test("expects to find custom script src", () => {
		expect(document.getElementsByTagName("script")[2].getAttribute("src", "{{ url_for('static', filename='js/script.js') }}"));
	});

});
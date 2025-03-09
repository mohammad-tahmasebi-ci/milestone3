/*jslint browser:true */
"use strict";

/* Initialise Materialize components */
document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();
});

/* Initialise collapsed menu when screen size shrinks */
document.addEventListener('DOMContentLoaded', function() {
  var sidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenav);
});

/* Function to extract year from the date */
document.addEventListener('DOMContentLoaded', function() {
  var currentYear = new Date().getFullYear();
  document.getElementById('currentYear').textContent = currentYear;
});

/* Trigger to select from a dropdown list */
$('.dropdown-trigger').dropdown();

/* initialise the select element in Materialize  */
$(document).ready(function() {
  $('select').formSelect();
});

/* initialise and load the modal form used as pop-up message */
$(document).ready(function() {
  // Initialize the modal
  $('.modal').modal();

  // Automatically open the modal when the page loads
  $('#modal1').modal('open');
});




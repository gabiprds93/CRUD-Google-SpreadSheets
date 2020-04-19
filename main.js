$(document).ready(function() {
  $("#female").attr('checked', true);
});

let script_url = "https://script.google.com/macros/s/AKfycbwb7sMr9uweR-7d2jxzCYvXMtEBYDuwkG7UQiRlExNeKEttgpJg/exec";

// Make an AJAX call to Google Script
function insertValue() {
  let data = {};
  let url = '';

  data.name = $("#name").val();
  data.lastName = $("#lastName").val();
  data.dni =	$("#dni").val();
  data.gender = $('input:radio[name=gender]:checked').val();
  data.selection=	$("select[name=options]").val();

  url = `${script_url}?name=${data.name}&lastName=${data.lastName}&dni=${data.dni}&gender=${data.gender}&selection=${data.selection}&action=insert`;
  
  jQuery.ajax({
    crossDomain: true,
    url: url ,
    method: "GET",
    dataType: "jsonp"
  });
}
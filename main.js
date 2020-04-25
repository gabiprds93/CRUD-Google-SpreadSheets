$(document).ready(function() {
  $("#female").attr('checked', true);
});

let script_url = "https://script.google.com/macros/s/AKfycbwb7sMr9uweR-7d2jxzCYvXMtEBYDuwkG7UQiRlExNeKEttgpJg/exec";

// Make an AJAX call to Google Script
function insertValue(event) {
  let data = {};
  let url = '';

  data.lastNameTutor = $("#lastNameTutor").val();
  data.nameTutor = $("#nameTutor").val();
  data.dniTutor =	$("#dniTutor").val();
  data.cellphoneTutor =	$("#cellphoneTutor").val();
  data.gender = $('input:radio[name=gender]:checked').val();
  data.selection=	$("select[name=options]").val();

  url = `${script_url}?lastNameTutor=${data.lastNameTutor}&nameTutor=${data.nameTutor}&dniTutor=${data.dniTutor}
    &cellphoneTutor=${data.cellphoneTutor}&gender=${data.gender}&selection=${data.selection}&action=insert`;
  
  jQuery.ajax({
    crossDomain: true,
    url: url ,
    method: "GET",
    dataType: "jsonp"
  });
  window.location.href = 'thanksPage.html'
  event.preventDefault()
}
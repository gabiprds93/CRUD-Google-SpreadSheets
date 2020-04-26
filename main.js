$(document).ready(function() {
  $("#female").attr('checked', true);
  $("#4to").attr('checked', true);
  fillSelects()
  getDistricts()
});

let script_url = "https://script.google.com/macros/s/AKfycbwb7sMr9uweR-7d2jxzCYvXMtEBYDuwkG7UQiRlExNeKEttgpJg/exec";
const spreadsheetId = '1CzuQjA9sxFsENY0_ahL6Uf3Lg08NLqueLOvtpS6qqd0';
const apiKey = 'AIzaSyAisKX0e_9w72XfhRtSIyJA75RvDSTkHgk'; 
let provinces = getProvinces()
let districts

// Make an AJAX call to Google Script
function insertValue(event) {
  let data = {};
  let url = '';

  data.lastNameTutor = $("#lastNameTutor").val();
  data.nameTutor = $("#nameTutor").val();
  data.dniTutor =	$("#dniTutor").val();
  data.cellphoneTutor =	$("#cellphoneTutor").val();

  data.lastNameStudent = $("#lastNameStudent").val();
  data.mothersLastNameStudent = $("#mothersLastNameStudent").val();
  data.nameStudent = $("#nameStudent").val();
  data.dniStudent =	$("#dniStudent").val();
  data.genderStudent = $('input:radio[name=genderStudent]:checked').val();
  data.gradeStudent = $('input:radio[name=gradeStudent]:checked').val();
  data.sectionStudent = $("#sectionStudent").val();
  data.selection=	$("select[name=options]").val();

  url = `${script_url}?lastNameTutor=${data.lastNameTutor}&nameTutor=${data.nameTutor}&dniTutor=${data.dniTutor}
    &cellphoneTutor=${data.cellphoneTutor}&lastNameStudent=${data.lastNameStudent}&mothersLastNameStudent=${data.mothersLastNameStudent}
    &nameStudent=${data.nameStudent}&dniStudent=${data.dniStudent}&genderStudent=${data.genderStudent}&gradeStudent=${data.gradeStudent}
    &sectionStudent=${data.sectionStudent}&selection=${data.selection}&action=insert`;
  
  jQuery.ajax({
    crossDomain: true,
    url: url ,
    method: "GET",
    dataType: "jsonp"
  });
  window.location.href = 'thanksPage.html'
  event.preventDefault()
}

async function fillSelects(){
  const departments =  await getDepartments()
  fillDepartments(departments)
}

function getDepartments(){
  range = 'DEPARTAMENTOS!A2:Z100';

  return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?access_token=${apiKey}&key=${apiKey}`)
  .then((response) => {
    return response.json()
  }).then((data) => {
    return departments = data.values
  }).catch(err => {
    console.log(err);
 })
}

function getProvinces(){
  range = 'PROVINCIAS!A2:Z200';

  return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?access_token=${apiKey}&key=${apiKey}`)
  .then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data.values)
    return provinces = data.values
  }).catch(err => {
    console.log(err);
 })
}

function getDistricts(){
  range = 'DISTRITOS!A2:Z1800';

  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?access_token=${apiKey}&key=${apiKey}`)
  .then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data.values)
    districts = data.values
  }).catch(err => {
    console.log(err);
 })
}

function fillDepartments(departments){
  let selectDepartments = document.getElementById("departments");
  if(departments){
    departments.forEach(item => {
      let option = document.createElement("option");
      option.text = item[1];
      option.value = item[1];
      selectDepartments.add(option);
    });
  }
}

function fillProvinces(){
  const departmentSelected = $("select[name=departments]").val();
  let selectProvinces = document.getElementById("provinces");
  let selectDistricts = document.getElementById("districts");

  selectProvinces.innerHTML = '<option value="">Seleccionar</option>'
  selectDistricts.innerHTML = '<option value="">Seleccionar</option>'

  if(provinces){
    provinces.forEach(item => {
      if(item[1] === departmentSelected){
        let option = document.createElement("option");
        option.text = item[2];
        option.value = item[2];
        selectProvinces.add(option);
      }
    })
  }
}

function fillDistricts(){
  const provinceSelected = $("select[name=provinces]").val();
  let selectDistricts = document.getElementById("districts");

  selectDistricts.innerHTML = '<option value="">Seleccionar</option>'
  if(districts){
    districts.forEach(item => {
      if(item[1] === provinceSelected){
        let option = document.createElement("option");
        option.text = item[2];
        option.value = item[2];
        selectDistricts.add(option);
      }
    })
  }
}
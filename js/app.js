//  Convert first letter of each word in a string to uppercase 
const firstUpperCase = (string) => {
   var splitStr = string.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
} // end firstUpperCase

// Get API data
$.ajax({
  url: 'https://randomuser.me/api/?nat=us&results=12',
  dataType: 'json',
  success: function(data) {
    let employeeData = data.results;
    let employeeHTML = '<ul id="employee-tile">';
    for (let i = 0; i < employeeData.length; i += 1) {

      let employeePic = employeeData[i].picture.large;
      let employeeFirstName = firstUpperCase(employeeData[i].name.first);
      let employeeLastName = firstUpperCase(employeeData[i].name.last);
      let employeeEmail = employeeData[i].email;
      let employeeLocation = firstUpperCase(employeeData[i].location.city);
      
      employeeHTML += '<li class="employee-item">';
      employeeHTML += '<img class="employee-pic" src="' + employeePic + '">';
      employeeHTML += '<div class="employee-details"><h1 class="employee-name"> ' + employeeFirstName + ' ' + employeeLastName + '</h1>';
      employeeHTML += '<p class="employee-email"> ' + employeeEmail + ' </p>';
      employeeHTML += '<p class="employee-city"> ' + employeeLocation + '</p></div>';   
    } // end loop
    
    employeeHTML += '</ul>';
    $('#employees').html(employeeHTML);
    
        
    
    // Modal function
    $('.employee-item').click(function(event) {
      
      let employeeModalHTML = '';
      let currentIndex = $(this).index();
      let img = employeeData[currentIndex].picture.large;
      let firstName = firstUpperCase(employeeData[currentIndex].name.first);
      let lastName = firstUpperCase(employeeData[currentIndex].name.last);
      let email = employeeData[currentIndex].email;
      let phone = employeeData[currentIndex].cell;
      let postcode = employeeData[currentIndex].location.postcode;
      let birthdateDay = employeeData[currentIndex].dob.date.substring(8, 10);
      let birthdateMonth = employeeData[currentIndex].dob.date.substring(5, 7);
      let birthdateYear = employeeData[currentIndex].dob.date.substring(0, 4);
      let birthday = birthdateDay + '/' + birthdateMonth + '/' + birthdateYear;
      let address = firstUpperCase(employeeData[currentIndex].location.street);
      let state = firstUpperCase(employeeData[currentIndex].location.state);
      
      
      employeeModalHTML += '<ul class=""modal-list><li class=""modal-item><img src="' + img + '">';
      employeeModalHTML += '<h1 class="modal-p">' + firstName + ' ' + lastName + '</h1>';
      employeeModalHTML += '<p class="modal-p">' + email + '</p>';
      employeeModalHTML += '<div></div>';
      employeeModalHTML += '<p class="modal-p">' + phone + '</p>';
      employeeModalHTML += '<p class="modal-p">' + address + ', ' + state;
      employeeModalHTML += ' ' + postcode + '</p>';
      employeeModalHTML += '<p>' + 'Birthday: ' + birthday + '</p>';
      event.preventDefault();
      this.blur(); // Manually remove focus from clicked link.
      $.get(this.href, function(html) {
          $(employeeModalHTML).appendTo('body').modal();
      });     
    }); // end modal function
  }
});


// Search function
$(document).ready(function(){
  $("#my-input").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#employees li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
}); // end search function

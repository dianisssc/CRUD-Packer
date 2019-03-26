
// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $updateBtn = $("#submit-update");
var $mngFormSubmitBtn = $("#mng-form-submit");
var $createFormSubmitBtn = $("#create-form-submit");

// The API object contains methods for each kind of request we'll make
var API = {
  saveBoxColl: function (BoxColl) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/create",
      data: JSON.stringify(BoxColl)
    });
  },
  saveNewBox: function (Box) {
    console.log(Box)
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: `/createBox/${Box.boxBelongsTo}`,
      data: JSON.stringify(Box)
    });
  },
  updateBoxColl: function (BoxColl) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: `api/update/${BoxColl.id}`,
      data: JSON.stringify(BoxColl)
    })
  },
  getBoxColl: function () {
    return $.ajax({
      url: "/",
      type: "GET"
    });
  },
  deleteBoxColl: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {

  API.getBoxColl().then(function (data) {



  });

};


var handleFormSubmit = function (event) {
  event.preventDefault();

  var newColl = {
    name: $('#example-name').val().trim(),
    password: $('#example-password').val().trim(),
  };

  API.saveBoxColl(newColl).then(function () {
    refreshExamples();
  });

  $('#example-name').val("");
  $('#example-password').val("");
};

var handleBoxSubmit = function (event) {
  event.preventDefault();

  console.log(window.location.pathname.split('/')[2]);

  var newBox = {
    name: $('#box-name').val().trim(),
    boxBelongsTo: window.location.pathname.split('/')[2],
  };

  API.saveNewBox(newBox).then(function () {
    refreshExamples();
  });

  $('#box-name').val("");
};


var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteBoxColl(idToDelete).then(function () {
    refreshExamples();
  });
};

var handleUpdate = function (event) {
  event.preventDefault();
  var updateColl = {
    name: $('#update-name').val().trim(),
    id: $('#update-id').val().trim(),
  };

  console.log(updateColl.name)

  API.updateBoxColl(updateColl).then(function () {
    refreshExamples();
  });
};

var manageFormSubmit = (event) => {
  event.preventDefault();
 
  //Post the results from the form to the db
  //Route User back to the homepage(or wherever) using window.location
  let userInput = $('#update-name').val().trim();
  
  if(userInput === ""){
    alert("Please enter the name of the collection you would like to manage.")
    //window.location.href=("/");
  }
  else{
    window.location.href=("/manage");
  }
}

var createFormSubmit = (event) => {
  event.preventDefault();

  window.location.href=("/manage");
  
}


// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$updateBtn.on("click", handleUpdate);
$('#submit-box').on('click', handleBoxSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$mngFormSubmitBtn.on("click", manageFormSubmit)
$createFormSubmitBtn.on("click", createFormSubmit);

//need submit buttons to update db in manage collection page 
//need to be able to display box collection by name entered in modal 
//currently, the submit button checks if there is text in the name field, we need to have it check that the name is indeed a collection and check the password
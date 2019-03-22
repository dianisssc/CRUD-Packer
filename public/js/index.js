// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "/",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {

  API.getExamples().then(function (data) {

    console.log(data)

    //$exampleList.empty();
  });

};


var handleFormSubmit = function (event) {
  event.preventDefault();

  var newColl = {
    name: $('#example-name').val().trim(),
    password: $('#example-password').val().trim(),
  };

  /*if (!(example.text)) {
    alert("You must enter an example text and description!");
    return;
  }*/

  API.saveExample(newColl).then(function () {
    refreshExamples();
  });

  $('#example-name').val("");
  $('#example-name').val("");
};

var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

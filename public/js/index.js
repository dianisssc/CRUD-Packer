// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $updateBtn = $("#submit-update");
var $mngFormSubmitBtn = $("#mng-form-submit");
var $createBoxBtn = $("#submit-box");
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
  updateBox: function (Update) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: `/api/updateBox/${Update.id}`,
      data: JSON.stringify(Update)
    })
  },
  getBoxColl: function () {
    return $.ajax({
      url: "/",
      type: "GET"
    });
  },
  getBox: function (Box) {
    return $.ajax({
      url: "/boxes",
      type: "GET",
      data: JSON.stringify(Box)
    });
  },
  deleteBoxColl: function (id) {
    return $.ajax({
      url: "/api/deleteCollection/" + id,
      type: "DELETE"
    });
  },
  deleteBox: function (id) {
    return $.ajax({
      url: `/api/deleteBox/${id}`,
      type: "DELETE"
    });
  },
  checkPass: function (obj) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: 'POST',
      url: "api/checkPass/",
      data: JSON.stringify(obj)
    })
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {

  API.getBoxColl().then(function (data) {

  });

};
var quickSearch = function () {
  let boxID = $("#unique-id").val().trim();
  
  API.getBox(boxID).then(function (data) {
    //console.log(data.uniqueID);
   for (let i = 0; i < data.length; i++) {
     dataID = data[i].uniqueID;
     let boxContent = data[i].contents; 
      if(dataID == boxID){
        console.log(data[i].name);
        console.log(data[i].contents);
        $("#box-results-name").append(data[i].name)
        for (let j = 0; j < boxContent.length; j++) {
          var target = $("#contents-list");
          var li = target.append("<li></li>")
          li.append(boxContent[j]);
        }
         
          
          
    
       
       
      }
    }
   // $("#box-results").append(data)
  });

};

var handleFormSubmit = function (event) {
  event.preventDefault();

  console.log('Works!')

  var newColl = {
    name: $('#newColl-name').val().trim(),
    password: $('#newColl-password').val().trim(),
  };

  API.saveBoxColl(newColl).then((test) => {
    window.location.href = (`/collection/${test._id}`);
  });


  $('#newColl-name').val("");
  $('#newColl-password').val("");
};

var handleBoxSubmit = function (event) {
  event.preventDefault();

  console.log(window.location.pathname.split('/')[2]);
  let uID = Math.floor(Math.random() * 99999) + 10000
  var newBox = {
    name: $('#box-name').val().trim(),
    boxBelongsTo: window.location.pathname.split('/')[2],
    uniqueID: uID,
    contents: [],
  };
  if ($('#new-name').val() === " ") {
    alert("Please enter a box name");
  }
  else {
    console.log(uID);
    alert("Your Box " + newBox.name + "'s Unique ID is: " + uID);
    API.saveNewBox(newBox).then(function () {
      refreshExamples();
    });

    $('#box-name').val("");
  }
};


var handleDeleteBtnClick = function () {

  var idToDelete = $(this)
    .attr("data-id");
  console.log(idToDelete)

  console.log(this)

  API.deleteBox(idToDelete).then(function () {
    refreshExamples();
  });
  location.reload();
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


var updateBox = (event) => {
  event.preventDefault();

  let name = $('#update-name').val().trim();
  let id = $('#edit-btn').attr('data-id');

  let contentArr = [];

  let contents = $("#text-input-div :input");

  for (let i = 0; i < contents.length; i++) {
    contentArr.push(contents[i].value);
  }

  console.log(contentArr);

  $('#text-input-div').empty();

  let input = $('<input></input>');
  $(input).attr('id', 'boxContent');
  $(input).addClass('form-control');
  $(input).addClass('content-stuff');

  $('#text-input-div').append(input);

  $('#boxContent').val('');
  $('#update-name').val('');
  $('#update-UID').val('');

  let obj = {

    name,
    contentArr,
    id

  }

  API.updateBox(obj).then(function (params) {
    window.location.reload();
  });


}


var manageFormSubmit = (event) => {
  event.preventDefault();

  let collName = $('#collection-name').val().trim();
  let collPass = $('#collection-password').val().trim();

  let obj = {
    collName,
    collPass
  }

  if (collName === "") {
    alert("Please enter the name of the collection you would like to manage.")
  }
  else {
    API.checkPass(obj).then(function (id) {
      window.location.href = (`/collection/${id}`);
    })
      .catch(err => alert(err));
  }
}

var handleCollDeleteBtnClick = function (event) {
  event.preventDefault();
  var idToDelete = dbExample;
  console.log(idToDelete)

  API.deleteBoxColl(idToDelete).then(function () {
    refreshExamples();
  });

  window.location.reload();

};

var addContent = function (event) {
  event.preventDefault();

  let input = $('<input></input>');

  $(input).attr('id', 'boxContent');

  $(input).addClass('form-control');
  $(input).addClass('content-stuff');

  $('#text-input-div').append(input);
}
// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$updateBtn.on("click", handleUpdate);
$('#submit-box').on('click', handleBoxSubmit);
$('#box-delete').on("click", handleDeleteBtnClick);
$mngFormSubmitBtn.on("click", manageFormSubmit)
$('#save-changes').on("click", updateBox);
$('#quick-search').on("click", quickSearch);
$('#add-input').on('click', addContent)
//need submit buttons to update db in manage collection page
//need to be able to display box collection by name entered in modal 
//currently, the submit button checks if there is text in the name field, we need to have it check that the name is indeed a collection and check the password

$(window).on("load", retrieveLocalStorage);
$('.bottom-box').on('keyup', '.title-of-card', changeContent);
$('.bottom-box').on('keyup', '.task-of-card', changeContent);
$(".bottom-box").on("click", changeImportance);
$('.bottom-box').on('click', '.delete-button', deleteTask);
$(".save-btn").on("click", saveCard);

function saveCard(event) {
  event.preventDefault();
  if ($(".title-input").val() === "" || $(".task-input").val() === "") {
    return;
  };
  var card = new Card($(".title-input").val(), $(".task-input").val());
  addToPage(card);
  localStoreCard(card);
  $("form")[0].reset();
};

function addToPage(card) {
  $(".bottom-box").prepend(`<div id="${card.id}"class="card-container">
                                <h2 class="title-of-card" contenteditable="true" aria-label="your editable task title">${card.title}</h2>
                                <button class="delete-button" aria-label="click here to delete task"></button>
                                <p class="task-of-card" contenteditable="true" aria-label="your editable task description">${card.task}</p>
                                <button class="upvote" aria-label="click here to increase the importance of your task"></button>
                                <button class="downvote" aria-label="click here to lower the importance of your task"></button>
                                <p class="importance">Importance: <span class="importance" aria-label="your task importance level">${card.importance}</span>
                                </p>
                              </div>`);
};

function Card(title, task, importance) {
  this.id = $.now();
  this.title = $(".title-input").val();
  this.task = $(".task-input").val();
  this.importance = "Normal";
}

function localStoreCard(card) {
  var cardString = JSON.stringify(card);
  localStorage.setItem(card.id, cardString);
};

function changeContent(e){
  var cardID = $(e.target).parent().attr("id");
  var parsedCard = JSON.parse(localStorage.getItem(cardID));
  if ($(e.target).is('.title-of-card')){
    parsedCard.title = $(e.target).text();
  } else if ($(e.target).is('.task-of-card')){
    parsedCard.task = $(e.target).text();
  };
  localStorage.setItem(cardID, JSON.stringify(parsedCard));
};

function retrieveLocalStorage() {
  Object.keys(localStorage).forEach(function(key) {
    var retrievedKey = localStorage.getItem(key);
    var storedCard = JSON.parse(retrievedKey);
    addToPage(storedCard);
  });
};

function changeImportance(event){
  var currentImportance = $($(event.target).siblings("p.importance").children()[0]).text().trim();
  if (event.target.className === "upvote") {
    upvoteFunctionality(currentImportance);
  } else if (event.target.className === "downvote") {
    downvoteFunctionality(currentImportance);
  }
}

function downvoteFunctionality(currentImportance) {
  if (currentImportance === "High") {
    importance = "Normal";
    $($(event.target).siblings("p.importance").children()[0]).text(importance);
  } else if (currentImportance === "Critical") {
    importance = "High";
    $($(event.target).siblings("p.importance").children()[0]).text(importance);
  } else if (currentImportance === "Normal") {
    importance = "Normal";$($(event.target).siblings("p.importance").children()[0]).text(importance);
  };
};

function upvoteFunctionality(currentImportance, i) {
  // var importanceArray = ['None', 'Low', 'Normal', 'High', 'Critical'];
  // var importanceIndex = importanceArray.indexOf(currentImportance);
  // // currentImportance = importanceIndex++
  // $($(event.target).siblings("p.importance").children()[0]).text(importanceIndex++)
  // console.log(importanceIndex, currentImportance)
  if (currentImportance === "High") {
    importance = "Critical";$($(event.target).siblings("p.importance").children()[0]).text(importance);
  } else if (currentImportance === "Normal") {
    importance = "High";
    $($(event.target).siblings("p.importance").children()[0]).text(importance);
  } else if (currentImportance === "Critical") {
    importance = "Critical";$($(event.target).siblings("p.importance").children()[0]).text(importance);
  };
};

function deleteTask(e) {
  $(e.target).parent().remove();
  var currentTaskId = $(e.target).parent().attr('id');
  localStorage.removeItem(currentTaskId);
};
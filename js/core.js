//CONFIG

var version = "v1";
var sitename = "Lys Market";
var announces = "Welcome to LysMarket!";

//LOADING BASE CODE & DEBUG IF NEEDED

$(document).ready(function () {
    setInterval(function () { UpdateUI(); }, 1000);
    UpdateTexts();
    ClickEvents();
    $(".pusher").css("background-image", "url(images/bg.jpg)");
    $('.ui.sidebar').sidebar('hide');
});
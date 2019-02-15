function fix(x, type) {
  if (type == 0) return numeral(x).format("0a");

  if (type == 1) return numeral(x).format("0.0a");

  if (type == 2)
    if (x >= 1e6) return numeral(x).format("0.00a");
    else return numeral(x).format("0.0a");

  if (type == 3)
    if (x >= 1e6) return numeral(x).format("0.000a");
    else return numeral(x).format("0.0a");

  if (type == 4) return numeral(x).format("0");

  if (type == 5) return numeral(x).format("0,0");

  if (type == 6) return numeral(x).format("0.0");
}

function getDate() {
  var today = new Date();
  var date = today.toLocaleDateString();
  var time = today.toLocaleTimeString();
  CurrentDate = date + " at " + time;
  return CurrentDate;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toHHMMSS(id) {
  var sec_num = parseInt(id, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;
  var secondstext = 0;
  var minutestext = 0;
  var hourstext = 0;
  if (hours > 0) {
    hourstext = hours + " hours ";
  } else {
    hourstext = "";
  }
  if (minutes > 0) {
    minutestext = minutes + " minutes ";
  } else {
    minutestext = "";
  }
  if (seconds > 0) {
    secondstext = seconds + " seconds ";
  } else {
    secondstext = "0 seconds";
  }
  if (hours == 1) {
    hourstext = hours + " hour ";
  }
  if (minutes == 1) {
    minutestext = minutes + " minute ";
  }
  if (seconds == 1) {
    secondstext = seconds + " second ";
  }
  var time = hourstext + minutestext + secondstext;
  return time;
}

// Save and load functions
var canSave = 1;

function save() {
  console.log("Game saved.");
  var date = new Date();
  if (canSave) {
    localStorage.setItem("SLStars3", JSON.stringify(Game));
  }
  var tmp = new Date().getTime();
}

function load() {
  var savegame = JSON.parse(localStorage.getItem("SLStars3"));

  for (var property in savegame) {
    if (typeof savegame[property] !== "undefined")
      Game[property] = savegame[property];
  }
}

function exportSave() {
  var saveData = btoa(JSON.stringify(Game));
  window.getSelection().removeAllRanges();
  showmessage("Save exported", "The save is now copied in your clipboard.");
  $("#exportBody").html("<textarea id='saveCode'>" + saveData + "</textarea>");
  var textField = document.getElementById("saveCode");
  textField.select();
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  $("#exportBody").html("");
}

function importSave() {
  var save = prompt("Paste the code previously obtained here");
  if (save) {
    restoreSave(save);
  }
}

function restoreSave(save) {
  try {
    var decoded = atob(save);
    JSON.parse(decoded);
    if (decoded) {
      localStorage.setItem("SLStars3", decoded);
      canSave = 0;
      location.reload();
    } else {
      $("#debugtext").html("ERROR: Invalid Save Data");
    }
  } catch (err) {
    $("#debugtext").html("ERROR: Invalid Save Data");
  }
}

function Reset() {
  $("#modal-6").modal("show");
}

function confirmReset() {
  canSave = 0;
  localStorage.clear();
  location.reload();
}

function getVersion() {
  return version;
}

function LYS() {
  Game.system = 9;
  Game.cash = 999999999999;
  Game.TravelCost = 0;
  Game.UnlockedLocations = 9;
  Game.Hyperdrive = 100;
}

function SetColor(value) {
  var color;
  var text;
  if (value < 1) {
    color = "noir";
  }
  if (value == 1) {
    color = "jaune";
  }
  if (value > 1) {
    if (value < 11) {
      color = "bleu";
    }
  }
  if (value > 10) {
    if (value < 50) {
      color = "violet";
    }
  }
  if (value > 49) {
    if (value < 100) {
      color = "rose";
    }
  }
  if (value > 99) {
    if (value < 1000) {
      color = "rouge";
    }
  }
  if (value > 999) {
    color = "vert";
  }
  return color;
}

function SetColorText(value) {
  var color;
  var text;
  if (value < 1) {
    text = "Tiny";
  }
  if (value == 1) {
    text = "Very small";
  }
  if (value > 1) {
    if (value < 11) {
      text = "Small";
    }
  }
  if (value > 10) {
    if (value < 50) {
      text = "Large";
    }
  }
  if (value > 49) {
    if (value < 100) {
      text = "Big";
    }
  }
  if (value > 99) {
    if (value < 1000) {
      text = "Huge";
    }
  }
  if (value > 999) {
    text = "Massive";
  }
  return text;
}

function showmessage(title, message) {
  $("#message-title").html(title);
  $("#message-text").html(message);
  $("#modal-5").modal("show");
}

var UpdateUI = function () {
  document.title = sitename;
  $("#money").html("" + fix(Game.cash, 1));
  $("#copyright").html(sitename + " v" + version + "(Alpha)");
  $("#rank").html("" + fix(Game.rank, 2) + " EP");
  $("#dayscount").html("Day " + Game.days + "");
  $("#fuel").html("" + fix(Game.inventory[2], 3) + "% power.");
  $("#EXT-TITLE").html(texts.items[Missions[Game.extId].type] + "<img class='ui avatar image' src='images/items/" + Missions[Game.extId].type + ".png'>");
  $("#EXT-DESC").html("The drone extract " + fix(Game.extGain, 1));
  $("#EXT-DESC2").html("every " + Game.extTime + " seconds.");
  $("#HYPERDRIVE-TEXT").html("Travel to another location actually cost " + fix(Game.TravelCost, 3) + "% of power");
  $("#HYPERSPACE-TEXT").html("Your actual maximum destination is " + texts.systemname[Game.UnlockedLocations]);
  $("#Galaxy-content").html("<span class='bold'>GALAXY NUMBER</span><br><h1 class='type4 or'>" + Game.Galaxy + "</h1>");
  $("#Galaxy-content2").html("<span class='bold'>REQUIREMENTS<br></span>- You must reach reach <span class='rouge'>Gaia</span>.<br>- Have <i class='green dollar sign icon'></i><span class='vert'>" + fix(GetGalaxyPrice(), 2) + "</span> to travel to another galaxy.");
  $("#EXPLO-TITLE").html("Exploration - " + texts.systemname[Game.system]);
  $("#galaxydesc").html("There is a black hole here. It seems to be able to absorb everything, including my past, is it time to start all over again?");
  $("#InventoryTitle").html("Inventory <span class='type3'>(<span class='" + SetColor(Game.CurrInv) + "'>" + fix(Game.CurrInv, 6) + "</span>/" + fix(Game.Maxinv, 4) + ")</span>");
  if (Game.isInFight == 1) { $("#modal-7").modal("setting", "closable", false).modal("show"); }
  if (Game.cash < GetGalaxyPrice()) {
    $("#GalaxyBuy").addClass("disabled");
  } else {
    if (Game.system == 9) $("#GalaxyBuy").removeClass("disabled");
  }
  GenInventory();
  GenMissions();
  GenMarket();
  GenStation();
  GenHyperdrive();
  GenHyperSpace();
  AddTravelPoints();
  GenExtractionMaterials();
  UpdateEP();
  setTutorial(Game.tutorial);
  UpdatePirateView();
};

function GetSystemType(value) {
  if (value == 0) {
    type = "Planet";
  }
  if (value == 1) {
    type = "Moon";
  }
  if (value == 2) {
    type = "Sun";
  }
  if (value == 3) {
    type = "Asteroid";
  }
  if (value == 4) {
    type = "Black Hole";
  }
  if (value == 5) {
    type = "Alien Spaceship";
  }
  if (value == 6) {
    type = "Alien Flagship";
  }
  if (value == 7) {
    type = "Alien Planet";
  }
  return type;
}

//GENERATE MISSIONS

function GenMissions() {
  for (var id = 0; id < 11; id++) {
    $("#system" + id).html(
      "<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Description</th><th class='ui center aligned'>Cost</th><th class='ui center aligned'>Action</th></tr></thead>"
    );
  }

  for (var i in Missions) {
    var pricecolor;
    var offer = Missions[i];
    var canbuy =
      Game.cash <
        Market[offer.type].value * Game.ExplorationMult[offer.type]
        ? " disabled"
        : "";
    var canbuy10 =
      Game.cash <
        Market[offer.type].value *
        Game.ExplorationMult[offer.type] *
        10
        ? " disabled"
        : "";
    var canbuy100 =
      Game.cash <
        Market[offer.type].value *
        Game.ExplorationMult[offer.type] *
        100
        ? " disabled"
        : "";
    var canExploreMax =
      Game.cash <
        (Market[offer.type].value / Missions[i].nbr) *
        Game.ExplorationMult[offer.type]
        ? " disabled"
        : "";
    var maxexplore = Math.floor(
      (Game.cash / Market[offer.type].value) * Game.ExplorationMult[offer.type]
    );
    if (offer.type == 2) {
      if (maxexplore > 100) {
        maxexplore = 100;
      }
    }
    if (Game.explored[i] == 0) {
      canbuy = Game.cash < Market[offer.type].value / 2 ? " disabled" : "";
      canExploreMax = "disabled";
      canbuy10 = "disabled";
      canbuy100 = "disabled";
    }
    if (1 > Game.Maxinv - Game.CurrInv) {
      canbuy = " disabled";
    }
    if (10 > Game.Maxinv - Game.CurrInv) {
      canbuy10 = " disabled";
    }
    if (100 > Game.Maxinv - Game.CurrInv) {
      canbuy100 = " disabled";
    }
    if (Game.Maxinv == Game.CurrInv) {
      canExploreMax = " disabled";
    }
    var exploretext = Game.explored[i] > 0 ? "Visit" : "Explore";
    var rewards = Game.explored[i] > 0 ? offer.nbr : offer.nbr;
    var pricetext = Game.explored[i] < 1 ? fix(Market[offer.type].value * Game.ExplorationMult[offer.type] * 2, 1) : fix(Market[offer.type].value * Game.ExplorationMult[offer.type], 1);
    recompense = SetColorText(rewards);
    reward = texts.items[offer.type];
    name = "<font class='text type1'>" + texts.systemname[offer.system] + "-" + offer.name + "</font>";
    if (Game.ExplorationMult[offer.type] < 0.9) { pricecolor = "vert"; }
    if (Game.ExplorationMult[offer.type] > 1) { if (Game.ExplorationMult[offer.type] <= 2) { pricecolor = "rouge"; } }
    if (Game.ExplorationMult[offer.type] > 0.9) { if (Game.ExplorationMult[offer.type] < 1) { pricecolor = ""; } }
    cost = "<i class='" + pricecolor + " dollar sign icon'></i><font class='" + pricecolor + " type1'>" + pricetext + "</font>";
    description = GetSystemType(offer.desc);

    var SYSTEMDIV = $(
      "<tr class=''>" +
      "<td class='center aligned ui'>" + name + "</td>" +
      "<td class='center aligned'>" + description + "<br> <font class='type1'>" + reward + "<img class='ui avatar image' src='images/items/" + offer.type + ".png'></font></td>" +
      "<td class='center aligned'> " + cost + "</td>" +
      "<td class='center aligned'><div class='ui SLStars buttons'><button class='ui " + canbuy + " button' onClick='explore(" + i + ", 1, " + offer.type + ");'>" + exploretext + "</button><button class='ui " + canbuy10 + " button' onClick='explore(" + i + ", 10, " + offer.type + ");'>10</button><button class='ui " + canbuy100 + " button' onClick='explore(" + i + ", 100, " + offer.type + ");'>100</button><button class='ui " + canExploreMax + " button' onClick='exploremax(" + i + ", " + offer.type + ");'>Max</button></div></td>" +
      "</tr>"
    );
    if (offer.type == 2) {
      if (Game.inventory[2] < 100) {
        $("#system" + offer.system).append(SYSTEMDIV);
      }
    } else {
      $("#system" + offer.system).append(SYSTEMDIV);
    }
  }
}
//GENERATE MARKET

function GenMarket() {
  $("#system0sm").html(
    "<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Value</th><th class='ui center aligned'>Type</th><th class='ui center aligned'>Inventory</th><th class='ui center aligned'>Sell</th></tr></thead>"
  );

  for (var i in Market) {
    var offer = Market[i];
    var canSell = Game.inventory[i] < 1 ? " disabled" : "";
    var canSell10 = Game.inventory[i] < 10 ? " disabled" : "";
    var canSell100 = Game.inventory[i] < 100 ? " disabled" : "";
    var canSellAll = Game.inventory[i] < 1 ? " disabled" : "";
    if (Game.SystemMult[i] < 1) {
      pricecolor = "rouge";
    }
    if (Game.SystemMult[i] > 1.25) {
      if (Game.SystemMult[i] <= 2) {
        pricecolor = "vert";
      }
    }
    if (Game.SystemMult[i] > 2) {
      if (Game.SystemMult[i] > 2) {
        pricecolor = "Gold";
      }
    }
    if (Game.SystemMult[i] > 0.9) {
      if (Game.SystemMult[i] < 1.26) {
        pricecolor = "";
      }
    }
    if (Game.SystemMult[i] > 0.5) {
      if (Game.SystemMult[i] < 0.91) {
        pricecolor = "argent";
      }
    }

    name =
      "<img class='ui avatar image' src='images/items/" +
      i +
      ".png'><span class='Palladium'><font class='type2'>" +
      texts.items[i] +
      "</font></span>";
    cost =
      "<font class='type1 " +
      pricecolor +
      " bold'><i class='dollar sign icon'></i>" +
      fix(offer.value * Game.SystemMult[i], 1) +
      "</font>";
    description = offer.desc;
    var inventory =
      Game.inventory[i] < 1
        ? '<font class="rouge">' + fix(Game.inventory[i], 0) + "</font>"
        : '<font class="vert">' + fix(Game.inventory[i], 0) + "</font>";

    var SYSTEMDIV = $(
      "<tr class=''>" +
      "<td class='center aligned ui'>" +
      name +
      "</td>" +
      "<td class='center aligned'> " +
      cost +
      "</td>" +
      "<td class='center aligned'>" +
      description +
      "</td>" +
      "<td class='center aligned'> " +
      inventory +
      "</td>" +
      "<td class='center aligned'><div class='ui SLStars buttons'><button class='ui " +
      canSell +
      " button' onClick='sellitem(" +
      i +
      ",1);'>1</button><button class='ui " +
      canSell10 +
      " button' onClick='sellitem(" +
      i +
      ",10);'>10</button><button class='ui " +
      canSell100 +
      " button' onClick='sellitem(" +
      i +
      ",100);'>100</button><button class='ui " +
      canSellAll +
      " button' onClick='sellitem(" +
      i +
      "," +
      Game.inventory[i] +
      ");'>All</button></div></td>" +
      "</tr>"
    );
    for (var t in Missions) {
      if (Missions[t].system == Game.system) {
        if (Missions[t].type == i) {
          if (i != 2) {
            $("#system0sm").append(SYSTEMDIV);
          } else {
            if (Game.inventory[i] > 100) {
              $("#system0sm").append(SYSTEMDIV);
            }
          }
        } else if (Game.inventory[i] > 0) {
          if (i != 2) {
            $("#system0sm").append(SYSTEMDIV);
          } else {
            if (Game.inventory[i] > 100) {
              $("#system0sm").append(SYSTEMDIV);
            }
          }
        }
      }
    }
  }
}

//GENERATE STATION

function GenStation() {
  $("#system0ss").html(
    "<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Require</th><th class='ui center aligned'>Price</th><th class='ui center aligned'>Action</th></tr></thead>"
  );

  for (var i in Technologies) {
    var offer = Technologies[i];
    var buytext = "";
    var visible = "";
    var active = "";
    var buy1 = 0;
    var buy2 = 0;
    var pricecolor = offer.cost > Game.cash ? "rouge" : "vert";

    var cost =
      "<font class='" +
      pricecolor +
      "'><i class='dollar sign icon'></i><font class='type1 " +
      pricecolor +
      "'>" +
      fix(offer.cost, 1) +
      "</font>";

    if (offer.req[0] > -1) {
      requiretext1 =
        "<font class='" +
        SetColor(offer.req[1]) +
        "'>" +
        offer.req[1] +
        "</font> " +
        texts.items[offer.req[0]];
      if (offer.req[1] <= Game.inventory[offer.req[0]]) {
        buy1 = 1;
      } else {
        buy1 = 0;
      }
      if (offer.req2[0] > -1) {
        requiretext2 =
          "<font class='" +
          SetColor(offer.req2[1]) +
          "'>" +
          offer.req2[1] +
          "</font> " +
          texts.items[offer.req2[0]];
        if (offer.req2[1] <= Game.inventory[offer.req2[0]]) {
          buy2 = 1;
        } else {
          buy2 = 0;
        }
      } else {
        buy2 = 1;
      }
    }

    if (buy1 > 0) {
      if (buy2 > 0) {
        buyable = "";
        buyVar = 1;
      } else {
        buyable = "disabled";
        buyVar = 0;
      }
    } else {
      buyable = "disabled";
      buyVar = 0;
    }

    if (Game.technologies[i] == 1) {
      buyable = "disabled";
      buyVar = 0;
      cost = "";
      active = "<font class='vert'>Activated</font>";
      visible = "style='display:none;'";
    } else {
      buytext = "Build";
    }

    if (Game.cash < offer.cost) {
      pricecolor = "rouge";
      buyable = "disabled";
      buyVar = 0;
    }

    if (offer.type == 0) {
      type = "Extraction upgrade";
    }
    if (offer.type == 1) {
      type = "Navigation upgrade";
    }

    var SYSTEMDIV = $(
      "<tr class=''>" +
      "<td class='center aligned ui'><span class='Palladium'><font class='type2'>" +
      offer.name +
      "</font></span></td>" +
      "<td class='center aligned'>" +
      requiretext1 +
      "<img class='ui avatar image' src='images/items/" +
      offer.req[0] +
      ".png'><br>" +
      requiretext2 +
      "<img class='ui avatar image' src='images/items/" +
      offer.req2[0] +
      ".png'></td>" +
      "<td class='center aligned'>" +
      cost +
      "</td>" +
      "<td class='center aligned'>" +
      active +
      "<button class='ui " +
      buyable +
      " red button' " +
      visible +
      " onClick='buyupgrade(" +
      i +
      ", " +
      buyVar +
      ", " +
      offer.type +
      ", " +
      offer.req[0] +
      ", " +
      offer.req[1] +
      ", " +
      offer.req2[0] +
      ", " +
      offer.req2[1] +
      ");'>" +
      buytext +
      "</button></td>" +
      "</tr>"
    );
    if (Game.technologies[i] == 1) {
      $("#system0ss").append(SYSTEMDIV);
    }
    if (Game.technologies[i] == 0) {
      if (offer.need == -1) {
        $("#system0ss").append(SYSTEMDIV);
      }
    }
    if (i == 0) {
      if (Game.technologies[0] == 0) {
        $("#system0ss").append(SYSTEMDIV);
      }
    } else {
      if (Game.technologies[offer.need] == 1) {
        $("#system0ss").append(SYSTEMDIV);
      }
    }
  }
}

function GenHyperdrive() {
  if (Game.Hyperdrive < 100) {
    $("#UPG-BOARD").html(
      "<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Level</th><th class='ui center aligned'>Price</th><th class='ui center aligned'>Action</th></tr></thead>"
    );

    for (var i in Hyperdrive) {
      var canbuy = "";
      var level = "";
      var buyable = "";
      var price = "";
      var upg = Hyperdrive[i];
      canbuy = Game.cash < GetUPGprice(i) ? " disabled" : "";
      buyable = Game.cash < GetUPGprice(i) ? " rouge" : " vert";
      if (i == 0) {
        if (Game.Hyperdrive == 100) {
          canbuy = " disabled";
          level = "Maximum";
          price = "";
          action = "";
        } else {
          level = Game.Hyperdrive;
          price =
            "<i class='" +
            buyable +
            " dollar sign icon'></i>" +
            fix(GetUPGprice(i), 1);
          action =
            "<a class='fluid ui " +
            canbuy +
            " red button' onClick='UPGPOWER(" +
            i +
            ");'>Upgrade</a>";
        }
      }

      var SYSTEMDIV = $(
        "<tr class=''>" +
        "<td class='center aligned ui'><span class='Palladium'><font class='type2'>" +
        upg.name +
        "</font></span></td>" +
        "<td class='center aligned ui'>" +
        level +
        "</td>" +
        "<td class='center aligned ui'><font class='type1" +
        buyable +
        "'>" +
        price +
        "</font></td>" +
        "<td class='center aligned ui'>" +
        action +
        "<td>" +
        "</tr>"
      );
      $("#UPG-BOARD").append(SYSTEMDIV);
    }
  } else {
    $("#UPG-BOARD").html("");
  }
}

function GenHyperSpace() {
  if (Game.UnlockedLocations < 9) {
    $("#HYPERSPACE-BOARD").html(
      "<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Current level</th><th class='ui center aligned'>Access</th><th class='ui center aligned'>Price</th><th class='ui center aligned'>Action</th></tr></thead>"
    );

    for (var i in Hyperspace) {
      var canbuy;
      var level;
      var buyable;
      var price;
      var upg = Hyperspace[i];
      canbuy = Game.cash < GetUPGprice2(i) ? " disabled" : "";
      buyable = Game.cash < GetUPGprice2(i) ? " rouge" : " vert";
      action =
        Game.UnlockedLocations > 8
          ? " "
          : "<a class='fluid ui " +
          canbuy +
          " red button' onClick='BUYHYPERSPACE(" +
          i +
          ");'>Upgrade</a>";
      price =
        Game.UnlockedLocations > 8
          ? " "
          : "<i class='" +
          buyable +
          " dollar sign icon'></i>" +
          fix(GetUPGprice2(i), 1);
      access =
        Game.UnlockedLocations > 8
          ? " "
          : texts.systemname[Game.UnlockedLocations + 1];
      level = Game.UnlockedLocations;

      var SYSTEMDIV = $(
        "<tr class=''>" +
        "<td class='center aligned ui'><span class='Palladium'><font class='type2'>" +
        upg.name +
        "</font></span></td>" +
        "<td class='center aligned ui'>" +
        level +
        "</td>" +
        "<td class='center aligned ui'>" +
        access +
        "</td>" +
        "<td class='center aligned ui'><font class='type1" +
        buyable +
        "'>" +
        price +
        "</font></td>" +
        "<td class='center aligned ui'>" +
        action +
        "<td>" +
        "</tr>"
      );
      $("#HYPERSPACE-BOARD").append(SYSTEMDIV);
    }
  } else {
    $("#HYPERSPACE-BOARD").html("");
  }
}

function GetUPGprice(id) {
  var value;
  if (Game.Hyperdrive == 0) {
    value = Hyperdrive[id].price;
  }
  if (Game.Hyperdrive > 0) {
    if (Game.Hyperdrive > 0) {
      value = Hyperdrive[id].price * Math.pow(1.025, Game.Hyperdrive);
    }
    if (Game.Hyperdrive >= 10) {
      value = Hyperdrive[id].price * Math.pow(1.05, Game.Hyperdrive);
    }
    if (Game.Hyperdrive >= 25) {
      value = Hyperdrive[id].price * Math.pow(1.1, Game.Hyperdrive);
    }
    if (Game.Hyperdrive >= 50) {
      value = Hyperdrive[id].price * Math.pow(1.25, Game.Hyperdrive);
    }
    if (Game.Hyperdrive == 100) {
      value = 42;
    }
  }
  return value;
}

function GetUPGprice2(id) {
  var value;
  value =
    Hyperspace[id].price *
    Math.pow(Hyperspace[id].gain, Game.UnlockedLocations);
  return value;
}

function GenExtractionMaterials() {
  var content;
  $("#EXT-CONTENT").html(""); //RESET VIEW
  for (var D in Missions) {
    var content = $(
      "<div class='item' data-id='" +
      D +
      "'>" +
      texts.systemname[Game.system] +
      "-" +
      Missions[D].name +
      " | " +
      texts.items[Missions[D].type] +
      "<img class='ui avatar image' src='images/items/" +
      Missions[D].type +
      ".png'></div>"
    );

    if (Missions[D].system == Game.system) {
      if (Missions[D].type != 2) {
        $("#EXT-CONTENT").append(content);
      }
    }
  }

  if (Game.extEnabled == 1) {
    $("#drone-title").html("Drone - <span class='vert'>Enabled</span>");
  } else {
    $("#drone-title").html("Drone - <span class='rouge'>Disabled</span>");
  }
}

//UI FUNCTIONS

function hideModals() {
  for (var id = 1; id < 10; id++) {
    $("#modal-" + id).modal("hide");
    $("#PirateAttackDesc").html("");
  }
}
function hidesystems() {
  for (var id = 0; id < 11; id++) {
    $("#system" + id).hide();
  }
}
function hideTabs() {
  for (var id = 0; id < 3; id++) {
    $("#tab" + id).hide();
  }
}
function hideMenuTabs() {
  for (var id = 0; id < 10; id++) {
    $("#tab" + id).hide();
    $("#t" + id).removeClass("SLStarsborder");
  }
}

function ClickEvents() {
  $("#modalmenu").on("click", "a", function () {
    var id = $(this).data("id");
    $("#modal-" + id).modal("show");
    $(".ui.sidebar").sidebar("toggle");
  });
  $("#top-menu").on("click", "#t1", function () {
    var id = $(this).data("id");
    hideMenuTabs();
    $("#tab" + id).show();
    $("#t" + id).addClass("SLStarsborder");
  });
  $("#top-menu").on("click", "#t2", function () {
    var id = $(this).data("id");
    hideMenuTabs();
    $("#tab" + id).show();
    $("#t" + id).addClass("SLStarsborder");
  });
  $("#top-menu").on("click", "#t3", function () {
    var id = $(this).data("id");
    hideMenuTabs();
    $("#tab" + id).show();
    $("#t" + id).addClass("SLStarsborder");
  });
  $("#top-menu").on("click", "#t4", function () {
    var id = $(this).data("id");
    hideMenuTabs();
    $("#tab" + id).show();
    $("#t" + id).addClass("SLStarsborder");
  });
  $("#sidebar").on("click", "a", function () {
    var id = $(this).data("id");
    $(".ui.sidebar").sidebar("toggle");
  });
  $("#select").dropdown();
  $(".ui.dropdown").dropdown();

  $("#selection-content").on("click", "div", function () {
    var id = $(this).data("id");
    changeLocation(id);
  });
  $("#EXT-CONTENT").on("click", "div", function () {
    var id = $(this).data("id");
    Game.extId = id;
    Game.extEnabled = 1;
  });
  $("#top-menu").on("click", "#sidebar", function () {
    $(".ui.sidebar").sidebar("toggle");
  });
  $("#MarketToggle").on("click", function () {
    if (Game.confirmations == 0) {
      Game.confirmations = 1;
    } else {
      Game.confirmations = 0;
    }
  });
  $("#BackgroundToggle").on("click", function () {
    if (Game.UseBackground == 0) {
      Game.UseBackground = 1;
    } else {
      Game.UseBackground = 0;
    }
    ToggleBackground();
  });
}

function AddTravelPoints() {
  $("#selection-content").html(""); //RESET VIEW

  for (var i in texts.systemname) {
    isUnlockedColor = Game.UnlockedLocations < i ? " rouge" : " vert";
    if (Game.UnlockedLocations < i) {
      isUnlockedText =
        " (Require<font class='" +
        isUnlockedColor +
        "'> " +
        fix(Game.EPRequired[i], 1) +
        " EP</font>)";
    } else {
      isUnlockedText =
        " (Require<font class='" +
        isUnlockedColor +
        "'> " +
        fix(Game.EPRequired[i], 1) +
        " EP</font>)";
    }
    if (Game.rank >= Game.EPRequired[i]) {
      isUnlockedText = "";
    }
    isUnlockedSymbol =
      Game.UnlockedLocations < i
        ? '<i class="red circle outline icon"></i>'
        : '<i class="green circle outline icon"></i>';
    if (Game.system == i) {
      isUnlockedSymbol = '<i class="green check circle outline icon"></i>';
    }
    var TRAVELCONTENT = $(
      "<div class='item' id='V" +
      i +
      "' data-id='" +
      i +
      "'>" +
      isUnlockedSymbol +
      texts.systemname[i] +
      isUnlockedText +
      "</div>"
    );
    $("#selection-content").append(TRAVELCONTENT);
    $("#selection-text").html(texts.systemname[Game.system]);
  }
}

function GenInventory() {
  $("#inventory").html("");
  for (var id in texts.items) {
    if (Game.inventory[id] > 0) {
      if (id != 2) {
        $("#inventory").append(
          "<span class='Palladium'><font class='bold " +
          SetColor(Game.inventory[id]) +
          "'>" +
          fix(Game.inventory[id], 1) +
          "</font> " +
          texts.items[id] +
          " </span><img class='ui avatar image' src='images/items/" +
          id +
          ".png'><br>"
        );
      }
    }
  }
}

function setTutorial(id) {
  Game.tutorial = id;
  $("#tutorial-title").html("Guide - " + tutorials[id].title);
  $("#tutorial-text").html(tutorials[id].text);

  if (Game.tutorial == 0) {
    $("#tuto-prev").addClass("disabled");
  } else {
    $("#tuto-prev").removeClass("disabled");
  }

  if (Game.tutorial == 5) {
    $("#tuto-next").addClass("disabled");
  } else {
    $("#tuto-next").removeClass("disabled");
  }
}

function closeTutorial() {
  hideModals();
  Game.tutorial = 0;
  if (Game.fl == 0) {
    Game.fl = 1;
    Game.inventory[2] = 100;
  }
}

function NextTuto() {
  if (Game.fl == 0) {
    Game.fl = 1;
    Game.inventory[2] = 100;
  }
  if (Game.tutorial < 5) {
    Game.tutorial++;
    setTutorial(Game.tutorial);
  }
}

function PrevTuto() {
  if (Game.tutorial >= 1) {
    Game.tutorial--;
    setTutorial(Game.tutorial);
  }
}

function UpdateEP() {
  for (var s in Game.EPRequired) {
    if (Game.UnlockedLocations < 9) {
      $("#percentrank").html(
        fix(Game.EPRequired[Game.UnlockedLocations + 1], 1) + " EP"
      );
    } else {
      $("#percentrank").html("Unlimited EP");
    }
  }
}

function showmessage(title, message) {
  $("#message-title").html(title);
  $("#message-text").html(message);
  $("#modal-5").modal("show");
}

function UpdatePirateView() {
  lifetext = Game.PlayerLife < 51 ? " rouge" : " vert";
  PirateLifeText = Game.PirateCurrentLife < 51 ? " rouge" : " ";
  if (Game.PlayerLife <= 0) {
    LosePirateFight();
  }
  if (Game.PirateCurrentLife <= 0) {
    NewPirateStats();
  }

  $("#PirateAttackTitle").html(
    "<span class='rouge'>ALERT ! PIRATE IN THE AREA.</span>"
  );
  $("#PirateAttackTitleDesc").html("A pirate wants to fight with you.");
  $("#PirateLifeTitle").html("<span class='type4 bold rouge'>Pirate</span>");
  $("#PlayerLifeTitle").html("<span class='type4 bold vert'>You</span>");
  $("#PirateLifeText").html(
    "<span class='bold" +
    PirateLifeText +
    "'>" +
    fix(Game.PirateCurrentLife, 0) +
    "</span> <i class='red heart icon'></i>"
  );
  $("#PlayerLifeText").html(
    "<span class='" +
    lifetext +
    " bold'>" +
    fix(Game.PlayerLife, 0) +
    "</span><span class=''>/" +
    Game.PlayerBaseLife +
    "</span> <i class='red heart icon'></i>"
  );
  $("#PirateHP").progress({
    className: { active: "", error: "", success: "", warning: "" }
  });
  $("#PirateHP").progress({ percent: GetPirateHPPercent() });
  $("#PlayerHP").progress({ percent: GetPlayerHPPercent() });
}

function StatsGeneration() {
  $("#message-title").html("Statistics");
  $("#message-text").html(
    "Current money : <i class='green dollar sign icon'></i>" +
    fix(Game.cash, 1) +
    " (<span class='vert'>" +
    fix(Game.cashGained, 1) +
    "</span>-<span class='rouge'>" +
    fix(Game.cashSpent, 1) +
    "</span>)<div class='ui divider'></div>" +
    "Fights won : " +
    Game.Wins +
    " | Fights loses : " +
    Game.Loses +
    "<br>Pirate exp : " +
    Game.PirateExp +
    "/" +
    Game.PirateMaxExp +
    " | Pirate level : " +
    Game.PirateRank +
    " | Pirate life : " +
    Game.PirateBaseLife +
    "<i class='red heart icon'></i> | Pirate power : " +
    Game.PiratePower +
    " DMG" +
    "<br>Your life : " +
    Game.PlayerBaseLife +
    "<i class='red heart icon'></i> | Your power : " +
    Game.PlayerAttack +
    " DMG" +
    "<div class='ui divider'></div>Started " +
    Game.DateStarted +
    " on " +
    sitename +
    " " +
    Game.startedVersion
  );
  $("#modal-5").modal("show");
}

function Theme(selection) {
  if (selection == 0) {
    Game.theme = 0;
    save();
    $("#theme1").attr("rel", "");
    $("#theme2").attr("rel", "");
    $("#theme3").attr("rel", "");
    $("#theme4").attr("rel", "");
    $("#theme5").attr("rel", "");
    $(".pusher").css("background", "#08050c");
  }
  if (selection == 1) {
    Game.theme = 1;
    save();
    $("#theme1").attr("rel", "stylesheet");
    $("#theme2").attr("rel", "");
    $("#theme3").attr("rel", "");
    $("#theme4").attr("rel", "");
    $("#theme5").attr("rel", "");
    $(".pusher").css("background", "rgb(21, 26, 29)");
  }
  if (selection == 2) {
    Game.theme = 2;
    save();
    $("#theme1").attr("rel", "");
    $("#theme2").attr("rel", "stylesheet");
    $("#theme3").attr("rel", "");
    $("#theme4").attr("rel", "");
    $("#theme5").attr("rel", "");
    $(".pusher").css("background", "rgb(56, 178, 253)");
  }
  if (selection == 3) {
    Game.theme = 3;
    save();
    $("#theme1").attr("rel", "");
    $("#theme2").attr("rel", "");
    $("#theme3").attr("rel", "stylesheet");
    $("#theme4").attr("rel", "");
    $("#theme5").attr("rel", "");
    $(".pusher").css("background", "rgb(218, 161, 0)");
  }
  if (selection == 4) {
    Game.theme = 4;
    save();
    $("#theme1").attr("rel", "");
    $("#theme2").attr("rel", "");
    $("#theme3").attr("rel", "");
    $("#theme4").attr("rel", "stylesheet");
    $("#theme5").attr("rel", "");
    $(".pusher").css("background", "rgb(218, 218, 218)");
  }
  if (selection == 5) {
    Game.theme = 5;
    save();
    $("#theme1").attr("rel", "");
    $("#theme2").attr("rel", "");
    $("#theme3").attr("rel", "");
    $("#theme4").attr("rel", "");
    $("#theme5").attr("rel", "stylesheet");
    $(".pusher").css("background", "rgb(37, 0, 50)");
  }
  ToggleBackground();
  UpdateUI();
}

function ToggleBackground() {
  if (Game.UseBackground == 1) {
    $(".pusher").css("background-image", "url(images/bg.jpg)");
    Game.UseBackground = 1;
  } else {
    $(".pusher").css("background-image", "");
    Game.UseBackground = 0;
  }
}

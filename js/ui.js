var UpdateUI = function () {
  document.title = sitename;

  $("#money").html("" + fix(Game.cash, 1));
  $("#copyright").html(sitename + " v" + version + "(Alpha)");
  $("#rank").html("" + fix(Game.rank, 2) + " EP");
  $("#dayscount").html("Day " + Game.days + "<br>   <i class='yellow flag icon'></i> " + lang[Game.lang].general[11] + " " + Game.Level + " (" + fix(Game.Exp, 1) + "/" + fix(Game.MaxExp, 0) + " )");
  $("#fuel").html("" + fix(Game.inventory[2], 3) + "% power.");
  $("#EXT-TITLE").html(lang[Game.lang].items[Missions[Game.extId].type] + "<img class='ui avatar image' src='images/items/" + Missions[Game.extId].type + ".png'>");
  $("#EXT-DESC").html("The drone extract " + fix(Game.extGain, 1));
  $("#EXT-DESC2").html("every " + Game.extTime + " seconds.");
  $("#HYPERDRIVE-TEXT").html("Travel to another location actually cost " + fix(Game.TravelCost, 3) + "% of power");
  $("#HYPERSPACE-TEXT").html("Your actual maximum destination is " + lang[Game.lang].systemname[Game.UnlockedLocations]);
  $("#Galaxy-content").html("<span class='bold'>GALAXY NUMBER</span><br><h1 class='type4 or'>" + Game.Galaxy + "</h1>");
  $("#Galaxy-content2").html("<span class='bold'>REQUIREMENTS<br></span>- You must reach reach <span class='rouge'>Gaia</span>.<br>- Have <i class='green dollar sign icon'></i><span class='vert'>" + fix(GetGalaxyPrice(), 2) + "</span> to travel to another galaxy.");
  $("#EXPLO-TITLE").html("Exploration - " + lang[Game.lang].systemname[Game.system]);
  $("#galaxydesc").html("There is a black hole here. It seems to be able to absorb everything, including my past, is it time to start all over again?");
  $("#InventoryTitle").html(lang[Game.lang].leftcol[2] + " <span class='type3'>(<span class='" + SetColor(Game.CurrInv) + "'>" + fix(Game.CurrInv, 6) + "</span>/" + fix(Game.Maxinv, 4) + ")</span>");

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
};

function GetSystemType(value) {
  if (value == 0) {
    type = lang[Game.lang].etypes[0];
  }
  if (value == 1) {
    type = lang[Game.lang].etypes[1];
  }
  if (value == 2) {
    type = lang[Game.lang].etypes[2];
  }
  if (value == 3) {
    type = lang[Game.lang].etypes[3];
  }
  if (value == 4) {
    type = lang[Game.lang].etypes[4];
  }
  if (value == 5) {
    type = lang[Game.lang].etypes[5];
  }
  if (value == 6) {
    type = lang[Game.lang].etypes[6];
  }
  if (value == 7) {
    type = lang[Game.lang].etypes[7];
  }
  return type;
}

//GENERATE MISSIONS

function GenMissions() {
  for (var id = 0; id < 11; id++) {
    $("#system" + id).html(
      "<thead><tr class='shadow'><th class='ui center aligned'>" + lang[Game.lang].general[0] + "</th><th class='ui center aligned'>" + lang[Game.lang].general[1] + "</th><th class='ui center aligned'>" + lang[Game.lang].general[2] + "</th><th class='ui center aligned'>" + lang[Game.lang].general[3] + "</th></tr></thead>"
    );
  }

  for (var i in Missions) {
    var pricecolor;
    var offer = Missions[i];
    var canbuy = Game.cash < Market[offer.type].value * Game.ExplorationMult[offer.type] ? " disabled" : "";
    var canbuy10 = Game.cash < Market[offer.type].value * Game.ExplorationMult[offer.type] * 10 ? " disabled" : "";
    var canbuy100 = Game.cash < Market[offer.type].value * Game.ExplorationMult[offer.type] * 100 ? " disabled" : "";
    var canExploreMax = Game.cash < (Market[offer.type].value / Missions[i].nbr) * Game.ExplorationMult[offer.type] ? " disabled" : "";
    var maxexplore = Math.floor(
      (Game.cash / Market[offer.type].value) * Game.ExplorationMult[offer.type]
    );
    if (offer.type == 2) {
      if (maxexplore > 100) { maxexplore = 100; }
    }
    if (Game.explored[i] == 0) {
      canbuy = Game.cash < Market[offer.type].value * Game.ExplorationMult[offer.type] / 2 ? " disabled" : "";
      canExploreMax = "disabled";
      canbuy10 = "disabled";
      canbuy100 = "disabled";
    }
    if (1 > Game.Maxinv - Game.CurrInv) { canbuy = " disabled"; }
    if (10 > Game.Maxinv - Game.CurrInv) { canbuy10 = " disabled"; }
    if (100 > Game.Maxinv - Game.CurrInv) { canbuy100 = " disabled"; }
    if (Game.Maxinv == Game.CurrInv) { canExploreMax = " disabled"; }
    var exploretext = Game.explored[i] > 0 ? lang[Game.lang].exploration[1] : lang[Game.lang].exploration[0];
    var rewards = Game.explored[i] > 0 ? offer.nbr : offer.nbr;
    var pricetext = Game.explored[i] < 1 ? fix(Market[offer.type].value * Game.ExplorationMult[offer.type] / 2, 1) : fix(Market[offer.type].value * Game.ExplorationMult[offer.type], 1);
    recompense = SetColorText(rewards);
    reward = lang[Game.lang].items[offer.type];
    name = "<font class='text type1'>" + lang[Game.lang].systemname[offer.system] + "-" + offer.name + "</font>";
    if (Game.ExplorationMult[offer.type] < 0.9) { pricecolor = "vert"; }
    if (Game.ExplorationMult[offer.type] > 1) { if (Game.ExplorationMult[offer.type] <= 2) { pricecolor = "rouge"; } }
    if (Game.ExplorationMult[offer.type] > 0.9) { if (Game.ExplorationMult[offer.type] < 1) { pricecolor = ""; } }
    cost = "<i class='" + pricecolor + " dollar sign icon'></i><font class='" + pricecolor + " type1'>" + pricetext + "</font>";
    description = GetSystemType(offer.desc);

    var SYSTEMDIV = $(
      "<tr class=''>" +
      "<td class='center aligned ui'>" + description + "</td>" +
      "<td class='center aligned'>" + reward + "<img class='ui avatar image' src='images/items/" + offer.type + ".png'></td>" +
      "<td class='center aligned'> " + cost + "</td>" +
      "<td class='center aligned'><div class='ui sls buttons'><button class='ui " + canbuy + " button' onClick='explore(" + i + ", 1, " + offer.type + ");'>" + exploretext + "</button><button class='ui " + canbuy10 + " button' onClick='explore(" + i + ", 10, " + offer.type + ");'>10</button><button class='ui " + canbuy100 + " button' onClick='explore(" + i + ", 100, " + offer.type + ");'>100</button><button class='ui " + canExploreMax + " button' onClick='exploremax(" + i + ", " + offer.type + ");'>" + lang[Game.lang].exploration[2] + "</button></div></td>" +
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
    "<thead><tr class='shadow'><th class='ui center aligned'>" + lang[Game.lang].general[4] + "</th><th class='ui center aligned'>" + lang[Game.lang].general[5] + "</th><th class='ui center aligned'>Type</th><th class='ui center aligned'>" + lang[Game.lang].general[6] + "</th><th class='ui center aligned'>" + lang[Game.lang].general[7] + "</th></tr></thead>"
  );

  for (var i in Market) {
    var pricecolor = "";
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
      if (Game.SystemMult[i] <= 1) {
        pricecolor = "";
      }
    }
    if (Game.SystemMult[i] > 0.5) {
      if (Game.SystemMult[i] <= 0.9) {
        pricecolor = "argent";
      }
    }

    name =
      "<img class='ui avatar image' src='images/items/" +
      i +
      ".png'><span class='Palladium'><font class='type2'>" +
      lang[Game.lang].items[i] +
      "</font></span>";
    cost =
      "<font class='type1 " +
      pricecolor +
      " bold'><i class='dollar sign icon'></i>" +
      fix(offer.value * Game.SystemMult[i], 1) +
      "</font>";
    description = offer.desc;
    var inventory = Game.inventory[i] < 1 ? '<font class="rouge">' + fix(Game.inventory[i], 0) + "</font>" : '<font class="vert">' + fix(Game.inventory[i], 0) + "</font>";

    var SYSTEMDIV = $(
      "<tr class=''>" +
      "<td class='center aligned ui'>" + name + "</td>" +
      "<td class='center aligned'> " + cost + "</td>" +
      "<td class='center aligned'>" + description + "</td>" +
      "<td class='center aligned'> " + inventory + "</td>" +
      "<td class='center aligned'><div class='ui sls buttons'><button class='ui " + canSell + " button' onClick='sellitem(" + i + ",1);'>1</button><button class='ui " +
      canSell10 + " button' onClick='sellitem(" + i + ",10);'>10</button><button class='ui " +
      canSell100 + " button' onClick='sellitem(" + i + ",100);'>100</button><button class='ui " +
      canSellAll + " button' onClick='sellitem(" + i + "," + Game.inventory[i] + ");'>All</button></div></td>" +
      "</tr>"
    );
    for (var t in Missions) {
      if (Missions[t].system == Game.system) {
        if (Missions[t].type == i) {
          if (i != 2) {
            $("#system0sm").append(SYSTEMDIV);
          } else {
            if (Game.inventory[i] > 100) { $("#system0sm").append(SYSTEMDIV); }
          }
        } else if (Game.inventory[i] > 0) {
          if (i != 2) {
            $("#system0sm").append(SYSTEMDIV);
          } else {
            if (Game.inventory[i] > 100) { $("#system0sm").append(SYSTEMDIV); }
          }
        }
      }
    }
  }
}

//GENERATE STATION

function GenStation() {
  $("#system0ss").html(
    "<thead><tr class='shadow'><th class='ui center aligned'>" + lang[Game.lang].general[4] + "</th><th class='ui center aligned'>" + lang[Game.lang].general[10] + "</th><th class='ui center aligned'>" + lang[Game.lang].general[2] + "</th><th class='ui center aligned'>" + lang[Game.lang].general[3] + "</th></tr></thead>"
  );

  for (var i in Technologies) {
    var offer = Technologies[i];
    var buytext = "";
    var visible = "";
    var active = "";
    var buy1 = 0;
    var buy2 = 0;
    var pricecolor = offer.cost > Game.cash ? "rouge" : "vert";

    var cost = "<font class='" + pricecolor + "'><i class='dollar sign icon'></i><font class='type1 " + pricecolor + "'>" + fix(offer.cost, 1) + "</font>";

    if (offer.req[0] > -1) {
      requiretext1 =
        "<font class='" +
        SetColor(offer.req[1]) +
        "'>" +
        offer.req[1] +
        "</font> " +
        lang[Game.lang].items[offer.req[0]];
      if (offer.req[1] <= Game.inventory[offer.req[0]]) {
        buy1 = 1;
      } else {
        buy1 = 0;
      }
      if (offer.req2[0] > -1) {
        requiretext2 = "<font class='" + SetColor(offer.req2[1]) + "'>" + offer.req2[1] + "</font> " + lang[Game.lang].items[offer.req2[0]];
        if (offer.req2[1] <= Game.inventory[offer.req2[0]]) {
          buy2 = 1;
        } else { buy2 = 0; }
      } else { buy2 = 1; }
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
      "<td class='center aligned ui'><span class='Palladium'><font class='type2'>" + offer.name + "</font></span></td>" +
      "<td class='center aligned'>" + requiretext1 +
      "<img class='ui avatar image' src='images/items/" + offer.req[0] + ".png'><br>" +
      requiretext2 + "<img class='ui avatar image' src='images/items/" + offer.req2[0] + ".png'></td>" +
      "<td class='center aligned'>" + cost + "</td>" +
      "<td class='center aligned'>" + active +
      "<button class='ui " + buyable + " sls button' " + visible + " onClick='buyupgrade(" + i + ", " + buyVar + ", " + offer.type + ", " + offer.req[0] + ", " + offer.req[1] + ", " + offer.req2[0] + ", " + offer.req2[1] + ");'>" +
      buytext + "</button></td>" + "</tr>"
    );
    if (Game.technologies[i] == 0) {
      if (offer.need == -1) { $("#system0ss").append(SYSTEMDIV); }
    }
    if (i == 0) {
      if (Game.technologies[0] == 0) { $("#system0ss").append(SYSTEMDIV); }
    } else {
      if (Game.technologies[offer.need] == 1) {
        if (Game.technologies[i] == 0) { $("#system0ss").append(SYSTEMDIV); }
      }
    }
  }
}

function GenHyperdrive() {
  const hyperdriveMaxLevel = 100;
  const hyperdriveBoard = $("#UPG-BOARD");

  if (Game.Hyperdrive < hyperdriveMaxLevel) {
    hyperdriveBoard.html(`
      <thead>
        <tr class='shadow'>
          <th class='ui center aligned'>${lang[Game.lang].general[4]}</th>
          <th class='ui center aligned'>${lang[Game.lang].general[11]}</th>
          <th class='ui center aligned'>${lang[Game.lang].general[2]}</th>
          <th class='ui center aligned'>${lang[Game.lang].general[3]}</th>
        </tr>
      </thead>
    `);

    Object.keys(Hyperdrive).forEach((key) => {
      const upg = Hyperdrive[key];
      const upgprice = GetUPGprice(key);
      const canBuy = Game.cash >= upgprice;
      const buyableClass = canBuy ? "vert" : "rouge";
      const level = Game.Hyperdrive === hyperdriveMaxLevel ? "Maximum" : Game.Hyperdrive;
      const price = Game.Hyperdrive < hyperdriveMaxLevel ? `<i class='${buyableClass} dollar sign icon'></i>${fix(upgprice, 1)}` : "";
      const action = Game.Hyperdrive < hyperdriveMaxLevel ? `<a class='fluid ui ${canBuy ? "" : "disabled"} sls button' onClick='UPGPOWER(${key});'>Upgrade</a>` : "";

      const SYSTEMDIV = $(
        `<tr>
          <td class='center aligned ui'><span class='Palladium'><font class='type2'>${upg.name}</font></span></td>
          <td class='center aligned ui'>${level}</td>
          <td class='center aligned ui'><font class='type1 ${buyableClass}'>${price}</font></td>
          <td class='center aligned ui'>${action}</td>
        </tr>`
      );
      hyperdriveBoard.append(SYSTEMDIV);
    });
  } else {
    hyperdriveBoard.empty();
  }
}

function GenHyperSpace() {
  const hyperspaceBoard = $("#HYPERSPACE-BOARD");
  const maxLocations = 9;
  const unlockedLocations = Game.UnlockedLocations;

  if (unlockedLocations < maxLocations) {
    const rows = Object.keys(Hyperspace).map(i => {
      const upg = Hyperspace[i];
      const canBuy = Game.cash >= GetUPGprice2(i);
      const buyableClass = canBuy ? "vert" : "rouge";
      const level = unlockedLocations < maxLocations ? unlockedLocations + 1 : "";
      const price = unlockedLocations < maxLocations ? `<i class='${buyableClass} dollar sign icon'></i>${fix(GetUPGprice2(i), 1)}` : "";
      const action = unlockedLocations < maxLocations
        ? `<a class='fluid ui ${canBuy ? "" : "disabled"} sls button' onClick='BUYHYPERSPACE(${i});'>Upgrade</a>`
        : "";

      return `<tr><td class='center aligned ui'><span class='Palladium'><font class='type2'>${upg.name}</font></span></td><td class='center aligned ui'>${level}</td><td class='center aligned ui'>${lang[Game.lang].systemname[unlockedLocations + 1]}</td><td class='center aligned ui'>${price}</td><td class='center aligned ui'>${action}<td></tr>`;
    });

    hyperspaceBoard.html("<thead><tr class='shadow'><th class='ui center aligned'>" + lang[Game.lang].general[4] + "</th><th class='ui center aligned'>" + lang[Game.lang].general[8] + "</th><th class='ui center aligned'>" + lang[Game.lang].general[9] + "</th><th class='ui center aligned'>" + lang[Game.lang].general[2] + "</th><th class='ui center aligned'>" + lang[Game.lang].general[3] + "</th></tr></thead>" + rows.join(""));
  } else {
    hyperspaceBoard.empty();
  }
}

function GetUPGprice(id) {
  return Game.Hyperdrive < 100
    ? Hyperdrive[id].price * Math.pow(1 + (Game.Hyperdrive >= 50 ? 0.25 : Game.Hyperdrive >= 25 ? 0.1 : Game.Hyperdrive >= 10 ? 0.05 : 0.025), Game.Hyperdrive)
    : 42;
}

function GetUPGprice2(id) {
  var value;
  value = Hyperspace[id].price * Math.pow(Hyperspace[id].gain, Game.UnlockedLocations);
  return value;
}

function GenExtractionMaterials() {
  const extContent = $("#EXT-CONTENT").empty(); // RESET VIEW
  const currentSystem = Game.system;
  const systemName = lang[Game.lang].systemname[currentSystem];
  const tabName = lang[Game.lang].tabnames[3];
  const status = Game.extEnabled === 1 ? `<span class='vert'>${lang[Game.lang].general[14]}</span>` : `<span class='rouge'>${lang[Game.lang].general[15]}</span>`;

  Object.keys(Missions).forEach((key) => {
    const mission = Missions[key];
    if (mission.system === currentSystem && mission.type !== 2) {
      extContent.append(`
        <div class='item' data-id='${key}'>
          ${systemName}-${mission.name} | ${lang[Game.lang].items[mission.type]}
          <img class='ui avatar image' src='images/items/${mission.type}.png'>
        </div>
      `);
    }
  });

  $("#drone-title").html(`${tabName} - ${status}`);
}

//UI FUNCTIONS

function hideModals() {
  for (var id = 1; id < 10; id++) {
    $("#modal-" + id).modal("hide");
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
    $("#t" + id).removeClass("sls-custom");
  }
}

function ClickEvents() {
  const toggleSidebar = () => $(".ui.sidebar").sidebar("toggle");

  $("#modalmenu").on("click", "a", function() {
    $("#modal-" + $(this).data("id")).modal("show");
    toggleSidebar();
  });

  $("#top-menu").on("click", "#t0", toggleSidebar);

  $("#top-menu").on("click", "#t1, #t2, #t3, #t4", function() {
    hideMenuTabs();
    $("#tab" + $(this).data("id")).show();
    $(this).addClass("sls-custom");
  });

  $("#selection-content").on("click", "div", function() {
    changeLocation($(this).data("id"));
  });

  $("#EXT-CONTENT").on("click", "div", function() {
    Game.extId = $(this).data("id");
    Game.extEnabled = 1;
  });

  $("#MarketToggle").on("click", function() {
    Game.confirmations ^= 1;
  });

  $("#BackgroundToggle").on("click", function() {
    Game.UseBackground ^= 1;
    ToggleBackground();
  });
}

function AddTravelPoints() {
  const $selection = $("#selection-content");
  $selection.html(""); //RESET VIEW
  const systems = lang[Game.lang].systemname;
  for (let i = 0, len = systems.length; i < len; i++) {
    const isUnlocked = Game.UnlockedLocations >= i;
    const isUnlockedClass = isUnlocked ? " vert" : " rouge";
    const isUnlockedText = isUnlocked ? "" : ` (Require<font class="${isUnlockedClass}"> ${fix(Game.EPRequired[i], 1)} EP</font>)`;
    let isUnlockedSymbol = isUnlocked ? '<i class="green circle outline icon"></i>' : '<i class="red lock icon"></i>';
    if (Game.system === i) { isUnlockedSymbol = '<i class="green dot circle outline icon"></i>'; }
    const $div = $('<div class="item" id="V' + i + '" data-id="' + i + '">' + isUnlockedSymbol + systems[i] + isUnlockedText + "</div>");
    $selection.append($div);
  }
  $("#selection-text").html(systems[Game.system]);
}

function GenInventory() {
  const $inventory = $("#inventory");
  $inventory.html("");
  const GameInventory = Game.inventory;
  for (const id in GameInventory) {
    if (GameInventory[id] > 0 && id != 2) {
      const $span = $("<div>", {
        class: "item",
        html: `<font class="bold ${SetColor(GameInventory[id])}">${fix(GameInventory[id], 1)}</font> ${lang[Game.lang].items[id]} `
      });
      $span.append($("<img>", {
        class: "ui avatar image",
        src: `images/items/${id}.png`
      }));
      $inventory.append($span);
    }
  }
}

function setTutorial(id) {
  const { ttitles, ttexts } = lang[Game.lang];
  Game.tutorial = id;
  $("#tutorial-title").text(`Guide - ${ttitles[id]}`);
  $("#tutorial-text").html(ttexts[id]);

  $("#tuto-prev").toggleClass("disabled", id === 0);
  $("#tuto-next").toggleClass("disabled", id === 5);
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
  if (Game.fl === 0) {
    Game.fl = 1;
    Game.inventory[2] = 100;
  }
  if (Game.tutorial < 5) {
    setTutorial(++Game.tutorial);
  }
}

function PrevTuto() {
  if (Game.tutorial >= 1) {
    Game.tutorial--;
    setTutorial(Game.tutorial);
  }
}

function UpdateEP() {
  const required = Game.EPRequired[Game.UnlockedLocations + 1];
  $("#percentrank").text(required === Infinity ? "Unlimited EP" : `${fix(required, 1)} EP`);
}

function StatsGeneration() {
  const { cash, cashGained, cashSpent, Wins, Loses, PlayerBaseLife, PlayerAttack, startedVersion } = Game;
  const { DateStarted } = Game;
  const text = `
    Current money : <i class='green dollar sign icon'></i>${fix(cash, 1)} (<span class='vert'>${fix(cashGained, 1)}</span>-<span class='rouge'>${fix(cashSpent, 1)}</span>)<div class='ui divider'></div>
    Fights won : ${Wins} | Fights loses : ${Loses}<br>
    Your life : ${PlayerBaseLife}<i class='red heart icon'></i> | Your power : ${PlayerAttack} DMG<div class='ui divider'></div>
    Started ${DateStarted} on ${sitename} v${startedVersion}
  `;
  $("#message-title").text("Statistics");
  $("#message-text").html(text);
  $("#modal-5").modal("show");
}

function Theme(selection) {
  const themes = [
    { rel: "", background: "#08050c" },
    { rel: "", background: "rgb(21, 26, 29)" },
    { rel: "", background: "rgb(56, 178, 253)" },
    { rel: "", background: "rgb(218, 161, 0)" },
    { rel: "", background: "rgb(218, 218, 218)" },
    { rel: "", background: "rgb(35, 0, 49)" },
  ];

  $('body').attr('theme', selection);
  Game.theme = selection;
  $("#theme1").attr("rel", 1 === selection ? "stylesheet" : "");
  $("#theme2").attr("rel", 2 === selection ? "stylesheet" : "");
  $("#theme3").attr("rel", 3 === selection ? "stylesheet" : "");
  $("#theme4").attr("rel", 4 === selection ? "stylesheet" : "");
  $("#theme5").attr("rel", 5 === selection ? "stylesheet" : "");
  $(".pusher").css("background", themes[selection].background);

  ToggleBackground();
  UpdateGame();
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

function selectLang(language) {
  Game.lang = language;
  const { tabnames, leftcol, buttons, drones, general } = lang[language];
  $("#exploration-title").html(tabnames[0]);
  $("#market-title").html(tabnames[1]);
  $("#hyperspace-title").html(tabnames[2]);
  $("#hyperdrive-title").html(tabnames[4]);
  $("#galaxy-title").html(tabnames[5]);

  $("#leftcol1").html(leftcol[0]);
  $("#leftcol2").html(leftcol[1]);

  $("#GalaxyBuy").html(buttons[0]);

  Object.keys(Technologies).forEach(d => Technologies[d].name = drones[d]);
  Hyperdrive[0].name = general[13];
  Hyperspace[0].name = general[12];

  $("#modal1").html(`<i class='cog icon'></i>${buttons[1]}</a>`);
  $("#modal2").html(`<i class='info icon'></i>${buttons[2]}</a>`);
  $("#modal3").html(`<i class='adress book icon'></i>${buttons[3]}</a>`);
  $("#modal4").html(`<i class='paypal icon'></i>${buttons[4]}</a>`);
  if (screen.width > 1280) {
    $("#t0").html(`<i class='sidebar icon'></i>${buttons[5]}`);
    $("#t1").html(`<i class='home icon'></i><span class='type3'>${buttons[6]}</span>`);
    $("#t2").html(`<i class='flask icon'></i><span class='type3'>${buttons[7]}</span>`);
    $("#t3").html(`<i class='space shuttle icon'></i><span class='type3'>${buttons[8]}</span>`);
  } else {
    $("#t0").html(`<i class='sidebar icon'></i>`);
    $("#t1").html(`<i class='home icon'></i>`);
    $("#t2").html(`<i class='dollar icon'></i>`);
    $("#t3").html(`<i class='flask icon'></i>`);
    $("#t4").html(`<i class='space shuttle icon'></i>`);
  }
  UpdateGame();
}

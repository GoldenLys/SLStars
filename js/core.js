/////////////////////////////
// SLSTARS made by NEBULYS //
/////////////////////////////

// NOTE : Buy a new starship with new base attack & base life

//CONFIG
var version = "6.0";
var sitename = "SLStars";
var Game = {
  isLoading: 1,
  startedVersion: getVersion(),
  DateStarted: getDate(),
  rank: 0,
  system: 0,
  Galaxy: 1,
  explored: [],
  inventory: [],
  cash: 50,
  cashSpent: 0,
  cashGained: 50,
  technologies: [],
  tutorial: 0,
  fl: 0,
  days: 0,
  extId: 1,
  extGain: 0,
  TravelCost: 25,
  Hyperdrive: 0,
  Maxinv: 250,
  CurrInv: 0,
  CurrSellID: 0,
  CurrSellQty: 0,
  CurrMult: 0,
  UnlockedLocations: 0,
  EPRequired: [0, 10, 50, 100, 350, 1000, 2500, 5000, 10000, 100000],
  Level: 1,
  Exp: 0,
  MaxExp: 100,
  isInFight: 0,
  theme: 0,
  Wins: 0,
  Loses: 0,
  SystemMult: {
    0: 1,
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
    10: 1,
    11: 1,
    12: 1,
    13: 1,
    14: 1,
    15: 1,
    16: 1,
    17: 1,
    18: 1,
    19: 1
  },
  ExplorationMult: {
    0: 1,
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
    10: 1,
    11: 1,
    12: 1,
    13: 1,
    14: 1,
    15: 1,
    16: 1,
    17: 1,
    18: 1,
    19: 1
  },
  confirmations: 0,
  extEnabled: 0,
  UseBackground: 1,
  extTime: 20,
  extCurrTime: 0,
  lang: "english",
  Starship: [200, 200, 10],
};


$(document).ready(function () {
  if (localStorage.getItem("SLStars3") != null) { load(); }
  changeLocation("loading");
  // setInterval(function () { UpdateGame(); }, 1000);
  Theme(Game.theme);
  selectLang(Game.lang);
  UpdateGame();
  GenExtractionMaterials();
  ClickEvents();
  hidesystems();
  $(".ui.sidebar").sidebar("hide");
  $('.ui.dropdown').dropdown();
  $("#system-select").val(lang[Game.lang].systemname[Game.system]);
  $("#system" + Game.system).show();
  if (Game.confirmations == 0) {
    $("#MarketToggle").checkbox("check");
  } else {
    $("#MarketToggle").checkbox("uncheck");
  }
  if (Game.UseBackground == 1) {
    $("#BackgroundToggle").checkbox("check");
  } else {
    $("#BackgroundToggle").checkbox("uncheck");
  }
  ToggleBackground();
  if (Game.fl == 0) {
    $("#modal-2").modal("show");
    changeLocation("fl");
  }
});

//GAME FUNCTIONS

function UpdateGame() {
  Game.MaxExp = 85 + (10 * Game.Level) * (1.5 * Game.Level);

  Game.CurrInv = Object.values(Game.inventory).reduce((total, qty, i) => {
    if (isNaN(qty) || qty < 0) Game.inventory[i] = 0;
    return total + (i !== 2 ? Game.inventory[i] : 0);
  }, 0);

  for (const key in Market) {
    Game.inventory[key] = Game.inventory[key] || 0;
  }

  for (const key in Missions) {
    Game.explored[key] = Game.explored[key] || 0;
  }

  for (const key in Technologies) {
    Game.technologies[key] = Game.technologies[key] || 0;
  }

  Game.Maxinv = Game.Starship[0] + (Game.Galaxy - 1) * 25;

  if (Game.extEnabled && Game.extCurrTime >= Game.extTime && (Game.Maxinv - Game.CurrInv) >= Game.extGain) {
    Game.inventory[Missions[Game.extId].type] += Game.extGain;
    Game.extCurrTime = 0;
  } else {
    Game.extCurrTime++;
  }

  Game.extTime = Math.max(1, 21 - Game.Galaxy);

  if (Game.CurrInv < 1 && Game.cash <= 10) {
    const rand = Math.floor(Math.random() * 91) + 10;
    Game.cash += rand;
    showmessage("Distress signal", `You just found a distress signal!<br> After connecting to the unknown signal source you found an abandoned vessel with <i class='green dollar sign icon'></i>${rand} in it.`);
  }

  UpdateUI();
  save();
}

function exploremax(id, obj) {
  var Maxexplore = 0;
  if (Game.CurrInv == Game.Maxinv) {
    showmessage("Too much merchandises", "You can't travel while overweight.");
  } else {
    Maxexplore = Math.floor(Game.cash / (Market[obj].value * Game.ExplorationMult[obj]));
    if (Maxexplore > Game.Maxinv - Game.CurrInv) { Maxexplore = Game.Maxinv - Game.CurrInv; }
    if (obj == 2) { if (Maxexplore > 100) { Maxexplore = 100; } }
    Game.cash -= Market[obj].value * Game.ExplorationMult[obj] * Maxexplore;
    Game.cashSpent += Market[obj].value * Game.ExplorationMult[obj] * Maxexplore;
    Game.inventory[obj] += Maxexplore;
    Game.rank += Maxexplore * (Game.Galaxy * 0.25 * (Game.system + 1));
    UpdateGame();
  }
}

function explore(id, nbr, obj) {
  if (Game.CurrInv >= Game.Maxinv) {
    showmessage("Too much merchandises", "You can't travel while overweight.");
    return;
  }

  const itemValue = Market[obj].value * Game.ExplorationMult[obj];
  const availableSpace = Game.Maxinv - Game.CurrInv;
  const isFirstExploration = Game.explored[id] === 0;
  const requiredCash = isFirstExploration ? itemValue / 2 : itemValue * nbr;

  if (isFirstExploration && nbr > availableSpace) {
    showmessage("Too much merchandises", `You can't travel with your current inventory weight.<br> You need ${nbr} place${nbr > 1 ? 's' : ''} in your inventory.`);
    return;
  }

  if (Game.cash < requiredCash) {
    showmessage("Too expensive", "You need more money.");
    return;
  }

  const quantityToAdd = isFirstExploration ? 1 : nbr;
  Game.cash -= requiredCash;
  Game.cashSpent += requiredCash;
  Game.inventory[obj] += quantityToAdd;
  Game.rank += quantityToAdd * (Game.Galaxy * 0.25 * (Game.system + 1));

  if (isFirstExploration) {
    Game.explored[id] = 1;
    Game.rank += Game.system * nbr;
  }

  UpdateGame();
}

function sellitem(id, qty) {
  var mult = Game.SystemMult[id];
  Game.CurrSellID = id;
  Game.CurrSellQty = qty;
  Game.CurrMult = mult;
  if (Game.confirmations == 1) {
    $("#sellconfirm-text").html(
      "Do you want to sell " +
      fix(qty, 1) +
      " " +
      lang[Game.lang].items[id] +
      "<img class='ui avatar image' src='images/items/" +
      id +
      ".png'> for <font color='green'>" +
      fix(Market[id].value * mult * qty, 1) +
      "$</font> ?"
    );
    $("#modal-4").modal("show");
  } else {
    confirmsell();
  }
  UpdateGame();
}

function confirmsell() {
  var mult = Game.SystemMult[Game.CurrSellID];
  if (Game.CurrSellID != 2) {
    //IF ITS NOT A POWER CELL
    Game.inventory[Game.CurrSellID] -= Game.CurrSellQty;
    Game.CurrInv -= Game.CurrSellQty;
    Game.cash +=
      Market[Game.CurrSellID].value *
      Game.SystemMult[Game.CurrSellID] *
      Game.CurrSellQty;
    Game.cashGained +=
      Market[Game.CurrSellID].value *
      Game.SystemMult[Game.CurrSellID] *
      Game.CurrSellQty;
    mult -= (mult * (1 * Game.CurrSellQty)) / 150;
    if (mult < 0.02) {
      mult = 0.01;
    }
  } else {
    //SELLING A POWER CELL
    if (Game.CurrSellQty > 100) {
      Game.CurrSellQty -= 100;
    }
    Game.inventory[Game.CurrSellID] -= Game.CurrSellQty;
    Game.cash +=
      Market[Game.CurrSellID].value *
      Game.SystemMult[Game.CurrSellID] *
      Game.CurrSellQty;
    Game.cashGained +=
      Market[Game.CurrSellID].value *
      Game.SystemMult[Game.CurrSellID] *
      Game.CurrSellQty;
    mult -= (mult * (1 * Game.CurrSellQty)) / 100;
    if (mult < 0.02) {
      mult = 0.01;
    }
  }
  Game.SystemMult[Game.CurrSellID] = mult;
  UpdateGame();
}

function changeLocation(id) {
  if (id == "fl") {
    for (var SID in Game.SystemMult) {
      if (SID == 2) {
        Game.SystemMult[SID] = random(500, 1000) / 1000;
      } else {
        Game.SystemMult[SID] = random(500, 2200) / 1000;
      }
    }
    for (var EXM in Game.ExplorationMult) {
      if (EXM == 2) {
        Game.ExplorationMult[EXM] = random(1000, 1000) / 1000;
      } else {
        Game.ExplorationMult[EXM] = random(500, 1000) / 1000;
      }
    }
    Game.system = 0;
  } else {
    if (id == "loading") {
      UpdateUI();
    } else {
      if (Game.UnlockedLocations >= id) {
        if (Game.system == id) {
          showmessage("System error", "Your destination is already reached !");
        } else {
          if (Game.inventory[2] >= Game.TravelCost) {
            if (Game.EPRequired[id] <= Game.rank) {
              Game.inventory[2] -= Game.TravelCost;
              Game.system = id;
              Game.days++;
              Game.extEnabled = 0;
              for (var SID in Game.SystemMult) {
                if (SID == 2) {
                  Game.SystemMult[SID] = random(750, 1400) / 1000;
                } else {
                  Game.SystemMult[SID] = random(0, 2200) / 1000;
                }
              }
              for (var EXM in Game.ExplorationMult) {
                if (EXM == 2) {
                  Game.ExplorationMult[EXM] = random(750, 1400) / 1000;
                } else {
                  Game.ExplorationMult[EXM] = random(500, 2000) / 1000;
                }
              }
            } else {
              showmessage(
                "Your rank isn't high enough",
                fix(Game.EPRequired[id], 0) + " EP are required to travel !"
              );
            }
          } else {
            showmessage(
              "You are out of power cell",
              fix(Game.TravelCost, 3) + "% are required to travel !"
            );
          }
        }
      } else {
        showmessage(
          "Upgrade the hyperspace",
          "Your hyperspace can't travel there for now, upgrade it!"
        );
      }
    }
  }
  hidesystems();
  $("#system" + Game.system).show();
  UpdateGame();
}

function buyupgrade(id, buyable, type, req1, nbr1, req2, nbr2) {
  if (buyable > 0) {
    if (Game.technologies[id] != 1) {
      if (type == 0) {
        if (Game.cash >= Technologies[id].cost) {
          Game.inventory[req1] -= nbr1;
          Game.inventory[req2] -= nbr2;
          Game.CurrInv -= nbr1 + nbr2;
          Game.cash -= Technologies[id].cost;
          Game.cashSpent += Technologies[id].cost;
          Game.extGain = Technologies[id].gain;
          Game.technologies[id] = 1;
        }
      }
      if (type == 1) {
      }
    }
  }
  UpdateGame();
}

function UPGPOWER(id) {
  if (Game.cash > GetUPGprice(id)) {
    if (Game.Hyperdrive < 100) {
      Game.cash -= GetUPGprice(id);
      Game.cashSpent += GetUPGprice(id);
      Game.TravelCost -= Hyperdrive[id].gain;
      Game.Hyperdrive++;
    }
  }
  UpdateGame();
}

function BUYHYPERSPACE(id) {
  if (Game.cash > GetUPGprice2(id)) {
    if (Game.UnlockedLocations < 9) {
      Game.cash -= GetUPGprice2(id);
      Game.cashSpent += GetUPGprice2(id);
      Game.UnlockedLocations++;
    }
  }
  UpdateGame();
}

//PRESTIGE FUNCTIONS

function GetGalaxyPrice() {
  return 10000000000 * (Game.Galaxy * 2.5) * 5;
}

function changegalaxy() {
  if (Game.cash >= GetGalaxyPrice()) {
    if (Game.system == 9) {
      Game.Galaxy++;
      Game.cashSpent += Game.cash;
      Game.cash = 50 + 1.25 * Game.Galaxy * 10;
      Game.cashGained = 50 + 1.25 * Game.Galaxy * 10;
      Game.inventory = [];
      Game.CurrInv = 0;
      Game.system = 0;
      Game.technologies = [];
      Game.explored = [];
      Game.Upgrades = 0;
      Game.TravelCost = 25;
      Game.UnlockedLocations = 0;
      Game.rank = 0;
      Game.EnnemyClass = 0;
      Game.Exp = 0;
      Game.extEnabled = 0;
      Game.extGain = 0;
      changeLocation("fl");
      for (var EP in Game.EPRequired) {
        Game.EPRequired[EP] = Game.EPRequired[EP] * 1.25 * Game.Galaxy;
      }
    }
  }
  UpdateGame();
}

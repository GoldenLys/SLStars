/////////////////////////
// SLSTARS made by LYS //
/////////////////////////
//                     //
//         W I P       //
//                     //
/////////////////////////
// idea : Buy a new starship with new base attack & base life

//CONFIG
var version = "5.1";
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
  EnnemyPower: 10,
  PirateBaseLife: 200,
  PirateCurrentLife: 200,
  PlayerLife: 200,
  PlayerBaseLife: 200,
  PlayerAttack: 10,
  EnnemyClass: 1,
  PirateLevel: 1,
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

//LOADING BASE CODE & DEBUG IF NEEDED

$(document).ready(function () {
  if (localStorage.getItem("SLStars3") != null) { load(); }
  changeLocation("loading");
  // setInterval(function () { UpdateGame(); }, 1000);
  setInterval(function () { LookForPirates(); }, 20000);
  Theme(Game.theme);
  selectLang(Game.lang);
  UpdateGame();
  GenExtractionMaterials();
  ClickEvents();
  hidesystems();
  $(".ui.sidebar").sidebar("hide");
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
  Game.PlayerAttack = (Game.Starship[2] + (Game.Level * 2.5)) + (Game.Galaxy * 2.5) - 5;
  Game.PlayerBaseLife = (Game.Starship[1] + (Game.Level * 10 - 10)) + (Game.Galaxy * 10 - 10);

  if (Game.isInFight == 0) {
    Game.PlayerLife = Game.PlayerBaseLife;
    Game.PirateCurrentLife = Game.PirateBaseLife;
  }
  Game.CurrInv = 0;
  for (var i in Game.inventory) {
    if (Game.inventory[i] !== Game.inventory[i]) { Game.inventory[i] = 0; }
    if (i != 2) { Game.CurrInv += Game.inventory[i]; }
    if (Game.inventory[i] < 0) {
      Game.inventory[i] = 0;
      if (Game.rank < 0) { Game.rank = 0; }
    }
  }
  for (var inv in Market) {
    if (Game.inventory[inv] == null) {
      Game.inventory[inv] = 0;
    }
  }
  for (var m in Missions) {
    if (Game.explored[m] == null) {
      Game.explored[m] = 0;
    }
  }
  for (var t in Technologies) {
    if (Game.technologies[t] == null) {
      Game.technologies[t] = 0;
    }
  }
  Game.Maxinv = (Game.Starship[0] + Game.Galaxy * 25) - 25;
  if (Game.extEnabled > 0) {
    if (Game.extCurrTime >= Game.extTime) {
      if (Game.Maxinv - Game.CurrInv >= Game.extGain)
        Game.inventory[Missions[Game.extId].type] += Game.extGain;
      Game.extCurrTime = 0;
    } else {
      Game.extCurrTime++;
    }
  }
  if (Game.extTime > 1) {
    Game.extTime = 20 - Game.Galaxy + 1;
  }
  if (Game.extTime < 1) { Game.extTime = 1; }
  if (Game.CurrInv < 1) {
    if (Game.cash <= 10) {
      rand = random(10, 100);
      Game.cash += rand;
      showmessage("Distress signal", "You found an old distress signal!<br> You have joined the signal transmission source and have found an abandoned vessel with <i class='green dollar sign icon'></i>" + rand + " in it.");
    }
  }
  UpdateUI();
  save();
}

function exploremax(id, obj) {
  var Maxexplore = 0;
  if (Game.CurrInv == Game.Maxinv) {
    showmessage("Too much merchandises", "You can't travel with your current inventory weight.");
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
  if (Game.CurrInv == Game.Maxinv) {
    //INVENTORY FULL
    showmessage("Too much merchandises", "You can't travel with your current inventory weight.");
    //INVENTORY NOT FULL
  } else {
    if (Game.explored[id] > 0) {
      //"NBR * MISSION NBR" IS HIGHER THAN INVENTORY
      if (nbr > Game.Maxinv - Game.CurrInv) {
      } else {
        //NBR PRICE IS HIGHER THAN INVENTORY
        if (Game.cash < (Market[obj].value * Game.ExplorationMult[obj]) * nbr) {
          showmessage("Too expensive", "You need more money.");
        } else {
          Game.cash -= Market[obj].value * Game.ExplorationMult[obj] * nbr;
          Game.cashSpent += Market[obj].value * Game.ExplorationMult[obj] * nbr;
          Game.inventory[obj] += nbr;
          Game.rank += nbr * (Game.Galaxy * 0.25 * (Game.system + 1));
        }
      }
    } else {
      //FIRST EXPLORATION
      if (nbr <= Game.Maxinv - Game.CurrInv) {
        if (Game.cash >= ((Market[obj].value * Game.ExplorationMult[obj]) / 2)) {
          Game.cash -= ((Market[obj].value * Game.ExplorationMult[obj]) / 2);
          Game.cashSpent += ((Market[obj].value * Game.ExplorationMult[obj]) / 2);
          Game.inventory[obj] += Math.floor(1);
          Game.explored[id] = 1;
          Game.rank += (1 * Game.system) * nbr;
        }
      } else {
        if (nbr == 1) { S = ""; } else { S = "s"; }
        showmessage("Too much merchandises", "You can't travel with your current inventory weight.<br> You need " + nbr + " place" + S + " in your inventory.");
      }
    }
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

//PIRATE FIGHT ACTIONS

function PirateFightProtect() {
  if (Game.PlayerLife < Game.PlayerBaseLife) {
    var rRandPlayerHeal = random(1, Game.PlayerAttack / 2);
    Game.PlayerLife += rRandPlayerHeal;
  }
  var rEnnemyPower = random(0, Game.EnnemyPower / 2.5);
  Game.PlayerLife -= rEnnemyPower;
  if (Game.PlayerLife <= 0) {
    LosePirateFight();
  }
  if (Game.PirateCurrentLife <= 0) {
    NewPirateStats();
  }
  if (Game.PlayerLife > Game.PlayerBaseLife) {
    Game.PlayerLife = Game.PlayerBaseLife;
  }
  $("#PirateAttackDesc").html(
    "The pirate ship weapon does <span class='rouge bold'>" +
    "<a class='ui circular small label'><i class='red heart icon'></i>-" + rEnnemyPower + "</a></span> damage to the hull !<br>You repaired <a class='ui circular small label'><i class='red heart icon'></i>+" + rRandPlayerHeal + "</a> of the hull"
  );
  UpdateGame();
}

function PirateFightAttack() {
  var rPlayerPower = random(0, Game.PlayerAttack);
  Game.PirateCurrentLife -= rPlayerPower;
  if (Game.PirateCurrentLife <= 0) {
    NewPirateStats();
  }

  var rEnnemyPower = random(0, Game.EnnemyPower);
  Game.PlayerLife -= rEnnemyPower;
  if (Game.PlayerLife <= 0) {
    LosePirateFight();
  }
  $("#PirateAttackDesc").html(
    "You did <a class='ui circular small label'><i class='red heart icon'></i>-" +
    rPlayerPower +
    "</a> damage to the pirate ship.<br>The pirate weapon does <a class='ui circular small label'><i class='red heart icon'></i>-" +
    rEnnemyPower +
    "</a> damage to the hull !"
  );
  UpdateGame();
}

function PirateFightFlee() {
  Game.PirateCurrentLife = Game.PirateBaseLife;
  Game.PlayerLife = Game.PlayerBaseLife;
  if (Game.PlayerLife <= 0) {
    LosePirateFight();
  }
  if (Game.PirateCurrentLife <= 0) {
    NewPirateStats();
  }
  Game.isInFight = 0;
  hideModals();
  UpdateGame();
}

function GetPirateHPPercent() {
  return (100 / Game.PirateBaseLife) * Game.PirateCurrentLife;
}

function GetPlayerHPPercent() {
  return (100 / Game.PlayerBaseLife) * Game.PlayerLife;
}

//CHECK IF THERE IS A CHANCE TO ENCOUNTER A PIRATE

function LookForPirates() {
  PirateChance = random(0, 1000);
  if (Game.isInFight == 0) {
    Game.PlayerLife = Game.PlayerBaseLife;
    $("#PirateAttackDesc").html("");

    //PIRATE LOW
    if (PirateChance >= 0) {
      if (PirateChance < 100) {
        PirateLevel = random(1, Game.Level);
        Game.EnnemyClass = 1;
        Game.isInFight = 1;
        Game.EnnemyPower = 9 + (Game.EnnemyClass * PirateLevel);
        Game.PirateBaseLife = (195 + (Game.EnnemyClass * 5 - 5)) + (PirateLevel * 5 - 5);    
        Game.PirateLevel = PirateLevel;
      }
    }

    //PIRATE MODERATE
    if (PirateChance >= 100) {
      if (PirateChance < 175) {
        PirateLevel = random(1, Game.Level);
        if (Game.Level > 1) { PirateLevel = random(Game.Level - 1, Game.Level);}
        if (Game.Level > 5) { PirateLevel = random(Game.Level - 2, Game.Level);}
        Game.EnnemyClass = 2;
        Game.isInFight = 1;
        Game.EnnemyPower = 9 + (Game.EnnemyClass * PirateLevel);
        Game.PirateBaseLife = (190 + (Game.EnnemyClass * 5 - 5)) + (PirateLevel * 10 - 10);
        Game.PirateLevel = PirateLevel;
      }
    }

    //PIRATE SEVERE
    if (PirateChance >= 175) {
      if (PirateChance < 225) {
        PirateLevel = random(1, Game.Level + 2);
        if (Game.Level > 1) { PirateLevel = random(Game.Level - 1, Game.Level + 2);}
        if (Game.Level > 5) { PirateLevel = random(Game.Level - 2, Game.Level + 2);}
        Game.EnnemyClass = 3;
        Game.isInFight = 1;
        Game.EnnemyPower = 9 + (Game.EnnemyClass * PirateLevel);
        Game.PirateBaseLife = (185 + (Game.EnnemyClass * 5 - 5)) + (PirateLevel * 15 - 15);
        Game.PirateLevel = PirateLevel;
      }
    }

    //PIRATE CRITICAL
    if (PirateChance >= 225) {
      if (PirateChance < 250) {
        PirateLevel = random(1, Game.Level + 3);
        if (Game.Level > 1) { PirateLevel = random(Game.Level - 1, Game.Level + 5);}
        if (Game.Level > 5) { PirateLevel = random(Game.Level - 2, Game.Level + 5);}
        Game.EnnemyClass = 4;
        Game.isInFight = 1;
        Game.EnnemyPower = 9 + (Game.EnnemyClass * PirateLevel);
        Game.PirateBaseLife = (180 + (Game.EnnemyClass * 5 - 5)) + (PirateLevel * 20 - 20);
        Game.PirateLevel = PirateLevel;
      }
    }
    Game.PirateCurrentLife = Game.PirateBaseLife;
    UpdateGame();
    if (PirateChance < 250) { hideModals(); $("#modal-7").modal("setting", "closable", false).modal("show"); }
  }
}

//WIN OR LOSE PIRATE FIGHT

function NewPirateStats() {
  hideModals();
  expGain = (Game.PirateBaseLife / 10) * (Game.PirateLevel + Game.EnnemyClass);
  Game.isInFight = 0;
  Game.Wins++;
  Game.PirateCurrentLife = Game.PirateBaseLife;
  Game.PlayerLife = Game.PlayerBaseLife;
  Game.Exp += expGain;
  if (Game.Exp >= Game.MaxExp) {
    Game.Exp -= Game.MaxExp;
    Game.Level++;
  }
  rand = random(50, Game.cashGained);
  showmessage(
    "You won the fight !",
    "You found <i class='green dollar sign icon'></i><span class='vert bold'>" + fix(rand, 1) +
    "</span> and <span class='jaune bold'>" + expGain + " EXP</span>."
  );
  Game.cash += rand;
  Game.cashGained += rand;
  UpdateGame();
}

function LosePirateFight() {
  Game.inventory = [];
  rand = random(0, Game.cash - 1000);
  if (Game.cash > 1000) {
    Game.cash -= rand;
    Game.cashSpent += rand;
  }
  Game.isInFight = 0;
  Game.Loses++;
  Game.PlayerLife = Game.PlayerBaseLife;
  hideModals();
  showmessage(
    "You lose this fight !",
    "The ennemy took all your ressources and <i class='green dollar sign icon'></i>" +
    fix(rand, 1)
  );
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
      Game.EnnemyPower = 10;
      Game.PirateBaseLife = 200;
      Game.PirateAttacks = 0;
      Game.PirateCurrentLife = 200;
      Game.PlayerLife = 200;
      Game.PlayerBaseLife = 200;
      Game.PlayerAttack = 10;
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

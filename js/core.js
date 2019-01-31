//////////////////////////
// SLSTARS made by  LYS //
//////////////////////////
//                      //
//         W I P        //
//                      //
//////////////////////////



//CONFIG

var version = "v4.52";
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
    extId: 0,
    extGain: 0,
    TravelCost: 25,
    Hyperdrive: 0,
    Maxinv: 100,
    CurrInv: 0,
    CurrSellID: 0,
    CurrSellQty: 0,
    CurrMult: 0,
    UnlockedLocations: 0,
    EPRequired: [0, 10, 50, 100, 350, 1000, 2500, 5000, 10000, 100000],
    PiratePower: 5,
    PirateBaseLife: 100,
    PirateCurrentLife: 100,
    PlayerLife: 100,
    PlayerBaseLife: 100,
    PlayerAttack: 10,
    PirateRank: 0,
    PirateExp: 0,
    PirateMaxExp: 20,
    isInFight: 0,
    theme: 0,
    Wins: 0,
    Loses: 0,
    SystemMult: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1 },
    ExplorationMult: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1 },
    confirmations: 1,
    extEnabled: 0,
    UseBackground: 1,
    extTime: 20,
    extCurrTime: 0,
};

//LOADING BASE CODE & DEBUG IF NEEDED

$(document).ready(function () {
    changeLocation("loading");
    if (localStorage.getItem("SLStars2") != null) { load(); }
    setInterval(function () { UpdateGame(); }, 1000);
    setInterval(function () { LookForPirates(); }, 60000);
    Theme(Game.theme);
    GenExtractionMaterials();
    ClickEvents();
    hidesystems();
    $('.ui.sidebar').sidebar('hide');
    $("#system-select").val(texts.systemname[Game.system]);
    $('#system' + Game.system).show();
    if (Game.confirmations == 0) { $('#MarketToggle').checkbox('check'); }
    else { $('#MarketToggle').checkbox('uncheck'); }
    if (Game.UseBackground == 1) { $('#BackgroundToggle').checkbox('check'); }
    else { $('#BackgroundToggle').checkbox('uncheck'); }
    ToggleBackground();
    if (Game.fl == 0) { $("#modal-2").modal('show'); changeLocation("fl"); }
});

//GAME FUNCTIONS

function UpdateGame() {
    if (Game.inventory[2] < 0) { Game.inventory[2] = 0; }
    for (var inv in texts.items) { if (Game.inventory[inv] == null) { Game.inventory[inv] = 0; } }
    for (var m in Missions) { if (Game.explored[m] == null) { Game.explored[m] = 0; } }
    for (var t in Technologies) { if (Game.technologies[t] == null) { Game.technologies[t] = 0; } }
    Game.Maxinv = 90 + (Game.Galaxy) * 10;
    if (Game.extEnabled > 0) {
        if (Game.extCurrTime >= Game.extTime) {
        if((Game.Maxinv-Game.CurrInv) >= Game.extGain)
        Game.inventory[Missions[Game.extId].type] += Game.extGain;
        Game.extCurrTime=0;
    } else { Game.extCurrTime++; }
    }
    Game.CurrInv=0;
    for (var i in Game.inventory) { if(i != 2) { Game.CurrInv+=Game.inventory[i]; } }
    if (Game.CurrInv < 1) { if (Game.cash <= 10) { rand = random(10, 100); Game.cash += rand; showmessage("Distress signal", "You found an old distress signal!<br> You have joined the signal transmission source and have found an abandoned vessel with <i class='green dollar sign icon'></i>" + rand + " in it."); } }
    UpdateUI();
    save();
}

function explore(id, nbr, obj) {
    if (Game.CurrInv == Game.Maxinv) {
        if (nbr * Missions[id].nbr == 1) { S = "";} else { S="s"; }
        showmessage("Too much merchandises", "You can't travel with your current inventory weight.");
    } else {
        if ((nbr * Missions[id].nbr) <= Game.Maxinv - Game.CurrInv) {
            if (Game.explored[id] > 0) {
                if (Game.cash >= ((Market[obj].value * Missions[id].nbr) * Game.ExplorationMult[obj] / 2) * nbr) {
                    Game.cash -= ((Market[obj].value * Missions[id].nbr) * Game.ExplorationMult[obj] / 2) * nbr;
                    Game.cashSpent += ((Market[obj].value * Missions[id].nbr) * Game.ExplorationMult[obj] / 2) * nbr;
                    Game.inventory[obj] += Missions[id].nbr * nbr;
                    Game.rank += nbr + (1 * Game.system);
                }
            }
        } else {
            if (Game.explored[id] > 0) {
                if (Game.cash >= ((Market[obj].value * (Game.Maxinv - Game.CurrInv) / Missions[id].nbr) * Game.ExplorationMult[obj] / 2)) {
                    Game.cash -= ((Market[obj].value * (Game.Maxinv - Game.CurrInv) / Missions[id].nbr) * Game.ExplorationMult[obj] / 2);
                    Game.cashSpent += ((Market[obj].value * (Game.Maxinv - Game.CurrInv) / Missions[id].nbr) * Game.ExplorationMult[obj] / 2);
                    Game.inventory[obj] += (Game.Maxinv - Game.CurrInv) / Missions[id].nbr;
                    Game.rank += (Game.Maxinv - Game.CurrInv) / Missions[id].nbr + (1 * Game.system);
                }
            }
        }
    }
    if (Game.explored[id] < 1) {
        if ((nbr * Missions[id].nbr) <= Game.Maxinv - Game.CurrInv) {
            if (Game.cash >= (Market[obj].value * Missions[id].nbr) * Game.ExplorationMult[obj] / 2 * nbr / 2) {
                Game.cash -= (Market[obj].value * Missions[id].nbr) * Game.ExplorationMult[obj] / 2 * nbr / 2;
                Game.cashSpent += (Market[obj].value * Missions[id].nbr) * Game.ExplorationMult[obj] / 2 * nbr / 2;
                Game.inventory[obj] += Missions[id].nbr;
                Game.explored[id] = 1;
                Game.rank = Game.rank + 1 + (1 * Game.system);
            }
        } else {if (nbr * Missions[id].nbr == 1) { S = "";} else { S="s"; } showmessage("Too much merchandises", "You can't travel with your current inventory weight.<br> You need " + nbr * Missions[id].nbr + " place" + S + " in your inventory."); }
    }
    UpdateUI();
    save();
}

function sellitem(id, qty) {
    var mult = Game.SystemMult[id];
    Game.CurrSellID = id;
    Game.CurrSellQty = qty;
    Game.CurrMult = mult;
    if (Game.confirmations == 1) {
        $("#sellconfirm-text").html("Do you want to sell " + fix(qty, 1) + " " + texts.items[id] + "<img class='ui avatar image' src='images/items/" + id + ".png'> for <font color='green'>" + fix(Market[id].value * mult * qty, 1) + "$</font> ?");
        $('#modal-4').modal('show');
    } else { confirmsell(); }
    UpdateUI();
}

function confirmsell() {
    var mult = Game.SystemMult[Game.CurrSellID];
    if (Game.inventory[Game.CurrSellID] >= Game.CurrSellQty) {
        if (Game.CurrSellID < 2) {
            if (mult > 0) { mult -= mult * (1 * Game.CurrSellQty) / 250; }
        } else {
            if (Game.CurrSellID < 7) { if (mult > 0) { mult -= mult * (1 * Game.CurrSellQty) / 2000; } }
        }
        if (Game.CurrSellID > 6) { if (mult > 0) { mult -= mult * (1 * Game.CurrSellQty) / 10000; } }
        if (mult < 0) { mult = 0.01; }
    }
    Game.cash += Market[Game.CurrSellID].value * Game.SystemMult[Game.CurrSellID] * Game.CurrSellQty;
    Game.cashGained += Market[Game.CurrSellID].value * Game.SystemMult[Game.CurrSellID] * Game.CurrSellQty;
    if (Game.CurrSellID != 2) {
        Game.inventory[Game.CurrSellID] -= Game.CurrSellQty;
        Game.CurrInv -= Game.CurrSellQty;
    }
    Game.SystemMult[Game.CurrSellID] = mult;
    UpdateUI();
    save();
}

function changeLocation(id) {
    if (id == "fl") {
        for (var SID in Game.SystemMult) { if (SID == 2) { Game.SystemMult[SID] = random(1000, 3000) / 1000; } else { Game.SystemMult[SID] = random(0, 2200) / 1000; } }
        for (var EXM in Game.ExplorationMult) { if (EXM == 2) { Game.ExplorationMult[EXM] = random(1000, 5000) / 1000; } else { Game.ExplorationMult[EXM] = random(500, 2200) / 1000; } }
        Game.system = 0;
    } else {
        if (id == "loading") {
            UpdateUI();
        } else {
            if (Game.UnlockedLocations >= id) {
                if (Game.system == id) { showmessage("System error", "Your destination is already reached !"); } else {
                    if (Game.inventory[2] >= Game.TravelCost) {
                       if(Game.EPRequired[id] <= Game.rank) {
                        Game.inventory[2] -= Game.TravelCost;
                        Game.system = id;
                        Game.days++;
                        Game.extEnabled = 0;
                        for (var SID in Game.SystemMult) { if (SID == 2) { Game.SystemMult[SID] = random(1000, 5000) / 1000; } else { Game.SystemMult[SID] = random(0, 2200) / 1000; } }
                        for (var EXM in Game.ExplorationMult) { if (EXM == 2) { Game.ExplorationMult[EXM] = random(1000, 5000) / 1000; } else { Game.ExplorationMult[EXM] = random(500, 2200) / 1000; } }
                    } else { showmessage("Your rank isn't high enough", fix(Game.EPRequired[id], 0) + " EP are required to travel !"); }
                    } else { showmessage("You are out of power cell", fix(Game.TravelCost, 3) + "% are required to travel !"); }
                }
            } else { showmessage("Upgrade the hyperspace", "Your hyperspace can't travel there for now, upgrade it!"); }

        }
    }
    hidesystems();
    $('#system' + Game.system).show();
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
            if (type == 1) { }
        }
    }

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
    UpdateUI();
}

function BUYHYPERSPACE(id) {
    if (Game.cash > GetUPGprice2(id)) {
        if (Game.UnlockedLocations < 9) {
            Game.cash -= GetUPGprice2(id);
            Game.cashSpent += GetUPGprice2(id);
            Game.UnlockedLocations++;
        }
    }
    UpdateUI();
}

//PIRATE FIGHT ACTIONS

function PirateFightProctect() {
    if (Game.PlayerLife < 100) {
        Game.PlayerLife += 5;
    }
    Game.PlayerLife -= Game.PiratePower / 2.5;
    if (Game.PlayerLife <= 0) { LosePirateFight(); }
    if (Game.PirateCurrentLife <= 0) { NewPirateStats(); }
    if (Game.PlayerLife > 100) { Game.PlayerLife = 100; }
    $("#PirateAttackDesc").html("The pirate ship weapon does <span class='rouge bold'>-" + Game.PiratePower / 2.5 + "</span><i class='red heart icon'></i> damage to the hull !<br>You repaired <span class='vert'>+5</span><i class='red heart icon'></i> of the hull");
    UpdatePirateView();
}

function PirateFightAttack() {
    Game.PirateCurrentLife -= Game.PlayerAttack;
    if (Game.PirateCurrentLife <= 0) { NewPirateStats(); }
    Game.PlayerLife -= Game.PiratePower;
    if (Game.PlayerLife <= 0) { LosePirateFight(); }
    $("#PirateAttackDesc").html("You did <span class='rouge'>-" + Game.PlayerAttack + "</span><i class='red heart icon'></i> damage to the pirate ship.<br>The pirate weapon does <span class='rouge bold'>-" + Game.PiratePower + "</span><i class='red heart icon'></i> damage to the hull !");
    UpdatePirateView();
}

function PirateFightFlee() {
    Game.PirateCurrentLife = Game.PirateBaseLife;
    Game.PlayerLife = Game.PlayerBaseLife;
    if (Game.PlayerLife <= 0) { LosePirateFight(); }
    if (Game.PirateCurrentLife <= 0) { NewPirateStats(); }
    Game.isInFight = 0;
    hideModals();
}

function GetPirateHPPercent() {
    return (100 / Game.PirateBaseLife) * Game.PirateCurrentLife;
}

function GetPlayerHPPercent() {
    return (100 / Game.PlayerBaseLife) * Game.PlayerLife;
}

//CHECK IF THERE IS A CHANCE TO ENCOUNTER A PIRATE

function LookForPirates() {
    PirateChance = random(0, 3);
    Game.PlayerLife = Game.PlayerBaseLife;

    if (PirateChance == 3) {
        $("#modal-7").modal('setting', 'closable', false).modal('show');
        Game.isInFight = 1;
        PirateChance = 0;
    }
}

//WIN OR LOSE PIRATE FIGHT

function NewPirateStats() {
    hideModals();
    Game.isInFight = 0;
    Game.Wins++;
    Game.PirateCurrentLife = Game.PirateBaseLife;
    Game.PlayerLife = Game.PlayerBaseLife;
    Game.PirateExp++;
    if (Game.PirateExp >= Game.PirateMaxExp) {
        Game.PirateBaseLife += 10;
        Game.PiratePower = 5 + (Game.PirateAttacks * 0.5);
        Game.PirateExp = 0;
        Game.PirateRank++;
    }
    rand = random(0, Game.cashGained);
    showmessage("You won the fight !", "You found <i class='green dollar sign icon'></i>" + fix(rand, 0));
    Game.cash += rand;
    Game.cashGained += rand;
}

function LosePirateFight() {
    Game.inventory = [];
    rand = random(0, (Game.cash - 1000));
    if (Game.cash > 1000) {
        Game.cash -= rand;
        Game.cashSpent += rand;
    }
    Game.isInFight = 0;
    Game.Loses++;
    Game.PlayerLife = Game.PlayerBaseLife;
    hideModals();
    showmessage("You lose this fight !", "He took all your merchandises and <i class='green dollar sign icon'></i>" + fix(rand, 0));
}

//PRESTIGE FUNCTIONS

function GetGalaxyPrice() {
    return ((10000000000 * (Game.Galaxy * 2.5)) * 5);
}

function changegalaxy() {
    if (Game.cash >= GetGalaxyPrice()) {
        if (Game.system == 9) {
            Game.Galaxy++;
            for (var EP in Game.EPRequired) { Game.EPRequired[EP] = Game.EPRequired[EP] + (1.25 * Game.Galaxy); }
            Game.cashSpent += Game.cash;
            Game.cash = 50 + (1.25 * Game.Galaxy) * 10;
            Game.cashGained = 50 + (1.25 * Game.Galaxy) * 10;
            Game.inventory = [];
            Game.CurrInv = 0;
            Game.system = 0;
            Game.technologies = [];
            Game.explored = [];
            Game.Upgrades = 0;
            Game.TravelCost = 25;
            Game.UnlockedLocations = 0;
            Game.PiratePower = 5;
            Game.PirateBaseLife = 100;
            Game.PirateAttacks = 0;
            Game.PirateCurrentLife = 100;
            Game.PlayerLife = 100;
            Game.PlayerBaseLife = 100;
            Game.PlayerAttack = 10;
            Game.rank = 0;
            Game.PirateRank = 0;
            Game.PirateExp = 0;
            Game.extEnabled = 0,
            changeLocation("fl");
            if(Game.extTime > 1) { Game.extTime--; }
        }
    }
}
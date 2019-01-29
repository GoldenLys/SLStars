//////////////////////////
//     TODO & IDEAS     //
//////////////////////////
//                      //
//         W I P        //
// PLEASE BE INDULGENT  //
//////////////////////////
//            
//////////////////////////



//CONFIG

var version = "v4.4";
var sitename = "SLStars";
var Game = {
    isLoading: 1,
    DateStarted: getDate(),
    rank: 0,
    system: 0,
    Galaxy: 1,
    explored: [],
    inventory: [],
    cash: 50,
    cashps: 0,
    cashSpent: 0,
    cashGained: 0,
    technologies: [],
    tutorial: 0,
    fl: 0,
    days: 0,
    extId: 0,
    extGain: 0,
    TravelCost: 25,
    Upgrades: [],
    totalinv: 100,
    CurrInv: 100,
    CurrSellID: 0,
    CurrSellQty: 0,
    CurrMult: 0,
    UnlockedLocations: 0,
    EPRequired: [0, 10, 50, 100, 350, 1000, 2500, 5000, 10000, 100000],
    PirateAttacks: 0,
    PiratePower: 5,
    PirateBaseLife: 100,
    PirateCurrentLife: 100,
    PlayerLife: 100,
    PlayerBaseLife: 100,
    PlayerAttack: 10,
    isInFight: 0,
    theme: 2,
};

//LOADING BASE CODE & DEBUG IF NEEDED

$(document).ready(function () {
    changeLocation("loading");
    if (localStorage.getItem("SLStars2") != null) { load(); }
    setInterval(function () { UpdateGame(Game.cashps); }, 1000);
    setInterval(function () { LookForPirates(); }, 60000);
    ClickEvents();
    $('.ui.sidebar').sidebar('hide');
    $("#system-select").val(texts.systemname[Game.system]);
    hidesystems();
    $('#system' + Game.system).show();
    GenExtractionMaterials();
    Theme(Game.theme);
});

//GAME FUNCTIONS

function UpdateGame(cashps) {
    if (Game.inventory[2] < 0) { Game.inventory[2] = 0; }
    for (var inv in texts.items) { if (Game.inventory[inv] == null) { Game.inventory[inv] = 0; } }
    for (var m in Missions) { if (Game.explored[m] == null) { Game.explored[m] = 0; } }
    for (var t in Technologies) { if (Game.technologies[t] == null) { Game.technologies[t] = 0; } }
    for (var u in Upgrades) { if (Game.Upgrades[u] == null) { Game.Upgrades[u] = 0; } }
    Game.cash += cashps;
    Game.cashGained += cashps;
    Game.inventory[Missions[Game.extId].type] += Game.extGain;
    Game.totalinv += Game.extGain;
    if (Game.CurrInv <= 0) { if (Game.cash <= 3) { rand = random(10, 100); Game.cash += rand; showmessage("Distress signal", "You found an old distress signal!<br> You have joined the signal transmission source and have found a dead body with an abandoned vessel and <i class='green dollar sign icon'></i>" + rand); } }
    UpdateUI();
    save();
}

function explore(id, nbr, obj) {
    if (Game.explored[id] > 0) {
        if (Game.cash >= (Market[obj].value * Missions[id].nbr) * nbr) {
            Game.cash -= (Market[obj].value * Missions[id].nbr) * nbr;
            Game.cashSpent += (Market[obj].value * Missions[id].nbr) * nbr;
            Game.inventory[obj] += Missions[id].nbr * nbr;
            Game.CurrInv += Missions[id].nbr * nbr;
            Game.totalinv += Missions[id].nbr * nbr;
            Game.rank += nbr + (1 * Game.system);
        }
    }
    if (Game.explored[id] < 1) {
        if (Game.cash >= Market[obj].value * Missions[id].nbr * nbr / 2) {
            Game.cash -= Market[obj].value * Missions[id].nbr * nbr / 2;
            Game.cashSpent += Market[obj].value * Missions[id].nbr * nbr / 2;
            Game.inventory[obj] += Missions[id].nbr * 2;
            Game.CurrInv += Missions[id].nbr * nbr * 2;
            Game.totalinv += Missions[id].nbr * nbr * 2;
            Game.explored[id] = 1;
            Game.rank = Game.rank + 1 + (1 * Game.system);
        }
    }
    UpdateUI();
    save();
}

function sellitem(id, qty) {
    var mult = SystemMult[id];
    Game.CurrSellID = id;
    Game.CurrSellQty = qty;
    Game.CurrMult = mult;
    if (id == 2) { mult = 0.01; }
    $("#sellconfirm-text").html("Do you want to sell " + fix(qty, 1) + " " + texts.items[id] + "<img class='ui avatar image' src='images/items/" + id + ".png'> for <font color='green'>" + fix(Market[id].value * mult * qty, 1) + "$</font> ?");
    $('#modal-4').modal('show');
    UpdateUI();
}

function confirmsell() {
    var mult = SystemMult[Game.CurrSellI];
    if (Game.inventory[Game.CurrSellID] >= Game.CurrSellQty) {
        if (Game.CurrSellID < 2) {
            if (mult > 0) { mult -= mult * (1 * Game.CurrSellQty) / 250; }
        } else {
            if (Game.CurrSellID < 7) { if (mult > 0) { mult -= mult * (1 * Game.CurrSellQty) / 2000; } }
        }
        if (Game.CurrSellID > 6) { if (mult > 0) { mult -= mult * (1 * Game.CurrSellQty) / 10000; } }
        if (mult < 0) { mult = 0.01; }
    }
    Game.cash += Market[Game.CurrSellID].value * SystemMult[Game.CurrSellID] * Game.CurrSellQty;
    Game.cashGained += Market[Game.CurrSellID].value * SystemMult[Game.CurrSellID] * Game.CurrSellQty;
    Game.inventory[Game.CurrSellID] -= Game.CurrSellQty;
    Game.CurrInv -= Game.CurrSellQty;
    Game.totalinv -= Game.CurrSellQty;
    SystemMult[Game.CurrSellID] = Game.CurrMult;
    UpdateUI();
    save();
}

function changeLocation(id) {
    if (Game.inventory[2] >= Game.TravelCost) {
        if (Game.UnlockedLocations >= id) {
            Game.system = id;
            for (var SID in SystemMult) { SystemMult[SID] = random(0, 2200) / 1000; }
            if (id != "loading") {
                Game.inventory[2] -= Game.TravelCost;
                Game.days++;
            }
        } else { showmessage("Upgrade your hyperspshowace", "You hyperspace can't travel there for now, upgrade it!"); }
    } else { if (id != "loading") { showmessage("You are out of power cell", fix(Game.TravelCost, 3) + "% are required to travel !"); } for (var SID2 in SystemMult) { SystemMult[SID2] = random(0, 150000) / 100000; } }
    if (id == "loading") { id = 0; Game.system = id; }
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
        if (Game.Upgrades[id] < 100) {
            Game.cash -= GetUPGprice(id);
            Game.cashSpent += GetUPGprice(id);
            Game.TravelCost -= Upgrades[id].gain;
            Game.Upgrades[id]++;
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

function showmessage(title, message) {
    $("#message-title").html(title);
    $("#message-text").html(message);
    $('#modal-5').modal('show');
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
    PirateChance = random(0, 5);

    if (PirateChance == 5) {
        $("#modal-7").modal('setting', 'closable', false).modal('show');
        Game.isInFight = 1;
        PirateChance = 0;
    }
}

//WIN OR LOSE PIRATE FIGHT

function NewPirateStats() {
    hideModals();
    Game.isInFight = 0;
    Game.PirateAttacks++;
    Game.PirateBaseLife += 10;
    Game.PirateCurrentLife = Game.PirateBaseLife;
    Game.PiratePower = 5 + (Game.PirateAttacks * 0.5);
    Game.PlayerLife = Game.PlayerBaseLife;
    rand = random(100, 100000);
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
    Game.PlayerLife = Game.PlayerBaseLife;
    hideModals();
    showmessage("You lose this fight !", "He took all your merchandises and <i class='green dollar sign icon'></i>" + fix(rand, 0));
}

//PRESTIGE FUNCTIONS

function GetGalaxyPrice() {
    return ((1000000000 * Game.Galaxy) * 5);
}

function changegalaxy() {
    if (Game.cash >= GetGalaxyPrice()) {
        if (Game.system == 9) {
            Game.Galaxy++;
            for (var EP in Game.EPRequired) { Game.EPRequired[EP] = Game.EPRequired[EP] + (1.25 * Game.Galaxy); }
            Game.cash = 50 + (1.25 * Game.Galaxy) * 10;
            Game.cashGained += 50 + (1.25 * Game.Galaxy) * 10;
            Game.inventory = [];
            Game.CurrInv = 0;
            Game.system = 0;
            Game.technologies = [];
            Game.explored = [];
            Game.Upgrades = [];
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
        }
    }
}

function Theme(selection) {
    if (selection == 0) {
        Game.theme=0;
        save();
        $('#theme1').attr('rel', '');
        $('#theme2').attr('rel', '');
        $(".pusher").css("background", "rgba(0, 0, 0, 0.2)");
        $(".pusher").css("background-image", "url(images/newbg.png)");
    }
    if (selection == 1) {
        Game.theme=1;
        save();
        $('#theme1').attr('rel', 'stylesheet');
        $('#theme2').attr('rel', '');
        $(".pusher").css("background", "rgb(21, 26, 29)");
    }
    if (selection == 2) {
        Game.theme=2;
        save();
        $('#theme2').attr('rel', '');
        $('#theme2').attr('rel', 'stylesheet');
        $(".pusher").css("background", "rgb(56, 178, 253)");
    }
}
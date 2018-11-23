//////////////////////////
//TODO & IDEAS
//////////////////////////
//
// Technology to unlock new systems
//
//////////////////////////



//CONFIG

var version = "v2.51";
var sitename = "SpaceL";
var Game = {
    isLoading: 1,
    DateStarted: getDate(),
    rank: 0,
    system: 0,
    explored: [],
    inventory: [],
    cash: 100,
    cashps: 0,
    technologies: [],
    tutorial: 0,
    fl: 0,
    days: 0,
    extId: 3,
    extGain: 0,
    TravelCost: 10,
};

//LOADING BASE CODE & DEBUG IF NEEDED

$(document).ready(function () {
    if (localStorage.getItem("SpaceL2") != null) { load(); }
    setInterval(function () { UpdateGame(Game.cashps); }, 1000);
    changeLocation("loading");
    ClickEvents();
    $(".pusher").css("background-image", "url(images/bg.png)");
    $('.ui.sidebar').sidebar('hide');
    $("#system-select").val(texts.systemname[Game.system]);
    GenExtractionMaterials();
});

//GAME FUNCTIONS

function UpdateGame(cashps) {
    if (Game.inventory[19] < 0) { Game.inventory[19] = 0; }
    for (var inv in texts.items) { if (Game.inventory[inv] == null) { Game.inventory[inv] = 0; } }
    for (var m in Missions) { if (Game.explored[m] == null) { Game.explored[m] = 0; } }
    for (var t in Technologies) { if (Game.technologies[t] == null) { Game.technologies[t] = 0; } }
    Game.cash += cashps;
    Game.inventory[Game.extId] += Game.extGain;
    UpdateUI();
    save();
}

function explore(id, nbr, obj) {
    if (Game.explored[id] > 0) {
        if (Game.cash >= (Market[obj].value * Missions[id].nbr) * nbr) {
            Game.cash -= (Market[obj].value * Missions[id].nbr) * nbr;
            Game.inventory[obj] += Missions[id].nbr * nbr;
            Game.rank += nbr + (1 * Game.system);
        }
    }
    if (Game.explored[id] < 1) {
        if (Game.cash >= Market[obj].value * Missions[id].nbr / 2) {
            Game.cash -= Market[obj].value * Missions[id].nbr / 2;
            Game.inventory[obj] += Missions[id].nbr * 2;
            Game.explored[id] = 1;
            Game.rank = Game.rank + 1 + (1 * Game.system);
        }
    }
    UpdateUI();
    save();
}

function sellitem(id, qty) {
    var mult = SystemMult[id];
    if (Game.inventory[id] >= qty) {
        if (id < 2) {
            if (mult > 0) { mult -= mult * (1 * qty) / 100; }
        } else {
            if (id < 7) { if (mult > 0) { mult -= mult * (1 * qty) / 1000; } }
        }
        if (id > 6) { if (mult > 0) { mult -= mult * (1 * qty) / 10000; } }
        if (mult < 0) { mult = 0.01; }
        var r = confirm("Do you want to sell " + fix(qty, 1) + " " + texts.items[id] + " for " + fix(Market[id].value * mult * qty, 1) + "$ ?");
        if (r == true) {
            Game.cash += Market[id].value * SystemMult[id] * qty;
            Game.inventory[id] -= qty;
            SystemMult[id] = mult;
        } else {
            UpdateUI();
        }
    }
    UpdateUI();
    save();
}

function changeLocation(id) {
    if (Game.inventory[19] >= Game.TravelCost) {
        for (var SID in SystemMult) { SystemMult[SID] = random(0, 150000) / 100000; }
        if (id != "loading") {
            Game.inventory[19] -= Game.TravelCost;
            Game.days++;
        }
    } else { if (id != "loading") { alert("Not enough power cell, " + fix(Game.TravelCost, 3) + "% are required to travel !"); } }
    if (id == "loading") { id = 0; }
    hidesystems();
    Game.system = id;
    $('#system' + id).show();
}

function buyupgrade(id, buyable, type, req1, nbr1, req2, nbr2) {
    if (buyable > 0) {
        if (Game.technologies[id] != 1) {
            if (type == 0) {
                if (Game.cash >= Technologies[id].cost) {
                    Game.inventory[req1] -= nbr1;
                    Game.inventory[req2] -= nbr2;
                    Game.cash -= Technologies[id].cost;
                    Game.extGain = Technologies[id].gain;
                    Game.technologies[id] = 1;
                }
            }
            if (type == 1) { }
        }
    }

}
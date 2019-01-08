//////////////////////////
//TODO & IDEAS
//////////////////////////
//
// Technology to unlock new systems
//
//////////////////////////



//CONFIG

var version = "v3";
var sitename = "SpaceL";
var Game = {
    isLoading: 1,
    DateStarted: getDate(),
    rank: 0,
    system: 0,
    explored: [],
    inventory: [],
    cash: 50,
    cashps: 0,
    technologies: [],
    tutorial: 0,
    fl: 0,
    days: 0,
    extId: 0,
    extGain: 0,
    TravelCost: 25,
    Upgrades: [],
    totalinv: 100,
    CurrSellID: 0,
    CurrSellQty: 0,
    UnlockedLocations: 0,
    EPRequired: [0, 10, 50, 100, 350, 1000, 2500, 5000, 10000, 100000]
};

//LOADING BASE CODE & DEBUG IF NEEDED

$(document).ready(function () {
    changeLocation("loading");
    if (localStorage.getItem("SpaceL2") != null) { load(); }
    setInterval(function () { UpdateGame(Game.cashps); }, 1000);
    ClickEvents();
    $(".pusher").css("background-image", "url(images/bg.png)");
    $('.ui.sidebar').sidebar('hide');
    $("#system-select").val(texts.systemname[Game.system]);
    hidesystems();
    $('#system' + Game.system).show();
    GenExtractionMaterials();
});

//GAME FUNCTIONS

function UpdateGame(cashps) {
    if (Game.inventory[2] < 0) { Game.inventory[2] = 0; }
    for (var inv in texts.items) { if (Game.inventory[inv] == null) { Game.inventory[inv] = 0; } }
    for (var m in Missions) { if (Game.explored[m] == null) { Game.explored[m] = 0; } }
    for (var t in Technologies) { if (Game.technologies[t] == null) { Game.technologies[t] = 0; } }
    for (var u in Upgrades) { if (Game.Upgrades[u] == null) { Game.Upgrades[u] = 0; } }
    Game.cash += cashps;
    Game.inventory[Game.extId] += Game.extGain;
    Game.totalinv += Game.extGain;
    UpdateUI();
    save();
}

function explore(id, nbr, obj) {
    if (Game.explored[id] > 0) {
        if (Game.cash >= (Market[obj].value * Missions[id].nbr) * nbr) {
            Game.cash -= (Market[obj].value * Missions[id].nbr) * nbr;
            Game.inventory[obj] += Missions[id].nbr * nbr;
            Game.totalinv += Missions[id].nbr * nbr;
            Game.rank += nbr + (1 * Game.system);
        }
    }
    if (Game.explored[id] < 1) {
        if (Game.cash >= Market[obj].value * Missions[id].nbr / 2) {
            Game.cash -= Market[obj].value * Missions[id].nbr / 2;
            Game.inventory[obj] += Missions[id].nbr * 2;
            Game.totalinv += Missions[id].nbr * 2;
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
        Game.CurrSellID = id;
        Game.CurrSellQty = qty;
        $("#sellconfirm-text").html("Do you want to sell " + fix(qty, 1) + " " + texts.items[id] + " for " + fix(Market[id].value * mult * qty, 1) + "$ ?");
        $('#modal-4').modal('show');
    }
    UpdateUI();
}

function confirmsell() {
    console.log("test");
    Game.cash += Market[Game.CurrSellID].value * SystemMult[Game.CurrSellID] * Game.CurrSellQty;
    Game.inventory[Game.CurrSellID] -= Game.CurrSellQty;
    Game.totalinv -= Game.CurrSellQty;
    SystemMult[Game.CurrSellID] = mult;
    UpdateUI();
    save();
}

function changeLocation(id) {
    if (Game.inventory[2] >= Game.TravelCost) {
        if (Game.UnlockedLocations >= id) {
            Game.system = id;
            for (var SID in SystemMult) { SystemMult[SID] = random(0, 150000) / 100000; }
            if (id != "loading") {
                Game.inventory[2] -= Game.TravelCost;
                Game.days++;
            }
        } else { showmessage("Upgrade your hyperspace", "You hyperspace can't travel there for now, upgrade it!"); }
    } else { if (id != "loading") { showmessage("Not enough power cell", fix(Game.TravelCost, 3) + "% are required to travel !"); } for (var SID2 in SystemMult) { SystemMult[SID2] = random(0, 150000) / 100000; } }
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
                    Game.cash -= Technologies[id].cost;
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
            Game.TravelCost -= Upgrades[id].gain;
            Game.Upgrades[id]++;
        }
    }
    UpdateUI();
}

function BUYHYPERSPACE(id) {
    if (Game.cash > GetUPGprice2(id)) {
        if (Game.UnlockedLocations < 10) {
            Game.cash -= GetUPGprice2(id);
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
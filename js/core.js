//////////////////////////
//TODO & IDEAS
//////////////////////////
//
// Fuel system to explore
// Technology to unlock new systems
//
//
//
//
//////////////////////////



//CONFIG

var version = "v2.4";
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
    shipname: "Unusable spaceship",
    technologies: [],
    tutorial: 0,
    fl: 0,
    days: 0,
};

//LOADING BASE CODE & DEBUG IF NEEDED

$(document).ready(function () {
    if (localStorage.getItem("SpaceL2") != null) { load(); }
    setInterval(function () { UpdateGame(Game.cashps); }, 1000);
    ClickEvents();
    changeLocation(0);
    $(".pusher").css("background-image", "url(images/bg.png)");
    $('.ui.sidebar').sidebar('hide');
    $("#system-select").val(texts.systemname[Game.system]);
});

//GAME FUNCTIONS

function UpdateGame(cashps) {
    Game.cash += cashps;
    if (Game.inventory[19] < 0) { Game.inventory[19] = 0; }
    for (var inv in texts.items) { if (Game.inventory[inv] == null) { Game.inventory[inv] = 0; } }
    for (var m in Missions) { if (Game.explored[m] == null) { Game.explored[m] = 0; } }
    for (var t in Technologies) { if (Game.technologies[t] == null) { Game.technologies[t] = 0; } }
    UpdateUI();
    save();
}

function explore(id, nbr) {
    if (Game.explored[id] > 0) {
        if (Game.cash >= (Market[Missions[id].type].value * Missions[id].nbr) * nbr) {
            Game.cash -= (Market[Missions[id].type].value * Missions[id].nbr) * nbr;
            Game.inventory[Missions[id].type] += Missions[id].nbr * nbr;
            Game.rank += nbr + (1 * Game.system);
        }
    }
    if (Game.explored[id] < 1) {
        if (Game.cash >= Market[Missions[id].type].value * Missions[id].nbr / 2) {
            Game.cash -= Market[Missions[id].type].value * Missions[id].nbr / 2;
            Game.inventory[Missions[id].type] += Missions[id].nbr * 2;
            Game.explored[id] = 1;
            Game.rank = Game.rank + 1 + (1 * Game.system);
        }
    }
    UpdateUI();
    save();
}

function sellitem(id, qty) {
    if (Game.inventory[id] >= qty) {
        if (id < 2) {
            if (SystemMult[id] > 0) { SystemMult[id] -= SystemMult[id] * (1 * qty) / 100; }
        } else {
            if (id < 7) {
                if (SystemMult[id] > 0) { SystemMult[id] -= SystemMult[id] * (1 * qty) / 1000; }
            }
        }
        if (id > 6) {
            if (SystemMult[id] > 0) { SystemMult[id] -= SystemMult[id] * (1 * qty) / 10000; }
        }
        if (SystemMult[id] < 0) { SystemMult[id] = 0; }
        var r = confirm("Do you want to sell every " + texts.items[id] + " in your inventory for " + fix(Market[id].value * SystemMult[id] * qty, 1) + "$");
        if (r == true) {
            Game.cash += Market[id].value * SystemMult[id] * qty;
            Game.inventory[id] -= qty;
        } else {
            UpdateUI();
        }
    }
    UpdateUI();
    save();
}

function changeLocation(id) {
    if (Game.isLoading == 1) {
        if (Game.inventory[19] >= 10) {
            for (var SID in SystemMult) { SystemMult[SID] = random(0, 150000) / 100000; }
            Game.inventory[19] -= 10;
            Game.days++;
        }
        Game.isLoading = 0;
    } else {
        if (Game.inventory[19] >= 10) {
            if (id != 0) {
                for (var SID2 in SystemMult) { SystemMult[SID2] = random(0, 150000) / 100000; }
                Game.inventory[19] -= 10;
                Game.days++;
                hidesystems();
                Game.system = id;
                $('#system' + id).show();
            } else {
                for (var SID3 in SystemMult) { SystemMult[SID3] = random(1, 1); }
                Game.days++;
                hidesystems();
                Game.system = id;
                $('#system' + id).show();
            }
        } else {
            if (id == 0) {
                for (var SID4 in SystemMult) { SystemMult[SID4] = random(1, 1); }
                Game.days++;
                hidesystems();
                Game.system = id;
                $('#system' + id).show();
            } else {
                alert("Not enough power cell ! (10% are needed to change system)");
            }
        }
    }
}

function buyupgrade(id, buyable, req1, nbr1, req2, nbr2) {
    if (buyable > 0) {
        if (Game.technologies[id] != 1) {
            if (Game.cash >= Technologies[id].cost) {
                Game.inventory[req1] -= nbr1;
                Game.inventory[req2] -= nbr2;
                Game.cash -= Technologies[id].cost;
                if (Technologies[id].type == 0) { Game.cashps += Technologies[id].gain; }
                Game.technologies[id] = 1;
            }
        }
    }

}
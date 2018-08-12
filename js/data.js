var Missions = {
    0: { name: '1', desc: 'Planet', price: 50, itemNBR: 5, money: 5, itemtype: 2, system: 0}, //FOODx1
    1: { name: '2', desc: 'Luna', price: 10, itemNBR: 1, money: 1, itemtype: 0, system: 0}, //WATERx1
    2: { name: '3', desc: 'Luna', price: 10, itemNBR: 1, money: 1, itemtype: 3, system: 0}, //STONEx1
    3: { name: '1', desc: 'Planet', price: 100, itemNBR: 2, money: 10, itemtype: 1, system: 1}, //WOODx1
    4: { name: '2', desc: 'Luna', price: 20, itemNBR: 1, money: 2, itemtype: 4, system: 1}, //METALx1
    5: { name: '3', desc: 'Luna', price: 20, itemNBR: 1, money: 2, itemtype: 5, system: 1}, //CRYSTALx1
    6: { name: '1', desc: 'Sun', price: 200, itemNBR: 5, money: 20, itemtype: 6, system: 1}, // LAVAx1
};

var Station = {
    0: {desc: "A barrel of water", value: 10},
    1: {desc: "A normal wooden log", value: 10},
    2: {desc: "A piece of meat", value: 10},
    3: {desc: "A normal stone", value: 10},
    4: {desc: "A normal metal", value: 10},
    5: {desc: "A common crystal", value: 1500},
    6: {desc: "A liquid lava", value: 200},
};

var SystemMult = {
    0: {0: 0.5, 1: 1, 2: 1, 3: 1, 4: 0.5, 5: 0.5, 6: 1.25},
    1: {0: 1.5, 1: 0.5, 2: 1.25, 3: 1.15, 4: 1, 5: 0.25, 6: 1},
    2: {0: 0,1: 0,2: 0,3: 0,4: 0,5: 0,6: 0},
    3: {0: 0,1: 0,2: 0,3: 0,4: 0,5: 0,6: 0},
    4: {0: 0,1: 0,2: 0,3: 0,4: 0,5: 0,6: 0},
    5: {0: 0,1: 0,2: 0,3: 0,4: 0,5: 0,6: 0},
    6: {0: 0,1: 0,2: 0,3: 0,4: 0,5: 0,6: 0},
}

var texts = {
    systemname: ["Lysen", "Zalas", "Centra", "Decae", "Ilgurd", "Sentori", "Faradis"],
    items: ["Water", "Wood", "Food", "Stone", "Metal", "Crystal", "Lava"]
};
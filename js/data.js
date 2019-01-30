var Missions = {
    //SYSTEM 1    
    0: { name: 'Station', desc: 0, type: 2, nbr: 0.25, system: 0 },
    1: { name: '1', desc: 0, type: 4, nbr: 1, system: 0 },
    2: { name: '2', desc: 1, type: 1, nbr: 1, system: 0 },
    3: { name: '3', desc: 3, type: 0, nbr: 1, system: 0 },
    //SYSTEM 2
    4: { name: 'Station', desc: 0, type: 2, nbr: 0.25, system: 1 },
    5: { name: '1', desc: 0, type: 3, nbr: 10, system: 1 },
    6: { name: '2', desc: 1, type: 5, nbr: 5, system: 1 },
    7: { name: '3', desc: 1, type: 8, nbr: 1, system: 1 },
    8: { name: '4', desc: 2, type: 6, nbr: 1, system: 1 },
    9: { name: '5', desc: 1, type: 14, nbr: 1, system: 1 },
    //SYSTEM 3
    10: { name: 'Station ', desc: 0, type: 2, nbr: 0.25, system: 2 },
    11: { name: '1', desc: 3, type: 11, nbr: 1, system: 2 },
    12: { name: '2', desc: 3, type: 9, nbr: 1, system: 2 },
    13: { name: '3', desc: 3, type: 7, nbr: 2, system: 2 },
    14: { name: '4', desc: 3, type: 10, nbr: 1, system: 2 },
    15: { name: '5', desc: 3, type: 1, nbr: 10, system: 2 },
    16: { name: '6', desc: 3, type: 0, nbr: 10, system: 2 },
    17: { name: '7', desc: 3, type: 8, nbr: 5, system: 2 },
    //SYSTEM 4
    18: { name: 'Station ', desc: 0, type: 2, nbr: 0.25, system: 3 },
    19: { name: '1', desc: 4, type: 15, nbr: 1, system: 3 },
    20: { name: '2', desc: 3, type: 6, nbr: 10, system: 3 },
    21: { name: '3', desc: 3, type: 3, nbr: 25, system: 3 },
    22: { name: '4', desc: 3, type: 4, nbr: 10, system: 3 },
    23: { name: '5', desc: 3, type: 12, nbr: 1, system: 3 },
    //SYSTEM 5
    24: { name: 'Station ', desc: 0, type: 2, nbr: 0.25, system: 4 },
    25: { name: '1', desc: 0, type: 10, nbr: 25, system: 4 },
    26: { name: '2', desc: 1, type: 11, nbr: 10, system: 4 },
    27: { name: '3', desc: 2, type: 8, nbr: 10, system: 4 },
    28: { name: '4', desc: 2, type: 17, nbr: 10, system: 4 },
    29: { name: '5', desc: 3, type: 0, nbr: 50, system: 4 },
    30: { name: '6', desc: 3, type: 1, nbr: 100, system: 4 },
    //SYSTEM 6
    31: { name: 'Station ', desc: 0, type: 2, nbr: 0.25, system: 5 },
    32: { name: '1', desc: 0, type: 9, nbr: 100, system: 5 },
    33: { name: '2', desc: 1, type: 16, nbr: 2, system: 5 },
    34: { name: '3', desc: 1, type: 12, nbr: 10, system: 5 },
    35: { name: '4', desc: 1, type: 8, nbr: 50, system: 5 },
    36: { name: '5', desc: 2, type: 17, nbr: 25, system: 5 },
    //SYSTEM 7
    37: { name: 'Station ', desc: 0, type: 2, nbr: 0.5, system: 6 },
    38: { name: '1', desc: 4, type: 15, nbr: 10, system: 6 },
    39: { name: '2', desc: 2, type: 17, nbr: 50, system: 6 },
    40: { name: '3', desc: 3, type: 16, nbr: 10, system: 6 },
    41: { name: '4', desc: 3, type: 1, nbr: 50, system: 6 },
    42: { name: '5', desc: 3, type: 6, nbr: 50, system: 6 },
    43: { name: '6', desc: 3, type: 12, nbr: 25, system: 6 },
    //SYSTEM 8
    44: { name: 'Station ', desc: 0, type: 2, nbr: 0.5, system: 7 },
    45: { name: '1', desc: 0, type: 8, nbr: 100, system: 7 },
    46: { name: '2', desc: 0, type: 7, nbr: 100, system: 7 },
    47: { name: '3', desc: 1, type: 16, nbr: 50, system: 7 },
    48: { name: '4', desc: 2, type: 14, nbr: 50, system: 7 },
    49: { name: '5', desc: 3, type: 13, nbr: 50, system: 7 },
    50: { name: '6', desc: 3, type: 12, nbr: 50, system: 7 },
    //SYSTEM 9
    51: { name: 'Station ', desc: 0, type: 2, nbr: 1, system: 8 },
    52: { name: '1', desc: 6, type: 19, nbr: 1, system: 8 },
    53: { name: '2', desc: 5, type: 18, nbr: 1, system: 8 },
    54: { name: '3', desc: 5, type: 17, nbr: 100, system: 8 },
    55: { name: '4', desc: 5, type: 14, nbr: 100, system: 8 },
    56: { name: '5', desc: 5, type: 11, nbr: 100, system: 8 },
    57: { name: '6', desc: 5, type: 8, nbr: 200, system: 8 },
    //SYSTEM 10
    58: { name: 'Station ', desc: 0, type: 2, nbr: 1, system: 9 },
    59: { name: '1', desc: 7, type: 10, nbr: 1000, system: 9 },
    60: { name: '2', desc: 6, type: 19, nbr: 10, system: 9 },
    61: { name: '3', desc: 6, type: 18, nbr: 10, system: 9 },
    62: { name: '4', desc: 5, type: 12, nbr: 100, system: 9 },
    63: { name: '5', desc: 5, type: 13, nbr: 100, system: 9 },
};

var Market = {
    0: { desc: "uncommon isotope element", value: 5 }, //THAMIUM9
    1: { desc: "uncommon neutral element", value: 10 }, //COPPER
    2: { desc: "common neutral element", value: 15 }, //POWER CELL
    3: { desc: "uncommon oxide element", value: 20 }, //ZINC 
    4: { desc: "common neutral element", value: 50 }, //NICKEL
    5: { desc: "common oxide element", value: 50 }, //IRON
    6: { desc: "rare neutral element", value: 100 }, //ALUMINIUM
    7: { desc: "uncommon neutral element", value: 500 }, //IRIDIUM
    8: { desc: "rare neutral element", value: 750 }, //GOLD
    9: { desc: "uncommon silicate element", value: 1500 }, //PLATINUM
    10: { desc: "common isotope element", value: 1000 }, //CARBON
    11: { desc: "rare isotope element", value: 5000 }, //PLUTONIUM
    12: { desc: "common silicate element", value: 7500 }, //HERIDIUM
    13: { desc: "rare neutral element", value: 12500 }, //EMERIL
    14: { desc: "rare oxide element", value: 15000 }, //TITANIUM
    15: { desc: "very rare exotic element", value: 50000 }, //ANTIMATTER
    16: { desc: "very rare exotic element", value: 100000 }, //RADNOX
    17: { desc: "very rare exotic element", value: 125000 }, //OMEGON
    18: { desc: "very rare exotic element", value: 1000000 }, //RUBEUM
    19: { desc: "very rare exotic element", value: 10000000 }, //CYMATYGEN
};

var Technologies = {
    0: { name: "Rusty drone I", cost: 100, gain: 0.1, type: 0, need: -1, req: [3, 5], req2: [0, 5] },
    1: { name: "Rusty drone II", cost: 1000, gain: 0.5, type: 0, need: 0, req: [3, 10], req2: [0, 10] },
    2: { name: "Basic drone I", cost: 5000, gain: 1, type: 0, need: 1, req: [3, 20], req2: [4, 20] },
    3: { name: "Basic drone II", cost: 50000, gain: 2.5, type: 0, need: 2, req: [10, 30], req2: [6, 30] },
    4: { name: "Basic drone III", cost: 500000, gain: 5, type: 0, need: 3, req: [10, 50], req2: [7, 50] },
    5: { name: "Advanced drone I", cost: 5000000, gain: 7.5, type: 0, need: 4, req: [10, 100], req2: [12, 100] },
    6: { name: "Advanced drone II", cost: 100000000, gain: 10, type: 0, need: 5, req: [10, 200], req2: [12, 200] },
    7: { name: "Advanced drone III", cost: 10000000000, gain: 15, type: 0, need: 6, req: [16, 150], req2: [11, 250] },
    8: { name: "Alien drone I", cost: 50000000000, gain: 25, type: 0, need: 7, req: [16, 200], req2: [17, 250] },
    9: { name: "Alien drone II", cost: 100000000000, gain: 50, type: 0, need: 8, req: [16, 500], req2: [17, 500] },
};

var Hyperdrive = {
    0: { name: "Hyperdrive", price: 500, gain: 0.25, type: 1, need: -1 },
};

var Hyperspace = {
    0: { name: "Hyperspace", price: 100, gain: 10, type: 1, need: -1 },
};

var texts = {
    systemname: ["Lysen", "Zelas", "Centra", "Vecis", "Ivurd", "Sentori", "Fasis", "Luya", "Kisae", "Gaia"],
    items: ["Thamium9", "Copper", "Power Cell", "Zinc", "Nickel", "Iron", "Aluminium", "Iridium", "Gold", "Platinum", "Carbon", "Plutonium", "Heridium", "Emeril", "Titanium", "Antimatter", "Radnox", "Omegon", "Rubeum", "Cymatygen",]
};

var tutorials = {
    0: { title: "How to play ?", text: "<h4>The objective is to get materials then sell them to buy technologies to improve the render</h4>1. You can start by making money with an exploration mission,<br>2. Sell your merchandises to the space market.<br>3. Create the 'Rusty Drone I' in the technologies.", },
    1: { title: "Exploration", text: "The exploration is the main objective,<br> by exploring you will be able to discover new locations and materials.<br><br><h4>The sizes (quantity) in the exploration missions</h4>- <span class='noir'>Tiny</span> inferior to 1.<br>- <span class='jaune'>Very small</span> Equal to 1.<br>- <span class='bleu'>Small</span> Inferior to 11<br>- <span class='violet'>Large</span> Inferior to 50<br>- <span class='rose'>Big</span> Inferior to 100<br>- <span class='rouge'>Huge</span> Inferior to 1000<br>- <span class='vert'>Massive</span> Upper than 999.<br>", },
    2: { title: "Market", text: "The market is the place to sell all your merchandises and get some money,<br> the prices are differents on every system & change every days.<br><br>There is a color code to indicate the values of every material:<br>- <span class='rouge'>Low</span><br>- <span class='argent'>Normal</span><br>- <span class='vert'>High</span><br>- <span class='Gold'>Expensive</span>", },
    3: { title: "Technologies", text: "3 Technologies are unlockables<br>- A drone that gives a certain amount of the defined item, depending of your current drone level.<br> - An hyperspace module that can unlock new locations.<br>- An hyperdrive module that can reduce the cost to travel to another location.", },
    4: { title: "Game menu", text: "There is also a menu where you can export/import or reset your savegame or re-open this guide.<br>Just click on Menu on the upper left corner of the screen.", },
};

function SetColor(value) {
    var color;
    var text;
    if (value < 1) { color = 'noir'; }
    if (value == 1) { color = 'jaune'; }
    if (value > 1) { if (value < 11) { color = 'bleu'; } }
    if (value > 10) { if (value < 50) { color = 'violet'; } }
    if (value > 49) { if (value < 100) { color = 'rose'; } }
    if (value > 99) { if (value < 1000) { color = 'rouge'; } }
    if (value > 999) { color = 'vert'; }
    return color;
}

function SetColorText(value) {
    var color;
    var text;
    if (value < 1) { text = 'Tiny'; }
    if (value == 1) { text = 'Very small'; }
    if (value > 1) { if (value < 11) { text = 'Small'; } }
    if (value > 10) { if (value < 50) { text = 'Large'; } }
    if (value > 49) { if (value < 100) { text = 'Big'; } }
    if (value > 99) { if (value < 1000) { text = 'Huge'; } }
    if (value > 999) { text = 'Massive'; }
    return text;
}

var fr = {

};
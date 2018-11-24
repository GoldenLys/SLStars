var Missions = {
    //SYSTEM 1    
    0: { name: 'Station', desc: 0, type: 19, nbr: 0.1, system: 0 },
    1: { name: '1', desc: 0, type: 2, nbr: 1, system: 0 },
    2: { name: '2', desc: 1, type: 0, nbr: 1, system: 0 },
    3: { name: '3', desc: 3, type: 3, nbr: 1, system: 0 },
    //SYSTEM 2
    4: { name: 'Station', desc: 0, type: 19, nbr: 0.1, system: 1 },
    5: { name: '1', desc: 0, type: 1, nbr: 10, system: 1 },
    6: { name: '2', desc: 1, type: 4, nbr: 5, system: 1 },
    7: { name: '3', desc: 1, type: 5, nbr: 1, system: 1 },
    8: { name: '4', desc: 2, type: 6, nbr: 1, system: 1 },
    9: { name: '5', desc: 1, type: 12, nbr: 1, system: 1 },
    //SYSTEM 3
    10: { name: 'Station ', desc: 0, type: 19, nbr: 0.1, system: 2 },
    11: { name: '1', desc: 3, type: 10, nbr: 1, system: 2 },
    12: { name: '2', desc: 3, type: 7, nbr: 1, system: 2 },
    13: { name: '3', desc: 3, type: 8, nbr: 2, system: 2 },
    14: { name: '4', desc: 3, type: 9, nbr: 1, system: 2 },
    15: { name: '5', desc: 3, type: 0, nbr: 10, system: 2 },
    16: { name: '6', desc: 3, type: 3, nbr: 10, system: 2 },
    17: { name: '7', desc: 3, type: 5, nbr: 5, system: 2 },
    //SYSTEM 4
    18: { name: 'Station ', desc: 0, type: 19, nbr: 0.1, system: 3 },
    19: { name: '1', desc: 4, type: 11, nbr: 1, system: 3 },
    20: { name: '2', desc: 3, type: 6, nbr: 10, system: 3 },
    21: { name: '3', desc: 3, type: 1, nbr: 25, system: 3 },
    22: { name: '4', desc: 3, type: 2, nbr: 10, system: 3 },
    //SYSTEM 5
    23: { name: 'Station ', desc: 0, type: 19, nbr: 0.1, system: 4 },
    24: { name: '1', desc: 0, type: 9, nbr: 25, system: 4 },
    25: { name: '2', desc: 1, type: 10, nbr: 10, system: 4 },
    26: { name: '3', desc: 2, type: 5, nbr: 10, system: 4 },
    27: { name: '4', desc: 2, type: 16, nbr: 10, system: 4 },
    28: { name: '5', desc: 3, type: 3, nbr: 50, system: 4 },
    29: { name: '6', desc: 3, type: 0, nbr: 100, system: 4 },
    //SYSTEM 6
    30: { name: 'Station ', desc: 0, type: 19, nbr: 0.1, system: 5 },
    31: { name: '1', desc: 0, type: 9, nbr: 100, system: 5 },
    32: { name: '2', desc: 1, type: 14, nbr: 2, system: 5 },
    33: { name: '3', desc: 1, type: 13, nbr: 10, system: 5 },
    34: { name: '4', desc: 1, type: 5, nbr: 50, system: 5 },
    35: { name: '5', desc: 2, type: 16, nbr: 25, system: 5 },
    //SYSTEM 7
    36: { name: 'Station ', desc: 0, type: 19, nbr: 0.1, system: 6 },
    37: { name: '1', desc: 4, type: 11, nbr: 10, system: 6 },
    38: { name: '2', desc: 2, type: 16, nbr: 50, system: 6 },
    39: { name: '3', desc: 3, type: 14, nbr: 10, system: 6 },
    40: { name: '4', desc: 3, type: 0, nbr: 50, system: 6 },
    41: { name: '5', desc: 3, type: 6, nbr: 50, system: 6 },
    42: { name: '6', desc: 3, type: 13, nbr: 50, system: 6 },
    //SYSTEM 8
    43: { name: 'Station ', desc: 0, type: 19, nbr: 0.1, system: 7 },
    44: { name: '1', desc: 0, type: 5, nbr: 100, system: 7 },
    45: { name: '2', desc: 0, type: 8, nbr: 100, system: 7 },
    46: { name: '3', desc: 1, type: 14, nbr: 50, system: 7 },
    47: { name: '4', desc: 2, type: 12, nbr: 50, system: 7 },
    48: { name: '5', desc: 3, type: 15, nbr: 50, system: 7 },
    49: { name: '6', desc: 3, type: 13, nbr: 50, system: 7 },
    //SYSTEM 9
    50: { name: 'Station ', desc: 0, type: 19, nbr: 0.1, system: 8 },
    51: { name: '1', desc: 6, type: 17, nbr: 1, system: 8 },
    52: { name: '2', desc: 5, type: 18, nbr: 1, system: 8 },
    53: { name: '3', desc: 5, type: 16, nbr: 100, system: 8 },
    54: { name: '4', desc: 5, type: 12, nbr: 100, system: 8 },
    55: { name: '5', desc: 5, type: 10, nbr: 100, system: 8 },
    56: { name: '6', desc: 5, type: 5, nbr: 200, system: 8 },
    //SYSTEM 10
    57: { name: 'Station ', desc: 0, type: 19, nbr: 0.1, system: 9 },
    58: { name: '1', desc: 7, type: 9, nbr: 1000, system: 9 },
    59: { name: '2', desc: 6, type: 17, nbr: 10, system: 9 },
    60: { name: '3', desc: 6, type: 18, nbr: 10, system: 9 },
    61: { name: '4', desc: 5, type: 13, nbr: 100, system: 9 },
    62: { name: '5', desc: 5, type: 15, nbr: 100, system: 9 },
};

var Market = {
    0: { desc: "uncommon neutral element", value: 10 }, //COPPER
    1: { desc: "uncommon oxide element", value: 20 }, //ZINC 
    2: { desc: "common neutral element", value: 50 }, //NICKEL
    3: { desc: "uncommon isotope element", value: 5 }, //THAMIUM9
    4: { desc: "common oxide element", value: 50 }, //IRON
    5: { desc: "rare neutral element", value: 500 }, //GOLD
    6: { desc: "rare neutral element", value: 100 }, //ALUMINIUM
    7: { desc: "uncommon silicate element", value: 1500 }, //PLATINUM
    8: { desc: "uncommon neutral element", value: 500 }, //IRIDIUM
    9: { desc: "commom isotope element", value: 1000 }, //CARBON
    10: { desc: "rare isotope element", value: 5000 }, //PLUTONIUM
    11: { desc: "very rare exotic element", value: 50000 }, //ANTIMATTER
    12: { desc: "rare oxide element", value: 25000 }, //TITANIUM
    13: { desc: "commom silicate element", value: 10000 }, //HERIDIUM
    14: { desc: "very rare exotic element", value: 100000 }, //RADNOX
    15: { desc: "rare neutral element", value: 15000 }, //EMERIL
    16: { desc: "very rare exotic element", value: 125000 }, //OMEGON
    17: { desc: "very rare exotic element", value: 10000000 }, //CYMATYGEN
    18: { desc: "very rare exotic element", value: 1000000 }, //RUBEUM
    19: { desc: "common element", value: 15 }, //POWER CELL
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

var Upgrades = {
    0: { name: "Hyperspace", price: 100, gain: 0.25, type: 1, need: -1 },
};

var SystemMult = { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1 };

var texts = {
    systemname: ["Lysen", "Zelas", "Centra", "Vecis", "Ivurd", "Sentori", "Fasis", "Luya", "Kisae", "Gaia"],
    items: ["Copper", "Zinc", "Nickel", "Thamium9", "Iron", "Gold", "Aluminium", "Platinum", "Iridium", "Carbon", "Plutonium", "Antimatter", "Titanium", "Heridium", "Radnox", "Emeril", "Omegon", "Cymatygen", "Rubeum", "Power Cell"]
};

var tutorials = {
    0: { title: "How to play ?", text: "You can start by making money with an exploration mission,<br> then sell your merchandise to the space market.", },
    1: { title: "Exploration", text: "The exploration is a first objective in the game,<br> by exploring you will be able to discover new locations & technologies.", },
    2: { title: "Market", text: "The space market is THE place to be rich,<br> the prices are differents on every system & change every days.", },
    3: { title: "Technologies", text: "Technologies can enable an auto-extraction of ressources and unlock new locations.", },
};

var fr = {

};
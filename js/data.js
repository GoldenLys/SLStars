var Missions = {
    0: { name: '1', desc: 'Planet', price: 50, type: 2, nbr: 1, system: 0 },
    1: { name: '2', desc: 'Moon', price: 10, type: 0, nbr: 1, system: 0 },
    2: { name: '3', desc: 'Asteroid', price: 25, type: 3, nbr: 1, system: 0 }, //SYSTEM 1

    3: { name: '1', desc: 'Planet', price: 100, type: 1, nbr: 10, system: 1 },
    4: { name: '2', desc: 'Moon', price: 100, type: 4, nbr: 5, system: 1 },
    5: { name: '3', desc: 'Moon', price: 450, type: 5, nbr: 1, system: 1 },
    6: { name: '4', desc: 'Sun', price: 150, type: 6, nbr: 1, system: 1 }, //SYSTEM 2

    7: { name: '1', desc: 'Planet', price: 4500, type: 10, nbr: 1, system: 2 },
    8: { name: '2', desc: 'Planet', price: 1500, type: 7, nbr: 1, system: 2 },
    9: { name: '3', desc: 'Planet', price: 950, type: 8, nbr: 2, system: 2 },
    10: { name: '4', desc: 'Moon', price: 1250, type: 9, nbr: 1, system: 2 },
    11: { name: '5', desc: 'Moon', price: 150, type: 0, nbr: 10, system: 2 },
    12: { name: '6', desc: 'Asteroid', price: 500, type: 3, nbr: 10, system: 2 },
    13: { name: '7', desc: 'Asteroid', price: 5000, type: 5, nbr: 5, system: 2 }, //SYSTEM 3

    14: { name: '1', desc: 'Black Hole', price: 25000, type: 11, nbr: 1, system: 3 },
    15: { name: '2', desc: 'Asteroid', price: 1500, type: 6, nbr: 10, system: 3 },
    16: { name: '3', desc: 'Asteroid', price: 250, type: 1, nbr: 25, system: 3 },
    17: { name: '4', desc: 'Asteroid', price: 500, type: 2, nbr: 10, system: 3 }, //SYSTEM 4

    18: { name: '1', desc: 'Planet', price: 22500, type: 9, nbr: 25, system: 4 },
    19: { name: '2', desc: 'Moon', price: 45000, type: 10, nbr: 10, system: 4 },
    20: { name: '3', desc: 'Sun', price: 5000, type: 5, nbr: 10, system: 4 },
    21: { name: '4', desc: 'Sun', price: 1000000, type: 16, nbr: 10, system: 4 },
    22: { name: '5', desc: 'Asteroid', price: 1250, type: 3, nbr: 50, system: 4 },
    23: { name: '6', desc: 'Asteroid', price: 1000, type: 0, nbr: 100, system: 4 }, //SYSTEM 5

    24: { name: '1', desc: 'Planet', price: 95000, type: 9, nbr: 100, system: 5 },
    25: { name: '2', desc: 'Moon', price: 200000, type: 14, nbr: 2, system: 5 },
    26: { name: '3', desc: 'Moon', price: 100000, type: 13, nbr: 10, system: 5 },
    27: { name: '4', desc: 'Moon', price: 25000, type: 5, nbr: 50, system: 5 },
    28: { name: '5', desc: 'Sun', price: 3000000, type: 16, nbr: 25, system: 5 }, //SYSTEM 6

    29: { name: '1', desc: 'Black Hole', price: 225000, type: 11, nbr: 10, system: 6 },
    30: { name: '2', desc: 'Sun', price: 6000000, type: 16, nbr: 50, system: 6 },
    31: { name: '3', desc: 'Asteroid', price: 950000, type: 14, nbr: 10, system: 6 },
    32: { name: '4', desc: 'Asteroid', price: 600, type: 0, nbr: 50, system: 6 },
    33: { name: '5', desc: 'Asteroid', price: 5000, type: 6, nbr: 50, system: 6 },
    34: { name: '6', desc: 'Asteroid', price: 500000, type: 13, nbr: 50, system: 6 }, //SYSTEM 7

    35: { name: '1', desc: 'Planet', price: 50000, type: 5, nbr: 100, system: 7 },
    36: { name: '2', desc: 'Planet', price: 50000, type: 8, nbr: 100, system: 7 },
    37: { name: '3', desc: 'Moon', price: 5000000, type: 14, nbr: 50, system: 7 },
    38: { name: '4', desc: 'Sun', price: 1250000, type: 12, nbr: 50, system: 7 },
    39: { name: '5', desc: 'Asteroid', price: 750000, type: 15, nbr: 50, system: 7 },
    40: { name: '6', desc: 'Asteroid', price: 500000, type: 13, nbr: 50, system: 7 }, //SYSTEM 8

    41: { name: '1', desc: 'Alien flagship', price: 10000000, type: 17, nbr: 1, system: 8 },
    42: { name: '2', desc: 'Alien spaceship', price: 1000000, type: 18, nbr: 1, system: 8 },
    43: { name: '3', desc: 'Alien spaceship', price: 13000000, type: 16, nbr: 100, system: 8 },
    44: { name: '4', desc: 'Alien spaceship', price: 3000000, type: 12, nbr: 100, system: 8 },
    45: { name: '5', desc: 'Alien spaceship', price: 550000, type: 10, nbr: 100, system: 8 }, 
    46: { name: '6', desc: 'Alien spaceship', price: 125000, type: 5, nbr: 200, system: 8 }, //SYSTEM 9

    47: { name: '1', desc: 'Alien planet', price: 1250000, type: 9, nbr: 1000, system: 9 },
    48: { name: '2', desc: 'Alien flagship', price: 110000000, type: 17, nbr: 10, system: 9 },
    49: { name: '2', desc: 'Alien flagship', price: 9500000, type: 18, nbr: 10, system: 9 },
    50: { name: '3', desc: 'Alien spaceship', price: 1000000, type: 13, nbr: 100, system: 9 },
    51: { name: '4', desc: 'Alien spaceship', price: 1600000, type: 15, nbr: 100, system: 9 }, //SYSTEM 10
};

var Market = {
    0: { desc: "uncommon neutral element", value: 12.5 }, //COPPER
    1: { desc: "uncommon oxide element", value: 10 }, //ZINC 
    2: { desc: "common neutral element", value: 50 }, //NICKEL
    3: { desc: "uncommon isotope element", value: 30 }, //THAMIUM9
    4: { desc: "common oxide element", value: 20 }, //IRON
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
};

var Technologies = {
    0: { name: "Rusty mining drone", desc: "A mining drone", cost: 100, gain: 1, type: 0, req1: 3, nbr1: 5, req2: 0, nbr2: 5, },
    1: { name: "Basic mining drone", desc: "A mining drone", cost: 1000, gain: 9, type: 0, req1: 3, nbr1: 10, req2: 4, nbr2: 10, },
    2: { name: "Basic mining drone MK2", desc: "A mining drone", cost: 5000, gain: 40, type: 0, req1: 3, nbr1: 20, req2: 4, nbr2: 20, },
    3: { name: "Advanced mining drone", desc: "A mining drone", cost: 50000, gain: 450, type: 0, req1: 10, nbr1: 30, req2: 6, nbr2: 30, },
    4: { name: "Alien mining drone", desc: "A mining drone", cost: 500000, gain: 4500, type: 0, req1: 10, nbr1: 50, req2: 7, nbr2: 50, },
    5: { name: "Advanced alien mining drone", desc: "A mining drone", cost: 5000000, gain: 45000, type: 0, req1: 10, nbr1: 100, req2: 12, nbr2: 100, },
    6: { name: "Advanced alien mining drone MK2", desc: "A mining drone", cost: 100000000, gain: 950000, type: 0, req1: 10, nbr1: 200, req2: 12, nbr2: 200, },
    7: { name: "Dimensional mining drone", desc: "A mining drone", cost: 10000000000, gain: 99000000, type: 0, req1: 16, nbr1: 500, req2: 11, nbr2: 500, },
    8: { name: "Time mining drone", desc: "A mining drone", cost: 100000000000, gain: 901000000, type: 0, req1: 16, nbr1: 1000, req2: 17, nbr2: 1000, },
};

var SystemMult = {
    0: { 0: 1, 1: 1, 2: 1.25, 3: 1, 4: 0.5, 5: 0.5, 6: 1.25, 7: 1, 8: 1, 9: 0.5, 10: 0.5, 11: 0.5, 12: 0.75, 13: 1, 14: 0.5, 15: 1.15, 16: 1, 17: 0, 18: 0.25 },
    1: { 0: 1.5, 1: 0.5, 2: 1.25, 3: 1.15, 4: 1, 5: 0.25, 6: 1, 7: 1, 8: 0.5, 9: 0.75, 10: 1, 11: 1.75, 12: 1, 13: 1.15, 14: 0.75, 15: 2, 16: 0.75, 17: 0.5, 18: 0.25 },
    2: { 0: 0.75, 1: 0.75, 2: 0.5, 3: 0.5, 4: 1, 5: 1, 6: 0, 7: 1, 8: 1, 9: 1, 10: 0.75, 11: 0.75, 12: 1.75, 13: 0.75, 14: 0.75, 15: 1.5, 16: 0.5, 17: 0.5, 18: 0.5 },
    3: { 0: 1.25, 1: 2, 2: 0.5, 3: 1, 4: 1, 5: 0.75, 6: 0.75, 7: 1, 8: 1.15, 9: 1, 10: 1, 11: 1, 12: 0.75, 13: 0.75, 14: 0.75, 15: 1.15, 16: 1, 17: 0.85, 18: 0.75 },
    4: { 0: 0.5, 1: 1, 2: 0, 3: 0.75, 4: 1, 5: 0.5, 6: 1.75, 7: 1.5, 8: 0.75, 9: 0.5, 10: 1.25, 11: 1.5, 12: 1.5, 13: 0.5, 14: 0.5, 15: 1, 16: 1.15, 17: 0.5, 18: 0.75 },
    5: { 0: 0.5, 1: 2.5, 2: 0.5, 3: 1, 4: 1.5, 5: 0, 6: 0, 7: 1, 8: 1, 9: 1, 10: 1.5, 11: 0.5, 12: 0.75, 13: 0.75, 14: 1, 15: 0.5, 16: 1.5, 17: 1, 18: 1 },
    6: { 0: 0.5, 1: 0.75, 2: 0.5, 3: 1.25, 4: 1.25, 5: 0.75, 6: 0.5, 7: 1, 8: 1, 9: 1, 10: 0.75, 11: 0.5, 12: 0.5, 13: 1, 14: 1.5, 15: 0.75, 16: 2, 17: 1.5, 18: 1 },
    7: { 0: 0.75, 1: 0.75, 2: 0.5, 3: 1.24, 4: 1.5, 5: 1, 6: 1.5, 7: 1, 8: 1.25, 9: 1, 10: 1.25, 11: 0.75, 12: 0, 13: 1.5, 14: 0.75, 15: 0.75, 16: 1.15, 17: 1.25, 18: 1.5 },
    8: { 0: 2, 1: 0.75, 2: 0.5, 3: 0.5, 4: 0.5, 5: 2.5, 6: 0.5, 7: 1, 8: 1, 9: 2, 10: 3, 11: 2, 12: 0.5, 13: 1.15, 14: 2.5, 15: 0.5, 16: 1, 17: 1.75, 18: 1.75 },
    9: { 0: 10, 1: 10, 2: 10, 3: 10, 4: 10, 5: 5, 6: 5, 7: 0.75, 8: 1.25, 9: 1.75, 10: 1.5, 11: 1, 12: 0.25, 13: 1, 14: 1.75, 15: 0.25, 16: 0, 17: 0.75, 18: 0.75 },
};

var texts = {
    systemname: ["Lysen", "Zelas", "Centra", "Vecis", "Ivurd", "Sentori", "Fasis", "Luya", "Kisae", "Gaia"],
    items: ["Copper", "Zinc", "Nickel", "Thamium9", "Iron", "Gold", "Aluminium", "Platinum", "Iridium", "Carbon", "Plutonium", "Antimatter", "Titanium", "Heridium", "Radnox", "Emeril", "Omegon", "Cymatygen", "Rubeum"]
};
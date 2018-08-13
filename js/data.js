var Missions = {
    0: { name: '1', desc: 'Planet', price: 50, money: 5, type: 2, nbr: 1, system: 0 }, 
    1: { name: '2', desc: 'Moon', price: 10, money: 1, type: 0, nbr: 1, system: 0 },
    2: { name: '3', desc: 'Asteroid', price: 25, money: 2.5, type: 3, nbr: 1, system: 0 }, //SYSTEM 1

    3: { name: '1', desc: 'Planet', price: 100, money: 10, type: 1, nbr: 10, system: 1 }, 
    4: { name: '2', desc: 'Moon', price: 100, money: 10, type: 4, nbr: 5, system: 1 },
    5: { name: '3', desc: 'Moon', price: 450, money: 45, type: 5, nbr: 1, system: 1 },
    6: { name: '4', desc: 'Sun', price: 2000, money: 200, type: 6, nbr: 4, system: 1 }, //SYSTEM 2

    7: { name: '1', desc: 'Planet', price: 4500, money: 450, type: 10, nbr: 1, system: 2 }, 
    8: { name: '2', desc: 'Planet', price: 1500, money: 150, type: 7, nbr: 1, system: 2 },
    9: { name: '3', desc: 'Planet', price: 950, money: 95, type: 8, nbr: 2, system: 2 },
    10: { name: '4', desc: 'Moon', price: 1250, money: 125, type: 9, nbr: 1, system: 2 },
    11: { name: '5', desc: 'Moon', price: 150, money: 15, type: 0, nbr: 10, system: 2 },
    12: { name: '6', desc: 'Asteroid', price: 500, money: 50, type: 3, nbr: 10, system: 2 },
    13: { name: '7', desc: 'Asteroid', price: 5000, money: 500, type: 5, nbr: 5, system: 2 }, //SYSTEM 3

    14: { name: '1', desc: 'Black Hole', price: 25000, money: 2500, type: 11, nbr: 1, system: 3 },
    15: { name: '2', desc: 'Asteroid', price: 1000000, money: 100000, type: 15, nbr: 10, system: 3 }, //SYSTEM 4

    16: { name: '1', desc: 'Planet', price: 22500, money: 2250, type: 9, nbr: 25, system: 4 },
    17: { name: '2', desc: 'Moon', price: 45000, money: 4500, type: 10, nbr: 10, system: 4 },
    18: { name: '3', desc: 'Sun', price: 5000, money: 500, type: 5, nbr: 10, system: 4 },
    19: { name: '4', desc: 'Sun', price: 1000000, money: 100000, type: 16, nbr: 10, system: 4 },
    20: { name: '5', desc: 'Asteroid', price: 1250, money: 125, type: 3, nbr: 50, system: 4 },
    21: { name: '6', desc: 'Asteroid', price: 1000, money: 100, type: 0, nbr: 100, system: 4 }, //SYSTEM 5
   
    22: { name: '1', desc: 'Planet', price: 95000, money: 9500, type: 9, nbr: 100, system: 5 }, 
    23: { name: '2', desc: 'Moon', price: 200000, money: 20000, type: 14, nbr: 2, system: 5 },
    24: { name: '3', desc: 'Moon', price: 100000, money: 10000, type: 13, nbr: 10, system: 5 },
    25: { name: '4', desc: 'Moon', price: 25000, money: 2500, type: 5, nbr: 50, system: 5 },
    26: { name: '5', desc: 'Sun', price: 3000000, money: 300000, type: 16, nbr: 25, system: 5 }, //SYSTEM 5
};

var Station = {
    0: { desc: "uncommon neutral element", value: 12.5 }, //COPPER
    1: { desc: "uncommon oxide element", value: 10 }, //ZINC 
    2: { desc: "common neutral element", value: 50 }, //NICKEL
    3: { desc: "uncommon isotope element", value: 30 }, //THAMIUM9
    4: { desc: "common oxide element", value: 20 }, //IRON
    5: { desc: "rare neutral element", value: 500 }, //GOLD
    6: { desc: "rare neutral element", value: 500 }, //ALUMINIUM
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
};

var SystemMult = {
    0: { 0: 0.5, 1: 1, 2: 1, 3: 1, 4: 0.5, 5: 0.5, 6: 1.25, 7: 1, 8: 1, 9: 0.5, 10: 0.5, 11: 0.5, 12: 0.75, 13: 1, 14: 0.5, 15: 1.15, 16: 1 },
    1: { 0: 1.5, 1: 0.5, 2: 1.25, 3: 1.15, 4: 1, 5: 0.25, 6: 1, 7: 1, 8: 0.5, 9: 0.5, 10: 1, 11: 1.75, 12: 1, 13: 1.15, 14: 0.75, 15: 2, 16: 0.75 },
    2: { 0: 0.75, 1: 0.75, 2: 0.5, 3: 0.5, 4: 1, 5: 1, 6: 0, 7: 1, 8: 1, 9: 1, 10: 0.75, 11: 0.75, 12: 1.75, 13: 0.75, 14: 0.75, 15: 1.5, 16: 0.5 },
    3: { 0: 1.25, 1: 2, 2: 0.5, 3: 1, 4: 1, 5: 0.75, 6: 0.75, 7: 1, 8: 1.15, 9: 1, 10: 1, 11: 1, 12: 0.75, 13: 0.75, 14: 0.75, 15: 1.15, 16: 1 },
    4: { 0: 0.5, 1: 1, 2: 0, 3: 0.75, 4: 1, 5: 0.5, 6: 1.75, 7: 1.5, 8: 0.75, 9: 0.5, 10: 1.25, 11: 1.5, 12: 1.5, 13: 0.5, 14: 0.5, 15: 1, 16: 1.15 },
    5: { 0: 0.5, 1: 2.5, 2: 0.5, 3: 1, 4: 1.5, 5: 0, 6: 0, 7: 1, 8: 1, 9: 1, 10: 0.5, 11: 0.5, 12: 0.75, 13: 0.75, 14: 1, 15: 0.5, 16: 1.5 },
    6: { 0: 0.5, 1: 0.75, 2: 0.5, 3: 1.25, 4: 1.25, 5: 0.75, 6: 0.5, 7: 1, 8: 1, 9: 1, 10: 0.75, 11: 0.5, 12: 0.5, 13: 1, 14: 1.5, 15: 0.75, 16: 2 },
    7: { 0: 0.75, 1: 0.75, 2: 0.5, 3: 1.24, 4: 1.5, 5: 1, 6: 1.5, 7: 1, 8: 1, 9: 1, 10: 1.25, 11: 0.75, 12: 0, 13: 1.5, 14: 0.75, 15: 0.75, 16: 1.15 },
    8: { 0: 2, 1: 0.75, 2: 0.5, 3: 0.5, 4: 0.5, 5: 2.5, 6: 0.5, 7: 1, 8: 1, 9: 1, 10: 3, 11: 2, 12: 0.5, 13: 1.15, 14: 2.5, 15: 0.5, 16: 1 },
};

var texts = {
    systemname: ["Lysen", "Zalas", "Centra", "Vecis", "Ilgurd", "Sentori", "Faradis", "Luria", "Kishae"],
    items: ["Copper", "Zinc", "Nickel", "Thamium9", "Iron", "Gold", "Aluminium", "Platinum", "Iridium", "Carbon", "Plutonium", "Antimatter", "Titanium", "Heridium", "Radnox", "Emeril", "Omegon"]
};
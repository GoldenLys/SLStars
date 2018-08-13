var Missions = {
    0: { name: '1', desc: 'Planet', price: 50, money: 5, type: 2, nbr: 1, system: 0 }, //SYSTEM 1
    1: { name: '2', desc: 'Moon', price: 10, money: 1, type: 0, nbr: 1, system: 0 },
    2: { name: '3', desc: 'Asteroid', price: 10, money: 1, type: 3, nbr: 1, system: 0 },
    3: { name: '1', desc: 'Planet', price: 100, money: 10, type: 1, nbr: 10, system: 1 }, //SYSTEM 2
    4: { name: '2', desc: 'Moon', price: 50, money: 5, type: 4, nbr: 5, system: 1 },
    5: { name: '3', desc: 'Moon', price: 500, money: 50, type: 5, nbr: 1, system: 1 },
    6: { name: '4', desc: 'Sun', price: 1000, money: 100, type: 6, nbr: 4, system: 1 },
    7: { name: '1', desc: 'Planet', price: 4500, money: 450, type: 10, nbr: 1, system: 2 }, //SYSTEM 2
    8: { name: '2', desc: 'Planet', price: 1750, money: 175, type: 7, nbr: 1, system: 2 },
    9: { name: '3', desc: 'Planet', price: 1000, money: 100, type: 8, nbr: 1, system: 2 },
    10: { name: '4', desc: 'Moon', price: 1250, money: 125, type: 9, nbr: 1, system: 2 },
    11: { name: '5', desc: 'Moon', price: 100, money: 10, type: 0, nbr: 10, system: 2 },
    12: { name: '6', desc: 'Asteroid', price: 500, money: 50, type: 3, nbr: 10, system: 2 },
    13: { name: '7', desc: 'Asteroid', price: 5000, money: 500, type: 5, nbr: 5, system: 2 },
    14: { name: '1', desc: 'Black Hole', price: 25000, money: 2500, type: 11, nbr: 1, system: 3 }, //SYSTEM 4
};

var Station = {
    0: { desc: "uncommon neutral element", value: 10 }, //COPPER
    1: { desc: "uncommon oxide element", value: 10 }, //ZINC 
    2: { desc: "common neutral element", value: 10 }, //NiCKEL
    3: { desc: "uncommon isotope element", value: 10 }, //THAMIUM9
    4: { desc: "common oxide element", value: 10 }, //IRON
    5: { desc: "rare neutral element", value: 500 }, //GOLD
    6: { desc: "rare neutral element", value: 500 }, //ALUMINIUM
    7: { desc: "uncommon silicate element", value: 1600 }, //PLATINUM
    8: { desc: "uncommon neutral element", value: 500 }, //IRIDIUM
    9: { desc: "commom isotope element", value: 1000 }, //CARBON
    10: { desc: "rare isotope element", value: 5000 }, //PLUTONIUM
    11: { desc: "very rare exotic element", value: 50000 }, //ANTIMATTER
};

var SystemMult = {
    0: { 0: 0.5, 1: 1, 2: 1, 3: 1, 4: 0.5, 5: 0.5, 6: 1.25, 7: 1, 8: 1, 9: 0.5, 10: 0.5, 11: 0.5 },
    1: { 0: 1.5, 1: 0.5, 2: 1.25, 3: 1.15, 4: 1, 5: 0.25, 6: 1, 7: 1, 8: 0.5, 9: 0.5, 10: 1, 11: 1.75 },
    2: { 0: 0.75, 1: 0.75, 2: 0.5, 3: 0.5, 4: 1, 5: 1, 6: 0, 7: 1, 8: 1, 9: 1, 10: 0.75, 11: 0.75 },
    3: { 0: 1.25, 1: 2, 2: 0.5, 3: 1, 4: 1, 5: 0.75, 6: 0.75, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1 },
    4: { 0: 0.5, 1: 1, 2: 0, 3: 0, 4: 1, 5: 0.5, 6: 1.75, 7: 1, 8: 1, 9: 1, 10: 1.25, 11: 1.5 },
    5: { 0: 0.5, 1: 2.5, 2: 0.5, 3: 1, 4: 1.5, 5: 0, 6: 0, 7: 1, 8: 1, 9: 1, 10: 0.5, 11: 0.5 },
    6: { 0: 0.5, 1: 0.75, 2: 0.5, 3: 1.25, 4: 1.25, 5: 0.75, 6: 0.5, 7: 1, 8: 1, 9: 1, 10: 0.75, 11: 0.5 },
    7: { 0: 0.75, 1: 0.75, 2: 0.5, 3: 1.24, 4: 1.5, 5: 1, 6: 1.5, 7: 1, 8: 1, 9: 1, 10: 1.25, 11: 0.75 },
    8: { 0: 2, 1: 0.75, 2: 0.5, 3: 0.5, 4: 0.5, 5: 2.5, 6: 0.5, 7: 1, 8: 1, 9: 1, 10: 3, 11: 2 },
};

var texts = {
    systemname: ["Lysen", "Zalas", "Centra", "Vecis", "Ilgurd", "Sentori", "Faradis", "Luria", "Kishae"],
    items: ["Copper", "Zinc", "Nickel", "Thamium9", "Iron", "Gold", "Aluminium", "Platinum", "Iridium", "Carbon", "Plutonium", "Antimatter"]
};
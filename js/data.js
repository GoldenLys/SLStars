var Missions = {
  //SYSTEM 1
  0: { name: "Station", desc: 0, type: 2, nbr: 0.25, system: 0 },
  1: { name: "1", desc: 0, type: 4, nbr: 1, system: 0 },
  2: { name: "2", desc: 1, type: 1, nbr: 1, system: 0 },
  3: { name: "3", desc: 3, type: 0, nbr: 1, system: 0 },
  //SYSTEM 2
  4: { name: "Station", desc: 0, type: 2, nbr: 0.25, system: 1 },
  5: { name: "1", desc: 0, type: 3, nbr: 1, system: 1 },
  6: { name: "2", desc: 1, type: 5, nbr: 1, system: 1 },
  7: { name: "3", desc: 1, type: 8, nbr: 1, system: 1 },
  8: { name: "4", desc: 2, type: 6, nbr: 1, system: 1 },
  9: { name: "5", desc: 1, type: 14, nbr: 1, system: 1 },
  //SYSTEM 3
  10: { name: "Station ", desc: 0, type: 2, nbr: 0.25, system: 2 },
  11: { name: "1", desc: 3, type: 11, nbr: 1, system: 2 },
  12: { name: "2", desc: 3, type: 9, nbr: 1, system: 2 },
  13: { name: "3", desc: 3, type: 7, nbr: 1, system: 2 },
  14: { name: "4", desc: 3, type: 10, nbr: 1, system: 2 },
  15: { name: "5", desc: 3, type: 1, nbr: 1, system: 2 },
  16: { name: "6", desc: 3, type: 0, nbr: 1, system: 2 },
  17: { name: "7", desc: 3, type: 8, nbr: 1, system: 2 },
  //SYSTEM 4
  18: { name: "Station ", desc: 0, type: 2, nbr: 0.25, system: 3 },
  19: { name: "1", desc: 4, type: 15, nbr: 1, system: 3 },
  20: { name: "2", desc: 3, type: 6, nbr: 1, system: 3 },
  21: { name: "3", desc: 3, type: 3, nbr: 1, system: 3 },
  22: { name: "4", desc: 3, type: 4, nbr: 1, system: 3 },
  23: { name: "5", desc: 3, type: 12, nbr: 1, system: 3 },
  //SYSTEM 5
  24: { name: "Station ", desc: 0, type: 2, nbr: 0.25, system: 4 },
  25: { name: "1", desc: 0, type: 10, nbr: 1, system: 4 },
  26: { name: "2", desc: 1, type: 11, nbr: 1, system: 4 },
  27: { name: "3", desc: 2, type: 8, nbr: 1, system: 4 },
  28: { name: "4", desc: 2, type: 17, nbr: 1, system: 4 },
  29: { name: "5", desc: 3, type: 0, nbr: 1, system: 4 },
  30: { name: "6", desc: 3, type: 1, nbr: 1, system: 4 },
  //SYSTEM 6
  31: { name: "Station ", desc: 0, type: 2, nbr: 0.25, system: 5 },
  32: { name: "1", desc: 0, type: 9, nbr: 1, system: 5 },
  33: { name: "2", desc: 1, type: 16, nbr: 1, system: 5 },
  34: { name: "3", desc: 1, type: 12, nbr: 1, system: 5 },
  35: { name: "4", desc: 1, type: 8, nbr: 1, system: 5 },
  36: { name: "5", desc: 2, type: 17, nbr: 1, system: 5 },
  //SYSTEM 7
  37: { name: "Station ", desc: 0, type: 2, nbr: 0.5, system: 6 },
  38: { name: "1", desc: 4, type: 15, nbr: 1, system: 6 },
  39: { name: "2", desc: 2, type: 17, nbr: 1, system: 6 },
  40: { name: "3", desc: 3, type: 16, nbr: 1, system: 6 },
  41: { name: "4", desc: 3, type: 1, nbr: 1, system: 6 },
  42: { name: "5", desc: 3, type: 6, nbr: 1, system: 6 },
  43: { name: "6", desc: 3, type: 12, nbr: 1, system: 6 },
  //SYSTEM 8
  44: { name: "Station ", desc: 0, type: 2, nbr: 0.5, system: 7 },
  45: { name: "1", desc: 0, type: 8, nbr: 1, system: 7 },
  46: { name: "2", desc: 0, type: 7, nbr: 1, system: 7 },
  47: { name: "3", desc: 1, type: 16, nbr: 1, system: 7 },
  48: { name: "4", desc: 2, type: 14, nbr: 1, system: 7 },
  49: { name: "5", desc: 3, type: 13, nbr: 1, system: 7 },
  50: { name: "6", desc: 3, type: 12, nbr: 1, system: 7 },
  //SYSTEM 9
  51: { name: "Station ", desc: 0, type: 2, nbr: 1, system: 8 },
  52: { name: "1", desc: 6, type: 19, nbr: 1, system: 8 },
  53: { name: "2", desc: 5, type: 18, nbr: 1, system: 8 },
  54: { name: "3", desc: 5, type: 17, nbr: 1, system: 8 },
  55: { name: "4", desc: 5, type: 14, nbr: 1, system: 8 },
  56: { name: "5", desc: 5, type: 11, nbr: 1, system: 8 },
  57: { name: "6", desc: 5, type: 8, nbr: 1, system: 8 },
  //SYSTEM 10
  58: { name: "Station ", desc: 0, type: 2, nbr: 1, system: 9 },
  59: { name: "1", desc: 7, type: 10, nbr: 1, system: 9 },
  60: { name: "2", desc: 6, type: 19, nbr: 1, system: 9 },
  61: { name: "3", desc: 6, type: 18, nbr: 1, system: 9 },
  62: { name: "4", desc: 5, type: 12, nbr: 1, system: 9 },
  63: { name: "5", desc: 5, type: 13, nbr: 1, system: 9 }
};

var Market = {
  0: { desc: "isotope", value: 5 }, //THAMIUM9
  1: { desc: "neutral", value: 10 }, //COPPER
  2: { desc: "neutral", value: 15 }, //POWER CELL
  3: { desc: "oxide ", value: 20 }, //ZINC
  4: { desc: "neutral", value: 50 }, //NICKEL
  5: { desc: "oxide", value: 50 }, //IRON
  6: { desc: "neutral", value: 100 }, //ALUMINIUM
  7: { desc: "neutral", value: 500 }, //IRIDIUM
  8: { desc: "neutral", value: 750 }, //GOLD
  9: { desc: "silicate", value: 1500 }, //PLATINUM
  10: { desc: "isotope", value: 1000 }, //CARBON
  11: { desc: "isotope", value: 5000 }, //PLUTONIUM
  12: { desc: "silicate", value: 7500 }, //HERIDIUM
  13: { desc: "neutral", value: 12500 }, //EMERIL
  14: { desc: "oxide", value: 15000 }, //TITANIUM
  15: { desc: "exotic", value: 50000 }, //ANTIMATTER
  16: { desc: "exotic", value: 100000 }, //RADNOX
  17: { desc: "exotic", value: 125000 }, //OMEGON
  18: { desc: "exotic", value: 1000000 }, //RUBEUM
  19: { desc: "exotic", value: 10000000 } //CYMATYGEN
};

var Technologies = {
  0: {
    name: "Rusty drone I",
    cost: 100,
    gain: 0.1,
    type: 0,
    need: -1,
    req: [3, 5],
    req2: [0, 5]
  },
  1: {
    name: "Rusty drone II",
    cost: 1000,
    gain: 0.2,
    type: 0,
    need: 0,
    req: [3, 10],
    req2: [0, 10]
  },
  2: {
    name: "Basic drone I",
    cost: 5000,
    gain: 0.3,
    type: 0,
    need: 1,
    req: [3, 20],
    req2: [4, 20]
  },
  3: {
    name: "Basic drone II",
    cost: 50000,
    gain: 0.5,
    type: 0,
    need: 2,
    req: [10, 30],
    req2: [6, 30]
  },
  4: {
    name: "Basic drone III",
    cost: 500000,
    gain: 0.7,
    type: 0,
    need: 3,
    req: [10, 50],
    req2: [7, 50]
  },
  5: {
    name: "Advanced drone I",
    cost: 5000000,
    gain: 1,
    type: 0,
    need: 4,
    req: [10, 100],
    req2: [12, 100]
  },
  6: {
    name: "Advanced drone II",
    cost: 100000000,
    gain: 1.2,
    type: 0,
    need: 5,
    req: [10, 200],
    req2: [12, 200]
  },
  7: {
    name: "Advanced drone III",
    cost: 10000000000,
    gain: 1.5,
    type: 0,
    need: 6,
    req: [16, 150],
    req2: [11, 250]
  },
  8: {
    name: "Alien drone I",
    cost: 50000000000,
    gain: 2,
    type: 0,
    need: 7,
    req: [16, 200],
    req2: [17, 250]
  },
  9: {
    name: "Alien drone II",
    cost: 100000000000,
    gain: 3,
    type: 0,
    need: 8,
    req: [16, 500],
    req2: [17, 500]
  }
};

var Hyperdrive = {
  0: { name: "Hyperdrive", price: 500, gain: 0.25, type: 1, need: -1 }
};

var Hyperspace = {
  0: { name: "Hyperspace", price: 100, gain: 10, type: 1, need: -1 }
};

var Starship = {
  0: { name: "Shield", price: 100, gain: 1.25, type: 0 },
  1: { name: "Weapons", price: 100, gain: 1.25, type: 1 },
};
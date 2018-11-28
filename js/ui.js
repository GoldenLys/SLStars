var UpdateUI = function () {
	if (Game.fl == 0) { $("#modal-2").modal('show'); }
	document.title = sitename + " " + version;
	$("#money").html("" + fix(Game.cash, 1));
	// + " + <font class='bold vert'>" + fix(Game.cashps, 2) + "</font>/s");
	$("#rank").html("" + fix(Game.rank, 2) + " EP");
	$("#dayscount").html("" + Game.days + " days passed.");
	$("#fuel").html("" + fix(Game.inventory[19], 3) + "% power.");
	$("#EXT-TITLE").html(texts.items[Game.extId] + "<img class='ui avatar image' src='images/items/" + Game.extId + ".png'>");
	$("#EXT-DESC").html("The drone extract " + fix(Game.extGain, 1));
	$("#EXT-DESC2").html("per seconds ");
	$("#HYPERSPACE-TEXT").html("Travel to another location actually cost " + fix(Game.TravelCost, 3) + "% of power");
	$("#EXPLO-TITLE").html("Exploration - " + texts.systemname[Game.system]);
	GenInventory();
	GenMissions();
	GenMarket();
	GenStation();
	GenUpgrades();
	AddTravelPoints();
	GenExtractionMaterials();
	setTutorial(Game.tutorial);
};

function SetColor(value) {
	var color = "";
	if (value < 1) { color = 'noir'; }
	if (value == 1) { color = 'jaune'; }
	if (value > 1) { if (value < 11) { color = 'bleu'; } }
	if (value > 10) { if (value < 50) { color = 'violet'; } }
	if (value > 49) { if (value < 100) { color = 'rose'; } }
	if (value > 99) { if (value < 1000) { color = 'rouge'; } }
	if (value > 999) { color = 'vert'; }
	return color;
}

function GetSystemType(value) {
	if (value == 0) { type = "Planet"; }
	if (value == 1) { type = "Moon"; }
	if (value == 2) { type = "Sun"; }
	if (value == 3) { type = "Asteroid"; }
	if (value == 4) { type = "Black Hole"; }
	if (value == 5) { type = "Alien Spaceship"; }
	if (value == 6) { type = "Alien Flagship"; }
	if (value == 7) { type = "Alien Planet"; }
	return type;
}

//GENERATE MISSIONS

function GenMissions() {
	for (var id = 0; id < 11; id++) { $('#system' + id).html("<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Description</th><th class='ui center aligned'>Cost</th><th class='ui center aligned'>Action</th></tr></thead>"); }

	for (var i in Missions) {
		var offer = Missions[i];
		var canbuy = Game.cash < Market[offer.type].value ? ' disabled' : '';
		var canbuy10 = Game.cash < Market[offer.type].value * 10 ? ' disabled' : '';
		var canbuy100 = Game.cash < Market[offer.type].value * 100 ? ' disabled' : '';
		var canExploreMax = Game.cash < Market[offer.type].value * offer.nbr ? ' disabled' : '';
		var maxexplore = Math.floor(Game.cash / (Market[offer.type].value * offer.nbr));
		if (Game.explored[i] == 0) { canbuy = Game.cash < Market[offer.type].value / 2 ? ' disabled' : ''; canExploreMax = "disabled"; }
		var exploretext = Game.explored[i] > 0 ? 'Visit' : 'Explore';
		var rewards = Game.explored[i] > 0 ? offer.nbr : offer.nbr * 2;
		var rewardstext = SetColor(rewards);
		var pricetext = Game.explored[i] < 1 ? fix((Market[offer.type].value * offer.nbr) / 2, 1) : fix(Market[offer.type].value * offer.nbr, 1);
		reward = texts.items[offer.type];
		name = "<font class='text type1'>" + texts.systemname[offer.system] + "-" + offer.name + "</font>";
		cost = "<i class='green dollar sign icon'></i><font class='vert bold type3'>" + pricetext + "</font>";
		description = GetSystemType(offer.desc);

		var SYSTEMDIV = $(
			"<tr class=''>" +
			"<td class='center aligned ui'>" + name + "</td>" +
			"<td class='center aligned'>" + description + ", <font class='type1'><font class=' " + rewardstext + "'>" + rewards + "</font> " + reward + "<img class='ui avatar image' src='images/items/" + offer.type + ".png'></font></td>" +
			"<td class='center aligned'> " + cost + "</td>" +
			"<td class='center aligned'><div class='ui spacel buttons'><button class='ui " + canbuy + " button' onClick='explore(" + i + ", 1, " + offer.type + ");'>" + exploretext + "</button><button class='ui " + canbuy10 + " button' onClick='explore(" + i + ", 10, " + offer.type + ");'>10</button><button class='ui " + canbuy100 + " button' onClick='explore(" + i + ", 100, " + offer.type + ");'>100</button><button class='ui " + canExploreMax + " button' onClick='explore(" + i + ", " + maxexplore + ", " + offer.type + ");'>Max</button></div></td>" +
			"</tr>"
		);
		$('#system' + offer.system).append(SYSTEMDIV);
	}
}

//GENERATE MARKET

function GenMarket() {
	$('#system0sm').html("<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Type</th><th class='ui center aligned'>Value</th><th class='ui center aligned'>Inventory</th><th class='ui center aligned'>Sell</th></tr></thead>");

	for (var i in Market) {
		var offer = Market[i];
		var canSell = Game.inventory[i] < 1 ? ' disabled' : '';
		var canSell10 = Game.inventory[i] < 10 ? ' disabled' : '';
		var canSell100 = Game.inventory[i] < 100 ? ' disabled' : '';
		var canSellAll = Game.inventory[i] < 1 ? ' disabled' : '';
		if (SystemMult[i] < 1) { pricecolor = 'rouge'; }
		if (SystemMult[i] > 1) { pricecolor = 'vert'; }
		if (SystemMult[i] > 0.95) { if (SystemMult[i] < 1.1) { pricecolor = ''; } }
		if (SystemMult[i] > 0.5) { if (SystemMult[i] < 0.96) { pricecolor = 'argent'; } }

		name = "<img class='ui avatar image' src='images/items/" + i + ".png'><span class='Palladium'><font class='type2'>" + texts.items[i] + "</font></span>";
		cost = "<font class='" + pricecolor + " bold'><i class='dollar sign icon'></i>" + fix(offer.value * SystemMult[i], 1) + "</font>";
		description = offer.desc;
		var inventory = Game.inventory[i] < 1 ? '<font class="rouge">' + fix(Game.inventory[i], 0) + '</font>' : '<font class="vert">' + fix(Game.inventory[i], 0) + '</font>';

		var SYSTEMDIV = $(
			"<tr class=''>" +
			"<td class='center aligned ui'>" + name + "</td>" +
			"<td class='center aligned'>" + description + "</td>" +
			"<td class='center aligned type3'> " + cost + "</td>" +
			"<td class='center aligned'> " + inventory + "</td>" +
			"<td class='center aligned'><div class='ui spacel buttons'><button class='ui " + canSell + " button' onClick='sellitem(" + i + ",1);'>1</button><button class='ui " + canSell10 + " button' onClick='sellitem(" + i + ",10);'>10</button><button class='ui " + canSell100 + " button' onClick='sellitem(" + i + ",100);'>100</button><button class='ui " + canSellAll + " button' onClick='sellitem(" + i + "," + Game.inventory[i] + ");'>All</button></div></td>" +
			"</tr>"
		);
		//if (i != 19) { 
		$('#system0sm').append(SYSTEMDIV);
		//}
	}
}

//GENERATE STATION

function GenStation() {
	$('#system0ss').html("<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Require</th><th class='ui center aligned'>Price</th><th class='ui center aligned'>Action</th></tr></thead>");

	for (var i in Technologies) {
		var offer = Technologies[i];
		var buytext = "";
		var visible = "";
		var active = "";
		var buy1 = 0;
		var buy2 = 0;
		var pricecolor = offer.cost > Game.cash ? 'rouge' : 'vert';
		var cost = "<font class='" + pricecolor + "'><i class='dollar sign icon'></i><font class='type3 " + pricecolor + "'>" + fix(offer.cost, 1) + "</font>";

		if (offer.req[0] > -1) {
			requiretext1 = "<font class='" + SetColor(offer.req[1]) + "'>" + offer.req[1] + "</font> " + texts.items[offer.req[0]];
			if (offer.req[1] <= Game.inventory[offer.req[0]]) { buy1 = 1; } else { buy1 = 0; }
			if (offer.req2[0] > -1) {
				requiretext2 = "<font class='" + SetColor(offer.req2[1]) + "'>" + offer.req2[1] + "</font> " + texts.items[offer.req2[0]];
				if (offer.req2[1] <= Game.inventory[offer.req2[0]]) { buy2 = 1; } else { buy2 = 0; }
			} else { buy2 = 1; }
		}

		if (buy1 > 0) {
			if (buy2 > 0) { buyable = ""; buyVar = 1; }
			else { buyable = "disabled"; buyVar = 0; }
		}
		else { buyable = "disabled"; buyVar = 0; }

		if (Game.technologies[i] == 1) { buyable = "disabled"; buyVar = 0; cost = ""; active = "<font class='vert'>Activated</font>"; visible = "style='display:none;'"; }
		else { buytext = "Build"; }

		if (Game.cash < offer.cost) { pricecolor = "rouge"; buyable = "disabled"; buyVar = 0; }


		if (offer.type == 0) { type = "Extraction upgrade"; }
		if (offer.type == 1) { type = "Navigation upgrade"; }

		var SYSTEMDIV = $(
			"<tr class=''>" +
			"<td class='center aligned ui'><span class='Palladium'><font class='type2'>" + offer.name + "</font></span></td>" +
			"<td class='center aligned'>" + requiretext1 + "<img class='ui avatar image' src='images/items/" + offer.req[0] + ".png'><br>" + requiretext2 + "<img class='ui avatar image' src='images/items/" + offer.req2[0] + ".png'></td>" +
			"<td class='center aligned'>" + cost + "</td>" +
			"<td class='center aligned'>" + active + "<button class='ui " + buyable + " red button' " + visible + " onClick='buyupgrade(" + i + ", " + buyVar + ", " + offer.type + ", " + offer.req[0] + ", " + offer.req[1] + ", " + offer.req2[0] + ", " + offer.req2[1] + ");'>" + buytext + "</button></td>" +
			"</tr>"
		);
		if (Game.technologies[i] == 1) { $('#system0ss').append(SYSTEMDIV); }
		if (Game.technologies[i] == 0) { if (offer.need == -1) { $('#system0ss').append(SYSTEMDIV); } }
		if (i == 0) { if (Game.technologies[0] == 0) { $('#system0ss').append(SYSTEMDIV); } }
		else {
			if (Game.technologies[offer.need] == 1) { $('#system0ss').append(SYSTEMDIV); }
		}
	}
}

function GenUpgrades() {
	$('#UPG-BOARD').html("<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Level</th><th class='ui center aligned'>Price</th><th class='ui center aligned'>Action</th></tr></thead>");

	for (var i in Upgrades) {
		var canbuy = "";
		var level = "";
		var buyable = "";
		var price = "";
		var upg = Upgrades[i];
		canbuy = Game.cash < GetUPGprice(i) ? ' disabled' : '';
		buyable = Game.cash < GetUPGprice(i) ? ' rouge' : ' vert';
		if (i == 0) { if (Game.Upgrades[0] == 100) { canbuy = " disabled"; level = "Maximum"; price = ""; action = ""; } else {
			level = Game.Upgrades[i];
			price = "<i class='" + buyable + " dollar sign icon'></i>" + fix(GetUPGprice(i), 1);
			action = "<a class='fluid ui " + canbuy + " red button' onClick='UPGPOWER(" + i + ");'>Upgrade</a>";
		} }

		var SYSTEMDIV = $(
			"<tr class=''>" +
			"<td class='center aligned ui'><span class='Palladium'><font class='type2'>" + upg.name + "</font></span></td>" +
			"<td class='center aligned ui'>" + level + "</td>" +
			"<td class='center aligned ui'><font class='type3 " + buyable + "'>" + price + "</font></td>" +
			"<td class='center aligned ui'>" + action + "<td>" +
			"</tr>"
		);
		$('#UPG-BOARD').append(SYSTEMDIV);
	}
}

function GetUPGprice(id) {
	var value;
	if (Game.Upgrades[id] == 0) { value = Upgrades[id].price; }
	if (Game.Upgrades[id] > 0) {
		if (Game.Upgrades[id] > 0) { value = Upgrades[id].price * Math.pow(1.10, Game.Upgrades[id]); }
		if (Game.Upgrades[id] >= 10) { value = Upgrades[id].price * Math.pow(1.15, Game.Upgrades[id]); }
		if (Game.Upgrades[id] >= 25) { value = Upgrades[id].price * Math.pow(1.25, Game.Upgrades[id]); }
		if (Game.Upgrades[id] >= 50) { value = Upgrades[id].price * Math.pow(1.5, Game.Upgrades[id]); }
		if (Game.Upgrades[id] == 100) { value = 42; }
	}
	return value;
}

function GenExtractionMaterials() {
	var content;
	$("#EXT-CONTENT").html(""); //RESET VIEW
	for (var inv in texts.items) {
		content = "<div class='item' data-id='" + inv + "'>" + texts.items[inv] + "<img class='ui avatar image' src='images/items/" + inv + ".png'></div>";
		if (Game.technologies[0] == 1) {
			if (inv == 3) { $("#EXT-CONTENT").append(content); }
		}
		if (Game.technologies[1] == 1) {
			if (inv == 0) { $("#EXT-CONTENT").append(content); }
			if (inv == 1) { $("#EXT-CONTENT").append(content); }
		}
		if (Game.technologies[2] == 1) {
			if (inv == 2) { $("#EXT-CONTENT").append(content); }
			if (inv == 4) { $("#EXT-CONTENT").append(content); }
		}
		if (Game.technologies[3] == 1) {
			if (inv == 5) { $("#EXT-CONTENT").append(content); }
		}
		if (Game.technologies[4] == 1) {
			if (inv == 6) { $("#EXT-CONTENT").append(content); }
		}
		if (Game.technologies[5] == 1) {
			if (inv == 7) { $("#EXT-CONTENT").append(content); }
			if (inv == 8) { $("#EXT-CONTENT").append(content); }
		}
		if (Game.technologies[6] == 1) {
			if (inv == 9) { $("#EXT-CONTENT").append(content); }
			if (inv == 10) { $("#EXT-CONTENT").append(content); }
		}
		if (Game.technologies[7] == 1) {
			if (inv == 11) { $("#EXT-CONTENT").append(content); }
			if (inv == 12) { $("#EXT-CONTENT").append(content); }
			if (inv == 13) { $("#EXT-CONTENT").append(content); }
		}
		if (Game.technologies[8] == 1) {
			if (inv == 14) { $("#EXT-CONTENT").append(content); }
			if (inv == 15) { $("#EXT-CONTENT").append(content); }
			if (inv == 16) { $("#EXT-CONTENT").append(content); }
		}
		if (Game.technologies[9] == 1) {
			if (inv == 17) { $("#EXT-CONTENT").append(content); }
			if (inv == 18) { $("#EXT-CONTENT").append(content); }
			if (inv == 19) { $("#EXT-CONTENT").append(content); }
		}
		$("#EXT-TITLE").html(texts.items[Game.extId] + "<img class='ui avatar image' src='images/items/" + Game.extId + ".png'>");
	}
}

//UI FUNCTIONS

function hideModals() { for (var id = 1; id < 4; id++) { $('#modal-' + id).modal('hide'); } }
function hidesystems() { for (var id = 0; id < 11; id++) { $("#system" + id).hide(); } }
function hideTabs() { for (var id = 0; id < 3; id++) { $("#tab" + id).hide(); } }
function hideMenuTabs() { for (var id = 0; id < 10; id++) { $("#tab" + id).hide(); $("#t" + id).removeClass("spacelborder"); } }

function ClickEvents() {
	$("#modalmenu").on("click", "a", function () { var id = $(this).data('id'); $('#modal-' + id).modal('show'); $('.ui.sidebar').sidebar('toggle'); });
	$("#game-menu").on("click", "button", function () { var id = $(this).data('id'); hideMenuTabs(); $("#tab" + id).show(); $("#t" + id).addClass("spacelborder"); });
	$("#sidebar").on("click", "a", function () { var id = $(this).data('id'); $('.ui.sidebar').sidebar('toggle'); });
	$('#select').dropdown();
	$('.ui.dropdown').dropdown();

	$("#selection-content").on("click", "div", function () { var id = $(this).data('id'); changeLocation(id); });
	$("#EXT-CONTENT").on("click", "div", function () { var id = $(this).data('id'); Game.extId = id; });
	$("#top-menu").on("click", "#sidebar", function () { $('.ui.sidebar').sidebar('toggle'); });
}

function AddTravelPoints() {
	$("#selection-content").html(""); //RESET VIEW
	$("#selection-content").append("<div class='item' id='V0' data-id='0'>" + texts.systemname[0] + "</div>");
	if (Game.rank >= 10) { $("#selection-content").append("<div class='item' id='V1' data-id='1'>" + texts.systemname[1] + "</div>"); $("#percentrank").html(fix(50, 0) + " EP"); }
	if (Game.rank >= 50) { $("#selection-content").append("<div class='item' id='V2' data-id='2'>" + texts.systemname[2] + "</div>"); $("#percentrank").html(fix(100, 0) + " EP"); }
	if (Game.rank >= 100) { $("#selection-content").append("<div class='item' id='V3' data-id='3'>" + texts.systemname[3] + "</div>"); $("#percentrank").html(fix(350, 0) + " EP"); }
	if (Game.rank >= 350) { $("#selection-content").append("<div class='item' id='V4' data-id='4'>" + texts.systemname[4] + "</div>"); $("#percentrank").html(fix(1000, 0) + " EP"); }
	if (Game.rank >= 1000) { $("#selection-content").append("<div class='item' id='V5' data-id='5'>" + texts.systemname[5] + "</div>"); $("#percentrank").html(fix(2500, 0) + " EP"); }
	if (Game.rank >= 2500) { $("#selection-content").append("<div class='item' id='V6' data-id='6'>" + texts.systemname[6] + "</div>"); $("#percentrank").html(fix(5000, 0) + " EP"); }
	if (Game.rank >= 5000) { $("#selection-content").append("<div class='item' id='V7' data-id='7'>" + texts.systemname[7] + "</div>"); $("#percentrank").html(fix(10000, 0) + " EP"); }
	if (Game.rank >= 10000) { $("#selection-content").append("<div class='item' id='V8' data-id='8'>" + texts.systemname[8] + "</div>"); $("#percentrank").html(fix(100000, 0) + " EP"); }
	if (Game.rank >= 100000) { $("#selection-content").append("<div class='item' id='V9' data-id='9'>" + texts.systemname[9] + "</div>"); $("#percentrank").html("Unlimited EP"); }
	$("#selection-text").html(texts.systemname[Game.system]);
}

function GenInventory() {
	$("#inventory").html("");
	for (var id in texts.items) {
		if (Game.inventory[id] > 0) {
			if (id != 19) {
				$("#inventory").append("<span class='Palladium'><font class='bold " + SetColor(Game.inventory[id]) + "'>" + fix(Game.inventory[id], 5) + "</font> " + texts.items[id] + " </span><img class='ui avatar image' src='images/items/" + id + ".png'><br>");
			}
		}
	}
}

function setTutorial(id) {
	Game.tutorial = id;
	$("#tutorial-title").html("Guide - " + tutorials[id].title);
	$("#tutorial-text").html(tutorials[id].text);

	if (Game.tutorial == 0) { $("#tuto-prev").addClass("disabled"); }
	else { $("#tuto-prev").removeClass("disabled"); }

	if (Game.tutorial == 3) { $("#tuto-next").addClass("disabled"); }
	else { $("#tuto-next").removeClass("disabled"); }
}

function closeTutorial() { hideModals(); Game.tutorial = 0; if (Game.fl == 0) { Game.fl = 1; Game.inventory[19] = 100; } }

function NextTuto() {
	if (Game.fl == 0) { Game.fl = 1; Game.inventory[19] = 100; }
	if (Game.tutorial < 3) { Game.tutorial++; setTutorial(Game.tutorial); }
}

function PrevTuto() {
	if (Game.tutorial >= 1) { Game.tutorial--; setTutorial(Game.tutorial); }
}
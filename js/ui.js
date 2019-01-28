var UpdateUI = function () {
	if (Game.fl == 0) { $("#modal-2").modal('show'); }
	document.title = sitename;
	$("#money").html("" + fix(Game.cash, 1));
	$("#copyright").html(sitename + " " + version)
	$("#rank").html("" + fix(Game.rank, 2) + " EP");
	$("#dayscount").html("" + Game.days + " days passed.");
	$("#fuel").html("" + fix(Game.inventory[2], 3) + "% power.");
	$("#EXT-TITLE").html(texts.items[Game.extId] + "<img class='ui avatar image' src='images/items/" + Game.extId + ".png'>");
	$("#EXT-DESC").html("The drone extract " + fix(Game.extGain, 1));
	$("#EXT-DESC2").html("per seconds ");
	$("#HYPERDRIVE-TEXT").html("Travel to another location actually cost " + fix(Game.TravelCost, 3) + "% of power");
	$("#HYPERSPACE-TEXT").html("Your actual maximum destination is " + texts.systemname[Game.UnlockedLocations]);
	$("#Galaxy-content").html("Galaxy number <br><h1 class='type4 or'>" + Game.Galaxy + "</h1>");
	$("#Galaxy-content2").html("- You must reach reach <span class='rouge'>Gaia</span>.<br>- Have <i class='green dollar sign icon'></i><span class='vert'>" + fix(GetGalaxyPrice(), 2) + "</span> to travel to another galaxy.");
	$("#EXPLO-TITLE").html("Exploration - " + texts.systemname[Game.system]);
	if (Game.isInFight == 1) { $("#modal-7").modal('setting', 'closable', false).modal('show'); }
	if (Game.cash < GetGalaxyPrice()) { $("#GalaxyBuy").addClass("disabled"); }
	else { if (Game.system == 9) $("#GalaxyBuy").removeClass("disabled"); }
	GenInventory();
	GenMissions();
	GenMarket();
	GenStation();
	GenUpgrades();
	GenHyperSpace();
	AddTravelPoints();
	GenExtractionMaterials();
	UpdateEP();
	setTutorial(Game.tutorial);
	UpdatePirateView();
};



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
	for (var id = 0; id < 11; id++) { $('#system' + id).html("<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Description</th><th class='ui center aligned'>Size</th><th class='ui center aligned'>Cost</th><th class='ui center aligned'>Action</th></tr></thead>"); }

	for (var i in Missions) {
		var offer = Missions[i];
		var canbuy = Game.cash < Market[offer.type].value * offer.nbr ? ' disabled' : '';
		var canbuy10 = Game.cash < (Market[offer.type].value * offer.nbr) * 10 ? ' disabled' : '';
		var canbuy100 = Game.cash < (Market[offer.type].value * offer.nbr) * 100 ? ' disabled' : '';
		var canExploreMax = Game.cash < Market[offer.type].value * offer.nbr ? ' disabled' : '';
		var maxexplore = Math.floor(Game.cash / (Market[offer.type].value * offer.nbr));
		if (Game.explored[i] == 0) { canbuy = Game.cash < Market[offer.type].value / 2 ? ' disabled' : ''; canExploreMax = "disabled"; }
		var exploretext = Game.explored[i] > 0 ? 'Visit' : 'Explore';
		var rewards = Game.explored[i] > 0 ? offer.nbr : offer.nbr * 2;
		var rewardstext = SetColor(rewards);
		var pricetext = Game.explored[i] < 1 ? fix((Market[offer.type].value * offer.nbr) / 2, 1) : fix(Market[offer.type].value * offer.nbr, 1);
		recompense = SetColorText(rewards);
		reward = texts.items[offer.type];
		name = "<font class='text type1'>" + texts.systemname[offer.system] + "-" + offer.name + "</font>";
		cost = "<i class='green dollar sign icon'></i><font class='vert bold type1'>" + pricetext + "</font>";
		description = GetSystemType(offer.desc);

		var SYSTEMDIV = $(
			"<tr class=''>" +
			"<td class='center aligned ui'>" + name + "</td>" +
			"<td class='center aligned'>" + description + "<br> <font class='type1'>" + reward + "<img class='ui avatar image' src='images/items/" + offer.type + ".png'></font></td>" +
			"<td class='center aligned'>" + "<font class=' " + rewardstext + "'>" + recompense + "</font> " + "</td>" +
			"<td class='center aligned'> " + cost + "</td>" +
			"<td class='center aligned'><div class='ui SLStars buttons'><button class='ui " + canbuy + " button' onClick='explore(" + i + ", 1, " + offer.type + ");'>" + exploretext + "</button><button class='ui " + canbuy10 + " button' onClick='explore(" + i + ", 10, " + offer.type + ");'>10</button><button class='ui " + canbuy100 + " button' onClick='explore(" + i + ", 100, " + offer.type + ");'>100</button><button class='ui " + canExploreMax + " button' onClick='explore(" + i + ", " + maxexplore + ", " + offer.type + ");'>Max</button></div></td>" +
			"</tr>"
		);
		$('#system' + offer.system).append(SYSTEMDIV);
	}
}

//GENERATE MARKET

function GenMarket() {
	$('#system0sm').html("<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Value</th><th class='ui center aligned'>Type</th><th class='ui center aligned'>Inventory</th><th class='ui center aligned'>Sell</th></tr></thead>");

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
		cost = "<font class='type1 " + pricecolor + " bold'><i class='dollar sign icon'></i>" + fix(offer.value * SystemMult[i], 1) + "</font>";
		description = offer.desc;
		var inventory = Game.inventory[i] < 1 ? '<font class="rouge">' + fix(Game.inventory[i], 0) + '</font>' : '<font class="vert">' + fix(Game.inventory[i], 0) + '</font>';

		var SYSTEMDIV = $(
			"<tr class=''>" +
			"<td class='center aligned ui'>" + name + "</td>" +
			"<td class='center aligned'> " + cost + "</td>" +
			"<td class='center aligned'>" + description + "</td>" +
			"<td class='center aligned'> " + inventory + "</td>" +
			"<td class='center aligned'><div class='ui SLStars buttons'><button class='ui " + canSell + " button' onClick='sellitem(" + i + ",1);'>1</button><button class='ui " + canSell10 + " button' onClick='sellitem(" + i + ",10);'>10</button><button class='ui " + canSell100 + " button' onClick='sellitem(" + i + ",100);'>100</button><button class='ui " + canSellAll + " button' onClick='sellitem(" + i + "," + Game.inventory[i] + ");'>All</button></div></td>" +
			"</tr>"
		);
		if (Game.inventory[i] > 0) {
			$('#system0sm').append(SYSTEMDIV);
		}
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


		var cost = "<font class='" + pricecolor + "'><i class='dollar sign icon'></i><font class='type1 " + pricecolor + "'>" + fix(offer.cost, 1) + "</font>";

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
	if (Game.Upgrades[0] < 100) {
		$('#UPG-BOARD').html("<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Level</th><th class='ui center aligned'>Price</th><th class='ui center aligned'>Action</th></tr></thead>");

		for (var i in Upgrades) {
			var canbuy = "";
			var level = "";
			var buyable = "";
			var price = "";
			var upg = Upgrades[i];
			canbuy = Game.cash < GetUPGprice(i) ? ' disabled' : '';
			buyable = Game.cash < GetUPGprice(i) ? ' rouge' : ' vert';
			if (i == 0) {
				if (Game.Upgrades[0] == 100) { canbuy = " disabled"; level = "Maximum"; price = ""; action = ""; } else {
					level = Game.Upgrades[i];
					price = "<i class='" + buyable + " dollar sign icon'></i>" + fix(GetUPGprice(i), 1);
					action = "<a class='fluid ui " + canbuy + " red button' onClick='UPGPOWER(" + i + ");'>Upgrade</a>";
				}
			}

			var SYSTEMDIV = $(
				"<tr class=''>" +
				"<td class='center aligned ui'><span class='Palladium'><font class='type2'>" + upg.name + "</font></span></td>" +
				"<td class='center aligned ui'>" + level + "</td>" +
				"<td class='center aligned ui'><font class='type1" + buyable + "'>" + price + "</font></td>" +
				"<td class='center aligned ui'>" + action + "<td>" +
				"</tr>"
			);
			$('#UPG-BOARD').append(SYSTEMDIV);
		}
	} else { $('#UPG-BOARD').html(""); }
}

function GenHyperSpace() {
	if (Game.UnlockedLocations < 9) {
		$('#HYPERSPACE-BOARD').html("<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Current level</th><th class='ui center aligned'>Access</th><th class='ui center aligned'>Price</th><th class='ui center aligned'>Action</th></tr></thead>");

		for (var i in Upgrades2) {
			var canbuy;
			var level;
			var buyable;
			var price;
			var upg = Upgrades2[i];
			canbuy = Game.cash < GetUPGprice2(i) ? ' disabled' : '';
			buyable = Game.cash < GetUPGprice2(i) ? ' rouge' : ' vert';
			action = Game.UnlockedLocations > 8 ? " " : "<a class='fluid ui " + canbuy + " red button' onClick='BUYHYPERSPACE(" + i + ");'>Upgrade</a>";
			price = Game.UnlockedLocations > 8 ? " " : "<i class='" + buyable + " dollar sign icon'></i>" + fix(GetUPGprice2(i), 1);
			access = Game.UnlockedLocations > 8 ? " " : texts.systemname[Game.UnlockedLocations + 1];
			level = Game.UnlockedLocations;

			var SYSTEMDIV = $(
				"<tr class=''>" +
				"<td class='center aligned ui'><span class='Palladium'><font class='type2'>" + upg.name + "</font></span></td>" +
				"<td class='center aligned ui'>" + level + "</td>" +
				"<td class='center aligned ui'>" + access + "</td>" +
				"<td class='center aligned ui'><font class='type1" + buyable + "'>" + price + "</font></td>" +
				"<td class='center aligned ui'>" + action + "<td>" +
				"</tr>"
			);
			$('#HYPERSPACE-BOARD').append(SYSTEMDIV);
		}
	} else { $('#HYPERSPACE-BOARD').html(""); }
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

function GetUPGprice2(id) {
	var value;
	value = Upgrades2[id].price * Math.pow(Upgrades2[id].gain, Game.UnlockedLocations);
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
			if (inv == 3) { $("#EXT-CONTENT").append(content); }
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
			if (inv == 2) { $("#EXT-CONTENT").append(content); }
		}
		$("#EXT-TITLE").html(texts.items[Game.extId] + "<img class='ui avatar image' src='images/items/" + Game.extId + ".png'>");
	}
}

//UI FUNCTIONS

function hideModals() { for (var id = 1; id < 10; id++) { $('#modal-' + id).modal('hide'); } }
function hidesystems() { for (var id = 0; id < 11; id++) { $("#system" + id).hide(); } }
function hideTabs() { for (var id = 0; id < 3; id++) { $("#tab" + id).hide(); } }
function hideMenuTabs() { for (var id = 0; id < 10; id++) { $("#tab" + id).hide(); $("#t" + id).removeClass("SLStarsborder"); } }

function ClickEvents() {
	$("#modalmenu").on("click", "a", function () { var id = $(this).data('id'); $('#modal-' + id).modal('show'); $('.ui.sidebar').sidebar('toggle'); });
	$("#top-menu").on("click", "#t1", function () { var id = $(this).data('id'); hideMenuTabs(); $("#tab" + id).show(); $("#t" + id).addClass("SLStarsborder"); });
	$("#top-menu").on("click", "#t2", function () { var id = $(this).data('id'); hideMenuTabs(); $("#tab" + id).show(); $("#t" + id).addClass("SLStarsborder"); });
	$("#top-menu").on("click", "#t3", function () { var id = $(this).data('id'); hideMenuTabs(); $("#tab" + id).show(); $("#t" + id).addClass("SLStarsborder"); });
	$("#top-menu").on("click", "#t4", function () { var id = $(this).data('id'); hideMenuTabs(); $("#tab" + id).show(); $("#t" + id).addClass("SLStarsborder"); });
	$("#sidebar").on("click", "a", function () { var id = $(this).data('id'); $('.ui.sidebar').sidebar('toggle'); });
	$('#select').dropdown();
	$('.ui.dropdown').dropdown();

	$("#selection-content").on("click", "div", function () { var id = $(this).data('id'); changeLocation(id); });
	$("#EXT-CONTENT").on("click", "div", function () { var id = $(this).data('id'); Game.extId = id; });
	$("#top-menu").on("click", "#sidebar", function () { $('.ui.sidebar').sidebar('toggle'); });
}

function AddTravelPoints() {
	$("#selection-content").html(""); //RESET VIEW

	for (var i in texts.systemname) {

		isUnlockedColor = Game.UnlockedLocations < i ? ' rouge' : ' vert';
		if (Game.UnlockedLocations < i) { isUnlockedText = " (Require<font class='" + isUnlockedColor + "'> " + fix(Game.EPRequired[i], 0) + " EP</font>)" } else { isUnlockedText = ""; }
		isUnlockedSymbol = Game.UnlockedLocations < i ? '<i class="red circle outline icon"></i>' : '<i class="green check circle outline icon"></i>';
		var TRAVELCONTENT = $(
			"<div class='item' id='V" + i + "' data-id='" + i + "'>" +
			isUnlockedSymbol +
			texts.systemname[i] +
			isUnlockedText +
			"</div>"
		);
		$("#selection-content").append(TRAVELCONTENT);
		$("#selection-text").html(texts.systemname[Game.system]);
	}
}

function GenInventory() {
	$("#inventory").html("");
	for (var id in texts.items) {
		if (Game.inventory[id] > 0) {
			if (id != 2) {
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

	if (Game.tutorial == 5) { $("#tuto-next").addClass("disabled"); }
	else { $("#tuto-next").removeClass("disabled"); }
}

function closeTutorial() { hideModals(); Game.tutorial = 0; if (Game.fl == 0) { Game.fl = 1; Game.inventory[2] = 100; } }

function NextTuto() {
	if (Game.fl == 0) { Game.fl = 1; Game.inventory[2] = 100; }
	if (Game.tutorial < 5) { Game.tutorial++; setTutorial(Game.tutorial); }
}

function PrevTuto() {
	if (Game.tutorial >= 1) { Game.tutorial--; setTutorial(Game.tutorial); }
}

function UpdateEP() {
	for (var s in Game.EPRequired) {
		if (Game.rank >= Game.EPRequired[0]) { $("#percentrank").html("10 EP"); }
		if (Game.rank >= Game.EPRequired[1]) { $("#percentrank").html("50 EP"); }
		if (Game.rank >= Game.EPRequired[2]) { $("#percentrank").html("100 EP"); }
		if (Game.rank >= Game.EPRequired[3]) { $("#percentrank").html("350 EP"); }
		if (Game.rank >= Game.EPRequired[4]) { $("#percentrank").html("1000 EP"); }
		if (Game.rank >= Game.EPRequired[5]) { $("#percentrank").html("2500 EP"); }
		if (Game.rank >= Game.EPRequired[6]) { $("#percentrank").html("5000 EP"); }
		if (Game.rank >= Game.EPRequired[7]) { $("#percentrank").html("10000 EP"); }
		if (Game.rank >= Game.EPRequired[8]) { $("#percentrank").html("100000 EP"); }
		if (Game.rank >= Game.EPRequired[9]) { $("#percentrank").html("Unlimited EP"); }
	}
}

function UpdatePirateView() {
	lifetext = Game.PlayerLife < 51 ? ' rouge' : ' vert';
	PirateLifeText = Game.PirateCurrentLife < 51 ? ' rouge' : ' ';

	$("#PirateAttackTitle").html("<span class='rouge'>ALERT ! PIRATE IN THE AREA.</span>");
	$("#PirateAttackTitleDesc").html("A pirate wants to fight with you.");
	$("#PirateLifeTitle").html("<span class='type4 bold rouge'>Pirate</span>");
	$("#PlayerLifeTitle").html("<span class='type4 bold vert'>You</span>");
	$("#PirateLifeText").html("<span class='bold" + PirateLifeText + "'>" + fix(Game.PirateCurrentLife, 0) + "</span> <i class='red heart icon'></i>");
	$("#PlayerLifeText").html("<span class='" + lifetext + " bold'>" + fix(Game.PlayerLife, 0) + "</span><span class='blanc'>/" + Game.PlayerBaseLife + "</span> <i class='red heart icon'></i>");
	$('#PirateHP').progress({ className: { active: '', error: '', success: '', warning: '' } });
	$('#PirateHP').progress({ percent: GetPirateHPPercent() });
	$('#PlayerHP').progress({ percent: GetPlayerHPPercent() });

}
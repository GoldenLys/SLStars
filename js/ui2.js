var UpdateUI = function () {
	if (Game.fl == 0) { $("#modal-2").modal('show'); }
	document.title = sitename + " " + version;
	$("#money").html("" + fix(Game.cash, 1) + " + <font class='bold vert'>" + fix(Game.cashps, 0) + "</font>/s");
	$("#rank").html("" + fix(Game.rank, 0) + "");
	GenInventory();
	GenMissions();
	GenMarket();
	GenStation();
	AddTravelPoints();
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
	if (value == 0) { type = "Planète"; }
	if (value == 1) { type = "Lune"; }
	if (value == 2) { type = "Soleil"; }
	if (value == 3) { type = "Asteroide"; }
	if (value == 4) { type = "Trou noir"; }
	if (value == 5) { type = "Vaisseau alien"; }
	if (value == 6) { type = "Vaisseau mère alien"; }
	if (value == 7) { type = "Planète alien"; }
	return type;
}

//GENERATE MISSIONS

function GenMissions() {
	for (var id = 0; id < 10; id++) { $('#system' + id).html("<thead><tr class='shadow'><th class='ui center aligned'>Nom</th><th class='ui center aligned'>Description</th><th class='ui center aligned'>Coût de mission            </th><th class='ui center aligned'>Action</th></tr></thead>"); }

	for (var i in Missions) {
		var offer = Missions[i];
		var canbuy = Game.cash < offer.price ? ' disabled' : '';
		if (Game.explored[i] == 0) { canbuy = Game.cash < offer.price / 2 ? ' disabled' : ''; }
		var exploretext = Game.explored[i] > 0 ? 'Visiter' : 'Explorer';
		var rewards = Game.explored[i] > 0 ? offer.nbr : offer.nbr * 2;
		var rewardstext = SetColor(rewards);
		var pricetext = Game.explored[i] < 1 ? fix(offer.price / 2, 1) : fix(offer.price, 1);
		reward = texts.items[offer.type];
		name = "<font class='text type1'>" + texts.systemname[offer.system] + "-" + offer.name + "</font>";
		cost = "<font class='vert bold type3'>" + pricetext + "€</font>";
		description = GetSystemType(offer.desc);

		var SYSTEMDIV = $(
			"<tr class=''>" +
			"<td class='center aligned ui'>" + name + "</td>" +
			"<td class='center aligned'>" + description + ", <font class='type3'><font class=' " + rewardstext + "'>" + rewards + "</font> " + reward + "<img class='ui avatar image' src='images/items/" + offer.type + ".png'></font></td>" +
			"<td class='center aligned'> " + cost + "</td>" +
			"<td class='center aligned'><a class='fluid ui " + canbuy + " red button' onClick='explore(" + i + ");'>" + exploretext + "</a></td>" +
			"</tr>"
		);
		$('#system' + offer.system).append(SYSTEMDIV);
	}
}

//GENERATE MARKET

function GenMarket() {
	$('#system0sm').html("<thead><tr class='shadow'><th class='ui center aligned'>Nom</th><th class='ui center aligned'>Type</th><th class='ui center aligned'>Valeur</th><th class='ui center aligned'>Inventaire</th><th class='ui center aligned'>Vendre</th></tr></thead>");

	for (var i in Market) {
		var offer = Market[i];
		var canSell = Game.inventory[i] < 1 ? ' disabled' : '';
		var canSell10 = Game.inventory[i] < 10 ? ' disabled' : '';
		var canSell100 = Game.inventory[i] < 100 ? ' disabled' : '';
		var canSell1000 = Game.inventory[i] < 1000 ? ' disabled' : '';
		if (SystemMult[Game.system][i] == 1) { pricecolor = ''; }
		if (SystemMult[Game.system][i] < 1) { pricecolor = 'rouge'; }
		if (SystemMult[Game.system][i] > 1) { pricecolor = 'vert'; }

		name = "<img class='ui avatar image' src='images/items/" + i + ".png'><span class='Palladium'><font class='type2'>" + texts.items[i] + "</font></span>";
		cost = "<font class='" + pricecolor + " bold'>" + fix(offer.value * SystemMult[Game.system][i], 1) + "€</font>";
		description = offer.desc;
		var inventory = Game.inventory[i] < 1 ? '<font class="rouge">' + fix(Game.inventory[i], 0) + '</font>' : '<font class="vert">' + fix(Game.inventory[i], 0) + '</font>';

		var SYSTEMDIV = $(
			"<tr class=''>" +
			"<td class='center aligned ui'>" + name + "</td>" +
			"<td class='center aligned'>" + description + "</td>" +
			"<td class='center aligned type3'> " + cost + "</td>" +
			"<td class='center aligned'> " + inventory + "</td>" +
			"<td class='center aligned'><div class='ui spacel buttons'><button class='ui " + canSell + " button' onClick='sellitem(" + i + ",1);'>1</button><button class='ui " + canSell10 + " button' onClick='sellitem(" + i + ",10);'>10</button><button class='ui " + canSell100 + " button' onClick='sellitem(" + i + ",100);'>100</button><button class='ui " + canSell1000 + " button' onClick='sellitem(" + i + ",1000);'>1000</button></div></td>" +
			"</tr>"
		);
		$('#system0sm').append(SYSTEMDIV);
	}
}

//GENERATE STATION

function GenStation() {
	$('#system0ss').html("<thead><tr class='shadow'><th class='ui center aligned'>Nom</th><th class='ui center aligned'>Technologie</th><th class='ui center aligned'>Requiert</th><th class='ui center aligned'>Prix</th><th class='ui center aligned'>Action</th></tr></thead>");

	for (var i in Technologies) {
		var offer = Technologies[i];
		var buytext = "";
		var visible = "";
		var active = "";
		var buy1 = 0;
		var buy2 = 0;
		var pricecolor = offer.cost > Game.cash ? 'rouge' : 'vert';
		var cost = "<i class='green dollar sign icon'></i><font class='" + pricecolor + "'>" + fix(offer.cost, 1) + "</font>";

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

		if (Game.technologies[i] == 1) { buyable = "disabled"; buyVar = 0; cost = ""; active = "<font class='vert'>Activé</font>"; visible = "style='display:none;'"; }
		else { buytext = "Construire"; }

		if (Game.cash < offer.cost) { pricecolor = "rouge"; buyable = "disabled"; buyVar = 0; }


		if (offer.type == 0) { type = "Automatisation de minage"; }

		var SYSTEMDIV = $(
			"<tr class=''>" +
			"<td class='center aligned ui'><span class='Palladium'><font class='type2'>" + offer.name + "</font></span></td>" +
			"<td class='center aligned type3'> " + type + "</td>" +
			"<td class='center aligned'>" + requiretext1 + "<img class='ui avatar image' src='images/items/" + offer.req[0] + ".png'><br>" + requiretext2 + "<img class='ui avatar image' src='images/items/" + offer.req2[0] + ".png'></td>" +
			"<td class='center aligned'>" + cost + "</td>" +
			"<td class='center aligned'>" + active + "<button class='ui " + buyable + " red button' " + visible + " onClick='buyupgrade(" + i + ", " + buyVar + ", " + offer.req[0] + ", " + offer.req[1] + ", " + offer.req2[0] + ", " + offer.req2[1] + ");'>" + buytext + "</button></td>" +
			"</tr>"
		);
		if (Game.technologies[i] == 1) { $('#system0ss').append(SYSTEMDIV); }
		if (i == 0) { if (Game.technologies[0] == 0) { $('#system0ss').append(SYSTEMDIV); } }
		else { if (Game.technologies[i - 1] == 1) { $('#system0ss').append(SYSTEMDIV); } }
	}
}

//UI FUNCTIONS

function hideModals() { for (var id = 1; id < 6; id++) { $('#modal-' + id).modal('hide'); } }
function hidesystems() { for (var id = 0; id < 17; id++) { $("#system" + id).hide(); } }
function hideTabs() { for (var id = 0; id < 10; id++) { $("#tab" + id).hide(); } }
function hideMenuTabs() { for (var id = 0; id < 10; id++) { $("#tab" + id).hide(); $("#t" + id).removeClass("spacelborder"); } }

function ClickEvents() {
	$("#modalmenu").on("click", "a", function () { var id = $(this).data('id'); $('#modal-' + id).modal('show'); $('.ui.sidebar').sidebar('toggle'); });
	$("#game-menu").on("click", "button", function () { var id = $(this).data('id'); hideMenuTabs(); $("#tab" + id).show(); $("#t" + id).addClass("spacelborder"); });
	$("#sidebar").on("click", "a", function () { var id = $(this).data('id'); hideTabs(); $("#tab" + id).show(); $('.ui.sidebar').sidebar('toggle'); });
	$('#select').dropdown();
	$('.ui.dropdown').dropdown();

	$("#selection-content").on("click", "div", function () { var id = $(this).data('id'); hidesystems(); Game.system = id; $('#system' + id).show(); });

	$("#top-menu").on("click", "#sidebar", function () { $('.ui.sidebar').sidebar('toggle'); });
	$("#endmessages").on("click", "#ViewContact", function () { hideTabs(); $("#tab4").show(); });
	$("#how").on("click", "#ViewContact", function () { hideTabs(); $("#tab4").show(); });
}

function AddTravelPoints() {
	$("#selection-content").html(""); //RESET VIEW
	$("#selection-content").append("<div class='item' id='V0' data-id='0'>" + texts.systemname[0] + "</div>");
	if (Game.rank >= 10) { $("#selection-content").append("<div class='item' id='V1' data-id='1'>" + texts.systemname[1] + "</div>"); $("#percentrank").html("50"); }
	if (Game.rank >= 50) { $("#selection-content").append("<div class='item' id='V2' data-id='2'>" + texts.systemname[2] + "</div>"); $("#percentrank").html("100"); }
	if (Game.rank >= 100) { $("#selection-content").append("<div class='item' id='V3' data-id='3'>" + texts.systemname[3] + "</div>"); $("#percentrank").html("350"); }
	if (Game.rank >= 350) { $("#selection-content").append("<div class='item' id='V4' data-id='4'>" + texts.systemname[4] + "</div>"); $("#percentrank").html("1000"); }
	if (Game.rank >= 1000) { $("#selection-content").append("<div class='item' id='V5' data-id='5'>" + texts.systemname[5] + "</div>"); $("#percentrank").html("2500"); }
	if (Game.rank >= 2500) { $("#selection-content").append("<div class='item' id='V6' data-id='6'>" + texts.systemname[6] + "</div>"); $("#percentrank").html("5000"); }
	if (Game.rank >= 5000) { $("#selection-content").append("<div class='item' id='V7' data-id='7'>" + texts.systemname[7] + "</div>"); $("#percentrank").html("10000"); }
	if (Game.rank >= 10000) { $("#selection-content").append("<div class='item' id='V8' data-id='8'>" + texts.systemname[8] + "</div>"); $("#percentrank").html("100000"); }
	if (Game.rank >= 100000) { $("#selection-content").append("<div class='item' id='V9' data-id='9'>" + texts.systemname[9] + "</div>"); $("#percentrank").html("Maxed out"); }
	$("#selection-text").html(texts.systemname[Game.system]);
}

function GenInventory() {
	$("#inventory").html("");
	for (var id in texts.items) {
		if (Game.inventory[id] > 0) { $("#inventory").append("<span class='Palladium'><font class='bold " + SetColor(Game.inventory[id]) + "'>" + fix(Game.inventory[id], 1) + "</font> " + texts.items[id] + " </span><img class='ui avatar image' src='images/items/" + id + ".png'><br>"); }
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

function closeTutorial() { hideModals(); Game.tutorial = 0; }

function NextTuto() {
	if (Game.fl == 0) { Game.fl = 1; }
	if (Game.tutorial < 3) { Game.tutorial++; setTutorial(Game.tutorial); }
}

function PrevTuto() {
	if (Game.tutorial >= 1) { Game.tutorial--; setTutorial(Game.tutorial); }
}

var UpdateUI = function () {
	for (var inv = 0; inv < 18; inv++) { $("#inv" + inv).html(" <font class='" + SetColor(Game.inventory[inv]) + "'>" + Game.inventory[inv] + "</font>"); }
	$("#money").html("" + fix(Game.cash, 1) + "");
	$("#rank").html("" + fix(Game.rank, 1) + "");
	$('#system-select').val(texts.systemname[Game.system]);
	GenMissions();
	GenStation();
	AddTravelPoints();
};

function UpdateTexts() {
	$("#announces").html(announces);
	document.title = sitename + " " + version;
}

function SetColor(value) {
	var color = "";
	if (value < 1) { color = 'noir'; }
	if (value == 1) { color = 'jaune'; }
	if (value > 1) { if (value < 11) { color = 'bleu'; } }
	if (value > 10) { if (value < 51) { color = 'violet'; } }
	if (value > 50) { if (value < 100) { color = 'rose'; } }
	if (value > 99) { if (value < 1000) { color = 'rouge'; } }
	return color;
}

//GENERATE MISSIONS

function GenMissions() {
	for (var id = 0; id < 10; id++) { $('#system' + id).html("<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Description</th><th class='ui center aligned'>Mission cost            </th><th class='ui center aligned'>Action</th></tr></thead>"); }

	for (var i in Missions) {
		var offer = Missions[i];
		var canbuy = Game.cash < offer.price ? ' disabled' : '';
		var exploretext = Game.explored[i] > 0 ? 'Visit' : 'Explore';
		var rewards = Game.explored[i] > 0 ? offer.nbr : offer.nbr * 2;
		var rewardstext = SetColor(rewards);
		var pricetext = Game.explored[i] < 1 ? fix(offer.price / 2, 1) : fix(offer.price, 1);
		reward = texts.items[offer.type];
		name = "<font class='text type1'>" + texts.systemname[offer.system] + "-" + offer.name + "</font>";
		cost = "<font class='vert bold type3'>$" + pricetext + "</font>";
		description = offer.desc;

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

//GENERATE STATION

function GenStation() {
	$('#system0sm').html("<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Description</th><th class='ui center aligned'>Value</th><th class='ui center aligned'>Inventory</th><th class='ui center aligned'>Sell item</th></tr></thead>");

	for (var i in Station) {
		var offer = Station[i];
		var canSell = Game.inventory[i] < 1 ? ' disabled' : '';
		var canSell10 = Game.inventory[i] < 10 ? ' disabled' : '';
		var canSell100 = Game.inventory[i] < 100 ? ' disabled' : '';
		var canSell1000 = Game.inventory[i] < 1000 ? ' disabled' : '';
		if (SystemMult[Game.system][i] == 1) { pricecolor = ''; }
		if (SystemMult[Game.system][i] < 1) { pricecolor = 'rouge'; }
		if (SystemMult[Game.system][i] > 1) { pricecolor = 'vert'; }

		name = "<img class='ui avatar image' src='images/items/" + i + ".png'><span class='Palladium'><font class='type2'>" + texts.items[i] + "</font></span>";
		cost = "<font class='" + pricecolor + " bold'>$" + fix(offer.value * SystemMult[Game.system][i], 1) + "</font>";
		description = offer.desc;
		var inventory = Game.inventory[i] < 1 ? '<font class="rouge">' + fix(Game.inventory[i], 1) + '</font>' : '<font class="vert">' + fix(Game.inventory[i], 1) + '</font>';

		var SYSTEMDIV = $(
			"<tr class=''>" +
			"<td class='center aligned ui'>" + name + "</td>" +
			"<td class='center aligned'>" + description + "</td>" +
			"<td class='center aligned type3'> " + cost + "</td>" +
			"<td class='center aligned'> " + inventory + "</td>" +
			"<td class='center aligned'><div class='ui buttons'><button class='ui " + canSell + " red button' onClick='sellitem(" + i + ",1);'>1</button><button class='ui " + canSell10 + " red button' onClick='sellitem(" + i + ",10);'>10</button><button class='ui " + canSell100 + " red button' onClick='sellitem(" + i + ",100);'>100</button><button class='ui " + canSell1000 + " red button' onClick='sellitem(" + i + ",1000);'>1000</button></div></td>" +
			"</tr>"
		);
		$('#system0sm').append(SYSTEMDIV);
	}
}

//UI FUNCTIONS

function hidesystems() { for (var id = 0; id < 17; id++) { $("#system" + id).hide(); } }
function hideTabs() { for (var id = 1; id < 6; id++) { $("#tab" + id).hide(); } }

function ClickEvents() {
	$("#sidebar").on("click", "a", function () {
		var id = $(this).data('id'); hideTabs();
		$("#tab" + id).show();
		$('.ui.sidebar').sidebar('toggle');
	});
	$('#select').dropdown();
	$('.ui.dropdown').dropdown();
	$("#system-select").change(function () {
		var id = $(this).val();
		hidesystems();
		Game.system = id;
		$('#system' + id).show();
		$("#V" + id).addClass('active');
	});
	$("#top-menu").on("click", "#sidebar", function () {
		$('.ui.sidebar').sidebar('toggle');
	});
	$("#endmessages").on("click", "#ViewContact", function () {
		hideTabs();
		$("#tab4").show();
	});
	$("#how").on("click", "#ViewContact", function () {
		hideTabs();
		$("#tab4").show();
	});
}

function AddTravelPoints() {
	$("#system-select").html(""); //RESET VIEW
	$("#system-select").append("<option id='V0' value='0'>" + texts.systemname[0] + "</option>");
	if (Game.rank >= 10) { $("#system-select").append("<option id='V1' value='1'>" + texts.systemname[1] + "</option>"); }
	if (Game.rank >= 50) { $("#system-select").append("<option id='V2' value='2'>" + texts.systemname[2] + "</option>"); }
	if (Game.rank >= 100) { $("#system-select").append("<option id='V3' value='3'>" + texts.systemname[3] + "</option>"); }
	if (Game.rank >= 250) { $("#system-select").append("<option id='V4' value='4'>" + texts.systemname[4] + "</option>"); }
	if (Game.rank >= 1000) { $("#system-select").append("<option id='V5' value='5'>" + texts.systemname[5] + "</option>"); }
	if (Game.rank >= 2500) { $("#system-select").append("<option id='V6' value='6'>" + texts.systemname[6] + "</option>"); }
	if (Game.rank >= 5000) { $("#system-select").append("<option id='V7' value='7'>" + texts.systemname[7] + "</option>"); }
	if (Game.rank >= 10000) { $("#system-select").append("<option id='V8' value='8'>" + texts.systemname[8] + "</option>"); }
	$('#system-select').val(texts.systemname[Game.system]);
}
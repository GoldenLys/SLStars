var UpdateUI = function () {
	for (var inv = 0; inv < 7; inv++) { $("#inv" + inv).html(" (" + Game.inventory[inv] + ")"); }
	$("#money").html(" ($" + fix(Game.cash, 2) + ")");
	GenMissions();
	GenStation();
};

function UpdateTexts() {
	$("#announces").html(announces);
	for (var offer = 0; offer < 7; offer++) { $("#system-select").append("<option id=V" + offer + " value=" + offer + ">" + texts.systemname[offer] + "</option>"); }
	document.title = sitename + " " + version;

}

//GENERATE Missions TAB

function GenMissions() {
	for (var id = 0; id < 7; id++) { $('#system' + id).html("<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Description</th><th class='ui center aligned'>Mission cost            </th><th class='ui center aligned'>Action</th></tr></thead>"); }

	for (var i in Missions) {
		var offer = Missions[i];
		var canbuy = Game.cash < offer.price ? ' disabled' : '';
		var exploretext = Game.explored[i] > 0 ? 'Visit' : 'Explore';
		var rewardstext = Game.explored[i] > 0 ? offer.itemNBR : offer.itemNBR * 2;
		var pricetext = Game.explored[i] < 1 ? fix(offer.price / 2, 3) : fix(offer.price, 3);
		reward = texts.items[offer.itemtype] + " x" + rewardstext;
		name = "<font class='text type2'>" + texts.systemname[offer.system] + "-" + offer.name + "</font>";
		cost = "<font class='vert bold'>$" + pricetext + "</font>";
		description = offer.desc;

		var SYSTEMDIV = $(
			"<tr class=''>" +
			"<td class='center aligned ui'>" + name + "</td>" +
			"<td class='center aligned'>" + description + " (" + reward + ")</td>" +
			"<td class='center aligned'> " + cost + "</td>" +
			"<td class='center aligned'><a class='fluid ui " + canbuy + " red button' onClick='explore(" + i + ");'>" + exploretext + "</a></td>" +
			"</tr>"
		);
		$('#system' + offer.system).append(SYSTEMDIV);
	}
}

//GENERATE Station TAB

function GenStation() {
	for (var id = 0; id < 7; id++) { $('#system' + id + "ss").html("<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Description</th><th class='ui center aligned'>Value</th><th class='ui center aligned'>Sell item</th></tr></thead>"); }

	for (var i in Station) {
		var offer = Station[i];
		var canSell = Game.inventory[i] < 1 ? ' disabled' : '';
		var canSell10 = Game.inventory[i] < 10 ? ' disabled' : '';
		var canSell100 = Game.inventory[i] < 100 ? ' disabled' : '';
		name = "<font class='text type2'>" + texts.items[i] + "</font>";
		cost = "<font class='vert bold'>$" + offer.value * SystemMult[Game.system][i] + "</font>";
		description = offer.desc;

		var SYSTEMDIV = $(
			"<tr class=''>" +
			"<td class='center aligned ui'>" + name + "</td>" +
			"<td class='center aligned'>" + description + "</td>" +
			"<td class='center aligned'> " + cost + "</td>" +

			"<td class='center aligned'><div class='ui buttons'><button class='ui " + canSell + " red button' onClick='sellitem(" + i + ",1);'>1</button><button class='ui " + canSell10 + " red button' onClick='sellitem(" + i + ",10);'>10</button><button class='ui " + canSell100 + " red button' onClick='sellitem(" + i + ",100);'>100</button></div></td>" +
			"</tr>"
		);
		$('#system0ss').append(SYSTEMDIV);
		$('#system1ss').append(SYSTEMDIV);
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
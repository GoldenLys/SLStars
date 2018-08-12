var UpdateUI = function () {
	OffersList();
};

function UpdateTexts() {
	$("#announces").html(announces);
	for (var offer = 1; offer < 17; offer++) { $("#V" + offer).html(texts.offertype[offer] + " market"); }
	document.title = sitename + " " + version;

}

//GENERATE OFFERS TAB

function OffersList() {
	for (var id = 1; id < 5; id++) { $('#Vtab' + id).html("<thead><tr class='shadow'><th class='ui center aligned'>Name</th><th class='ui center aligned'>Price</th><th class='ui center aligned'>Description</th><th class='ui center aligned'>Action</th></tr></thead>"); }

	for (var i in offers) {
		var offer = offers[i];
		type = "";
		name = "<font class='text type2'>";
		cost = "<font class='vert bold'>" + fix(offer.price, 3) + offer.currency + "</font>";
		description = offer.description;
		paypalurl = offer.url;

		var offersDIV = $(
			"<tr class=''>" +
			"<td class='center aligned ui'>" + name + offer.name + "</font></td>" +
			"<td class='center aligned'>" + cost + "</td>" +
			"<td class='center aligned'> " + description + "</td>" +
			"<td class='center aligned'><a class='fluid ui violet button' href='" + paypalurl + "'>Purchase</a></td>" +
			"</tr>"
		);
		if (offer.type == 1) { $('#Vtab1').append(offersDIV); }
	}
}

//UI FUNCTIONS

function hideVTabs() { for (var id = 1; id < 17; id++) { $("#Vtab" + id).hide(); } }
function hideTabs() { for (var id = 1; id < 5; id++) { $("#tab" + id).hide(); } }

function ClickEvents() {
	$("#sidebar").on("click", "a", function () {
		var id = $(this).data('id'); hideTabs();
		$("#tab" + id).show();
		$('.ui.sidebar').sidebar('toggle');
	});
	$('#select').dropdown();
	$('.ui.dropdown').dropdown();
	$("#veh-select").change(function () {
		var id = $(this).val();
		hideVTabs();
		$('#Vtab' + id).show();
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
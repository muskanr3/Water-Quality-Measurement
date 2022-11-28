const url_tds = "https://api.thingspeak.com/channels/1913326/fields/1/last.txt";
const url_turb = "https://api.thingspeak.com/channels/1913326/fields/4/last.txt";
const url_ph = "https://api.thingspeak.com/channels/1913326/fields/5/last.txt";

var max_tds = 600;
var min_tds = 50;

var max_ph = 8;
var min_ph = 5;

var max_turb = 1;
var min_turb = 0;

var tds = 0;
var ph = 0;
var turb = 0;

function Repeat() { // Repeat is called from body onload
	setInterval(threshold_cross, 5000); // Runs function every 5 seconds
}

function threshold_cross() { // Checks if thresholds have been exceeded
	// $ uses ajax get to get data from url
	$.get(url_tds, function (data) {tds = data;});
	$.get(url_turb, function (data) {turb = data;});
	$.get(url_ph, function (data) {ph = data;});

	var tds_alert = "";
	if ((tds>max_tds) || (tds<min_tds)) {
		if (tds>max_tds) {
			tds_alert = tds_alert.concat("WARNING: High TDS levels");
		}
		else {
			tds_alert = tds_alert.concat("WARNING: Low TDS levels");
		}
		tds_alert = tds_alert.concat(" TDS = ");
		tds_alert = tds_alert.concat(tds);
		tds_alert = tds_alert.concat("\n");
	}

	var turb_alert = "";
	if ((turb>max_turb) || (turb<min_turb)) {
		if (turb>max_turb) {
			turb_alert = turb_alert.concat("WARNING: High Turbidity levels");
		}
		else {
			turb_alert = turb_alert.concat("WARNING: Low Turbidity levels");
		}
		turb_alert = turb_alert.concat(" Turbidity = ");
		turb_alert = turb_alert.concat(turb);
		turb_alert = turb_alert.concat("\n");
	}

	var ph_alert = "";
	if ((ph>max_ph) || (ph<min_ph)) {
		if (ph>max_ph) {
			ph_alert = ph_alert.concat("WARNING: High pH levels");
		}
		else {
			ph_alert = ph_alert.concat("WARNING: Low pH levels");
		}
		ph_alert = ph_alert.concat(" pH = ");
		ph_alert = ph_alert.concat(ph);
		ph_alert = ph_alert.concat("\n");
	}

	turb_alert = turb_alert.concat(ph_alert);
	tds_alert = tds_alert.concat(turb_alert);

	alert(tds_alert);
}
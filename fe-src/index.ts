import { init as text } from "./components/text";
import { initRouter } from "./router";
import { init as button } from "./components/button";
import { init as input } from "./components/input";
import { init as header } from "./components/header";
import { init as PutPicture } from "./components/putImage";
import { init as PutLocation } from "./components/map";
import { init as reportedPet } from "./components/cardMyReportedPet";
import { init as nearbyPet } from "./components/cardNearbyPet";
import { state } from "./state";

(function () {
	const root = document.querySelector(".root");
	state.init();
	input();
	initRouter(root);
	nearbyPet();
	button();
	text();
	PutPicture();
	PutLocation();
	reportedPet();
	header();
})();

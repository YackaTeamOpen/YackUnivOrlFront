window.OneSignal = window.OneSignal || [];

//it makes sense to test on url origin as this is what we entered in onesignal
if(window.origin == "http://localhost:3000" || window.origin == "http://localhost:3001"){
	//Yacka Dev App on One Signal
	OneSignal.push(function() {
		OneSignal.init({
			appId: "6f986822-93b2-4813-82ed-b7ce32ec301e",

			safari_web_id: "web.onesignal.auto.59acb98d-1515-493b-98a5-7443c569eebc",
			allowLocalhostAsSecureOrigin: true,
			slidedown: {
				enabled: true,
				autoPrompt: true,
				timeDelay: 5,
				pageViews: 1
			}
		});


	});
}else if (environment.web_manager_url.includes("alpha")) {
	//Yacka App on One Signal
	OneSignal.push(function() {
		OneSignal.init({
			appId: "dd0c18cf-969b-4e2c-94a4-3dcf43cdbd20",

			safari_web_id: "web.onesignal.auto.3575d4da-2056-4635-b3df-37db701214ed",
			slidedown: {
				enabled: true,
				autoPrompt: true,
				timeDelay: 5,
				pageViews: 1
			}
		});
	});
}else{
	//Yacka App on One Signal
	OneSignal.push(function() {
		OneSignal.init({
			appId: "40d08761-d176-44d5-881b-adedad3930a2",

			safari_web_id: "web.onesignal.auto.3575d4da-2056-4635-b3df-37db701214ed",
			slidedown: {
				enabled: true,
				autoPrompt: true,
				timeDelay: 5,
				pageViews: 1
			}
		});
	});
}

function setOneSignalExternalUserId(user_id){
	OneSignal.isPushNotificationsEnabled(function(isEnabled) {
		if (isEnabled){
			OneSignal.setExternalUserId(user_id);
		} else {
			OneSignal.showNativePrompt();
		}
	});
}

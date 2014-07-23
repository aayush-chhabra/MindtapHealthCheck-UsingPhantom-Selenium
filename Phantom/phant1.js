var page = require('webpage').create();


page.open("http://qae-ng.cengage.com/static/nb/ui/admin/masters/masters.html", "POST", "username=sanat.chugh%40cengage.com&password=Cengage1&redirectTo=", function(status) {
	
	if ( status === "success" ) {
		page.render("google.png");
		console.log("a");
	}

	else
	{
		page.render("google.png");
		console.log("b");
	}
	phantom.exit();
});
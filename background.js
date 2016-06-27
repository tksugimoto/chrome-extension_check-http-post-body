
chrome.webRequest.onBeforeRequest.addListener(details => {
	var method = details.method;
	if (method !== "GET") {
		var url = details.url;
		var requestBody = details.requestBody || {};
		var host = url.match(/:[/][/]([^/]+)/)[1];
		console.log(method, host, {
			url: url,
			type: details.type,
			raw: requestBody.raw,
			formData: requestBody.formData,
			details: details
		});
	}
}, {
	urls: [
		"http://*/*",
		"https://*/*"
	]
}, [
	"blocking",
	"requestBody"
]);

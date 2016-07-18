
chrome.webRequest.onBeforeRequest.addListener(details => {
	var method = details.method;
	if (method !== "GET") {
		var url = details.url;
		var requestBody = details.requestBody || {};
		var raw = requestBody.raw;
		if (raw) {
			raw = raw.map(obj => {
				if (obj.bytes) {
					return arrayBuffer2string(obj.bytes);
				} else {
					return obj;
				}
			});
		}
		var host = url.match(/:[/][/]([^/]+)/)[1];
		console.log(method, host, {
			url: url,
			type: details.type,
			raw: raw,
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


function arrayBuffer2string(arrayBuffer) {
	var uint8Array = new Uint8Array(arrayBuffer);
	return new TextDecoder("utf-8").decode(uint8Array);
}

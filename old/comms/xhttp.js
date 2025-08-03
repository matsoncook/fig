function XhttpClient(url)
{
	this.url = url;
	this.xhttp =  new XMLHttpRequest();
	
	this.post = function(aString)
	{
		var xhttp = this.xhttp;
		xhttp.addEventListener("load", this.response);
		xhttp.open("POST", this.url, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(aString);
	}
	this.get = function()
	{
		var xhttp = this.xhttp;
		xhttp.addEventListener("load", this.response);
		xhttp.open("GET", this.url);
		
		xhttp.send();
	}

	this.response = function()
	{
		
	}
}
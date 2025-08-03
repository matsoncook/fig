function WebSocketClient (webSocketAddress) {
    // if user is running mozilla then use it's built-in WebSocket
	this.cache = [];
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    this.ready = false;

    //this.connection = new WebSocket('ws://192.168.1.73:8000');
    //this.connection = new WebSocket('ws://127.0.0.1:8000');
    //this.connection = new WebSocket('ws://35.165.57.85:80');
    this.connection = new WebSocket(webSocketAddress);
    
    var that = this;
    
    this.newData = function(object2d){};

    this.connection.onopen = function () {
    	console.log('connection.onopen: ');
    	that.ready = true;
    	for(var i = 0; i < that.cache.length; i++ )
    	{
    		that.connection.send(that.cache[i]);
    	}
    	
    };

    this.connection.onerror = function (error) {
    	console.log('connection.onerror: ');
    };

    this.connection.onmessage = function (message) {
        // try to decode json (I assume that each message from server is json)
    	var jsonObject = null;
        try {
            jsonObject = JSON.parse(message.data);
            
           
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ',e);
            return;
        }
        that.newData(jsonObject);
        // handle incoming message
    };
    
    this.send = function(text)
    {
    	if(this.ready)
    	{
    		this.connection.send(text);
    	}
    	else
    	{
    		this.cache.push(text);
    	}
    }
    
    
    
    
}

const image2base64 = require('image-to-base64');
var fs = require("fs");
var path = require('path');
var options = {filename: 'test', filePath: './'};


var app = require('express')();
var http = require('http').Server(app).listen(80);
var io = require('socket.io')(http);
console.log('[+] Server Started!');
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});


/*io.on('connection',function(socket){
image2base64("leo_messi.jpg")
    .then(
        (response) => {
	//Encoder : 
            //console.log(response); //cGF0aC90by9maWxlLmpwZw==
	    socket.emit('coded_img',response);
	   // var imageData = new Buffer(response, 'base64');
	//Decoder : 
	   /* base64.base64decoder(imageData, options, function (err, saved) {
    		if (err) { console.log(err); }  
    		console.log(saved);    
	    });*/
	    //base64Img.img('response:image/jpg;base64,...', '/home/medbilel/Desktop', '1', function(err, filepath) {});
 /*       }
    )
    .catch(
        (error) => {
            console.log(error); //Exepection error....
        }
    )



//});
*/



	//var PythonShell = require('python-shell');
	//var pyshell = new PythonShell('label_image.py',{args:'received_img'});


var PythonShell = require('python-shell');
var options = {
  mode: 'text',
  args: ['received_img']
};




io.on('connection',function(socket){

	console.log('[+] A User is Connected!');
	socket.on('message',function(data){

		fs.writeFile("received_img", new Buffer(data, "base64"), function(err) {});
		//console.log('[+] Recieved : '+data);
		console.log(data.length);  
        	//socket.emit('sendres',data);
		//pyshell.on('message', function (message) {
  		// received a message sent from the Python script (a simple "print" statement)
 		//console.log(message);
		//console.log('okey');
		//socket.emit('result',message);
		//});

		PythonShell.run('label_image.py', options, function (err, results) {
  			if (err) throw err;
  			// results is an array consisting of messages collected during execution
  			console.log(results[0]);
			var resultat = results.toString();
			var split_res = resultat.split("=");
			var probability = split_res[1].split(")")[0];
			if(parseFloat(probability) > 0.5){
				socket.emit('proba_result',results);
				socket.emit('img_result',data);
				socket.emit('marker_result',"OK");
			}
  			
		});

	
	});

	socket.on('disconnect',function(){
	        console.log('[+] A user is disconnected!');
	});
});

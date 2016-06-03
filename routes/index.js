var express = require('express');
var router = express.Router();
var events = require('events');

var eventemitter = new events.EventEmitter();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/events',function(req,res,next){
	//req.socket.setTimeout(Infinity);
	res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});	
	

	 var id = (new Date()).toLocaleTimeString();
	// setInterval(function(){
	// 	constructSSE(res,id,(new Date()).toLocaleTimeString());
	// },1000);
	function send()
	{
		console.log(mesg);
		res.write('id:'+id+'\n');
		res.write('retry:1000'+'\n');
		//res.write('event:chat'+'\n');
		res.write('data: {"msg":"'+mesg+'",'+'"receiver":"'+name+'"}');
		//res.write('data:'+'       -'+name+'\n\n');
		res.write('\n\n');
	}
	eventemitter.on('msg',send);
	//constructSSE(res,id,(new Date()).toLocaleTimeString());

});
var mesg ='';
var name ='';
router.post('/send',function(req,res,next){
	mesg = req.body.message;
	name = req.body.user;
	//constructSSE(res,(new Date()).toLocaleTimeString(),req.body.message)
	eventemitter.emit('msg');
	
	res.end("success");
});

function constructSSE(res,id,data)
{

	console.log("SSE.............."); 
	res.write('id:'+id+'\n');
	res.write('data:'+data+'   '+(new Date()).toLocaleTimeString()+'\n\n');
	res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});
	res.write('\n');
	
}



module.exports = router;

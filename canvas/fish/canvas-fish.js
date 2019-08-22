window.addEventListener("load",function(){

requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || 
window.webkitRequestAnimationFrame || 
window.msRequestAnimationFrame;
	moveingFish();
	
	var fbg=document.getElementById('canvas-bg');
	var md=true;
	//document.body.addEventListener('mousedown',function(e){ md=true;});
	//document.body.addEventListener('mouseup',function(e){ md=false;});
	document.body.addEventListener('mousemove',function(e){ if(md){
	var mx=window.innerWidth/2; mx=e.clientX-mx;  
	var my=window.innerHeight/2;my=e.clientY-my; 
	
	console.log(mx,my); 
	
	fbg.style.transform="translate(-"+(50+(mx/500))+"%,-"+(50+(my/500))+"%)";
	
	}});
	
});

var requestAnimationFrame;
var count=10; var canvas; var pdk; var ren=[];
function moveingFish(){
	for(var i=1; i<=count; i++){
	canvas=document.createElement('canvas'); canvas.setAttribute('id',"fish"+i);
	canvas.width=500;canvas.height=344;
	document.getElementById('canvas-fish').appendChild(canvas);
	//var canvas = document.getElementById('myCanvas');
	//canvas.style.transform="translate(500px,0px) scale(0.5,0.5)";
	ren[i]={}; ren[i].du=$getRN(4,12);  ren[i].width=$getRN((window.innerWidth/2)+200,(window.innerWidth/2)+400); ren[i].scaleX=$getRN(1,2)/10; ren[i].scaleY=$getRN(1,2)/10;  ren[i].vP=$getRN(0,window.outerHeight);
	ren[i].fishVdu=$getRN(4,12); ren[i].fishVdir=$getRN(30,60);
	ren[i].rgb="rgba("+$getRN(0,255)+","+$getRN(0,255)+",255,1)"; ren[i].rgbR=$getRN(10,30); ren[i].rgbG=$getRN(30,50); ren[i].rgbB=$getRN(40,80);
	}
	requestAnimationFrame(startDraw);
	
}

function startDraw(ts){ //console.log(ts);

  //var time = new Date(); 
  //var dif=time-timeing; console.log(dif);
  
var k= $gt({id:"dt4",ts:ts,duration:0.5});   

for(var f=1;f<=count;f++){ 

	var kk= $gt({id:"dtkk",ts:ts,duration:ren[f].du}); var kkV= $gt({id:"dtkkV",ts:ts,duration:ren[f].fishVdu});
	 var fish = document.getElementById('fish'+f);  var dk=ren[f].width*(Math.sin(kk));  var rot=''; if(ren[f].pdk<dk){ rot='rotateY(180deg)'; }else{ rot=''; } ren[f].pdk=dk;  fish.style.transform="translate("+dk+"px,"+(ren[f].fishVdir+(ren[f].vP*Math.sin(kkV)))+"px) scale("+ren[f].scaleX+","+ren[f].scaleY+") "+rot;
    var context = fish.getContext('2d');
	
	
    context.clearRect(0, 0, fish.width, fish.height);
	
	//context.beginPath();
	context.fillStyle="rgba(255,255,255,0)";
	context.fillRect(0, 0, fish.width, fish.height);
	//context.fill();
	

	context.shadowColor = '#338a96';
	context.shadowBlur = 0;
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	
	//context.scale(1+Math.sin(k)/2500,1);
	//context.translate(1+(k%2),1);
	
	//var imageObj = new Image();
	//imageObj.onload = function() {
	//var pattern = context.createPattern(imageObj, 'repeat');
	//context.fillStyle = pattern;	
	context.fillStyle = "rgba("+ren[f].rgbR+","+ren[f].rgbG+","+ren[f].rgbB+",1)";//ren[f].rgb//"#41acbb";	
	//body fill
	context.beginPath();
	context.moveTo(119,127);
	context.quadraticCurveTo(206, 64, 327+(Math.sin(k)*(2)), 137);	
	context.quadraticCurveTo(346, 159, 347+(Math.sin(k)*(2.5)), 184);
	context.quadraticCurveTo(238, 280, 116, 234);
	context.closePath();
	context.strokeStyle="rgba("+ren[f].rgbR+","+ren[f].rgbG+","+ren[f].rgbB+",0.9)";
	context.lineWidth=2;
	context.stroke();	
	context.fill();	
	
	DrawHead(context,ts,f);
	
	//};
	//imageObj.src = 'pattern1.png';
}
	
requestAnimationFrame(startDraw);
	
}

function DrawT(context,ts,f)
{	
	//var imageObj = new Image();
	//imageObj.onload = function() {
	//var pattern = context.createPattern(imageObj, 'repeat');
	//context.fillStyle = pattern;
	//context.fillStyle = "#338a96";
	
	var k= $gt({id:"dt4",ts:ts,duration:0.5}); 
	
	//context.shadowColor = '#338a96';
	context.shadowBlur = 1;
	context.shadowOffsetX = 4;
	context.shadowOffsetY = 0;

	//body Stroke
	context.beginPath();
	context.moveTo(327,137);
	//context.bezierCurveTo(157,187,143, 229, 116, 234);
	context.bezierCurveTo(341,144,378+Math.sin(k)*(4), 43, 460+(Math.sin(k)*(30)), 34+(Math.sin(k)/10));
	//context.bezierCurveTo(413,125,467, 69, 400, 157);
	context.quadraticCurveTo(468+Math.sin(k)*(4), 98, 400+(Math.sin(k)*(4)), 157+(Math.sin(k)*(4)));	
	context.quadraticCurveTo(460+Math.sin(k)*(4), 193, 467+(Math.sin(k)*(30)), 287+(Math.sin(k)/10));		
	context.quadraticCurveTo(376+Math.sin(k)*(4), 246+Math.sin(k)*(20), 347, 184);
	//context.stroke();	
	context.fill();	
	
		DrawT1(context,ts);
		DrawT2(context,ts);
		DrawT3(context,ts);
		DrawT4(context,ts,f);
		DrawT5(context,ts,f);
	//};
	//imageObj.src = 'pattern3.png';
	
	//requestAnimationFrame(startDraw);
	
}

function DrawHead(context,ts,f)
{	
	//var imageObj = new Image();
	//imageObj.onload = function() {
	//var pattern = context.createPattern(imageObj, 'repeat');
	//context.fillStyle = pattern;
	
	context.shadowColor = '#296770';
	context.shadowBlur = 20;
	context.shadowOffsetX = 6;
	context.shadowOffsetY = 0;
	
	var k= $gt({id:"dt4",ts:ts,duration:1}); 

	//head
	context.beginPath();
	context.moveTo(34+(Math.sin(k)*2),186+(Math.sin(k)*2));
	context.quadraticCurveTo(70+(Math.sin(k)*2), 130+(Math.sin(k)*2), 119, 127);
	context.quadraticCurveTo(147+(Math.sin(k)*2), 140, 142, 172);
	context.bezierCurveTo(157,187,143+(Math.sin(k)*6), 229, 116, 234);
	context.quadraticCurveTo(51+(Math.sin(k)*2), 223, 45, 209);
	context.quadraticCurveTo(33+(Math.sin(k)*2), 203, 34,186);
	context.closePath();
	context.strokeStyle="#47ACBC";
	context.lineWidth=4;
	context.lineJoin = "round";
	context.lineCap = "round";
	context.stroke();	
	//context.fillStyle = "rgb(40,"+ren[f].rgbG+","+ren[f].rgbB+")"; //"rgba(255, 255, 255,1)";
	//context.fill();	
	context.fillStyle = "rgba("+ren[f].rgbR+","+ren[f].rgbG+","+ren[f].rgbB+",0.5)";//"rgba(71, 172, 188,0.2)";
	context.fill();	
	
	// Shadow
	//head
	context.shadowColor = "rgba("+ren[f].rgbR+","+ren[f].rgbG+","+ren[f].rgbB+",0.9)";//'#296770';
	context.shadowBlur = 0;
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	
	context.beginPath();
	context.moveTo(34,186);
	context.quadraticCurveTo(70, 130, 119, 127);
	context.quadraticCurveTo(147, 140, 142, 172);
	context.bezierCurveTo(157,187,143, 229, 116, 234);
	context.quadraticCurveTo(97, 227, 102, 223);
	context.quadraticCurveTo(153, 216, 133, 174);
	context.quadraticCurveTo(129, 161, 122, 152);
	context.bezierCurveTo(109,173,119, 206, 102+(Math.sin(k)*6), 223+(Math.sin(k)*6));
	context.bezierCurveTo(114,209,106, 185, 108+(Math.sin(k)*6), 168);
	context.quadraticCurveTo(109, 149, 73, 155);
	context.quadraticCurveTo(78, 166, 88, 164);
	context.quadraticCurveTo(111, 194, 78, 200);
	context.quadraticCurveTo(63, 171, 42, 181);
	context.quadraticCurveTo(56, 193, 63+(Math.sin(k)*6), 210);
	context.bezierCurveTo(75,203,92, 215, 103, 198);
	context.quadraticCurveTo(86, 230, 58+(Math.sin(k*2)*6), 214);
	context.quadraticCurveTo(48, 211, 45, 209);
	context.quadraticCurveTo(33, 203, 34,186);
	
	context.closePath();
	context.fillStyle = "rgb("+ren[f].rgbR+","+ren[f].rgbG+","+ren[f].rgbB+")";//"rgba(71, 172, 188,0.6)";
	context.fill();	
	
	context.fillStyle = "rgba("+ren[f].rgbR+","+ren[f].rgbG+","+ren[f].rgbB+",0.7)";//"rgba(71, 172, 188,0.6)";

	DrawT(context,ts,f);
	DrawHeadParts(context,ts,f);
	//};
	//imageObj.src = 'pattern2.png';
	
}

function DrawHeadParts(context,ts,f){
	var k= $gt({id:"dt4",ts:ts,duration:1.2}); 
	//mouth Line
	context.beginPath();
	context.moveTo(34,186);
	context.bezierCurveTo(45,187,36+(Math.sin(k)*10), 202+(Math.sin(k)*4), 58, 207);
	context.lineWidth=3;
	context.stroke();
	
	//head
	context.beginPath();
	context.arc(80, 185, 14, 0, Math.PI * 2);
	context.strokeStyle="rgba("+ren[f].rgbR+","+ren[f].rgbG+","+ren[f].rgbB+",0.9)";//"#296770";
	context.shadowColor = '#000';
	context.shadowBlur = 4;
	context.shadowOffsetX = 2;
	context.shadowOffsetY = -1;
	context.stroke();
	var grd = context.createRadialGradient(81+(Math.sin(k)*2), 182+(Math.sin(k)*2), 10, 80, 185, 20);
	grd.addColorStop(0, 'white');
	grd.addColorStop(1, '#296770');
	context.fillStyle = grd;
	context.fill();	
	
	context.beginPath();
	context.arc(81+(Math.sin(k)*2), 182+(Math.sin(k)*(-2)), 6, 0, Math.PI * 2);
	var grd = context.createRadialGradient(81, 182, 1, 80, 185, 8);
	grd.addColorStop(0, 'white');
	grd.addColorStop(1, '#296770');
	context.fillStyle = grd;
	context.fill();	
}

function DrawT1(context,ts)
{	
	//var imageObj = new Image();
	//imageObj.onload = function() {
	//var pattern = context.createPattern(imageObj, 'repeat');
	//context.fillStyle = pattern;
	//context.fillStyle = "#338a96";
	var k= $gt({id:"dt4",ts:ts,duration:0.15}); 

	//body Stroke
	context.beginPath();
	context.moveTo(156,108);		
	context.quadraticCurveTo(145, 50, 197+(Math.sin(k)*2), 18+(Math.sin(k)*6));
	context.bezierCurveTo(200,65,275+(Math.sin(k)*2), 105+(Math.sin(k)*2), 334+(Math.sin(k)*2), 107+(Math.sin(k)*2));
	context.quadraticCurveTo(331, 125, 296, 120);	
	context.quadraticCurveTo(230, 90, 156, 108);
	context.closePath();
	context.fill();	
	//};
	//imageObj.src = 'pattern3.png';	
}

function DrawT2(context,ts)
{	
	//var imageObj = new Image();
	//imageObj.onload = function() {
	//var pattern = context.createPattern(imageObj, 'repeat');
	//context.fillStyle = pattern;
	//context.fillStyle = "#338a96";
	var k= $gt({id:"dt4",ts:ts,duration:0.15}); 
	
	//body Stroke
	context.beginPath();
	context.moveTo(193,249);		
	context.quadraticCurveTo(218+(Math.sin(k)*4), 297, 283+(Math.sin(k)*2), 306+(Math.sin(k)*2));
	//context.bezierCurveTo(200,65,275, 105, 334, 107);
	context.quadraticCurveTo(257, 266, 266+(Math.sin(k)*1), 256);	
	context.quadraticCurveTo(253, 249, 251, 239);	
	context.quadraticCurveTo(228, 248, 193, 249);
	context.closePath();
	context.fill();	
	//};
	//imageObj.src = 'pattern3.png';	
}

function DrawT3(context,ts)
{	
	//var imageObj = new Image();
	//imageObj.onload = function() {
	//var pattern = context.createPattern(imageObj, 'repeat');
	//context.fillStyle = pattern;
	//context.fillStyle = "#338a96";
	var k= $gt({id:"dt4",ts:ts,duration:0.08});

	//body Stroke
	context.beginPath();
	context.moveTo(276,230);		
	//context.quadraticCurveTo(218, 297, 283, 306);
	context.bezierCurveTo(296+(Math.sin(k)*1),238+(Math.sin(k)*2),312, 266, 342+(Math.sin(k)*2), 271+(Math.sin(k)*4));
	context.quadraticCurveTo(326, 250, 342+(Math.sin(k)*1), 213);	
	context.quadraticCurveTo(340, 205, 319, 204);	
	context.quadraticCurveTo(306, 218, 276, 230);
	context.closePath();
	context.fill();	
	//};
	//imageObj.src = 'pattern3.png';	
}

function DrawT4(context,ts,f)
{	
	//var imageObj = new Image();
	//imageObj.onload = function() {
	//var pattern = context.createPattern(imageObj, 'repeat');
	//context.fillStyle = pattern;
	context.fillStyle = "rgba("+ren[f].rgbR+","+ren[f].rgbG+","+ren[f].rgbB+",0.8)"; //"#225961";
	
	var k= $gt({id:"dt4",ts:ts,duration:0.05}); 

	//body Stroke
	context.beginPath();
	context.moveTo(135,225);
	context.bezierCurveTo(158,210,182, 263, 213+(Math.sin(k))*10, 289+(Math.sin(k))*(-10));
	context.bezierCurveTo(199,276,163, 269, 160+(Math.sin(k)), 255+(Math.sin(k))*(-5));
	context.bezierCurveTo(155,240,138, 242, 135, 225);
	context.closePath();
	context.fill();	
	//};
	//imageObj.src = 'pattern3.png';	
}

function DrawT5(context,ts,f)
{	
	//var imageObj = new Image();
	//imageObj.onload = function() {
	//var pattern = context.createPattern(imageObj, 'repeat');
	//context.fillStyle = pattern;
	context.fillStyle = 
	context.fillStyle = "rgba("+ren[f].rgbR+","+ren[f].rgbG+","+ren[f].rgbB+",0.8)"; //"#225961";"#225961";
	
	var k= $gt({id:"dt5",ts:ts,duration:0.05}); 

	//body Stroke
	context.beginPath();
	context.moveTo(133,236);
	context.bezierCurveTo(122,245+Math.sin(k)*10,130+(Math.sin(k)), 262+(Math.sin(k)), 119+(Math.sin(k))*10, 279+(Math.cos(k))*10);
	context.bezierCurveTo(126,267,143+Math.sin(k)*6, 257+Math.sin(k)*(-6), 144, 241);
	context.quadraticCurveTo(126, 243, 128, 239);
	context.closePath();
	context.fill();	
	//
	
	//};
	//imageObj.src = 'pattern3.png';	
}

// Common Function
var startO={}; 
var $gt=function(o){
if(!startO[o.id]) {startO[o.id] = o.ts;}
var k = (o.ts - startO[o.id])/(o.duration*1000);
return k;
}

function $getRN(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
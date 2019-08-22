var filelength=0,cvsW=0,cvsH=0,maxWidth=0; var c=0; var cMenu;var files=[];  var dragImg,dropBeforeTheImage;
// Ref : https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
window.addEventListener("load",createDOM);
function createDOM(){
	maxWidth=Number(window.getComputedStyle(document.getElementById("container"), null).getPropertyValue("width").split("px")[0]);
	var spritImg= $ce("div","spritImg");
	document.getElementById("container").appendChild(spritImg);
	document.getElementById("container").setAttribute("ondrop","dropHandler(event);");
	document.getElementById("container").setAttribute("ondragover","dragOverHandler(event);");
	document.getElementById("menu3").addEventListener('click', function() { if(cMenu=="menu2"){createCanvasImage();}}, false);
	//document.getElementById("menu5").addEventListener('click', function() { if(cMenu=="menu3" || cMenu=="menu4"){document.getElementById("SourceDiv").style.display="block";}}, false);
	setMenu("menu1");
}

function dropHandler(ev){ 
	ev.preventDefault();
		//console.log(ev); 
		if(ev.dataTransfer.files.length==0){  dropBeforeTheImage=ev.target; updateImageOrder();}
	 filelength=filelength+ev.dataTransfer.files.length;
	if (ev.dataTransfer.items) {   
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        //console.log('... file[' + i + '].name = ' + file.name);
			if (file.type.match(/image.*/)) {    
				//console.log(file.name);
				var img= $ce("img","img"+c,"imgs"); c++;  	img.addEventListener('mousedown', function() { dragImg=this.id;  }, false);
				
				files.push(img); readerFile(img,file);
        }
	  	}
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
			console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
		
    }
  }
removeDragData(ev); 
}

function dragOverHandler(ev) {
	ev.preventDefault();
}

function removeDragData(ev) {
  if (ev.dataTransfer.items) {
    ev.dataTransfer.items.clear();
  } else {
    ev.dataTransfer.clearData();
  }
}



var counter=0;
function readerFile(img,file){ counter++;
var reader = new FileReader(); img.name=file.name;
reader.onload=function(e2) { img.src= e2.target.result;  }
reader.readAsDataURL(file);
if(filelength==counter){pushImage(); setTimeout(function(){ setOrderPosition();},500); setMenu("menu2");}
}

function pushImage(){
	var spritImg=document.getElementById("spritImg");
	for(var f=0;f<files.length;f++){
		spritImg.appendChild(files[f]);
	}
}

function setOrderPosition(){ //console.log("Started to set order position...");
	var imgs=files;//document.getElementsByClassName("imgs");
	 var x=0,y=0,rWidth=0,rHeight=[0],rowMaxWidth=[]; //console.log(imgs);
	for(var i=0;i<imgs.length;i++){ //console.log("x:"+x+" y:"+y);  
		imgs[i].style.left=x+"px"; 	imgs[i].style.top=y+"px"; rWidth=rWidth+imgs[i].width;   //console.log("cWidth:"+(rWidth)+" max:"+maxWidth); console.log("W:"+imgs[i].width);
		if((rWidth)<maxWidth){ x=x+imgs[i].width; rowMaxWidth.push(rWidth);   rHeight.push(imgs[i].height); }else{ x=0; rWidth=0; y=y+getMax(rHeight); rHeight=[]; 	imgs[i].style.left=x+"px"; 	imgs[i].style.top=y+"px"; rWidth=rWidth+imgs[i].width; rHeight.push(imgs[i].height); x=x+imgs[i].width; rowMaxWidth.push(rWidth); }
		
	}
	cvsW=getMax(rowMaxWidth); 
	cvsH=getMax(rHeight)+Number(imgs[imgs.length-1].style.top.split('px')[0]);
	var s = document.getElementById('spritImg');  s.style.width=cvsW+"px"; s.style.height=cvsH+"px"; 
}

function updateImageOrder(){ var dImage; var newFiles=[];  
	if(dragImg!=dropBeforeTheImage.id && dropBeforeTheImage.className=="imgs"){
			for(var o=0; o<files.length;o++){
				if(files[o].id==dragImg){ dImage=files[o]; }
			}
			for(var k=0; k<files.length;k++){
				if(files[k].id!=dragImg){
						if(files[k].id==dropBeforeTheImage.id){ newFiles.push(dImage);  newFiles.push(files[k]); }else{ newFiles.push(files[k]);  }
				}
			}
			files=newFiles;  setOrderPosition();
			//console.log(newFiles);
	}
}




function createCanvasImage(){ setMenu("menu3");  document.getElementById("msg").style.opacity=0; 

	var tem=document.getElementById("canvasimg");
	if(tem){ document.getElementById("container").removeChild(tem); }
	var cvs=$ce("canvas","canvasimg"); var ctx = cvs.getContext("2d"); 
	cvs.width=cvsW;
	cvs.height=cvsH; 
	var imgs=files;//document.getElementsByClassName("imgs");
	for(var i=0;i<imgs.length;i++){
		ctx.drawImage(document.getElementById(imgs[i].id),Number(imgs[i].style.left.split('px')[0]),Number(imgs[i].style.top.split('px')[0]));
	}
	
	document.getElementById("container").appendChild(cvs);  

	generateLayout();
	downloadCanvas();
	generateSource();
}

function downloadCanvas(){ 
	document.getElementById("menu4").href = document.getElementById("canvasimg").toDataURL('image/jpeg', 1.0);
	document.getElementById("menu4").download = "sprite.png";
	document.getElementById("menu4").addEventListener("mouseover",function(){  document.getElementById("canvasimg").style.display="block";    document.getElementById("canvasLayout").style.display="none"; });
}

function generateLayout(){
	var imgLayout=document.getElementById("imgLayout");
	if(imgLayout){ document.getElementById("imgLayout").removeChild(tem); }

	var tem=document.getElementById("canvasLayout");
	if(tem){ document.getElementById("canvasLayout").removeChild(tem); }
	var cvs=$ce("canvas","canvasLayout"); var ctx = cvs.getContext("2d");  var iLayout=$ce("div","imgLayout");  document.getElementById("container").appendChild(iLayout);
	cvs.width=cvsW;   
	cvs.height=cvsH; 
	for(var i=0;i<files.length;i++){ 
	var x=Number(files[i].style.left.split('px')[0]);  var y=Number(files[i].style.top.split('px')[0]); var w=files[i].width; var h=files[i].height;
	var pimg=$ce("canvas","pimg"+i,"pimg"); pimg.width=w; pimg.height=h;  pimg.style.left=x+"px"; pimg.style.top=y+"px";
	var pimgtxt= cvs.getContext("2d");   pimgtxt.font = "14px Comic Sans MS";
	
	pimgtxt.fillStyle = 'rgb('+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+')';
	pimgtxt.fillRect(x,y,w,h);
	pimgtxt.fillStyle = "black"; pimgtxt.strokeStyle = "black";
	pimgtxt.textAlign = "center";
	
	if(h>80){
	pimgtxt.fillText("left:top",x+(w/2),y+(h/2)-20);
	pimgtxt.strokeText(x+" : "+y,x+(w/2),y+(h/2));
	pimgtxt.fillText("w:h",x+(w/2),y+(h/2)+16);
	pimgtxt.strokeText(w+" : "+h,x+(w/2),y+(h/2)+32);
	}else{
	pimgtxt.fillText("left:top",x+(w/2)-50,y+(h/2)-5);
	pimgtxt.strokeText(x+" : "+y,x+(w/2)-50,y+(h/2)+15);
	pimgtxt.fillText("w:h",x+(w/2)+50,y+(h/2)-5);
	pimgtxt.strokeText(w+" : "+h,x+(w/2)+50,y+(h/2)+15);
	}
	iLayout.appendChild(pimg);
	ctx.drawImage(document.getElementById("pimg"+i),Number(files[i].style.left.split('px')[0]),Number(files[i].style.top.split('px')[0]));
	}
	
	document.getElementById("container").appendChild(cvs);  
	document.getElementById("menu6").href = document.getElementById("canvasLayout").toDataURL('image/jpeg', 1.0);
	document.getElementById("menu6").download = "sprite_layout.png";
	document.getElementById("menu6").addEventListener("mouseover",function(){  document.getElementById("canvasLayout").style.display="block";    document.getElementById("canvasimg").style.display="none"; });
}


function setMenu(id){ cMenu=id;
	var m= document.getElementById(id); m.style.backgroundColor="#66ccff";  m.style.color="#004466";
	switch(id){
		case "menu2": document.getElementById("menu3").style.cursor="pointer"; break;
		case "menu3": document.getElementById("menu3").style.cursor="context-menu"; document.getElementById("menu4").style.cursor="pointer"; break;
		
	}
}

var scriptXY="";
function generateSource(){ 
	var canvasSource=document.getElementById("canvasimg").outerHTML + getImagesOuterHTML();
	var scriptSource='window.onload=function(){ var im='+scriptXY+'; var cvs=document.getElementById("canvasimg"); var context = cvs.getContext("2d"); var imgs=document.getElementsByClassName("imgs");  for(var i=0;i<imgs.length;i++){ context.drawImage(imgs[i], im[i].x, im[i].y);}  }';
	var htmlSource='<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>'+canvasSource+'</body><script type="text/javascript">'+scriptSource+'</script></html>';
	
	//var ifme=$ce("iframe","sourceIframe"); ifme.srcdoc=htmlSource;
	//document.getElementById("container").appendChild(ifme);  
	document.getElementById("menu5").href ="data:text/html,"+decodeURI(htmlSource);
	document.getElementById("menu5").download = "sprite_index.html";

	//var fileSource=document.getElementById("SourceDiv");
	//var txtArea=$ce("textarea","txtArea"); txtArea.innerText=htmlSource; //fileSource.style.display="block";
	//var closeBtn=$ce("button","closeBtn"); closeBtn.innerText="X"; closeBtn.addEventListener("click",function(){fileSource.style.display="none";});
	 //fileSource.appendChild(closeBtn);fileSource.appendChild(txtArea);
	
}
function getImagesOuterHTML(){ var str=""; var script_=[];
	for(var j=0;j<files.length;j++){
		str=str+'<img id="'+files[j].id+'" class="'+files[j].className+'" name="'+files[j].name+'" src="'+files[j].name+'" style="display:none;"></img>';
		var nObj={}; nObj.x=files[j].style.left.split('px')[0];  nObj.y=files[j].style.top.split('px')[0]; script_.push(nObj);
	}
	scriptXY = JSON.stringify(script_);
	return str;
}



function getMax(a){ var m=0; for(var i=0; i<a.length;i++){if(a[i]>m){m=a[i];}}return m;}
function getSum(total, num) {return total + num;}

var $ce = function(t,id,c){ if(!c){c=id;} var e= document.createElement(t);e.setAttribute("id",id); e.setAttribute("class",c); return e;}


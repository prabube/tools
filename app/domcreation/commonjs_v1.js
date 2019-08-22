 
var $ge=function(query){
	var els=document.querySelectorAll(query); 
	return els;}
var $ce=function(eType,eId,eclass,estyle){ 
	var e=document.createElement(eType);  
	e.setAttribute("id",eId); 
	if(eclass){e.setAttribute("class",eclass);}
	if(estyle){e.setAttribute("style",estyle);} 
	return e;}
var $cssToObject=function(cs){  
	var csA= cs.split(";"); var csObject= new Object();
	for(var i=0; i<csA.length; i++){if(csA[i].trim() && csA[i].indexOf(":")!=-1 ){ csObject[csA[i].split(":")[0].trim()] = csA[i].split(":")[1].trim();}}
	return csObject; }
var $cssToArray=function(css){ 
	var ap,p=[],v =[]; 
	if(typeof(css)=="string") { ap=css.split(";"); for(var i=0; i<ap.length; i++){ if(ap[i].trim() && ap[i].indexOf(":")!=-1){ p.push(ap[i].split(":")[0].trim()); v.push(ap[i].split(":")[1]); }}  } 
	else{ for(c in css){p.push(c); v.push(css[c]);} } 
	return [p,v];}
var $setStyle=function(query, css){ 
	var cssObject=new Object(); var els;
	if(typeof(css)=="string") {cssObject=$cssToObject(css); } else{ cssObject=css; } 
	switch(typeof(query)){case "string": els=$ge(query); break; case "object": if(query.id){els=[query];} else {els=query;} break;}
	for(var i=0; i<els.length;i++){
		for(c in cssObject){ els[i].style[c]=cssObject[c]; 
			if(els[i].style.hasOwnProperty('-webkit-'+c)){ els[i].style['-webkit-'+c]=cssObject[c]; }  }}}
var $getStyle=function(query, properties){ 
	var nArray=[]; var ps=properties.split(","); var els;
	switch(typeof(query)){case "string": els=$ge(query); break; case "object": if(query.id){els=[query];} else {els=query;} break;} 
	for(var i=0; i<els.length;i++){ var nObject = new Object();  for(var j=0;j<ps.length;j++){ nObject[ps[j]] = window.getComputedStyle(els[i], null).getPropertyValue(ps[j]);} nArray.push(nObject);  }
	return nArray;}

var $transition=function(query,initStyle,transitionstyle,timingf,duration,delay,fn){  
	var aProperties =[]; aProperties = $cssToArray(transitionstyle)[0];  var tCss=";transition-property:"+ aProperties.join(',') +";transition-duration:"+duration+"s;transition-timing-function:"+timingf+";";
	setTimeout(function(){ 
		if(initStyle && initStyle!=null){$setStyle(query,initStyle);} if(transitionstyle && transitionstyle!=null ){
			if(typeof(transitionstyle)=="string") {transitionstyle=transitionstyle+tCss;} else{ transitionstyle['transitionProperty']=aProperties.join(','); transitionstyle['transitionDuration']=duration+"s"; transitionstyle['transitionTimingFunction']=timingf; }
				$setStyle(query,transitionstyle);}
	},delay*1000);
	if(fn){if(fn.hasOwnProperty('start')){setTimeout(fn["start"],delay*1000);}else{if(fn.hasOwnProperty('end')){setTimeout(fn["end"],(delay+duration)*1000);}}}
	}
	
	
	
//var csv is the CSV file with headers
var csvToJson =function(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split(",");
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

/* 
$ge ==> syntax:$ge(query); -> it will return the array of elements. 
$ce ==> syntax:$ce("div","id","class","style") -> it will return new element, here class & style are optional.
$cssToObject ==> syntax:$cssToObject(cssString) -> it will convert the css string to object and return.
$cssToArray ==> syntax:$cssToArray(cssString or cssObject) -> it will convert the css string or object to Array and return.
$setStyle ==> syntax:$setStyle(query or element, cssString or cssObject) -> it will set all the css value to all the query elements.
$getStyle ==> syntax:$getStyle(queryor element, cssProperties) -> it will returns the array of elements value.
$transition ==> syntax:$transition(query,initStyle,transitionstyle,timingf,duration,delay,fn)  ->
					query 		--> css query or element  (query or element)
					initStyle 	--> cssString or css Object	(cssString or cssObject)
					transitionstyle	--> cssString or css Object (cssString or cssObject)
					timingf		--> transition timing function ex.. (ease,ease-in,ease-out,ease-in-out)
					duration	--> transition duration ex.. 1 mean (1 second)
					delay		--> Delay of properties applying ex.. 1 mean (1 second)
					fn			--> Object with start or end properties. eg.. {start:startfunctionname,end:endfunctionname}
*/

/* ********************************** Done by - Prabu Mani ************************************** */

//commom classes

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};
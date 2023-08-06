////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/////////    CLASS FUNCTIONS AND VARIABLES    //////////////
////////////////////////////////////////////////////////////

function element() {
	//logic container layout
	this.layout;
	//physic container layout
	this.container = document.getElementById('layout');

	//data
	this.nodes, this.edges;
	this.data = {};

	//layout config
	this.enabledLayout = 1;
	this.centralGravityValue = 0.5;
	this.nodeDistanceValue = 200;

	//layout freeze
	this.freezeLayout = false;
	this.hideEdgesOnDragLayout = false;

	//options layout
	this.options;

	//smoothCurves
	this.smoothCurves = {};
	this.smoothCurves.dynamic = false;
	this.smoothCurves.type = "continuous";
	this.smoothCurves.roundness = 0.5; //[0,1]

	//log
	this.enabledLog = false;

	//seleccion nodes
	this.selectionList = new Set();

	///export SVG
	this.emptySvgDeclarationComputed;
};


element.prototype.loadInstance = function () {
	//create own html page
	this.loadHtml();
	//create layout visualization
	this.load();
	//create connection between GUI and Business model
	PYCON.connect("ws://localhost:"+WSPORT+"/");

	//browser events
	$(window).on("resize", this.browserResize);
	$(element).bind('resizeEnd', this.browserResizeEnd);
};

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////    layout MANAGEMENT    ///////////////////
////////////////////////////////////////////////////////////
element.prototype.loadHtmlTag = function (tag) {
	var type = tag.tag;
	var to = tag.to;
	delete tag.tag;
	delete tag.to;
	jQuery('<'+type+'/>', tag).appendTo(to);
};

element.prototype.loadHtmlTagBefore = function (tag) {
	var type = tag.tag;
	var to = tag.to;
	delete tag.tag;
	delete tag.to;
	jQuery('<'+type+'/>', tag).insertBefore(to);
};

/**
 * Load html page
 */
element.prototype.loadHtml = function () {

};

/**
 * Load graph on layout div html page
 */
element.prototype.load = function () {

};

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/////////////////////    EVENS    //////////////////////////
////////////////////////////////////////////////////////////

/**
 * Select a list of elements from the graph given an ID's [nodes and edges] with select event on graph
 * @param {propesties} properties 
 */
element.prototype.selectElement = function (properties){

};

/**
 * Select a list of elements from the graph given an ID's [nodes and edges] with doubleclick event on graph
 */
element.prototype.doubleClickElement = function (properties){
	var idsNodes = properties.nodes;
	PYCON.send('graphDblClick',{nodes:idsNodes});
};

/**
 * Delect window resize and redraw widgets
 */
element.prototype.browserResize = function (){
	if(this.resizeTO) clearTimeout(this.resizeTO);
	this.resizeTO = setTimeout(function() {
		var layout = document.getElementById("layout");
		$(element).trigger('resizeEnd');
	}, 500);
};

/**
 * Redraw widgets
 */
element.prototype.browserResizeEnd = function (){

};

/**
 * Repaint widget after last call this function before  
 */
element.prototype.repaint = function (){
	if(this.repaintTO) clearTimeout(this.repaintTO);
	this.repaintTO = setTimeout(function() {
		var layout = document.getElementById("layout");
		$(element).trigger('repaintEnd');
	}, 500);
};

/**
 * Repaint widgets
 */
element.prototype.repaintEnd = function (){

};

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////    FUNCTIONS    ///////////////////////
////////////////////////////////////////////////////////////

/**
 * Change layout type
 * @param {Number} id 
 */
element.prototype.changeLayoutType = function (id){

	switch(id) {
		case "labelRepulsionRadio":
			this.enabledLayout = 1;
			break;
		case "labelHierarchicalRepulsionRadio":
			this.enabledLayout = 2;
			break;
	}
	this.reDrawLayout();
};

/**
 * Change central gravity of graph
 * @param {Number} value 
 */
element.prototype.changeLayoutCentralGravity = function (value){
	this.centralGravityValue  = value;
	this.reDrawLayout();
};

/**
 * Change node distance of graph
 * @param {Number} value 
 */
element.prototype.changeLayoutNodeDistance = function (value){
	this.nodeDistanceValue = value;
	this.reDrawLayout();
};

/**
 * Re paint all the layout taking into account three physics options {barnesHut, barnesHut disabled and hierarchical}
 */
element.prototype.reDrawLayout = function (){

};

/**
 * Re paint tool layout taking into account the method selected for layout visualization
 */
element.prototype.reDrawToolLayout = function () {

	switch(this.smoothCurves.dynamic) {
		case false:
			jQuery('#labelSmoothCurvesType').prop( "disabled", false ).removeClass('disabled');
			jQuery("#SmoothCurvesType").prop( "disabled", false ).removeClass('disabled');
			jQuery('#labelSmoothCurvesRoundness').prop( "disabled", false ).removeClass('disabled');
			jQuery("#sliderSmoothCurvesRoundness").prop( "disabled", false ).removeClass('disabled');
			break;
		case true:
			jQuery('#labelSmoothCurvesType').prop( "disabled", true ).addClass('disabled');
			jQuery("#SmoothCurvesType").prop( "disabled", true ).addClass('disabled');
			jQuery('#labelSmoothCurvesRoundness').prop( "disabled", true ).addClass('disabled');
			jQuery("#sliderSmoothCurvesRoundness").prop( "disabled", true ).addClass('disabled');
			break;
	}

};

/**
 * Destroy layout layout
 */
element.prototype.destroy = function () {

};

/**
 * Set focus on random node
 */
element.prototype.changeGraphFocus = function (){
	coord = this.layout.getCenterCoordinates();
	scale = this.layout.getScale();
	var options = {position:{x:coord.x+coord.x*-1, y:coord.y+coord.y*-1}, scale:scale, animation: {duration: 1000}};
	this.layout.moveTo(options);
};

/**
 * Enable/Disable animation layout
 */
element.prototype.changeFreezeLayout = function (){
	this.freezeLayout = !this.freezeLayout;
	this.layout.freezeSimulation(this.freezeLayout);
};


/**
 * Enable/Disable animation layout
 */
element.prototype.changeHideEdgesOnDragLayout = function (){
	this.hideEdgesOnDragLayout = !this.hideEdgesOnDragLayout;
	this.options.hideEdgesOnDrag = this.hideEdgesOnDragLayout;
	this.layout.setOptions(this.options);
};

/**
 * Enable/Disable smooth curves
 */
element.prototype.changeSmoothCurvesDynamic = function (){
	this.smoothCurves.dynamic = !this.smoothCurves.dynamic;
	this.options.smoothCurves = {dynamic:this.smoothCurves.dynamic, type: this.smoothCurves.type, roundness:this.smoothCurves.roundness};
	this.layout.setOptions(this.options);
	
	this.reDrawToolLayout();
};

/**
 * change type of smooth curves
 */
element.prototype.changeSmoothCurvesType = function (value){
	this.smoothCurves.type = value;
	this.options.smoothCurves = {dynamic:this.smoothCurves.dynamic, type: this.smoothCurves.type, roundness:this.smoothCurves.roundness};
	this.layout.setOptions(this.options);
};

/**
 * change type of smooth curves roundness
 */
element.prototype.changeSmoothCurvesRoundness = function (value){
	this.smoothCurves.roundness = value;
	this.options.smoothCurves = {dynamic:this.smoothCurves.dynamic, type: this.smoothCurves.type, roundness:this.smoothCurves.roundness};
	this.layout.setOptions(this.options);
};


/**
 * change enabled log
 */
element.prototype.changeEnabledLog = function (){
	this.enabledLog = !this.enabledLog;

        if (this.enabledLog){
		jQuery("#logcontainer").css({opacity: 0.25, visibility: "visible", "z-index":2}).animate({opacity: 1}, 200);
        }
        else
        {
		jQuery("#logcontainer").css({opacity: 0.25, visibility: "visible", "z-index":-1}).animate({opacity: 0}, 200);
        }

};

/**
 * search by id
 */
element.prototype.searchNodeById = function (id){
	
};


/**
 * execute action
 */
element.prototype.action = function (e){

};

/**
 * execute action
 */
element.prototype.addAction  = function (id, name){
	tag = {tag:'br', to:'#optionsNetwork',class:"pyAction"};
	this.loadHtmlTag(tag);
	tag = {tag:'label', to:'#optionsNetwork', id: 'labelAction'+id, text: name,class:"pyAction"};
	this.loadHtmlTag(tag);
	tag = {tag:'button', to:'#optionsNetwork', id: 'Action'+id, type: 'button', idAction: id, onclick: 'element.action(this);',class:"pyAction"};
	this.loadHtmlTag(tag);
};

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//////////////////    UIC WRAPPER    ///////////////////////
////////////////////////////////////////////////////////////

/**
 * add Node
 */
element.prototype.addNode = function (node){

}


/**
 * add Edge
 */
element.prototype.addEdge = function (node){

}

/**
 * update Node
 */
element.prototype.updateNode = function (node){

}


/**
 * update Edge
 */
element.prototype.updateEdge = function (node){

}

/**
 * remove Node
 */
element.prototype.removeNode = function (node){

}


/**
 * remove Edge
 */
element.prototype.removeEdge = function (node){

}

/**
 * clear text Log
 */
element.prototype.clearLog = function(){
	jQuery("#log").html('')
}

/**
 * add text Log
 */
element.prototype.addLog = function(text){
	var previousText = jQuery("#log").html();
	if(previousText == ''){
		jQuery("#log").html(text)
	}else{
		jQuery("#log").html(previousText+"<br>"+text)

	}
}

/**
 * add data for chart
 */
element.prototype.addData = function (data){

}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//////////////////////    LOADING    ///////////////////////
////////////////////////////////////////////////////////////

/**
 * 
 */
element.prototype.addLoad = function (){
	//this.document.getElementById("load").style.display = "block";
        jQuery("#load").css({display: "block"});
}

/**
 * 
 */
element.prototype.deleteLoad = function (){
	//this.document.getElementById("load").style.display = "none";
        jQuery("#load").css({display: "none"});
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////    SELECTIONS    //////////////////////
////////////////////////////////////////////////////////////

function doubleclick(el, onsingle, ondouble) {
	if (el.getAttribute("data-dblclick") == null) {
		el.setAttribute("data-dblclick", 1);
		setTimeout(function () {
		if (el.getAttribute("data-dblclick") == 1) {
			onsingle();
		}
		el.removeAttribute("data-dblclick");
	}, 300);
	} else {
		el.removeAttribute("data-dblclick");
		ondouble();
	}
}

function isKeyPressed(event) {
	if (event.ctrlKey) {
		element.ctrlpress = true;
	} else if (!event.ctrlKey){
		element.ctrlpress = false;
	}

	if (event.shiftKey) {
		element.shiftpress = true;
	} else if (!event.shiftKey){
		element.shiftpress = false;
	}
}

element.prototype.clearSelection = function() {

}

element.prototype.clearNodeSelection = function (n){

}


element.prototype.selectNodes = function (nl){

}


element.prototype.selectNode = function(n) {

}

element.prototype.refreshSelection = function() {

}


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////    EXPORT SVG    //////////////////////
////////////////////////////////////////////////////////////

element.prototype.explicitlySetStyle = function(element_svg) {
    var cSSStyleDeclarationComputed = getComputedStyle(element_svg);
    var i, len, key, value;
    var computedStyleStr = "";
    for (i=0, len=cSSStyleDeclarationComputed.length; i<len; i++) {
        key=cSSStyleDeclarationComputed[i];
        value=cSSStyleDeclarationComputed.getPropertyValue(key);
        if (value!==element.emptySvgDeclarationComputed.getPropertyValue(key)) {
            computedStyleStr+=key+":"+value+";";
        }
    }
    element_svg.setAttribute('style', computedStyleStr);
}

element.prototype.traverse = function(obj) {
    var tree = [];
    var fifo= [obj];
     
    while (fifo.length){
        obj=fifo.splice(0,1)[0]
        if (obj.nodeType === 1 && obj.nodeName != 'SCRIPT')
        {tree.push(obj)}
        for (var i=0;i<obj.children.length;i++)
        {fifo.push(obj.children[i])}
    }

    return tree;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

element.prototype.exportSVG = function () {

}

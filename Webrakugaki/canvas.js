var canvas, stage;
var drawingCanvas;
var oldPt;
var oldMidPt;

var color = '#000000';

function init() {
    canvas = document.getElementById("myCanvas");

    stage = new createjs.Stage(canvas);
    stage.autoClear = false;
    stage.enableDOMEvents(true);

    createjs.Touch.enable(stage);
    createjs.Ticker.setFPS(300);

    drawingCanvas = new createjs.Shape();

    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);

    stage.addChild(drawingCanvas);
    stage.update();
}

function stop() {
    createjs.Ticker.removeEventListener("tick", tick);
}

function handleMouseDown(event) {	
    oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
    oldMidPt = oldPt;
    stage.addEventListener("stagemousemove" , handleMouseMove);
}

function handleMouseMove(event) {
    var midPt = new createjs.Point(oldPt.x + stage.mouseX>>1, oldPt.y+stage.mouseY>>1);

    drawingCanvas.graphics.clear().setStrokeStyle(15, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

    oldPt.x = stage.mouseX;
    oldPt.y = stage.mouseY;
    oldMidPt.x = midPt.x;
    oldMidPt.y = midPt.y;

    stage.update();
}

function handleMouseUp(event) {
    stage.removeEventListener("stagemousemove" , handleMouseMove);
}

//window.onload=init;


function black(){
    color = '#000000';
}

function red(){
    color = '#FF0000';
}

//	  function clearCan(){
//		var ct;
//		ct=canvas.getContext("2d");
//	    ct.fillStyle="rgb(255,255,255)";
//	    ct.fillRect(0,0,canvas.getBoundingClientRect().width,canvas.getBound//ingClientRect().height);
//	  }
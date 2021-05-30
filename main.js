objects=[]
status=""
function preload(){
}
function setup(){
    canvas=createCanvas(350,350)
    canvas.center()
    //Code for initilizing CocoSSD
    objectdetector=ml5.objectDetector("cocossd",modelLoaded)
    video=createCapture(VIDEO)
    video.size(350,350)
    video.hide()
}
function modelLoaded(){
    console.log("Model Loaded")
    status=true
    document.getElementById("status").innerHTML="Status: Detecting Object "
}
function gotResults(error,results){
if (error) {
    console.log(error)

}
else{
    console.log(results)
    objects=results
}
}

function draw(){
image(video,0,0,350,350)
if (status != "") {              //Status Not Equal to empty means model has loaded
    objectdetector.detect(video,gotResults)
    for (let i = 0; i < objects.length; i++) {
        document.getElementById("number").innerHTML="Number Of Objects Detected="+ objects.length; 
        accuracy=floor(objects[i].confidence*100)+"%"
        objectname=objects[i].label
        x=objects[i].x
        y=objects[i].y
        width=objects[i].width
        height=objects[i].height
        r=random(255)
        g=random(255)
        b=random(255)

        fill(r,g,b)
        text(objectname+" " +accuracy,x,y)
        stroke(r,g,b)
        noFill()
        rect(x,y+5,width,height)
        document.getElementById("status").innerHTML="Status:Objects Identified"
    }
}
}
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    webcam=createCapture(VIDEO)
    webcam.hide();
    model = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "status:detecting objects";
}
img = "";
status = ""

object=[];

function modelloaded() {
    console.log("model loaded successfully");
    status = true;

}

function getResults(E,R){
if(E){
    console.error(E);
 
}
else{
    console.log(R);
    object=R;
}
}



function draw() {
    image(webcam, 0, 0, 640, 420);
    fill("#e60202");
    textSize(25);
    if(status!=""){
        model.detect(webcam, getResults);
        document.getElementById("status").innerHTML = "status:objects detected";
        array_length=object.length;
        document.getElementById("number_of_objects").innerHTML="number of objects:"+array_length;
        for(i=0;i<array_length;i++){
            object_name=object[i].label;
            if(object_name=="Person"){
                document.getElementById("status").innerHTML="baby detected";
                object_x=object[i].x;
            object_y=object[i].y;
            object_width=object[i].width;
            object_height=object[i].height;
            object_percentage=floor(object[i].confidence*100);
            text(object_name+" "+object_percentage+"%",object_x,object_y);
            noFill();
            stroke("#e60202");
            rect(object_x,object_y,object_width,object_height);
            }
            else{document.getElementById("status").innerHTML="baby not detected"}
            song.play()
            
            
            
        }
    }
    
    
}
function preload(){
    song=loadSound("spooky_scary_skel.mp3");

}
var canvas= document.getElementById("canvas")
var ctx = canvas.getContext('2d')
var displayscore=document.getElementById("score")

canvas.width=window.innerWidth
canvas.height=600

var requestAnimationFrame = window.requestAnimationFrame

var x=100;
var y=425;
var blockwidth=100
var blockheight=100
var vy=10;
var flip="true";

var i =0;
var obstacles=[]
var obstaclex =1500;
var obstaclespeed=10;


var mingap=200;
var maxgap=500;

var score=0;
var highestscore;

highestscore=localStorage.getItem('highestscore')

if(highestscore === null)
{highestscore=0}

var myobstacles=[]


class obstacle {
        constructor(x,y){
            this.height=75
            this.width =100;
            this.x = x;
            this.y =y;
            };
            draw(){
                ctx.fillStyle="black"
                ctx.fillRect(this.x,this.y,this.width,this.height);
                }
            clear(){
                ctx.clearRect(0,0,canvas.width,this.height)
            }
        }



class block{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.height=height;
        this.width=width; 
    }

    draw() {
        ctx.fillStyle="green"
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
    clear(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }
}

var a = new block(x,y,blockwidth,blockheight)
a.draw()

surface()
function surface(){
ctx.beginPath()
ctx.lineWidth=150
ctx.moveTo(0,0)
ctx.lineTo(canvas.width,0)
ctx.strokeStyle="red"
ctx.stroke()
ctx.closePath()

ctx.beginPath()
ctx.lineWidth=150
ctx.moveTo(0,canvas.height)
ctx.lineTo(canvas.width,canvas.height)
ctx.strokeStyle="red"
ctx.stroke()
ctx.closePath()
}
canvas.addEventListener('click',moving)



function moving(){
    if(flip=="true"){
        var frames= new block(x,y,blockwidth,blockheight)
        frames.draw()
        frames.clear()
        y=75
        var frames2= new block(x,y,blockwidth,blockheight)
        frames2.draw()
        surface()
        flip="false"
    }

    else if(flip=="false")
    {   y=425
        var frames= new block(x,y,blockwidth,blockheight)
        frames.clear()
        frames.draw()
        surface()
        flip="true"
            
    }
}

var scoreboard =setInterval(() => {
    score++
    console.log(score)
    displayscore.innerHTML=score

}, 1000);


function movingobstacle(){
    var obstacles1 = new obstacle(obstaclex,525)
    let animation
    obstaclex-=obstaclespeed
    obstacles1.clear()
    surface()
    obstacles1.draw()
    if(obstaclex==0){
        obstaclex=1500
        movingobstacle2()
        score++
        window.cancelAnimationFrame()
    }
    if(obstaclex>x&&obstaclex<x+blockwidth){
        if(y==425)
        {window.cancelAnimationFrame(movingobstacle)
        clearInterval(scoreboard)
        highscore()
        document.location.reload()
        }
    }
    animation =requestAnimationFrame(movingobstacle)
}






function movingobstacle2(){
var obstacles2 = new obstacle(obstaclex,0)
    let animation
    obstaclex-=obstaclespeed
    obstacles2.clear() 
    surface()
    obstacles2.draw()
    if(obstaclex==0){
        obstaclex=1500
        movingobstacle()
        score++
        window.cancelAnimationFrame()

    }
    if(obstaclex>x&&obstaclex<x+blockwidth){
        if(y==75)
        {   window.cancelAnimationFrame(movingobstacle2)
            clearInterval(scoreboard)
            highscore()
                document.location.reload()
        }
    }
    animation=requestAnimationFrame(movingobstacle2)
}
movingobstacle2()

function highscore(){
    if(score>highestscore)
    {
        localStorage.setItem('highestscore',score)
    }

}

function highestscore1(){
    var maxscore= localStorage.getItem('highestscore')
    alert(maxscore)
}
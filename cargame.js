const score=document.querySelector('.score');
console.log(score);
const startScreen=document.querySelector('.startScreen');
const gameArea=document.querySelector('.gameArea');
let keys={ArrowUp:false,ArrowDown:false,ArrowRight:false,ArrowLeft:false};
let player={speed:5};
const keydownfun=(e)=>{
    if(e.key=="ArrowUp")
    {
        keys.ArrowUp=true;
    }
    else if(e.key=="ArrowDown")
    {
        keys.ArrowDown=true;
    }
    else if(e.key=="ArrowLeft")
    {
        keys.ArrowLeft=true;
    }
    else if(e.key=="ArrowRight")
    {
        keys.ArrowRight=true;
    }
    console.log(keys);
}
const keyupfun=(e)=>{
    // console.log(e.key);
    if(e.key=="ArrowUp")
    {
        keys.ArrowUp=false;
    }
    else if(e.key=="ArrowDown")
    {
        keys.ArrowDown=false;
    }
    else if(e.key=="ArrowLeft")
    {
        keys.ArrowLeft=false;
    }
    else if(e.key=="ArrowRight")
    {
        keys.ArrowRight=false;
    }
}
function moveLine(){
    let lines=document.querySelectorAll('.roadline');
    lines.forEach((item)=>{
        if(item.y>=800)
        {
            item.y=item.y-750
        }
        item.y+=player.speed;
        item.style.top=item.y+"px";
    })
}
function moveCar(){
    let enemycar=document.querySelectorAll('.enemycar');
    enemycar.forEach((item)=>{
        if(item.y>=750)
        {
            item.y=item.y-800;
            item.style.left=Math.floor(Math.random()*350)+"px";
        }
        item.y+=player.speed;
        item.style.top=item.y+"px";
    })
}
function gameplay(){
    if(player.start){
        // console.log("Game Started......");
        moveLine();
        moveCar();
        let road=gameArea.getBoundingClientRect();
        // console.log(road);
        if(keys.ArrowUp&&player.y>(road.top+80))
        {
            player.y-=player.speed;
        }
        if(keys.ArrowDown&&player.y<(road.bottom-70))
        {
            player.y+=player.speed;
        }
        if(keys.ArrowLeft&&player.x>0)
        {
            player.x-=player.speed;
        }
        if(keys.ArrowRight&&player.x<(road.width-50))
        {
            player.x+=player.speed;
        }
        let car=document.querySelector('.car');
        car.style.top=player.y+"px";
        car.style.left=player.x+"px";
        window.requestAnimationFrame(gameplay);
    }
}
function start(){
    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    player.start=true;
    window.requestAnimationFrame(gameplay);
    for(i=0;i<=5;i++){
        let roadline=document.createElement('div');
        roadline.setAttribute('class','roadline');
        roadline.y=(150*i);
        roadline.style.top=150*i+"px";
        gameArea.append(roadline);   
    }
    for(i=0;i<3;i++){
        let enemycar=document.createElement('div');
        enemycar.setAttribute('class','enemycar');
        enemycar.y=((i+1)*350)*-1;
        enemycar.style.top=150*i+"px";
        enemycar.style.background="green"
        enemycar.style.left=Math.floor(Math.random()*350)+"px";
        gameArea.append(enemycar);   
    }
    let car=document.createElement('div');
    car.setAttribute('class','car');
    // car.innerText="CAR ADDED";
    gameArea.appendChild(car);
    // car.style.top="100px";
    console.log(car.offsetLeft);
    console.log(car.offsetTop);
    player.x=car.offsetLeft;
    player.y=car.offsetTop;
    gameArea.append(car);
}
document.addEventListener('keydown',keydownfun)
document.addEventListener('keyup',keyupfun)
startScreen.addEventListener('click',start);
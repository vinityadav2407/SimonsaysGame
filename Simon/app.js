let gameSeq=[];
let userSeq=[];
let level=0;
let started=false;
let heightestScore=0;
let btns=["red","green","yellow","purple"];
let gameOver = false;// for sound


document.addEventListener("keypress" ,function(){
if(started===false){
    levelUp();
    started=true;
}

});


function btnFlash(btn){
    btn.classList.add("white");
    let color=btn.getAttribute("id");

// Only play normal sound if game is NOT over
  if (!gameOver) {
    playSound(color);
  }
  
    setTimeout(()=>{
        btn.classList.remove("white");
    },250);
}
//funtion

// Sound mapping
function playSound(color) {
    let audio = new Audio(`sound/${color}.mp3`);
    // only play if game is active
    audio.play();
}


 function levelUp(){
    userSeq=[];
    level++;
    let h2=document.querySelector("h2");
    h2.innerText=`Level ${level}`;
    let randIndx=Math.floor(Math.random()*4);
    let randColor=btns[randIndx];
    let randbtn=document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);
    btnFlash(randbtn);
 }


 function checkMatch(indx){
if(userSeq[indx]===gameSeq[indx]){
    if(userSeq.length===gameSeq.length){
        setTimeout(levelUp,1000);
    }
}else{
    gameOver=true;
    let body=document.querySelector("body");
    body.classList.add("danger");
    /// game over sound
      let gameOverAudio =new Audio(`sound/danger.mp3`);
       gameOverAudio.play();

    setTimeout(()=>{
    body.classList.remove("danger");
    },250);

    let h2=document.querySelector("h2");
    heightestScore = Math.max(heightestScore, level);
    h2.innerHTML=`Game Over! <br> Your heightest score is ${heightestScore} . <br> <b>Your current score was ${level} <b> <br> Press any key to start the game.`;
    reset();
}
 }


function btnPress(){
    let btn=this;
    let id=btn.getAttribute("id");
    console.log(btn);
    btnFlash(btn);
    userSeq.push(id);
    checkMatch(userSeq.length-1);
}
  

 let allBtns=document.querySelectorAll(".btn");
 for(btn of allBtns){
    btn.addEventListener("click",btnPress);
 }
 function reset(){
    userSeq=[];
    gameSeq=[];
    level=0;
    started=false;
    gameOver = false;
 }
// list containing all ids of bars
let barID = ["0","1","2","3","4","5","6","7","8"];
// simply generating random heights for bars
function randomHeight(min,max){
    return Math.floor(Math.random()*(max - min) + min);
}
//initialising bars with random heights
function barInitialisation(){
    const bar = document.querySelectorAll('.box');
    bar.forEach((bar) => {
        bar.style.height = `${randomHeight(20,70)}vh`;
    })
}
function setBarHeight(idOfBar , heightToSet){
    document.getElementById(idOfBar).style.height = heightToSet;
}
function heightOfBar(IdOfBar){
    return document.getElementById(IdOfBar);
}
//creating timer
function delay(time){
   return new Promise(resolve => setTimeout(1000));
}
function bubbleSort(){
    let numberOfBars = barID.length;
    for(let i = 0 ; i < numberOfBars ; i++){
        for(let j = i ; j < numberOfBars ; j++){
            if (heightOfBar(barID[i]) > heightOfBar(barID[j])){
                let temp1 = heightOfBar(barID[i]);
                let temp2 = heightOfBar(barID[j]);
                setBarHeight(barID[i] , temp2);
                setBarHeight(barID[j] , temp1);
            }
        }
    }
}
function main(){
    barInitialisation()
}
window.addEventListener('DOMContentLoaded' , (event) => main());

// list containing all ids of bars
let barID = ["0","1","2","3","4","5","6","7","8"];
let remoteAbort = null;
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
    return document.getElementById(IdOfBar).style.height ;
}
//creating timer
function delay(time , signal){
   return new Promise((resolve,reject) => {
    if (signal?.aborted){
        return reject(new DOMException("Aborted" , "abortError"));
    }
    let timeoutId = setTimeout(resolve , time)});
    signal?.addEventListener('abort' , () => {
        clearTimeout(timeoutId);
        reject(new DOMException("aborted" , "abortError"));
    } )
}
function changeColorNew(block1 , block2){
    document.getElementById(block1).style.backgroundColor = `#445e93ff`;
    document.getElementById(block2).style.backgroundColor = `#445e93ff`;
}
function changeColorBack(block1 , block2){
    document.getElementById(block1).style.backgroundColor = `#fcecc9ff`;
    document.getElementById(block2).style.backgroundColor = `#fcecc9ff`;
}
function heightSwap( block1 , block2 ){
    let temp1 = heightOfBar(block1);
    let temp2 = heightOfBar(block2);
    setBarHeight(block1 , temp2);
    setBarHeight(block2 , temp1);
}
function bubbleSortSkip(){
    let numberOfBars = barID.length;
    for(let i = 0 ; i < numberOfBars ; i++){
        for(let j = i+1 ; j < numberOfBars ; j++){
            if (heightOfBar(barID[i]) > heightOfBar(barID[j])){
                heightSwap(barID[i] , barID[j]);
            }
        }
    }
}
async function bubbleSort(signal){
    try{
        let numberOfBars = barID.length;
        for(let i = 0 ; i < numberOfBars ; i++){
            for(let j = i+1 ; j < numberOfBars ; j++){
                if (heightOfBar(barID[i]) > heightOfBar(barID[j])){
                    await delay(1000 , signal);
                    changeColorNew(barID[i] , barID[j]);
                    await delay(3000 , signal);
                    heightSwap(barID[i] , barID[j]);
                    await delay(3000 , signal);
                    changeColorBack(barID[i] , barID[j]);
                    await delay(1000 , signal);
                }
                else{
                    await delay(1000 , signal);
                    changeColorNew(barID[i] , barID[j]);
                    await delay(3000 , signal);
                    changeColorBack(barID[i] , barID[j]);
                    await delay(1000 , signal);

                }
            }
        }
    }
    catch (err){
        if (err.name == "abortError"){
            console.log("Sorting aborted");
        }
        else{
            throw err;
        }
    }
}
async function main(){
    barInitialisation();
    let startButton = document.getElementById('bubbleSort');
    let skipButton = document.getElementById('reset');
    startButton.addEventListener ( 'click' , async () => {
        if (remoteAbort){
            remoteAbort.abort();
        }
        remoteAbort = new AbortController();
        startButton.disabled = 'true';
        await bubbleSort(remoteAbort.signal);
        startButton.disabled = 'false';
    });
    skipButton.addEventListener('click' , () => {
        if (remoteAbort){
            remoteAbort.abort();
        }
        bubbleSortSkip()
        startButton.disabled = 'false';
    });
}
window.addEventListener('DOMContentLoaded' , (event) => main());

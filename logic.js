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
    let timeoutId = setTimeout(resolve , time);
    signal?.addEventListener('abort' , () => {
        clearTimeout(timeoutId);
        for(i = 0 ; i < barID.length-1 ; i++){
            changeColorBack(barID[i] , barID[i+1]);
        }
        reject(new DOMException("aborted" , "abortError"));
    }) 
    })
}
function sortedPartOfSelectionSort(start , end){
    for( let i = start ; i <= end ; i++){
        document.getElementById(barID[i]).style.backgroundColor = 'black';
    }
}
function setAllDefaultColor(){
    let allBar = document.querySelectorAll('.box');
    allBar.forEach((bar) => {
        bar.style.backgroundColor = `#fcecc9ff`;
    });
}
function changeColorNew(block1 , block2){
    if (block1){
        document.getElementById(block1).style.backgroundColor = `#445e93ff`;
    }
    if (block2){
        document.getElementById(block2).style.backgroundColor = `#445e93ff`;
    }
}
function changeColorBack(block1 , block2){
    if (block1){
        document.getElementById(block1).style.backgroundColor = `#fcecc9ff`;
    }
    if (block2){
        document.getElementById(block2).style.backgroundColor = `#fcecc9ff`;
    }
}
function heightSwap( block1 , block2 ){
    let temp1 = heightOfBar(block1);
    let temp2 = heightOfBar(block2);
    setBarHeight(block1 , temp2);
    setBarHeight(block2 , temp1);
}
function skipSort(){
    let numberOfBars = barID.length;
    for(let i = 0 ; i < numberOfBars ; i++){
        for(let j = i+1 ; j < numberOfBars ; j++){
            if (heightOfBar(barID[i]) > heightOfBar(barID[j])){
                heightSwap(barID[i] , barID[j]);
            }
        }
    }
}
async function insertionSort(signal){
    try{
        for( let i = 1 ; i < barID.length ; i++){
            sortedPartOfSelectionSort(0,i);
            await delay(2000 , signal);
            let key = document.getElementById(barID[i]).style.height;
            let j = i - 1;
            while( j >= 0 && heightOfBar(barID[j]) > key ){
                setBarHeight(barID[j+1] , document.getElementById(barID[j]).style.height)
                j--;
            }   
            setBarHeight(barID[j+1] , key);
        }
        setAllDefaultColor();
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
async function selectionSort(signal){
    try{
        for (let i = 0 ; i < barID.length ; i++){
            let idx = barID[i];
            for ( let j = i+1 ; j < barID.length ; j++){
                let OGIndex = null;
                await delay(2000 , signal);
                changeColorNew(barID[j] , idx);
                await delay(2000 , signal);
                if (heightOfBar(idx) > heightOfBar(barID[j])){
                    OGIndex = idx ;
                    idx = barID[j];
                }
                if (OGIndex){
                    changeColorBack(OGIndex , null);
                }
                else{
                    changeColorBack(null  , barID[j]);
                }
            }
            await delay(2000 , signal);
            changeColorNew(idx , barID[i]);
            await delay(2000 , signal);
            heightSwap(idx , barID[i]);
            await delay(2000 , signal);
            changeColorBack(idx , barID[i]);
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
    let allSortButtons = document.querySelectorAll('.sortButtons');
    let bubbleSortButton = document.getElementById('bubbleSort');
    let selectionSortButton = document.getElementById('selectionSort');
    let insertionSortButton = document.getElementById('insertionSort'); 
    let skipButton = document.getElementById('reset');
    bubbleSortButton.addEventListener ( 'click' , async () => {
        if (remoteAbort){
            remoteAbort.abort();
        }
        remoteAbort = new AbortController();
        document.body.classList.add('sortingInProgress');
        allSortButtons.forEach((button) => {
            button.disabled = true;
        });  
        await bubbleSort(remoteAbort.signal);
        allSortButtons.forEach((button) => {
            button.disabled = false;
        });
    });
    skipButton.addEventListener('click' , () => {
        if (remoteAbort){
            remoteAbort.abort();
        }
        skipSort()
        document.body.classList.remove('sortingInProgress');
        allSortButtons.forEach((button) => {
            button.disabled = false;
        });
    });
    selectionSortButton.addEventListener ( 'click' , async () => {
        if (remoteAbort){
            remoteAbort.abort();
        }
        remoteAbort = new AbortController();
        document.body.classList.add('sortingInProgress');
        allSortButtons.forEach((button) => {
            button.disabled = true;
        }); 
        await selectionSort(remoteAbort.signal);
        allSortButtons.forEach((button) => {
            button.disabled = false;
        });
    });
    insertionSortButton.addEventListener ( 'click' , async () => {
        if (remoteAbort){
            remoteAbort.abort();
        }
        remoteAbort = new AbortController();
        document.body.classList.add('sortingInProgress');
        allSortButtons.forEach((button) => {
            button.disabled = true;
        }); 
        await insertionSort(remoteAbort.signal);
        allSortButtons.forEach((button) => {
            button.disabled = false;
        });
    });
}
window.addEventListener('DOMContentLoaded' , (event) => main());

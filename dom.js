const xClass = 'x';
const oClass = 'o';
const cellElements = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('.restart');
const nextTurn = document.querySelector('.message');
let oTurn;
restartBtn.addEventListener('click', startGame)
const winningCombinations = [
    //horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //diagonal
    [0,4,8],
    [2,4,6]
]
//1
function startGame(){
    oTurn = false;
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick);
        cell.innerHTML = '';
        nextTurn.innerHTML= '';
        cell.classList.remove('x', 'o');
    })
}
startGame()
//2
function handleClick(e){
    const currentCell = e.target;
    const currentCellTurn = oTurn ? oClass : xClass;
    oTurn ? currentCell.innerText = 'O' : currentCell.innerText = 'X';
    placeLetter(currentCell, currentCellTurn);
    // console.log('I won')
    if(checkWinner(currentCellTurn)){
        // console.log('I won')
        endGame(false);
        nextTurn.innerHTML="Winner!"
        cellElements.forEach(el => {
            el.removeEventListener('click', handleClick)
        })
    }else if(isDraw()){
        endGame(true);
    }else{
        switchTurn();
    }
}
//3
function placeLetter(a, b){
    a.classList.add(b);
    a.removeEventListener('click', handleClick)
    nextTurn.innerHTML = oTurn ? "X's turn" : "O's turn"
}

function switchTurn(){
    oTurn = !oTurn;
}
//4
//check winner combination
//1. loop our array outer
//2. loop inside each combo [0,1,2]
//3. compare to our cells 
//4. if it's match return true
// Combo index [0,1,2] cell index [0,1,2] return true
function checkWinner(currentCellTurn){
    for(let combo of winningCombinations){
        // console.log(combo)
        let foundItem = true;
        for(let index of combo){
            // console.log(index)
            if(!cellElements[index].classList.contains(currentCellTurn)){
               foundItem = false;
            }
        }
        if(foundItem){
            return true;
        }
    }
    return false
}

//5
function isDraw(){
    return Array.from(cellElements).every(cell=>{
        return cell.classList.contains(xClass) || 
        cell.classList.contains(oClass);
    })
  }


  function endGame(draw){
    if(draw){
        nextTurn.innerText = "Draw!"
    }else{
        nextTurn.innerText = `${oTurn ? "X's turn" : "O's turn"} Winner!`
    }
    cellElements.forEach(i=>{
        i.removeEventListener('click', handleClick);
    })
}
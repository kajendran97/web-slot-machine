var credit = 10 // which hold the player's credit amount
var interval
var isSpinning = false
var img1 = document.getElementById('img1')
var img2 = document.getElementById('img2')
var img3 = document.getElementById('img3')
var imgArr1
var imgArr2
var imgArr3
var spin1 = true
var spin2 = true
var spin3 = true
function displayCredit () {
  var showBalance = document.getElementById('showBalance')
  showBalance.innerText = credit
}

var betAmount = 0 // which hold the player's bet amount
function displayBetAmount () {
  var showBet = document.getElementById('showBet')
  showBet.innerText = betAmount
}

function addBetAmount (val) { // add the credit to the bet amount
  if(credit < 1){
    window.alert(' Insufficent coins you can not play , Add coins and enjoy the game.');
  } else {
  credit -= val
  betAmount += val

  displayCredit() // call the display balance method
  displayBetAmount()  // call the display bet amount method
  }
}

function resetBetAmount () { // reset back the bet amount to the credit
  credit = credit + betAmount
  betAmount = 0

  displayCredit() // call the display balance method
  displayBetAmount() // call the display bet amount method
}

function addCoin () { // increases the credit level when its low
  if(credit > 9){
      window.alert(' You have enough amount to play');
  } else {
  credit++
  displayCredit() // call the display balence method
  }
}

function winCredit (val) { // winning credits will be added to the player's credit level
  credit += val
  displayCredit() // call the display balence method
}

function betOne () { // betting a credit to bet amount 
  resetBetAmount() // call the reset method to cancel the bet amount
  if (credit > 0 && betAmount == 0) {
    addBetAmount(1) // call the make bet method to make bet and display it
  } else {
    window.alert(' You have already bet an amount reset it first.');
  }
}

function betMax () { // betting 3 coins to the bet amount
  resetBetAmount() // call the reset method to cancel the bet amount
  if (credit > 3 && betAmount == 0) {
    addBetAmount(3) // call the make bet method to make bet and display it 
  } else {
     window.alert(' You have already bet an amount reset it first.');
  }
}

function reset () { 
  resetBetAmount() // reset function call the reset method
}

var images = [ // creating array andadding the images and values on it.
  {
    path: './meterial/redseven.png',
    payout: 7
  }, 
  {
    path: './meterial/bell.png',
    payout: 6
  },
  { 
    path: './meterial/lemon.png',
    payout: 3
  },
  {
    path: './meterial/plum.png',
    payout: 4
  },
  {
    path: './meterial/cherry.png',
    payout: 2
  },
  {
    path: './meterial/watermelon.png',
    payout: 5
  }
]

function shuffleSymbols (array) { // method to suffle the array with generating random numbers.
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array.slice()
}

var slotValue = [0, 0, 0]

function incrementSlotValue(position) {
  if (slotValue[position] == 5) {
    slotValue[position] = 0
  } else {
    slotValue[position]++
  }
}



function spin () {
  if (betAmount === 0) {
    window.alert(' Bet first and play');
    return
  }
  isSpinning = true
  imgArr1 = shuffleSymbols(images)
  imgArr2 = shuffleSymbols(images)
  imgArr3 = shuffleSymbols(images)
  var turn = 1
  interval = setInterval(function() {
    if (turn % 4 === 0 && spin1) {
      incrementSlotValue(0)
      img1.src = imgArr1[slotValue[0]].path
    }
    if (turn % 5 === 0 && spin2) {
      incrementSlotValue(1)
      img2.src = imgArr2[slotValue[1]].path
    }
    if (turn % 3 === 0 && spin3) {
      incrementSlotValue(2)
      img3.src = imgArr3[slotValue[2]].path
    }
    turn++
    console.log(turn)
  }, 0)
}

var win
var winCount = 0 // hold the winning count
function incrementWinCount () {
  winCount++
  displayWinCount() // call the method to display the count
}
function displayWinCount () {
  var showWin = document.getElementById('showWin')
  showWin.innerText = winCount
}
var lostCount = 0 // hold the lossing count
function incrementLostCount () {
  lostCount++
  displayLostCount() // call the method to display the count
}
function displayLostCount () {
  var showLoss = document.getElementById('showLoss')
  showLoss.innerText = lostCount
}

var averageWin = 0 // holds the aerage winning credit amounts
function displayAverage () {
  var showAverage = document.getElementById('showAverage')
  showAverage.innerText = averageWin
}

function stopSpin (val) {
  if (! isSpinning) {
    return
  }
  console.log(val)
  if (val == 1) {
    spin1 = false
  }
  if (val == 2) {
    spin2 = false
  }
  if (val == 3) {
    spin3 = false
  }
  if (spin1 || spin2 || spin3) {
    return
  }
  clearInterval(interval) 
  isSpinning = false
  var payoutArr = [
    imgArr1[slotValue[0]].payout,
    imgArr2[slotValue[1]].payout,
    imgArr3[slotValue[2]].payout
  ]
  if (payoutArr[0] == payoutArr[1]) {
    win = payoutArr[0] * betAmount
  } else if (payoutArr[1] == payoutArr[2]) {
    win = payoutArr[1] * betAmount
  } else if (payoutArr[2] == payoutArr[0]) {
    win = payoutArr[2] * betAmount
  } else {
    win = 0 - betAmount
  }
  spin1 = true
  spin2 = true
  spin3 = true
  averageWin = ((averageWin * (winCount + lostCount)) + win)/(winCount + lostCount + 1) // calculating the average winning credits
  if (win > 0) {
    incrementWinCount()
    winCredit(win)
    window.alert(' You have Won ' + win + ' Coins')
  }
  else {
    incrementLostCount()
    window.alert('You lost')
  }
  betAmount = 0
  displayBetAmount()
}

var modal = document.getElementById('modalWindow')

function showStats() { // display the statistics using the winning and lossing counts
  modal.style.display = "block"
  // calling the sub methods
  displayWinCount() 
  displayLostCount()
  displayAverage()
  var winFlex = winCount
  var loseFlex = lostCount
  document.getElementById('winlose__win').setAttribute("style",`flex:${winFlex}`)
  document.getElementById('winlose__lose').setAttribute("style",`flex:${loseFlex}`)
}

window.onclick = function(event) { // if click window will dismiss
  if (event.target == modal) {
    modal.style.display = "none"
  }
}
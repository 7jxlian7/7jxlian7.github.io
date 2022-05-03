var Status = {
    NO_GAME: 0,
    GAME_RUNNING: 1,
    COMPUTER_TURN: 2,
    HUMAN_TURN: 3,
}

let debugMode = false
let gameStatus = Status.NO_GAME

let levelElem = $('.level')
let pads = $('.pad')
let circle = $('.circle')

let sequence = [];
let humanSequence = [];
let level = 0

let TEXT_ANIMATION_DURATION = 400 // ms
let PAD_ANIMATION_DURATION = 1000 // ms

circle.on('click', startGame)

function startGame(){
    if(gameStatus != Status.NO_GAME) return;
    
    gameStatus = Status.GAME_RUNNING
    if(debugMode) console.log('[GAME STARTING]')
    nextRound()
}

function nextRound(){
    level += 1;

    updateText('Niveau ' + level)

    sequence = []
    humanSequence = []

    for(let i = 0; i < level; i++){
        sequence.push(getRandomInt(1, 4))
    }

    gameStatus = Status.COMPUTER_TURN
    setTimeout(() => {
        playSequence(humanTurn)
    }, TEXT_ANIMATION_DURATION * 4)
}

let humanTurn = () => {
    var clicksLeft = sequence.length - humanSequence.length
    var clicksLeftText = clicksLeft > 1 ? `A toi ! ${clicksLeft} coups restants` : `A toi ! ${clicksLeft} coup restant`
    updateText(clicksLeftText)
    
    setTimeout(() => {
        if(debugMode) console.log('[HUMAN TURN]')
        gameStatus = Status.HUMAN_TURN
        activatePads()
    }, TEXT_ANIMATION_DURATION * 2)
}


let playSequence = (callback) => {
    if(debugMode) console.log('[PLAYING SOUNDS]')

    sequence.forEach((elem, index) => {
        setTimeout(() => {
            var pad = getPad(elem)
            playPad(pad)
        }, (index + 1) * PAD_ANIMATION_DURATION)
    })
    setTimeout(() => {
        callback()
    }, (sequence.length + 1) * PAD_ANIMATION_DURATION)
}

function activatePads() {
    pads
        .on('mouseover', function(){
            $(this).animate({
                opacity: 0.7
            }, PAD_ANIMATION_DURATION / 4)
        })
        .on('mouseout', function(){
            $(this).animate({
                opacity: 0.5
            }, PAD_ANIMATION_DURATION / 4)
        })
        .on('mousedown', function(){
            $(this).animate({
                opacity: 1
            }, PAD_ANIMATION_DURATION / 4)
        })
        .on('mouseup', function(){
            $(this).animate({
                opacity: 0.5
            }, PAD_ANIMATION_DURATION / 4)
        })
        .on('click', (event) => {
            handleClick(event.currentTarget)
        })
}

let handleClick = (pad) => {
    let valueClicked = $(pad).data('pad');
    $(pad).children()[0].play()
    if(debugMode) console.log(`[PAD ${valueClicked} CLICKED]`)
    
    humanSequence.push(valueClicked)

    var clicksLeft = sequence.length - humanSequence.length
    var clicksLeftText = clicksLeft > 1 ? `A toi ! ${clicksLeft} coups restants` : `A toi ! ${clicksLeft} coup restant`
    updateText(clicksLeftText)

    var index = humanSequence.length - 1

    if(sequence[index] != humanSequence[index]){
        gameLose()
        return;
    }

    if(clicksLeft === 0) {
        disablePads()
        updateText('Bien joué !')
        setTimeout(() => {
            nextRound()
        }, TEXT_ANIMATION_DURATION * 4)
    }
}

let gameLose = () => {
    disablePads();
    updateText('Perdu...')
    setTimeout(() => {
        updateText('Recommencer ?')
        gameStatus = Status.NO_GAME
        level = 0
    }, 4 * TEXT_ANIMATION_DURATION)
}

function disablePads() {
    pads
        .off('mouseover')
        .off('mouseout')
        .off('mousedown')
        .off('mouseup')
        .off('click')
}

function playPad(pad){
    pad.animate({
        opacity: 1
    }, PAD_ANIMATION_DURATION / 2)
    pad.animate({
        opacity: 0.5
    }, PAD_ANIMATION_DURATION / 2)

    pad.children()[0].play()
}

function updateText(str) {
    levelElem.fadeOut(TEXT_ANIMATION_DURATION, () => {
        levelElem.html(str).fadeIn(TEXT_ANIMATION_DURATION)
    })
}

function getPad(num){
    return pads.filter(function() { return $(this).data('pad') == num })
}

/**
 * Return a random int between min and max (min & max included)
 * @param {*} min 
 * @param {*} max 
 * @returns a random int between min and max
 */
 function getRandomInt(min, max){
    return Math.floor(Math.random() * (max + 1 - min) + min);
}
const yourShip = document.querySelector('.player_shooter');
const playArea = document.querySelector('#main_play_area');
const aliensImg = ['img/enemy1.png', 'img/enemy2.png'];
const instructionsText = document.querySelector('.game_instructions');
let alienInterval;
var somExplosao = document.getElementById('s_explosao');
var somGameover = document.getElementById('s_gameover');
var somMusica = document.getElementById('s_musica');
var somMusicaFundo = document.getElementById('s_musica_fundo');
var somDisparo = document.getElementById('s_disparo');


function flyShip(event) {
    somMusica.play();
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if(event.key === " ") {
        event.preventDefault();
        somDisparo.play();
        fireLaser();
    }
}


function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "0px") {
        return;
    }else {
        let position = parseInt(topPosition);
        position -= 50;
        yourShip.style.top = position + 'px';
    }
}

function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "550px") {
        return;
    }else {
        let position = parseInt(topPosition);
        position += 50;
        yourShip.style.top = position + 'px';
    }
}

function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/disparo.png';
    newLaser.classList.add('laser');
    newLaser.style.left = xPosition + 'px';
    newLaser.style.top = (yPosition - 5) + 'px';
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');
        aliens.forEach((alien) => {
            if(checkLaserCollision(laser, alien)) {
                alien.src = 'img/explosao1.png';
                alien.classList.remove('alien');
                alien.classList.add('dead_alien');
                somExplosao.play();
            }
        })
        if(xPosition === 700) {
            laser.remove();
        } else {
            laser.style.left = (xPosition + 8) + 'px';
        }
    }, 10);
}

function createAliens() {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)];
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '700px';
    newAlien.style.top = (Math.floor(Math.random() * 330) + 30) + 'px';
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xPosition <= 50) {
            if(Array.from(alien.classList).includes('dead_alien')) {
                alien.remove();
            } else {
                somGameover.play();
                gameOver();
            }
        } else {
            alien.style.left = (xPosition - 5) + 'px';
        }
    }, 30)
}

function checkLaserCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;
    if(laserLeft != 700 && laserLeft + 40 >=alienLeft ) {
        if(laserTop <= alienTop && laserTop >= alienBottom){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => {
        alien.remove();
    })
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => {
        laser.remove();
    })
    somMusica.pause();

    alert('Xiii Marquinhos! Voce Perdeu \nQuem sabe no próximo jogo')
    window.location.reload();

}
function playGame() {
    alert('Olá Campeão! Bora Aliviar o estresse se divertindo com um jogo maneiro?\nClique em OK e Vamos')
    somMusica.addEventListener("ended", function(){ somMusica.currentTime = 0; somMusica.play(); }, false);
    
    window.addEventListener('keydown', flyShip);
    // createAliens();
    alienInterval = setInterval(() => {
        createAliens();
    }, 2000);
    
}

// startButton.addEventListener('click', (event) => {
//     playGame();
// })

playGame();

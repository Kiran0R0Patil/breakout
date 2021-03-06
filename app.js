const grid = document.querySelector('.grid')
const displayResult = document.querySelector('#result')
const boardWidth = 560
const boardHeight = 300
const blockWidth = 100 
const blockHeight = 20
const ballDiameter = 20
let timerId
let xDirection = -2
let yDirection = 2
let score = 0

const userStart = [230,10]
let currentPosition = userStart
const ballStart = [270,40]
let ballCurrentPosition = ballStart

// create all target blocks
class Block {
    constructor(x,y) {
        this.bottomLeft = [x,y]
        this.bottomRight = [x + blockWidth , y ]
        this.topLeft = [x , y + blockHeight]
        this.topRight = [x + blockWidth, y + blockHeight]
    }
}

// all my target blocks co-ordinates
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210)
]

// draw all my target block
function addBlocks(){
    for(let i=0;i<blocks.length;i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block) 
    }
}
addBlocks()

// make user board
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
userCordinate()

// user board positioning
function userCordinate(){
    user.style.left = currentPosition[0]+'px'
    user.style.bottom = currentPosition[1]+'px'
}

// user board control
function moveUser(e){
    switch (e.key){
        case 'ArrowLeft':
            if(currentPosition[0] > 0){
            currentPosition[0] -= 10
            userCordinate()
            }
            break;
        case 'ArrowRight':
            if(currentPosition[0] + blockWidth < boardWidth){
            currentPosition[0] += 10
            userCordinate()
            }
            break;
    }
}
document.addEventListener('keydown',moveUser)

// make a ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
ballCordinate()

// ball positioning
function ballCordinate(){
    ball.style.left = ballCurrentPosition[0]+'px'
    ball.style.bottom = ballCurrentPosition[1]+'px'
}

// ball trajectory
function moveBall(){
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    ballCordinate()
    checkForCollision()
}
timerId = setInterval(moveBall, 20)

// check for collision
function checkForCollision(){
    
    // check for block collisions
    const ballxhit = ballCurrentPosition[0] + ballDiameter
    const ballyhit = ballCurrentPosition[1] + ballDiameter
    for(let i =0; i<blocks.length;i++){
        if(ballxhit > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0] 
            && 
            ballyhit > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
            {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            ballDeflect()
            score++
            displayResult.innerHTML = score
            // check for win
            if(blocks.length === 0){
                displayResult.innerHTML = 'YOU WON'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
    }
        }
    }
    // check for wall collision
    if(ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
    ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
    ballCurrentPosition[0] <= 0){
            ballDeflect()
    }

    // check for user collision
    if(
        ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < (currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] &&ballCurrentPosition[1] < currentPosition[1] + blockHeight)
        ){
        ballDeflect()
    }

    // check for game over
    if(ballCurrentPosition[1] <= 0){
        clearInterval(timerId)
        displayResult.innerHTML = "GAME OVER"
        document.removeEventListener('keydown', moveUser)
    }
}

function ballDeflect(){
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2
        return
    }
    if(xDirection === 2 && yDirection === -2){
        xDirection = -2
        return
    }
    if(xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if(xDirection === -2 && yDirection === 2){
        xDirection = 2
        return
    }
}

// next add start - restart button for the game
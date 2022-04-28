# breakout
 
Game rules:
- Use the left and right arrow key to move your(user) block.
- Break all the blocks in order to complete the game.

### Play the [game](https://kiran0r0patil.github.io/breakout/) 

Learn JavaScript by Building Games **4**

---

Steps to do this project

1. A function to take the blocks array elements(co-ordinates) and create all target blocks at that cordinates.
2. A function to make user board and keep track of key pressed and move accordingly.
3. A function to create a ball and control the ball trajectory & speed.
4. A function to change the direction of the ball, When it collides with  wall or blocks or user board.
5. A function to check for collisions and perform necessary task :
    - check for game over. (if the ball reached the bottom)
    - check for user collision.
    - check for wall collision
    - check for target block collisions. (hit the target)

JavaScript methods and properties used :
```
    .querySelector()
    class
    constructor
    this
    .bottomLeft
    .bottomRight
    .topLeft
    .topRight
    classList.add()
    .createElement()
    .addEventListener()
    .style.left
    .style.bottom
    appendChild()
    e.key
    switch()
    setInterval()
    clearInterval()
    .removeEventListener()
    .length
    .splice()
    classList.remove()
    Array.from()
```
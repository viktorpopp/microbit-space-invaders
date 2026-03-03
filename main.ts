let xPos: number = 0
let bullets: [number, number][] = []

// ========
// Graphics
// ========

function redraw() {
    basic.clearScreen()
    led.toggle(xPos, 4)
    bullets.forEach((b) => {
        const [x, y] = b
        led.toggle(x, y)
    })
}

// ============
// Bullet Logic
// ============

function spawnBullet() {
    bullets.push([xPos, 3])
}

function moveBullets() {
    for (let i = 0; i < bullets.length; i++) {
        let b = bullets[i];
        let [x, y] = b
        y -= 1
        bullets[i] = [x, y]
    }
}

// ==============
// Input Handling
// ==============

input.onButtonPressed(Button.A, function () {
    xPos -= 1
    redraw()
})

input.onButtonPressed(Button.B, function () {
    xPos += 1
    redraw()
})

input.onButtonPressed(Button.AB, function () {
    spawnBullet()
    redraw()
})

basic.clearScreen()
redraw()

basic.forever(function () {
    moveBullets()
    basic.pause(50)
    redraw()
})

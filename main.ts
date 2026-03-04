let player_pos = 0;
let bullets: [number, number][] = []

//
// Graphics
//

function redraw() {
    basic.clearScreen()
    led.plot(player_pos, 4)
    bullets.forEach((b) => {
        const [x, y] = b
        led.plot(x, y)
    })
}

//
// Bullets
//

function spawnBullet() {
    bullets.push([player_pos, 3])
}

function simulateBullets() {
    for (let i = 0; i < bullets.length; i++) {
        let [x, y] = bullets[i]
        if (y == 0) {
            bullets.removeAt(i)
            i -= 1
        }
        y -= 1
        bullets[i] = [x, y]
    }
}

//
// Input Logic
//

input.onButtonPressed(Button.A, function() {
    if (player_pos == 0)
        return
    player_pos -= 1
    redraw()
})

input.onButtonPressed(Button.B, function () {
    if (player_pos == 4)
        return
    player_pos += 1
    redraw()
})

input.onButtonPressed(Button.AB, function () {
    spawnBullet()
    redraw()
})

//
// General
//

basic.clearScreen()
redraw()

basic.forever(() => {
    simulateBullets()
    redraw()
    basic.pause(100)
})

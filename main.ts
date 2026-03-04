let player_pos = 0
let bullets: [number, number][] = []
let enemies: number[] = [] // List of X coordinates (Y is always 0)
let enemies_pos = 1; // 0 = left
// 1 = middle (from left)
// 2 = middle (from right)
// 3 = right
let should_simulate_enemies = 3 // If 0 we should simulate
// Gets decreased by one each loop

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
    enemies.forEach((e) => {
        led.plot(e, 0)
    })
}

//
// Enemies
//

function spawnEnemies() {
    enemies.push(1)
    enemies.push(2)
    enemies.push(3)
    enemies_pos = 2
}


// Very messy code :(
function simulateEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        let e = enemies[i]
        let removed = false

        // Check collision
        for (let j = 0; j < bullets.length; j++) {
            let [bx, by] = bullets[j]

            if (by == 0 && bx == e) {
                enemies.removeAt(i)
                bullets.removeAt(j)

                i--
                removed = true
                break
            }
        }

        if (removed) continue

        // Movement logic
        switch (enemies_pos) {
            case 0:
            case 1:
                e += 1
                break
            case 2:
            case 3:
                e -= 1
                break
        }

        enemies[i] = e
    }

    // Update direction
    switch (enemies_pos) {
        case 0:
            enemies_pos = 1
            break
        case 1:
            enemies_pos = 3
            break
        case 2:
            enemies_pos = 0
            break
        case 3:
            enemies_pos = 2
            break
    }
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

input.onButtonPressed(Button.A, function () {
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
spawnEnemies()
redraw()

basic.forever(() => {
    if (should_simulate_enemies == 0) {
        simulateEnemies() // IMPORTANT: Should be ran before bullets because it checks
        // if the bullets Y coordinate is 0 but input cannot be that
        // after simulateBullets as it will get removed
        should_simulate_enemies = 3
    } else {
        should_simulate_enemies -= 1
    }
    simulateBullets()
    redraw()
    basic.pause(100)
})

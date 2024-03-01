
const board = document.querySelector('#board')

const height = 60;
const width = 90;

function makeId(x, y) {
  return `x:${x}-y:${y}`
}

function getRandomPossition() {
  const x = Math.floor(Math.random() * width)
  const y = Math.floor(Math.random() * height)

  return { x, y }
}

const ids = []
const initialLifes = height * width * 0.03

for (let i = 0; i < initialLifes; i++) {
  const { x, y } = getRandomPossition()

  ids.push(makeId(x, y))
}

function setLifes(e) {
  const div = document.getElementById(e.target.id)
  div.classList.add('life')
  div.classList.remove(['dead'])
}

for (let i = 0; i < width; i++) {
  const row = document.createElement('div')

  for (let j = 0; j < height; j++) {
    const div = document.createElement('div')

    div.classList.add('h-5')
    div.classList.add('w-5')
    div.classList.add('border')
    div.classList.add('border-white/5')
    div.classList.add('ease-in-out')
    div.classList.add('duration-300')
    div.classList.add('dead')
    div.classList.add('cursor-pointer')

    div.id = makeId(i, j)

    div.addEventListener('click', setLifes)


    row.appendChild(div)
  }

  board.appendChild(row)
}


function verifyLifeForCoordenate({ x, y }) {
  const div = document.getElementById(makeId(x, y))

  let neighbors = [
    { x: x, y: y + 1 },
    { x: x + 1, y: y },
    { x: x, y: y - 1 },
    { x: x - 1, y: y },
    { x: x + 1, y: y + 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y: y + 1 },
    { x: x - 1, y: y - 1 },
  ]

  let lifes = 0;
  let deads = 0;

  for (let neighbor of neighbors) {
    const neighborDiv = document.getElementById(makeId(neighbor.x, neighbor.y))
    if (!neighborDiv) {
      deads++
      continue
    }

    if (neighborDiv.classList.contains('life')) {
      lifes++
    }

    if (neighborDiv.classList.contains('dead')) {
      deads++
    }
  }



  if (div.classList.contains('dead')) {
    if (lifes === 3) {
      div.classList.add('life')
      div.classList.remove(['dead'])
    }
    return
  }

  if (div.classList.contains('life')) {
    if (lifes >= 4 || lifes < 2) {
      div.classList.add('dead')
      div.classList.remove(['life'])
    }
    return
  }
}


// verifyLife()

setInterval(() => {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      verifyLifeForCoordenate({ x: i, y: j })
    }
  }
}, 1500)


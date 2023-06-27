const row_cpu_results = document.getElementById("row_cpu_results")
const row_player_results = document.getElementById("row_player_results")
const row_cpu_board = document.getElementById("row_cpu_board")
const row_player_board = document.getElementById("row_player_board")
const result_text = document.getElementById("result_text")
let cpu_results
let player_results
let cpu_board
let option_player
let option_cpu
let cpu_points
let player_points
let count
let list_options = ["rock", "paper", "scissors"]
let url_images = ["url('images/rock.png')", "url('images/paper.png')", "url('images/scissors.png')"]
let possible_results = {
  "scissors-paper": ["Scissors cuts Paper", "cpu"],
  "paper-rock": ["Paper covers Rock", "cpu"],
  "rock-scissors": ["Rock crushes Scissors", "cpu"],
  "paper-scissors": ["Scissors cuts Paper", "player"],
  "rock-paper": ["Paper covers Rock", "player"],
  "scissors-rock": ["Rock crushes Scissors", "player"]
}

function choose() {
  let index = Math.floor(Math.random() * list_options.length);
  return list_options[index];
}

function Is_end_game() {
  if (count == 5) {
    if (cpu_points > player_points) {
      Swal.fire({
        title: 'You Lose! ',
        imageUrl: 'images/lose.png',
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: 'Lose image',
        confirmButtonText: 'Play Again',
      }).then((result) => {
        if (result.isConfirmed || result.dismiss) {
          reset()
        }
      })
      return
    }
    else if (cpu_points < player_points) {
      Swal.fire({
        title: 'You Win! ',
        imageUrl: 'images/win.png',
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: 'Win image',
        confirmButtonText: 'Play Again',
      }).then((result) => {
        if (result.isConfirmed || result.dismiss) {
          reset()
        }
      })
      return
    }
    else {
      Swal.fire({
        title: 'Draw ! ',
        imageUrl: 'images/draw.png',
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: 'Draw image',
        confirmButtonText: 'Play Again',
      }).then((result) => {
        if (result.isConfirmed || result.dismiss) {
          reset()
        }
      })
      return
    }
  }
}

function check_winner() {
  if (option_cpu == option_player) {
    result_text.innerHTML = "Draw"
    cpu_results[count].style.backgroundColor = "grey"
    player_results[count].style.backgroundColor = "grey"
  }
  else {
    let search = option_cpu + "-" + option_player
    let win = possible_results[search][1]
    result_text.innerHTML = possible_results[search][0]
    if (win == "player") {
      player_points += 1
      cpu_results[count].style.backgroundColor = "red"
      player_results[count].style.backgroundColor = "green"
    }
    else {
      cpu_points += 1
      cpu_results[count].style.backgroundColor = "green"
      player_results[count].style.backgroundColor = "red"
    }
  }
  count += 1
  setTimeout(() => {
    Is_end_game()
  }, 200);
}

const set_player = function (evento) {
  option_player = this.id
  option_cpu = choose()
  document.getElementById("image_cpu").src = "images/" + option_cpu + ".png"
  document.getElementById("image_player").src = "images/" + option_player + ".png"
  for (let i = 0; i < 3; i++) {
    cpu_board[i].id == option_cpu ? cpu_board[i].style.backgroundColor = "yellow" : cpu_board[i].style.backgroundColor = "transparent"
  }
  check_winner()
}


function reset() {
  //clear resutls and boards
  while (row_player_results.hasChildNodes()) {
    row_player_results.removeChild(row_player_results.firstChild);
  }
  while (row_cpu_results.hasChildNodes()) {
    row_cpu_results.removeChild(row_cpu_results.firstChild);
  }

  while (row_player_board.hasChildNodes()) {
    row_player_board.removeChild(row_player_board.firstChild);
  }
  while (row_cpu_board.hasChildNodes()) {
    row_cpu_board.removeChild(row_cpu_board.firstChild);
  }
  document.getElementById("image_cpu").src = "images/ready.png"
  document.getElementById("image_player").src = "images/ready.png"
  result_text.innerHTML = "Ready?"
  initialize()
}

function initialize() {
  option_player = ""
  option_cpu = ""
  cpu_results = []
  player_results = []
  cpu_board = []
  cpu_points = 0
  player_points = 0
  count = 0

  for (let i = 0; i < 5; i++) {
    let c_player = document.createElement("div")
    c_player.id = i
    c_player.setAttribute("class", "circle")
    let c_cpu = document.createElement("div")
    c_cpu.id = i
    c_cpu.setAttribute("class", "circle")

    row_player_results.appendChild(c_player)
    row_cpu_results.appendChild(c_cpu)
    player_results.push(c_player)
    cpu_results.push(c_cpu)
  }

  for (let i = 0; i < 3; i++) {
    let op_player = document.createElement("div")
    op_player.style.backgroundImage = url_images[i]
    op_player.addEventListener("click", set_player)
    op_player.id = list_options[i]

    let op_cpu = document.createElement("div")
    op_cpu.style.backgroundImage = url_images[i]
    op_cpu.id = list_options[i]

    row_player_board.appendChild(op_player)
    row_cpu_board.appendChild(op_cpu)
    cpu_board.push(op_cpu)
  }
}

window.onload = function () {
  initialize()
}
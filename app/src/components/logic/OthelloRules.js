export const getSum = (arr) => {
  let sum = 0
  for (let i = 0; i < arr.length; i++) { sum += arr[i] }
  return sum
}

export const flips = (board, player, r, c) => {
  const directions = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]]
  for (let i = 0; i < 8; i++) {
    const direction = directions[i]
    let cur_row = r + direction[0]
    let cur_col = c + direction[1]
    let row = [c * 8 + r]

    while (cur_row >= 0 && cur_row < 8 && cur_col >= 0 && cur_col < 8) {
      row.push(cur_col * 8 + cur_row)
      if (board[(cur_col * 8) + cur_row] !== -player) { break }

      cur_row += direction[0]
      cur_col += direction[1]
    }

    if (row.length < 3 || board[row[row.length - 1]] !== player) { continue }

    for (let j = 0; j < row.length; j++) {
      board[row[j]] = player
    }
  }
}

export const getActionSpace = () => {
  return 64
}

export const getStartBoard = () => {
  let board = []
  for (let i = 0; i < getActionSpace(); i++) { board[i] = 0 }
  board[27] = -1
  board[28] = 1
  board[35] = 1
  board[36] = -1
  return board
}

export const getValids = (board, player, r, c) => {
  let moves = []
  const directions = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]]
  for (let dir = 0; dir < 8; dir++) {
    const direction = directions[dir]
    let cur_row = r + direction[0]
    let cur_col = c + direction[1]
    let row = [board[(c * 8) + r]]

    while (cur_row >= 0 && cur_row < 8 && cur_col >= 0 && cur_col < 8) {
      row.push(board[(cur_col * 8) + cur_row])
      if (row[row.length - 1] !== -player) { break }

      cur_row += direction[0]
      cur_col += direction[1]
    }

    if (row.length < 3 || !(row[0] === player && row[row.length - 1] === 0)) { continue }
    for (let i = 1; i < row.length - 1; i++) {
      if (row[i] === player || row[i] === 0) { continue }
    }

    moves.push([cur_row, cur_col])
  }

  return moves
}

export const hasWon = (board, player) => {
  let score = getSum(board)
  if (player === 1) { return score > 0 } else { return score < 0 }
}

export const step = (board, action, player) => {
  let validActions = getValidActions(board, player)
  if (getSum(validActions) === 0) { return board } 

  let c = Math.floor(action / 8)
  let r = action % 8
  board[(c * 8) + r] = player
  flips(board, player, r, c)
  return board
}

export const getValidActions = (board, player) => {
  let validActions = []
  for (let i = 0; i < getActionSpace(); i++) { validActions.push(0) }
  let valids = new Set()

  for (let a = 0; a < getActionSpace(); a++) {
    let col = Math.floor(a / 8)
    let row = a % 8

    if (board[(col * 8) + row] === player) {
      let moves = getValids(board, player, row, col)
      for (let i = 0; i < moves.length; i++) {
        valids.add((moves[i][1] * 8) + moves[i][0])
      }
    }
  }

  for (let val of valids) { validActions[val] = 1 }
  return validActions
} 

export const getResult = (board) => {
  if (hasWon(board, 1)) {
    return 1
  } else if (hasWon(board, -1)) {
    return -1
  } else {
    return 0
  }
}

export const isConcluded = (board) => {
  return (getSum(getValidActions(board, 1)) === 0 && getSum(getValidActions(board, -1)) === 0)
}


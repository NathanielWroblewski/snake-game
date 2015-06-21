namespace('Snake.Models')

Snake.Models.Board = function(config) {
  this.height = config.height || 40
  this.width  = config.width  || 40
  this.total  = this.height * this.width
  this.empty  = 'empty'
  this.snake  = []
  this.over   = false

  this.initialize = function() {
    this.placeSnake()
    this.placeBerry()
  }

  this.placeSnake = function() {
    var center = (this.total / 2) - (this.width / 2)

    for (var i = 0; i < 8; i++) {
      this.snake.push(center + this.width * i)
    }
  }

  this.placeBerry = function() {
    this.berry = this.getOpenCell()
  }

  this.getOpenCell = function() {
    var randomSpot = Math.floor(Math.random() * this.total)

    return this.snake.indexOf(randomSpot) < 0 ? randomSpot : this.getOpenCell()
  }

  this.next = function(direction) {
    var nextMove = this.nextMove(direction)

    if (this.hitWall(nextMove[0], this.snake[0]) || this.hitSelf(nextMove[0])) {
      this.endGame()
    }

    if (nextMove[0] === this.berry) {
      this.placeBerry()
      this.snake = nextMove.concat(this.snake[this.snake.length - 1])
    } else {
      this.snake = nextMove
    }
  }

  this.nextMove = function(direction) {
    if (direction && this[direction]) {
      var nextHead = this[direction]()
    } else {
      var nextHead = this.snake[0] + (this.snake[0] - this.snake[1])
    }

    return [nextHead].concat(this.snake.slice(0, this.snake.length - 1))
  }

  this.endGame = function() {
    this.over = true
  }

  this.hitWall = function(next, current) {
    return (
      next < 0                         ||
      next > this.total                ||
      this.offBoardLeft(next, current) ||
      this.offBoardRight(next, current)
    )
  }

  this.offBoardLeft = function(next, current) {
    return current % this.width === 0 && next % this.width === this.width - 1
  }

  this.offBoardRight = function(next, current) {
    return current % this.width === this.width - 1 && next % this.width === 0
  }

  this.hitSelf = function(next) {
    return this.snake.indexOf(next) >= 0
  }

  this.left = function() {
    return this.snake[0] - 1
  }

  this.right = function() {
    return this.snake[0] + 1
  }

  this.up = function() {
    return this.snake[0] - this.width
  }

  this.down = function() {
    return this.snake[0] + this.width
  }

  this.toJSON = function() {
    return {
      total: this.total,
      snake: this.snake,
      berry: this.berry,
      over:  this.over
    }
  }

  this.initialize()
}

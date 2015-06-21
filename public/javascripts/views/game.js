namespace('Snake.Views')

Snake.Views.Game = function(config) {
  this.model = config.model
  this.el    = config.el

  this.initialize = function() {
    this.render()
  }

  this.template = function(board) {
    var className = '',
        html = ''

    for (var i = 0; i < board.total; i++) {
      var className = this.getClassName(i, board)

      html += '<div class="' + className + '"></div>'
    }
    return html
  }

  this.getClassName = function(i, board) {
    if (board.snake.indexOf(i) >= 0) {
      return 'snake'
    } else if (i === board.berry) {
      return 'berry'
    } else {
      return 'empty'
    }
  }

  this.render = function() {
    var board = this.model.toJSON()

    if (board.over) {
      alert('GAME OVER!')
      location.reload()
    } else {
      this.el.innerHTML = this.template(board)
    }
  }

  this.initialize()
}

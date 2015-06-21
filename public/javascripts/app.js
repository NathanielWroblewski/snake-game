!function() {
  var board = new Snake.Models.Board({}),
      game = new Snake.Views.Game({
        model: board,
        el:    document.querySelector('.game')
      })

  setInterval(function() {
    board.next()
    game.render()
  }, 100)

  document.onkeyup = function(e) {
    var code = e.which || e.keyCode;

    switch (code) {
      case 37: board.next('left')
      break;
      case 38: board.next('up')
      break;
      case 39: board.next('right')
      break;
      case 40: board.next('down')
      break;
    }

    if (code >= 37 && code <= 40) {
      e.preventDefault()
      game.render()
    }
  }
}()


window.onload = function () {
  console.log("hello")
  let canvas = document.getElementById('canvas')
  console.log(canvas)
  let context = canvas.getContext('2d')
  let width = canvas.width = window.innerWidth
  let height = canvas.height = window.innerHeight


  let ship = particle.create(width / 2, height / 2, 0, 0);
  ship.friction = 0.99
  let thrust = vector.create(0, 0)
  let turningLeft = turningRight = thrusting = false
  let turnAngle = 0
  document.body.onkeydown = function (e) {
    //console.log("helllo")
    switch (e.keyCode) {
      case 38: //up
        thrusting = true
        break;

      case 37://left
        turningLeft = true
        break
      case 39: //right
        turningRight = true
        break;
      default:
        break;
    }
  }
  document.body.onkeyup = function (e) {
    //console.log("helloooo")
    switch (e.keyCode) {
      case 38: //up
        thrusting = false
        break;

      case 37:
        turningLeft = false
        break
      case 39:
        turningRight = false
        break;
      default:
        break;
    }
  }

  render()
  function render() {
    context.clearRect(0, 0, width, height)

    if (turningLeft) turnAngle -= 0.07
    if (turningRight) turnAngle += 0.07

    if (thrusting)
      thrust.setLength(0.05)
    else
      thrust.setLength(0)

    thrust.setAngle(turnAngle)

    ship.accelerate(thrust)
    ship.update()
    context.save()
    context.translate(ship.position.getX(), ship.position.getY())
    context.rotate(turnAngle)
    context.beginPath()
    //context.arc(ship.position.getX(), ship.position.getY(), 10, 0, Math.PI * 2, false)
    context.moveTo(10, 0)
    context.lineTo(-10, -7)
    context.lineTo(-10, 7)
    context.lineTo(10, 0)
    if (thrusting) {
      context.moveTo(-10, 0)
      context.lineTo(-20, 0)
    }
    context.stroke()

    //context.fill()

    if (ship.position.getX() > width)
      ship.position.setX(0)
    if (ship.position.getX() < 0)
      ship.position.setX(width)
    if (ship.position.getY() > height)
      ship.position.setY(0)
    if (ship.position.getY() < 0)
      ship.position.setY(height)
    context.restore()
    requestAnimationFrame(render)
  }
}
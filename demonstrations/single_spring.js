window.onload = function () {
  let canvas = document.getElementById('canvas')
  let context = canvas.getContext('2d')
  let width = canvas.width = window.innerWidth
  let height = canvas.height = window.innerHeight

  let springPoint = particle.create(width / 2, height / 2, 0, 0)
  let block = particle.create(width / 2 + 400, height / 2, 0, 0, 1)
  block.friction = 0.9
  let distance = springForce = 0
  let springLength = 100
  let k = 0.1

  document.body.onmousemove = function (e) {
    springPoint.position.setX(e.clientX)
    springPoint.position.setY(e.clientY)
  }


  render()
  function render() {
    context.clearRect(0, 0, width, height)

    distance = springPoint.position.subtract(block.position)
    distance.setLength(distance.getLength() - springLength)
    springForce = distance.multiply(k)
    block.accelerate(springForce)
    block.update()
    context.beginPath()
    context.arc(block.position.getX(), block.position.getY(), 10, 0, Math.PI * 2, false)
    context.fill()

    context.beginPath()
    context.arc(springPoint.position.getX(), springPoint.position.getY(), 3, 0, Math.PI * 2, false)
    context.fill()

    context.beginPath()
    context.moveTo(springPoint.position.getX(), springPoint.position.getY())
    context.lineTo(block.position.getX(), block.position.getY())
    context.stroke()

    requestAnimationFrame(render)
  }
}
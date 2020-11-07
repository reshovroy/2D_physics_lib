window.onload = function () {
  let canvas = document.getElementById('canvas')
  console.log(canvas)
  let context = canvas.getContext('2d')
  let width = canvas.width = window.innerWidth
  let height = canvas.height = window.innerHeight

  let p1 = particle.create(width / 2 - 100, height / 2, 0, 0)
  let p2 = particle.create(width / 2 + 100, height / 2, 0, 0)
  let p3 = particle.create(width / 2, height / 2 + 200, 0, 0)
  p1.friction = 0.98
  p2.friction = 0.95
  p3.friction = 0.98
  let k = 0.09

  let separation = 100

  render()

  function render() {
    context.clearRect(0, 0, width, height)

    createSpring(p1, p2, separation)
    createSpring(p2, p3, separation)
    createSpring(p3, p1, separation)

    p1.update()
    p2.update()
    p3.update()

    context.beginPath()
    context.arc(p1.position.getX(), p1.position.getY(), 5, 0, Math.PI * 2, false)
    context.fill()

    context.beginPath()
    context.arc(p2.position.getX(), p2.position.getY(), 5, 0, Math.PI * 2, false)
    context.fill()

    context.beginPath()
    context.arc(p3.position.getX(), p3.position.getY(), 5, 0, Math.PI * 2, false)
    context.fill()

    context.beginPath()
    context.moveTo(p1.position.getX(), p1.position.getY())
    context.lineTo(p2.position.getX(), p2.position.getY())
    context.stroke()

    context.beginPath()
    context.moveTo(p2.position.getX(), p2.position.getY())
    context.lineTo(p3.position.getX(), p3.position.getY())
    context.stroke()

    context.beginPath()
    context.moveTo(p3.position.getX(), p3.position.getY())
    context.lineTo(p1.position.getX(), p1.position.getY())
    context.stroke()

    requestAnimationFrame(render)
  }

  function createSpring(p1, p2, separation) {
    let distance = p2.position.subtract(p1.position)
    distance.setLength(distance.getLength() - separation)
    let springForce = distance.multiply(k)
    //console.log(springForce)
    p1.velocity.addTo(springForce)
    p2.velocity.subtractBy(springForce)
  }
}
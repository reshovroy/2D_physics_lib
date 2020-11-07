window.onload = function () {
  let canvas = document.getElementById('canvas')
  let context = canvas.getContext('2d')
  let width = canvas.width = window.innerWidth
  let height = canvas.height = window.innerHeight

  let rows = 10
  let cols = 20
  let baseSpringLength = 20
  let gridGap = 25

  let k = 0.01

  let centerOffset = width / 2 - (gridGap * cols) / 2
  let gravity = vector.create(0, 0.01);
  let springParticles = []
  for (let i = 0; i < rows; i++) {
    springParticles[i] = []
    for (let j = 0; j < cols; j++) {
      let springParticle = particle.create((j + 1) * gridGap + centerOffset, (i + 1) * gridGap, 0, 0)
      springParticle.radius = 2
      springParticle.friction = 0.96
      if (i != 0)
        springParticle.gravity = vector.create(0, 0.03);
      springParticles[i].push(springParticle)
    }
  }
  //console.table(springParticles)
  let x1 = y1 = distance = 0, mouseDrag = false
  let moveParticle
  function handleMouseMove(p) {
    if (mouseDrag) {
      document.body.addEventListener("mousemove", moveParticle = function (e) {
        p.position.setX(e.clientX)
        p.position.setY(e.clientY)
      })
    }
    document.addEventListener('mouseup', function () {
      mouseDrag = false;
      document.body.removeEventListener('mousemove', moveParticle)
    })
  }

  document.body.onmousedown = function (e) {
    for (let i = 1; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        x1 = springParticles[i][j].position.getX()
        y1 = springParticles[i][j].position.getY()
        distance = Math.sqrt((x1 - e.clientX) * (x1 - e.clientX) + (y1 - e.clientY) * (y1 - e.clientY))
        if (distance < springParticles[i][j].radius) {
          mouseDrag = true
          handleMouseMove(springParticles[i][j])
          break;
        }
      }
      if (mouseDrag) break;
    }
  }

  let springWires = []
  let count = 0

  for (let i = 1; i < cols; i++) {
    let springWire = spring.create(springParticles[1][i], springParticles[0][i], k, baseSpringLength, context, true, false)
    springWires.push(springWire)
    springWire = spring.create(springParticles[1][i], springParticles[1][i - 1], k, baseSpringLength, context)
    springWires.push(springWire)
  }

  for (let i = 2; i < rows; i++) {
    let springWire = spring.create(springParticles[i][0], springParticles[i - 1][0], k, baseSpringLength, context)
    springWires.push(springWire)
  }

  springWires.push(spring.create(springParticles[1][0], springParticles[0][0], k, baseSpringLength, context, true, false))

  for (let i = 2; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      count = count + 1
      //console.log(springParticles[i][j])
      let springWire1 = spring.create(springParticles[i][j], springParticles[i - 1][j], k, baseSpringLength, context)
      let springWire2 = spring.create(springParticles[i][j], springParticles[i][j - 1], k, baseSpringLength, context)
      springWires.push(springWire1)
      springWires.push(springWire2)
      //console.log(springWires)
    }
  }


  //console.table(springWires)

  render()

  function render() {
    context.clearRect(0, 0, width, height)

    for (let i = 0; i < springWires.length; i++) {
      if (springWires[i].getSpringLength() > 60) {
        springWires[i].unlink()
        springWires.splice(i, 1)
      }
    }

    for (let i = 0; i < springWires.length; i++)
      springWires[i].update()

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        springParticles[i][j].update()
        if (springParticles[i][j].position.getY() + springParticles[i][j].radius >= height)
          springParticles[i][j].position.setY(height + springParticles[i][j].radius)
      }
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        context.beginPath()
        context.arc(springParticles[i][j].position.getX(), springParticles[i][j].position.getY(), springParticles[i][j].radius, 0, Math.PI * 2, false)
        context.fill()
      }
    }

    for (let i = 0; i < springWires.length; i++)
      springWires[i].drawSpring()
    console.log("hello")
    requestAnimationFrame(render)
  }
}
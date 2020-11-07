window.onload = function () {
  let canvas = document.getElementById('canvas')
  let context = canvas.getContext('2d')
  let width = canvas.width = window.innerWidth
  let height = canvas.height = window.innerHeight


  let rows = 10
  let cols = 20
  let gridGap = 20
  let springLength = 150
  let stretchLimit = 80
  let k = 0.05
  let gravity = vector.create(0, 0.1)
  let p1 = particle.create(width / 2 - 50, height / 2, 0, 0)
  p1.friction = 0.98
  p1.gravity = gravity
  let p2 = particle.create(width / 2 + 50, height / 2, 0, 0)
  p2.friction = 0.98
  p2.gravity = gravity
  let p3 = particle.create(width / 2 + 50, height / 2 - 100, 0, 0)
  p3.friction = 0.98
  p3.gravity = gravity

  let parr = [p1, p2, p3]

  let springWire1 = spring.create(p1, p2, k, springLength, context, true, true)
  let springWire2 = spring.create(p2, p3, k, springLength, context, true, true)
  let springWire3 = spring.create(p1, p3, k, springLength, context)

  let springs = [springWire1, springWire2, springWire3]
  //console.log(springWire)

  //code to handle mouse drag
  let mouseDrag = false
  let x1 = y1 = distance = 0
  let moveParticle;
  function handleMouseDrag(p) {
    if (mouseDrag) {
      document.body.addEventListener('mousemove', moveParticle = function (e) {
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
    for (let i = 0; i < parr.length; i++) {
      x1 = parr[i].position.getX()
      y1 = parr[i].position.getY()
      distance = Math.sqrt((x1 - e.clientX) * (x1 - e.clientX) + (y1 - e.clientY) * (y1 - e.clientY))
      if (distance < 10) {
        mouseDrag = true
        console.log('clicked')
        handleMouseDrag(parr[i])
        break
      }
    }
  }


  render()

  function render() {
    context.clearRect(0, 0, width, height)

    for (let i = 0; i < springs.length; i++) {
      if (springs[i].getSpringLength() > 220) {
        springs[i].unlink()
        springs.splice(i, 1)
      }
    }


    for (let i = 0; i < springs.length; i++) {
      springs[i].update()
    }

    p1.update()
    p2.update()
    p3.update()

    if (p1.position.getY() + p1.radius >= height) p1.position.setY(height + p1.radius)
    if (p2.position.getY() + p2.radius >= height) p2.position.setY(height + p2.radius)
    if (p3.position.getY() + p3.radius >= height) p3.position.setY(height + p3.radius)

    context.beginPath()
    context.arc(p1.position.getX(), p1.position.getY(), 10, 0, Math.PI * 2, false)
    context.fill()

    context.beginPath()
    context.arc(p2.position.getX(), p2.position.getY(), 10, 0, Math.PI * 2, false)
    context.fill()

    context.beginPath()
    context.arc(p3.position.getX(), p3.position.getY(), 10, 0, Math.PI * 2, false)
    context.fill()

    for (let i = 0; i < springs.length; i++) {
      springs[i].drawSpring()
    }



    requestAnimationFrame(render)
  }

}
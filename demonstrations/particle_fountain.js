window.onload = function () {

  let canvas = document.getElementById('canvas')
  console.log(canvas)
  let context = canvas.getContext('2d')
  let width = canvas.width = window.innerWidth
  let height = canvas.height = window.innerHeight
  let i = 0;
  const gravity = vector.create(0, 0.2)
  const p = particle.create(width / 2, height * 0.4, 3, Math.PI / 2)
  p.radius = 60
  //render1() //edge with radius

  function render1() {
    context.clearRect(0, 0, width, height)
    //p.velocity.addTo(gravity)
    p.update()
    context.beginPath()
    context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false)
    context.fill()
    if (p.position.getY() - p.radius > height)
      p.position.setY(-p.radius)
    requestAnimationFrame(render1)
  }


  let numberOfParticles = 200
  let pArr = []
  for (i = 0; i < numberOfParticles; i++)
    pArr.push(particle.create(width / 2, height * 0.2, Math.random() * 2 + 0.5, Math.random() * Math.PI * 2))
  //render2()

  function render2() {
    context.clearRect(0, 0, width, height)
    console.log(pArr.length)
    for (i = 0; i < numberOfParticles; i++) {
      if (pArr[i].position.getY() > height) {
        pArr.splice(i, 1)
        numberOfParticles = pArr.length
      }

      else {
        context.beginPath()
        context.arc(pArr[i].position.getX(), pArr[i].position.getY(), 2, 0, Math.PI * 2, false)
        context.fill()
        pArr[i].accelerate(gravity)
        pArr[i].update()
      }
    }
    if (pArr.length)
      requestAnimationFrame(render2)
  }

  let fountainParticles = []
  for (i = 0; i < numberOfParticles; i++) {
    let fountainParticle = particle.create(width / 2, height, Math.random() * 4 + 5, -Math.PI / 2 + 5 * (Math.random() * .2 - .1))
    fountainParticle.radius = Math.random() * 5 + 1
    fountainParticle.color = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
    fountainParticles.push(fountainParticle)
  }

  render3()
  function render3() {
    context.clearRect(0, 0, width, height)
    context.fillStyle = "#000"
    context.fillRect(0, 0, width, height)
    for (i = 0; i < numberOfParticles; i++) {
      context.beginPath()
      fountainParticles[i].accelerate(gravity)
      fountainParticles[i].update()
      context.fillStyle = fountainParticles[i].color
      context.arc(fountainParticles[i].position.getX(), fountainParticles[i].position.getY(), fountainParticles[i].radius, 0, Math.PI * 2, false)
      context.fill()

      if (fountainParticles[i].position.getY() + 5 > height) {
        fountainParticles[i].position.setX(width / 2)
        fountainParticles[i].position.setY(height)
        fountainParticles[i].velocity.setLength(Math.random() * 8 + 5)
        fountainParticles[i].velocity.setAngle(-Math.PI / 2 + 5 * (Math.random() * 0.2 - 0.1))
      }
    }

    requestAnimationFrame(render3)
  }

}
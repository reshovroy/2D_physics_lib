window.onload = function () {
  let canvas = document.getElementById('canvas')
  let context = canvas.getContext('2d')
  let width = canvas.width = window.innerWidth
  let height = canvas.height = window.innerHeight

  let parr = []
  let rows = 10
  let cols = 20
  let gridGap = 20
  let springLength = 15
  let stretchLimit = 80
  let k = 0.01
  let mouseHandle = false
  let centerOffset = width / 2 - (gridGap * cols) / 2;
  for (let i = 0; i < rows; i++) {
    parr[i] = []
    for (let j = 0; j < cols; j++) {
      let springParticle = particle.create((j + 1) * gridGap + centerOffset, (i + 1) * gridGap, 0, 0)
      springParticle.radius = 2
      springParticle.friction = 0.995
      if (i !== 0)
        springParticle.gravity = vector.create(0, 0.05)
      parr[i].push(springParticle)
    }
  }

  let staticWind = particle.create(width / 2 - 200, rows * gridGap + 200, 0, 0)
  staticWind.mass = 1000;
  let variationSpeed = 0.01
  let windSpeed = 0;

  let moveParticle;

  function endMouseTrack() {
    mouseHandle = false;
    document.body.removeEventListener("mousemove", moveParticle)
  }

  function handleMouseMove(e, cx = 0, cy = 0) {
    let startPoint = vector.create(e.clientX, e.clientY)
    let endPoint = vector.create(e.clientX, e.clientY)
    if (mouseHandle) {
      document.body.addEventListener("mousemove", moveParticle = function (e) {
        if (mouseHandle) {
          parr[cx][cy].position.setX(e.clientX)
          parr[cx][cy].position.setY(e.clientY)

          endPoint.setX(e.clientX)
          endPoint.setY(e.clientY)
          let distanceVec = endPoint.subtract(startPoint)
          if (distanceVec.getLength() > stretchLimit) endMouseTrack()

        }
      })
    }
    document.body.addEventListener("mouseup", endMouseTrack)
  }

  document.body.onmousedown = function (e) {
    for (let i = 1; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let x1 = parr[i][j].position.getX()
        let y1 = parr[i][j].position.getY()
        let distance = Math.sqrt((x1 - e.clientX) * (x1 - e.clientX) + (y1 - e.clientY) * (y1 - e.clientY))
        if (distance < parr[i][j].radius) {
          mouseHandle = true
          console.log(mouseHandle, "clicked")
          handleMouseMove(e, i, j)
          break;
        }
      }
      if (mouseHandle) break;
    }
  }

  render()

  function render() {
    context.clearRect(0, 0, width, height)

    //adjustwind
    staticWind.mass = 5000 * Math.sin(windSpeed)
    //staticWind.mass = 1000;
    windSpeed += 0.01;
    let i, j;
    for (i = 1; i < cols; i++) {
      calcSpringForce(parr[1][i], parr[1][i - 1], k, springLength, true, true)
      calcSpringForce(parr[1][i], parr[0][i], k, springLength, true, false)
    }
    calcSpringForce(parr[1][0], parr[0][0], k, springLength, true, false)
    for (i = 2; i < rows; i++) {
      calcSpringForce(parr[i][0], parr[i - 1][0], k, springLength)
    }

    for (let i = 2; i < rows; i++) {
      for (let j = 1; j < cols; j++) {
        calcSpringForce(parr[i][j], parr[i - 1][j], k, springLength)
        calcSpringForce(parr[i][j], parr[i][j - 1], k, springLength)
      }
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {

        //applying wind force
        context.beginPath()
        context.arc(staticWind.position.getX(), staticWind.position.getY(), 30, 0, Math.PI * 2, false)
        context.fillStyle = 'rgb(255,0,0)'
        context.fill()
        if (i !== 0)
          parr[i][j].repelFrom(staticWind)

        parr[i][j].update()
        context.beginPath()
        context.arc(parr[i][j].position.getX(), parr[i][j].position.getY(), parr[i][j].radius, 0, Math.PI * 2, false)
        context.fill()
      }
    }

    for (let i = 1; i < rows; i++) {
      for (let j = 1; j < cols; j++) {
        let p1 = parr[i - 1][j]
        let p2 = parr[i][j - 1]
        context.beginPath()
        context.moveTo(parr[i][j].position.getX(), parr[i][j].position.getY())
        context.lineTo(p1.position.getX(), p1.position.getY())
        context.stroke()

        context.beginPath()
        context.moveTo(parr[i][j].position.getX(), parr[i][j].position.getY())
        context.lineTo(p2.position.getX(), p2.position.getY())
        context.stroke()
      }
    }

    for (let i = 1; i < rows; i++) {
      context.beginPath()
      prevParticle = parr[i - 1][0]
      context.beginPath()
      context.moveTo(parr[i][0].position.getX(), parr[i][0].position.getY())
      context.lineTo(prevParticle.position.getX(), prevParticle.position.getY())
      context.stroke()
    }

    for (let i = 1; i < cols; i++) {
      context.beginPath()
      let prevParticle = parr[0][i - 1]
      context.beginPath()
      context.moveTo(parr[0][i].position.getX(), parr[0][i].position.getY())
      context.lineTo(prevParticle.position.getX(), prevParticle.position.getY())
      context.stroke()

    }

    requestAnimationFrame(render)
  }

  function calcSpringForce(p1, p2, k, separation, handlep1 = true, handlep2 = true) {
    let distance = p2.position.subtract(p1.position)
    distance.setLength(distance.getLength() - separation)
    let springForce = distance.multiply(k)
    if (handlep1)
      p1.velocity.addTo(springForce)
    if (handlep2)
      p2.velocity.subtractBy(springForce)
  }
}
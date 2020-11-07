window.onload = function () {

  let canvas = document.getElementById("canvas")
  let ctx = canvas.getContext("2d")

  let width = canvas.width = canvas.width = window.innerWidth
  let height = canvas.height = canvas.height = window.innerHeight

  canvas.style.backgroundColor = "rgb(0,0,0)"

  let centerX = width / 2
  let centerY = height / 2

  let xRadius = 150
  let yRadius = 100

  let xAngle = 0
  let yAngle = 0

  let xSpeed = 0.01
  let ySpeed = 0.08

  //single particle
  function render1() {


    //ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.fillRect(0, 0, width, height)
    let x = centerX + Math.cos(xAngle) * xRadius
    let y = centerY + Math.sin(yAngle) * yRadius

    ctx.fillStyle = "rgba(255,0,0,1)"
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2, false)
    ctx.fill()

    xAngle += xSpeed
    yAngle += ySpeed

    requestAnimationFrame(render)
  }

  //render1()

  let particles = []
  let n = 30

  for (let i = 0; i < n; i++) {

    let p = particle.create(centerX, centerY, 0, 0)

    p.xRadius = Math.random() * 100 + 200
    p.yRadius = Math.random() * 100 + 150
    p.xSpeed = 0.01 + Math.random() * 0.05
    p.ySpeed = 0.01 + Math.random() * 0.05
    //console.log("pspeed", p.xSpeed, p.ySpeed)
    p.xAngle = 0
    p.yAngle = 0

    p.radius = 2.5
    p.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
    particles.push(p)
  }

  //multiple particles
  function render2() {

    ctx.fillStyle = 'rgba(0,0,0,0.08)'
    ctx.fillRect(0, 0, width, height)
    particles.forEach((p) => {

      p.position._x = centerX + Math.cos(p.xAngle) * p.xRadius
      p.position._y = centerY + Math.cos(p.yAngle) * p.yRadius

      p.xAngle += p.xSpeed
      p.yAngle += p.ySpeed

      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.position._x, p.position._y, p.radius, 0, Math.PI * 2, false)
      ctx.fill()
    })

    requestAnimationFrame(render2)
  }

  render2()
}
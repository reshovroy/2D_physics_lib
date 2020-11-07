window.onload = function () {

  let canvas = document.getElementById('canvas')
  console.log(canvas)
  let context = canvas.getContext('2d')
  let width = canvas.width = window.innerWidth
  let height = canvas.height = window.innerHeight

  let sun = particle.create(width / 2, height / 2, 0, 0)
  let planet = particle.create(width / 2 + 200, height / 2, 2, Math.PI / 2)
  sun.mass = 700;

  render()

  function render() {

    context.clearRect(0, 0, width, height)
    planet.gravitateTo(sun)
    planet.update()

    context.beginPath()
    context.fillStyle = "rgb(255,255,0)"
    context.arc(sun.position.getX(), sun.position.getY(), 50, 0, Math.PI * 2, false)
    context.fill()

    context.beginPath()
    context.fillStyle = "rgb(255,0,255)"
    context.arc(planet.position.getX(), planet.position.getY(), 10, 0, Math.PI * 2, false)
    context.fill()


    requestAnimationFrame(render)
  }

}
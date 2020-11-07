const particle = {
  position: null,
  velocity: null,
  mass: 1,
  radius: 1,
  color: "rgb(0,0,0)",
  friction: 1,
  gravity: null,
  bounce: null,
  create: function (x, y, speed, direction, gravity = 0) {
    let obj = Object.create(this)
    obj.position = vector.create(x, y)
    obj.velocity = vector.create(0, 0)
    obj.velocity.setLength(speed)
    obj.velocity.setAngle(direction)
    this.gravity = vector.create(0, gravity)
    return obj
  },
  accelerate: function (acc) {
    this.velocity.addTo(acc)
  },
  update: function () {
    this.velocity.multiplyBy(this.friction)
    this.velocity.addTo(this.gravity)
    this.position.addTo(this.velocity)
  },

  angleTo: function (p2) {
    return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX())
  },

  distanceTo: function (p2) {
    dx = p2.position.getX() - this.position.getX()
    dy = p2.position.getY() - this.position.getY()

    return Math.sqrt(dx * dx + dy * dy)
  },

  gravitateTo: function (p2) {

    let gravity = vector.create(0, 0)
    let distance = this.distanceTo(p2)
    gravity.setLength(p2.mass / (distance * distance))
    gravity.setAngle(this.angleTo(p2))

    this.velocity.addTo(gravity)

  },

  repelFrom: function (p2) {
    let repulsion = vector.create(0, 0)
    let distance = this.distanceTo(p2)
    repulsion.setLength(p2.mass / (distance * distance))
    repulsion.setAngle(this.angleTo(p2) + Math.PI)

    this.accelerate(repulsion)
  }
}
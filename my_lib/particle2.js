const particle = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  mass: 1,
  radius: 1,
  gravity: 0,
  friction: 1,

  create: function (x, y, speed, direction, gravity = 0) {
    let obj = Object.create(this)
    obj.x = x
    obj.y = y
    obj.vx = Math.cos(direction) * speed
    obj.vy = Math.sin(direction) * speed
    obj.gravity = gravity
    return obj
  },

  accelerate: function (ax, ay) {
    this.vx += ax
    this.vy += ay
  },

  update: function () {
    //friction
    this.vx *= this.friction
    this.vy *= this.friction

    //add gravity
    this.vy += this.gravity

    //update position
    this.x += this.vx
    this.y += this.vy
  },

  angleTo: function (p2) {
    return Math.atan2(p2.y - this.y, p2.x - this.x)
  },

  distanceTo: function (p2) {
    let dx = p2.x - this.x
    let dy = p2.y - this.y
    return Math.sqrt(dx * dx + dy * dy)
  },

  gravitateTo: function (p2) {
    let dx = p2.x - this.x
    let dy = p2.y - this.y
    let distanceSQ = dx * dx + dy * dy
    let distance = Math.sqrt(distanceSQ)
    let force = this.mass / (distanceSQ)
    let ax = dx / distance * force
    let ay = dy / distance * force

    this.vx += ax
    this.vy += ay
  },

  repelFrom: function (p2) {
    let dx = this.x - p2.x,
      dy = this.y = p2.y,
      distanceSQ = dx * dx + dy * dy,
      distance = Math.sqrt(distanceSQ),
      force = this.mass / distanceSQ,
      ax = dx / distance * force,
      ay = dy / distance * force

    this.vx += ax
    this.vy += ay
  }
}
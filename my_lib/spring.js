const spring = {
  k: 0.1,
  baseLength: 10,
  springLength: 10,
  element1: null,
  element2: null,
  isP1Spring: true,
  isP2Spring: true,
  //springForce: null,
  context: null,
  create: function (p1, p2, k, length, context, isP1Spring = true, isP2Spring = true) {
    let obj = Object.create(this)
    obj.context = context
    obj.element1 = p1
    obj.element2 = p2
    obj.isP1Spring = isP1Spring
    obj.isP2Spring = isP2Spring
    obj.k = k
    obj.baseLength = length
    obj.springLength = length
    return obj
  },

  getSpringLength: function () {
    return this.springLength
  },

  update: function () {
    let extension = this.element2.position.subtract(this.element1.position)
    //console.log("hello")
    this.springLength = extension.getLength()
    extension.setLength(extension.getLength() - this.baseLength)
    let springForce = extension.multiply(this.k)

    if (this.isP1Spring) this.element1.velocity.addTo(springForce)
    if (this.isP2Spring) this.element2.velocity.subtractBy(springForce)
    //this.drawSpring()
  },


  drawSpring: function () {

    this.context.beginPath()
    this.context.strokeStyle = "#000"
    if (this.springLength > 50)
      this.context.strokeStyle = 'rgb(255,0,0)'
    this.context.moveTo(this.element1.position.getX(), this.element1.position.getY())
    this.context.lineTo(this.element2.position.getX(), this.element2.position.getY())

    this.context.stroke()
    //this.context.fillStyle = "#000"
    //console.log("hello")
  },

  unlink: function () {
    this.element1 = null
    this.element2 = null
  }

}
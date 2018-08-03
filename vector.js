class Vector {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.length = this.magnitude(x,y);
    console.log(this);
  }

  magnitude(...args){
    let sum = 0;
    for(let i = 0; i < args.length; i++){
      sum = sum + Math.pow(args[i],2);
    }
    return Math.sqrt(sum);
  }

  projectionX(theta){
    return this.length*Math.cos(theta);
  }

  projectionY(theta){
    return this.length*Math.sin(theta);
  }

  convertToRadians(theta){
    return theta * Math.PI/180;
  }
}
//for testing
window.Vector = Vector;

export default Vector;
/*
if I have distance to hinge point & angle can calculate rest of points
B is hinge -> have distance to that
angle > 0
Ax = Bvector - width*cos(theta)
Ay = width*sin(theta)

Cx = B vector - diagonal*cos(theta)
Cy = diagonal*sin(theta)

Dx = Bvector + depth*cos(theta)
Dy = depth * sin(theta)

if angle < 0
A is hinge -> have distance to that
Bx = Avector + width*cos(theta)
By = width*sin(theta)

Cx = Avector - depth*cos(theta)
Cy = depth*sin(theta)

Dx = Avector + diagonal*cos(theta)
DY = diagonal * sin(theta)

diagonal = sqrt(depth^2+width^2)

convert to new coordinate system
B is hinge

axisBX = x asis off by theta - origin samw
axisBY same story


*/

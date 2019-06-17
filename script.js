Number.prototype.toRad = function () {
    const PI = 180;
    return this / 180;

}
Number.prototype.toTrignometryCord = function (func, deg) {
    if (func == 'sin')
        return (this * Math.sin(Math.PI * (deg).toRad()))
    else if (func == 'cos')
        return (this * Math.cos(Math.PI * (deg).toRad()))
}

Array.prototype.lesser = function (arr) {
    const temp = this.filter((elem, id) => {
        return elem < arr[id]
    })
    return temp.length == 0
}

CanvasRenderingContext2D.prototype.quadraticCurveReturnPoints = function (p, w, h, x0, y0, proc) {
    const points = [];

    for (let i = 0; i <= proc; i++) {
        let t = i / 100;
        let x = (1 - t) * (1 - t) * p[0].x + 2 * (1 - t) * t * p[1].x + t * t * p[2].x;
        let y = (1 - t) * (1 - t) * p[0].y + 2 * (1 - t) * t * p[1].y + t * t * p[2].y;
        //this.clearRect(0,0,w,h);
        this.lineTo(x0 + x, y0 - y);
        this.stroke();
        points.push({
            x: x,
            y: y
        })
    }


    return points;
}
class Web {
    constructor(w = 400, h = 400, everyDeg = 30, curve = 50, X0 = 0, Y0 = 0) {

        this.tempX = [];
        this.tempY = [];
        this.endX = [];
        this.endX = [];
        this.endY = [];
        this.branchCords = [];
        this.width = w;
        this.height = h;
        this.x = document.createElement('canvas');
        this.ctx = this.x.getContext('2d');
        this.x.style.position='absolute';
        this.everyDeg = everyDeg;
        this.curve = curve;
        this.X0 = X0;
        this.Y0 = Y0;
        this.X = this.width / 2;
        this.Y = this.height / 2;
        this.animationFrame = 0;
        this.rand1 = (Math.random() - 0.5) * curve;
        this.rand2 = (Math.random() - 0.5) * curve;
        this.requestAnimation;
        this.x.width = w+(this.X0);
        this.x.height = h+(this.Y0);

    }
    create() {
        let animationFrame;
        let procent = 0;
        const points = [];
        let myInterval = setInterval(() => {
            for (let deg = 0; deg < 360; deg += this.everyDeg) {
                const cord1 = (this.X).toTrignometryCord('cos', deg);
                const cord2 = (this.Y).toTrignometryCord('sin', deg)
                const p = [{
                    x: 0,
                    y: 0
                }, {
                    x: cord1 / 2 + this.rand1,
                    y: cord2 / 2 + this.rand2
                }, {
                    x: cord1,
                    y: cord2
                }];
                //this.ctx.clearRect(0,0,400,400);
                if (procent < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle='black';

                    this.ctx.moveTo(this.X + this.X0, this.Y + this.Y0)
                    this.ctx.quadraticCurveReturnPoints(p, this.width, this.height, this.X0 + this.X, this.Y0 + this.Y, procent)
                } else {
                    this.ctx.beginPath();

                    const allPoints = this.ctx.quadraticCurveReturnPoints(p, this.width, this.height, this.X0 + this.X, this.Y0 + this.Y, 100);
                    const myPoints = allPoints.filter((elem, id) => id % 10 == 0);
                    points.push(myPoints)
                }


            }
            procent++;
            if (procent == 101) {

              


                let id = 0;
                let secondInterval = setInterval(() => {

                    for (let i = 0; i < points[id].length; i++) {

                        const c1 = {
                            x: this.X + this.X0 + points[id][i].x,
                            y: this.Y + this.Y0 - points[id][i].y
                        }
                        const c2 = {
                            x: this.X + this.X0 + points[id + 1][i].x,
                            y: this.Y + this.Y0 - points[id + 1][i].y
                        }
                        //this.ctx.beginPath();
                        this.ctx.moveTo(c1.x, c1.y);
                        this.ctx.lineTo(c2.x, c2.y);

                        this.ctx.stroke();


                    }
                    if (id == points.length - 2){
                        clearInterval(secondInterval)
                    }
                    id++;
                }, 50);


                for (let i = 0; i < points[points.length - 1].length; i++) {
                    const c1 = {
                        x: this.X + this.X0 + points[points.length - 1][i].x,
                        y: this.Y + this.Y0 - points[points.length - 1][i].y
                    }
                    const c2 = {
                        x: this.X + this.X0 + points[0][i].x,
                        y: this.Y + this.Y0 - points[0][i].y
                    }
                   // this.ctx.beginPath();
                    this.ctx.moveTo(c1.x, c1.y);
                    this.ctx.lineTo(c2.x, c2.y);
                    this.ctx.stroke();
                  
                }


                clearInterval(myInterval);

            }
        }, 20);


        return this.x
    }

}
const start = ()=>{
    const width = (Math.random()*400)+100;
    const height = (Math.random()*(width/2))+(width/2);
    const degers = Math.floor(Math.random()*80)+10;
    const curve = Math.random()*width;
    const x0 = Math.random()*(width/2);
    const y0 = Math.random()*(height/2);

    document.body.appendChild(new Web(width, height, degers, curve, x0, y0).create());
}

start();

const draw = (s) => {
    const { windowHeight, windowWidth } = s
    const innerRectSide = 590;
    const cellCount = 1
    const rowCount = 1
    const grid = [];
    const cellSide = innerRectSide / cellCount;
    const startPoint = cellSide + 50;

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
        for (let colIndex = 0; colIndex < cellCount; colIndex += 1) {
            grid.push({
                x: startPoint + colIndex * cellSide,
                y: startPoint + rowIndex * cellSide,
            });
        }
    }

    function drawGradientLine(x1, y1, x2, y2, c1, c2) {

        const length = s.floor(Math.sqrt(
            (x2-x1)*(x2-x1)
            + (y2-y1)*(y2-y1))); 
        s.stroke(c1);

        s.translate(x1, y1); 
        const degree = -1 * s.atan2(x2-x1, y2-y1); 
        s.rotate(degree);
        
        
        Array(length).fill(0).forEach((v,i) => {
            s.stroke(s.lerpColor(s.color(c1), s.color(c2), i/length));
            s.point(0, i); 
        });

        s.rotate(-1* degree); 
        s.translate(-1 * x1, -1* y1);         
    }

    s.setup = () => {
        s.createCanvas(windowWidth, windowHeight);
        s.background('#000000');
        
        
        s.noStroke();
    };

    let startColor = 0;
    let endColor = 255;
    let multiplier = 1;

    s.draw = () => {
        s.clear();
        s.background('#000000');

        for (let index = 0; index < 10; index++) {
            drawGradientLine(
                (index + 1) * 100,
                100,
                (index + 1) * 100,
                800,
                startColor,
                endColor
            );  
        }

        startColor = startColor + (5 * multiplier);
        endColor = endColor - (5 * multiplier);

        if (startColor >= 255 && endColor <= 0) {
            multiplier = -1;
        }
        
        if(startColor >= 0 && endColor <= 255) {
            multiplier = 1;
        }
    };
}

new p5(draw);
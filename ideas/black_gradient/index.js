
const draw = (s) => {
    const { windowHeight, windowWidth } = s
    const innerRectSide = windowWidth;
    const cellCount = 20
    const rowCount = 20
    const grid = [];
    const cellSide = 50;
    const startPoint = 100

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
        for (let colIndex = 0; colIndex < cellCount; colIndex += 1) {
            grid.push({
                x: startPoint + colIndex * cellSide,
                y: startPoint + rowIndex * cellSide,
            });
        }
    }

    function drawGradientLine(x1, y1, x2, y2, c1, c2) {
        const length = s.floor(Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))); 

        s.translate(x1, y1); 
        const degree = -1 * s.atan2(x2-x1, y2-y1); 
        s.rotate(degree);

        Array(length).fill(0).forEach((v,i) => {
            s.fill(
                s.lerpColor(s.color(c1), s.color(c2), i / length)
            );
            s.rect(0, i, 1, 1);
        });

        s.rotate(-1* degree); 
        s.translate(-1 * x1, -1* y1);         
    }

    let startColor = 0;
    let endColor;
    let colorStep = 255 / rowCount;
    let multiplier = 1;

    s.setup = () => {
        s.createCanvas(windowWidth, windowHeight);
        s.background('#000000');

        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            startColor = startColor + (rowIndex * multiplier);
            endColor = startColor + (colorStep * rowIndex + 1);

            for (let colIndex = 0; colIndex < cellCount; colIndex++) {
                s.noStroke();
                const x = grid[rowIndex * cellCount + colIndex].x;
                const y = grid[rowIndex * cellCount + colIndex].y;
                const halfWidth = cellSide / 2;

                const figureSide = s.random([
                    colIndex % 2 === 0 ? halfWidth : cellSide,
                    rowIndex % 2 === 0 ? halfWidth : cellSide
                ]);

                for (let gradientLine = 0; gradientLine < figureSide; gradientLine++) {


                    // if (colIndex === 0) {
                        drawGradientLine(
                            x + gradientLine,
                            y,
                            x + gradientLine,
                            y + figureSide,
                            s.color(255, 255, 255, startColor),
                            s.color(255, 255, 255, endColor),
                        ); 
                    // }
    
                    // if (colIndex === cellCount - 1) {
                        // drawGradientLine(
                        //     x + figureSide,
                        //     y,
                        //     x + figureSide,
                        //     y + figureSide,
                        //     s.color(255, 255, 255, startColor),
                        //     s.color(255, 255, 255, endColor),
                        // );  
                    
                }


                // drawGradientLine(
                //     x,
                //     y,
                //     x + figureSide,
                //     y + figureSide,
                //     s.color(255, 255, 255, startColor),
                //     s.color(255, 255, 255, endColor),
                // ); 
                
                // drawGradientLine(
                //     x + figureSide,
                //     y,
                //     x,
                //     y + figureSide,
                //     s.color(255, 255, 255, startColor),
                //     s.color(255, 255, 255, endColor),
                // ); 

                // if (colIndex === 0) {
                    // drawGradientLine(
                    //     x,
                    //     y,
                    //     x,
                    //     y + figureSide,
                    //     s.color(255, 255, 255, startColor),
                    //     s.color(255, 255, 255, endColor),
                    // ); 
                // }

                // if (colIndex === cellCount - 1) {
                    // drawGradientLine(
                    //     x + figureSide,
                    //     y,
                    //     x + figureSide,
                    //     y + figureSide,
                    //     s.color(255, 255, 255, startColor),
                    //     s.color(255, 255, 255, endColor),
                    // );  
                // }

                // if (rowIndex === rowCount - 1) {
                    // s.stroke(startColor);
                    // s.line(
                    //     x,
                    //     y ,
                    //     x + figureSide,
                    //     y
                    // );

                    // s.stroke(endColor);
                    // s.line(
                    //     x,
                    //     y + figureSide,
                    //     x + figureSide,
                    //     y + figureSide
                    // );
                // }
            } 

            startColor = endColor
        }
    };
}

new p5(draw);


const draw = (sketch) => {
    const { windowWidth, windowHeight } = sketch;

    const colors = [
      '#FF6F61',
      '#EE6D8A',
      '#D5D717',
      '#7E5E9A',
      '#98DDDF'
    ];

    function polygon(x, y, radius, npoints) {
        let angle = sketch.TWO_PI / npoints;
        sketch.beginShape();
        for (let a = 0; a < sketch.TWO_PI; a += angle) {
          let sx = x + sketch.cos(a) * radius;
          let sy = y + sketch.sin(a) * radius;
          sketch.vertex(sx, sy);
        }
        sketch.endShape(sketch.CLOSE);
      }

      function shapeFilled(x, y, radius) {
        sketch.fill(sketch.random(colors));
        polygon(
            x,
            y,
            radius,
            6
        ); 
      }

      function strokedShaped(x, y, radius) {
        sketch.fill(0, 0, 0, 0);

        sketch.stroke(sketch.random(colors));
        polygon(
            x,
            y,
            radius,
            6
        ); 
      }

      function strokedDouble(x, y, radius) {
;

        sketch.fill(0, 0, 0, 0);


        sketch.stroke(sketch.random(colors));
        polygon(
            x,
            y,
            radius,
            6
        ); 

        sketch.fill(0, 0, 0, 0);
        sketch.stroke(sketch.random(colors));
        polygon(
            x,
            y,
            radius * 0.8,
            6
        ); 
      }

      const poly_types = [
        shapeFilled,
        strokedShaped,
        strokedDouble
      ]


    const innerRectSide = 640;
    const cellCount = 4
    const rowCount = 7
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

    // console.log(cellSide, cellSide, )

    sketch.setup = () => {
        sketch.createCanvas(windowWidth, windowHeight);
        sketch.background('#007CB8');
        sketch.noStroke();

        for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
          const colIndex = Math.round(sketch.random(cellCount - 1));
          const x = grid[rowIndex * cellCount + colIndex].x;
          const y = grid[rowIndex * cellCount + colIndex].y;
          const halfWidth = cellSide / 2;

          poly_types[Math.round(sketch.random(0, poly_types.length - 1))](x, y, cellSide)
            // for (let colIndex = 0; colIndex < cellCount; colIndex += 1) {
            //   const x = grid[rowIndex * cellCount + colIndex].x;
            //   const y = grid[rowIndex * cellCount + colIndex].y;
            //   const halfWidth = cellSide / 2;
    
            //   poly_types[Math.round(sketch.random(0, poly_types.length - 1))](x, y, halfWidth * 0.8)
            // }
        }
    };
}

let myp5 = new p5(draw);

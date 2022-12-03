// Todo's:
// Create a template for the nodes
// Create a Adjacency Matrix with it
// Create user options, 
// - Allow user to input the source node,
// - Allow user to input the end node,
// Draw the graph in the canvas and perform specific animation
// Mobile responsiveness 
// Allow the page to be available in the internet

// Width - 1000, Height - 600
const vertices = [
  ["N0", "500", "300"],
  ["N1", "400", "200"],
  ["N2", "100", "150"],
  ["N3", "230", "300"],
  ["N4", "50", "400"],
  ["N5", "400", "400"],
  ["N6", "600", "100"],
  ["N7", "300", "70"],
  ["N8", "170", "520"],
  ["N9", "350", "550"],
  ["N10", "540", "530"],
  ["N11", "900", "70"],
  ["N12", "800", "170"],
  ["N13", "670", "270"],
  ["N14", "670", "430"],
  ["N15", "920", "500"],
  ["N16", "770", "530"],
  ["N17", "880", "330"],
]

const adjacencyMatrix = [
  // 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 0
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 1
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 2
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 3
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 4
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 5
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 6
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 7
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 8
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 9
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 10
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 11
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 12
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 13
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 14
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 15
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 16
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 17
]

function setup() {
  createCanvas(1000, 600);
  background("#1e1e1e");
}

let interval = 0;
function draw() {
  noLoop();

  for (let rows = 0; rows < vertices.length; rows++) {
    const n = vertices[rows][0];
    const x = vertices[rows][1];
    const y = vertices[rows][2];
    drawNode(n, x, y);
  }

  for (let rows = 0; rows < vertices.length; rows++) {
    for (let cols = 0; cols < vertices.length; cols++) {
      let x1 = vertices[rows][1]
      let y1 = vertices[rows][2]
      let x2 = vertices[cols][1]
      let y2 = vertices[cols][2]
      drawLine(x1, y1, x2, y2, 'white', ++interval)
      // line(x1, y1, x2, y2)
    }
  }
}

function drawLine(x1, y1, x2, y2, color, interval) {
  setTimeout(() => {
    let angle = 0;
    const animate = setInterval(() => {
      let tempX = map(angle, 0, 100, x1, x2, 1);
      let tempY = map(angle, 0, 100, y1, y2, 1);


      angle += 0.3;
      if (tempX == x2 && tempY == y2) {
        clearInterval(animate);
      }

      stroke(color);
      strokeWeight(2);
      line(x1, y1, tempX, tempY);
    }, 0.3);
  }, 1000 * interval)
}
// let interval = 0;
// for (let rows = 0; rows < adjacencyMatrix.length; rows++) {
//   for (let cols = 0; cols < adjacencyMatrix.length; cols++) {
//     if (adjacencyMatrix[rows][cols] == 1) {
//       const x1 = vertices[rows][1]
//       const y1 = vertices[rows][2]
//       const x2 = vertices[cols][1];
//       const y2 = vertices[cols][2];
//       // console.log("x1: " + x1)
//       // console.log("y1: " + y1)
//       // console.log("x2: " + x2)
//       // console.log("y2: " + y2)
//       // drawLine(x1, y1, x2, y2, 'white', ++interval);
//       // animateLine(x1, y1, x2, y2, "N1", "N17", ++interval, "white")
//       // line(x1, y1, x2, y2)
//     }
//   }
// }

function drawNode(n, x, y) {
  circle(x, y, 50)
  textAlign(CENTER, CENTER)
  textStyle(BOLD)
  textSize(15)
  text(n, x, y)
}

// function animateLine(x1, y1, x2, y2, text1, text2, interval, color) {
//   // let vertices = graph.vertices;
//   setTimeout(() => {
//     let angle = 0;
//     const animate = setInterval(() => {
//       let tempX = map(angle, 0, 100, x1, x2, 1);
//       let tempY = map(angle, 0, 100, y1, y2, 1);
//       stroke(color);
//       strokeWeight(2);

//       angle += 0.3;
//       if (tempX == x2 && tempY == y2)
//         clearInterval(animate);

//       line(x1, y1, tempX, tempY);

//       // strokeWeight(1);
//       // circle(x1, y1, 50)
//       // circle(x2, y2, 50)

//       // text(vertices[text1][0], vertices[text1][1], vertices[text1][2])
//       // text(vertices[text2][0], vertices[text2][1], vertices[text2][2])
//       // textStyle(BOLD)
//     }, 0.2);
//   }, 1000 * interval)
// }

// function dijsktra(vertices, graph) {
//   const V = vertices.length;
//   let dist = new Array(V);
//   let sptSet = new Array(V);

//   for (let i = 0; i < V; i++) {
//     dist[i] = Number.MAX_VALUE;
//     sptSet[i] = false;
//   }

//   dist[0] = 0;
//   let interval = 0; // Doesn't do with the algorithm, for animating the line only.
//   for (let count = 0; count < V - 1; count++) {
//     let min = Number.MAX_VALUE;
//     let min_index = -1;

//     for (let v = 0; v < V; v++) {
//       if (sptSet[v] == false && dist[v] <= min) {
//         min = dist[v];
//         min_index = v;
//       }
//     }

//     sptSet[min_index] = true;
//     for (let v = 0; v < V; v++) {
//       if (!sptSet[v] && graph[min_index][v] != 0 && dist[min_index] != Number.MAX_VALUE && dist[min_index] + graph[min_index][v] < dist[v]) {
//         animateLine(vertices[count][1], vertices[count][2], vertices[v][1], vertices[v][2], count, v, ++interval - .50, 'white');
//         dist[v] = dist[min_index] + graph[min_index][v];
//         animateLine(vertices[min_index][1], vertices[min_index][2], vertices[v][1], vertices[v][2], min_index, v, ++interval * V, 'red')
//       }
//     }
//   }
// }
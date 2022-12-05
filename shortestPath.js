function setup() {
  createCanvas(1000, 600); // Width - 1000, Height - 600
  background("#1e1e1e");
}

function draw() {
  noLoop();

  for (let rows = 0; rows < vertices.length; rows++) {
    const n = vertices[rows][0];
    const x = vertices[rows][1];
    const y = vertices[rows][2];
    drawNode(n, x, y);
  }

  console.log("Weighted Adjacency Matrix: ")
  console.table(adjacencyMatrix)
  dijsktra(vertices, adjacencyMatrix, 0, 17);
}

const vertices = [
  ["N0", 500, 300], ["N1", 400, 200], ["N2", 100, 150],
  ["N3", 230, 300], ["N4", 50, 400], ["N5", 400, 400],
  ["N6", 600, 100], ["N7", 300, 70], ["N8", 170, 520],
  ["N9", 350, 550], ["N10", 540, 530], ["N11", 900, 70],
  ["N12", 800, 170], ["N13", 670, 270], ["N14", 670, 430],
  ["N15", 920, 500], ["N16", 770, 530], ["N17", 880, 330],
]

let adjacencyMatrix = [
  [0, 141.42, 0, 0, 0, 141.42, 0, 0, 0, 0, 0, 0, 0, 172.63, 0, 0, 0, 0,],
  [141.42, 0, 0, 197.23, 0, 0, 223.61, 164.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 254.95, 0, 0, 215.41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 197.23, 0, 0, 205.91, 197.23, 0, 0, 228.04, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 254.95, 205.91, 0, 0, 0, 0, 169.71, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [141.42, 0, 0, 197.23, 0, 0, 0, 0, 0, 158.11, 191.05, 0, 0, 0, 271.66, 0, 0, 0,],
  [0, 223.61, 0, 0, 0, 0, 0, 301.5, 0, 0, 0, 301.5, 211.9, 0, 0, 0, 0, 0,],
  [0, 164.01, 215.41, 0, 0, 0, 301.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 228.04, 169.71, 0, 0, 0, 0, 182.48, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 158.11, 0, 0, 182.48, 0, 191.05, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 191.05, 0, 0, 0, 191.05, 0, 0, 0, 0, 0, 0, 230, 0,],
  [0, 0, 0, 0, 0, 0, 301.5, 0, 0, 0, 0, 0, 141.42, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 211.9, 0, 0, 0, 0, 141.42, 0, 164.01, 0, 0, 0, 178.89,],
  [172.63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 164.01, 0, 160, 0, 0, 218.4,],
  [0, 0, 0, 0, 0, 271.66, 0, 0, 0, 0, 0, 0, 0, 160, 0, 0, 141.42, 232.59,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 152.97, 174.64,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 230, 0, 0, 0, 141.42, 152.97, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 178.89, 218.4, 232.59, 174.64, 0, 0,],
]


// Animate adjacency matrix
document.querySelector('#adjacencyMatrix').addEventListener('click', () => {
  animateGraph();

  // Find shortestPath using dijsktra's
  document.querySelector("#findShortestPath").addEventListener('click', () => {
    dijsktra(vertices, adjacencyMatrix)
  });
})


function animateGraph() {
  let interval = 0;
  let isVisited = new Array(adjacencyMatrix.length);
  for (let row = 0; row < adjacencyMatrix.length; row++) {
    isVisited[row] = new Array(adjacencyMatrix.length);
    for (let col = 0; col < adjacencyMatrix.length; col++)
      isVisited[row][col] = false;
  }

  for (let rows = 0; rows < adjacencyMatrix.length; rows++) {
    for (let cols = 0; cols < adjacencyMatrix.length; cols++) {
      if (adjacencyMatrix[rows][cols] != 0 && isVisited[rows][cols] == false) {
        // Node 1 details
        let n1 = vertices[rows][0];
        let x1 = vertices[rows][1];
        let y1 = vertices[rows][2];

        // Node 2 details
        let n2 = vertices[cols][0];
        let x2 = vertices[cols][1];
        let y2 = vertices[cols][2];
        // Function that draws the line
        drawLine(x1, y1, x2, y2, 'white', ++interval, n1, n2)

        adjacencyMatrix[cols][rows] = 1;
        isVisited[cols][rows] = true;
      }
    }
  }

  for (let rows = 0; rows < adjacencyMatrix.length; rows++) {
    for (let cols = 0; cols < adjacencyMatrix.length; cols++) {
      if (adjacencyMatrix[rows][cols] != 0) {
        let x1 = vertices[rows][1];
        let y1 = vertices[rows][2];
        let x2 = vertices[cols][1];
        let y2 = vertices[cols][2];

        let weightedDistance = dist(x1, y1, x2, y2)
        weightedDistance = parseFloat(weightedDistance.toFixed(2));
        adjacencyMatrix[rows][cols] = weightedDistance;
      }
    }
  }
}

function drawNode(n, x, y) {
  stroke('black')
  circle(x, y, 50)
  textAlign(CENTER, CENTER)
  textStyle(BOLD)
  textSize(15)
  text(n, x, y)
}

function drawLine(x1, y1, x2, y2, color, interval, n1, n2) {
  setTimeout(() => {
    let angle = 0;
    const animate = setInterval(() => {
      let tempX = map(angle, 0, 100, x1, x2, 1);
      let tempY = map(angle, 0, 100, y1, y2, 1);

      angle += 0.3;
      if (tempX == x2 && tempY == y2)
        clearInterval(animate);

      stroke(color);
      strokeWeight(1);
      line(x1, y1, tempX, tempY);

      drawNode(n1, x1, y1)
      drawNode(n2, x2, y2)
    }, 0.3);
  }, 1000 * interval)
}

function dijsktra(vertices, graph, start, end) {
  let interval = 0; // Doesn't do with the algorithm, for animating the line only.

  const V = vertices.length;
  let dist = new Array(V);
  let sptSet = new Array(V);
  let parents = new Array(V);

  for (let i = 0; i < V; i++) {
    dist[i] = Number.MAX_VALUE;
    sptSet[i] = false;
  }

  dist[start] = 0;
  parents[start] = -1;

  for (let count = 0; count < V - 1; count++) {
    let min = Number.MAX_VALUE;
    let min_index = -1;
    for (let v = 0; v < V; v++) {
      if (sptSet[v] == false && dist[v] <= min) {
        min = dist[v];
        min_index = v;
      }
    }

    sptSet[min_index] = true;
    for (let v = 0; v < V; v++) {
      if (!sptSet[v] && graph[min_index][v] != 0 &&
        dist[min_index] != Number.MAX_VALUE &&
        (dist[min_index] + graph[min_index][v]) < dist[v]) {
        dist[v] = dist[min_index] + graph[min_index][v];
        // Start backtracking here
        parents[v] = min_index; 
        
      }
    }
  }

  let currentTrack = 11;
  let tractDist = [];
  if (vertex != start) {
    while(true) {
      tractDist.push(currentTrack);
      currentTrack = parents[currentTrack];
  
      if (currentTrack == -1)
        break;
    }

    console.log(tractDist)
    for (let vertex = tractDist.length - 1; vertex >= 1; vertex--) {
      let trace = vertex;
      let vertex1 = tractDist[trace];
      let vertex2 = tractDist[--trace];

      const n1 = vertices[vertex1][0];
      const x1 = vertices[vertex1][1];
      const y1 = vertices[vertex1][2];

      const n2 = vertices[vertex2][0];
      const x2 = vertices[vertex2][1];
      const y2 = vertices[vertex2][2];

      drawLine(x1, y1, x2, y2, 'red', ++interval, n1, n2);  
    }
  }
}
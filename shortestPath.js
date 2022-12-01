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
  [ "N0", "500", "300" ],
  [ "N1", "400", "200" ],
  [ "N2", "100", "150" ],
  [ "N3", "230", "300" ],
  [ "N4", "50", "400" ],
  [ "N5", "400", "400" ],
  [ "N6", "600", "100" ],
  [ "N7", "300", "70" ],
  [ "N8", "170", "520" ],
  [ "N9", "350", "550" ],
  [ "N10", "540", "530" ],
  [ "N11", "900", "70" ],
  [ "N12", "800", "170" ],
  [ "N13", "670", "270" ],
  [ "N14", "670", "430" ],
  [ "N15", "920", "500" ],
  [ "N16", "770", "530" ],
  [ "N17", "880", "330" ],
]
function setup() {
  createCanvas(1000, 600);
  background("#1e1e1e");
}

function draw() {
  for (let rows = 0; rows < vertices.length; rows++) {
    const n = vertices[rows][0];
    const x = vertices[rows][1];
    const y = vertices[rows][2]; 
    drawNode(n, x, y);
  }

  const n1 = 0;
  const n2 = 5
  const x1 = vertices[n1][1];
  const y1 = vertices[n1][2];
  const x2 = vertices[n2][1];
  const y2 = vertices[n2][2];

  for (let vertex = 0; vertex < vertices.length; vertex++) {
    if (adjacencyMatrix[vertex][1] == 0 && adjacencyMatrix[vertex][2] == 0)
      return;
    drawLine(x1, y1, adjacencyMatrix[vertex][1], adjacencyMatrix[vertex][2])
  }


let adjacencyMatrix = "[\n"
adjacencyMatrix = vertices.map((cols, index) => {
    let table = [];
    for (let row = 0; row < vertices.length; row++) {
      let x1 = cols[1];
      let y1 = cols[2];
      let x2 = vertices[row][1];
      let y2 = vertices[row][2]; 
      // drawLine(x1, y1, x2, y2) 
      table.push(dist(cols[1], cols[2], vertices[row][1], vertices[row][2]));
    }
    return table;
  });
  adjacencyMatrix+= "\n]";
console.table(adjacencyMatrix);
  
  noLoop();
}

function drawLine(x1, y1, x2, y2) {
  strokeWeight(2);
  stroke('white') 
  line(x1, y1, x2, y2)
}

function drawNode(n, x, y) {
  circle(x, y, 50)
  textAlign(CENTER, CENTER)
  textStyle(BOLD)
  textSize(15)
  text(n, x, y)
}

function animateLine(x1, y1, x2, y2, text1, text2, interval, color) {
  let vertices = graph.vertices;
  setTimeout(() => {
    let angle = 0;
    const animate = setInterval(() => {
      let tempX = map(angle, 0, 100, x1, x2, 1);
      let tempY = map(angle, 0, 100, y1, y2, 1);
      stroke(color);  
      strokeWeight(2);

      angle += 0.3;
      if (tempX == x2 && tempY == y2)
        clearInterval(animate);

      line(x1, y1, tempX, tempY);

      strokeWeight(1);
      circle(x1, y1, 50)
      circle(x2, y2, 50)

      text(vertices[text1][0], vertices[text1][1], vertices[text1][2])
      text(vertices[text2][0], vertices[text2][1], vertices[text2][2])
      textStyle(BOLD)
    }, 0.2);
  }, 1000 * interval)
}

function dijsktra(vertices, graph) { 
  const V = vertices.length;
  let dist = new Array(V);
  let sptSet = new Array(V);

  for(let i = 0; i < V; i++) {
    dist[i] = Number.MAX_VALUE;
    sptSet[i] = false;
  }

  dist[0] = 0;
  let interval = 0; // Doesn't do with the algorithm, for animating the line only.
  for(let count = 0; count < V - 1; count++) {
    let min = Number.MAX_VALUE;
    let min_index = -1;

    for(let v = 0; v < V; v++) {
      animateLine(vertices[count][1], vertices[count][2], vertices[v][1], vertices[v][2], count, v, ++interval - .50, 'white');
      if (sptSet[v] == false && dist[v] <= min) {
        min = dist[v];
        min_index = v;
      }
    }

    sptSet[min_index] = true;
    for(let v = 0; v < V; v++) {
      if (!sptSet[v] && graph[min_index][v] != 0 && dist[min_index] != Number.MAX_VALUE &&
        dist[min_index] + graph[min_index][v] < dist[v]) {
        dist[v] = dist[min_index] + graph[min_index][v];
        animateLine(vertices[min_index][1], vertices[min_index][2], vertices[v][1], vertices[v][2], min_index, v, ++interval * V, 'red')  
      }
    }
  }
}

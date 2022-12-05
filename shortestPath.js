<<<<<<< HEAD
=======
let graph = {
  vertices: [],
  adjacencyMatrix: [],
}

>>>>>>> main
function setup() {
  createCanvas(1000, 600); // Width = 1000, Height = 600
  background("#1e1e1e");
}

function draw() {
  const { vertices, adjacencyMatrix } = generateGraph(5);
  graph.vertices = vertices;
  graph.adjacencyMatrix = adjacencyMatrix;
  console.table(adjacencyMatrix);
  noLoop();
}

// Randomize the graph 
document.querySelector("#random").addEventListener('click', () => {
  resetGraph();
  const numberOfNodes = document.querySelector('input[name=\'total\']').value;
  const { vertices, adjacencyMatrix } = generateGraph(numberOfNodes);
  console.table(adjacencyMatrix);
  
  graph.vertices = vertices;
  graph.adjacencyMatrix = adjacencyMatrix;
});

// A functionality where the user select the specific algoirithm to execute
const btns = document.querySelectorAll("#btns button");
btns.forEach(btn => {
  btn.addEventListener("click", algorithm => {     
    const typeOfAlgorithm = algorithm.target.textContent;
    switch (typeOfAlgorithm) {
      case "Dijsktra's Algorithm":
        dijsktra(graph.vertices, graph.adjacencyMatrix);
        break;
      case "Prim's Algorithm":
        prim(graph.vertices, graph.adjacencyMatrix);
        break;
      case "Krushkal's Algorithm":
        alert("Krushkal's Algorithm")
        break;
      default:
        alert("Invalid Input. Please try again");
        break;
    } 
  })  
})

// Generate Nodes and Adjacency Matrix
function generateGraph(numberOfNodes) { 
  const vertices = new Array(Number(numberOfNodes));
  for (let vertex = 0; vertex < vertices.length; vertex++) {
    const name = `N${vertex}`;
    const xAxis = random(1000);
    const yAxis = random(600);
    vertices[vertex] = [name, xAxis, yAxis]
  }
 
  // Render the vertices in the canvas.
  vertices.forEach(vertex => {
    circle(vertex[1], vertex[2], 60)
    textAlign(CENTER, CENTER);
    stroke(0)
    textSize(18)
    text(vertex[0], vertex[1], vertex[2])
  })  
  
  // Calculate weights for every adjacent nodes 
  // then turn it into adjacency matrix.
  const adjacencyMatrix = vertices.map((cols, index) => {
    let table = [];
    for (let row = 0; row < vertices.length; row++)
      table.push(dist(cols[1], cols[2], vertices[row][1], vertices[row][2]));
    return table;
  });
  
  return { vertices, adjacencyMatrix };
}

<<<<<<< HEAD
  // Print Adjacency Matrix
  console.log("Weighted Adjacency Matrix: ")
  console.table(adjacencyMatrix)
}

let interval = 0;
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

let isGraphAnimated = false;
// Animate adjacency matrix
document.querySelector('#adjacencyMatrix').addEventListener('click', () => {
    animateGraph(true);
})


// Find shortestPath using dijsktra's
document.querySelector("#findShortestPath").addEventListener('click', () => {
  console.log(isGraphAnimated);
  if (!isGraphAnimated) {
    window.alert("Please wait for the animation to finish or graph the weighted adjacency matrix first");
    return;
  }
  const start = document.querySelector("#start").value;
  const end = document.querySelector("#end").value;
  dijsktra(vertices, adjacencyMatrix, parseInt(start), parseInt(end));
});

// Show the shortest path from a specific node to the rest of all nodes
document.querySelector("#generateShortPathTree").addEventListener('click', () => {
  console.log(isGraphAnimated)
  if (!isGraphAnimated) {
    window.alert("Please wait for the animation to finish or graph the weighted adjacency matrix first");
    return;
  }
  const start = document.querySelector("#start").value;
  dijsktra(vertices, adjacencyMatrix, parseInt(start), -1);
})

// Dijktra's Algorithm function
function dijsktra(vertices, graph, start, end) {
  const totalNodes = vertices.length;

  let shortestDistance = new Array(totalNodes); // Used to keep track on shortest between two specific nodes
  let isVisited = new Array(totalNodes); // Used to keep track on nodes that is already visited
  let backTrackedNodes = new Array(adjacencyMatrix.length); // Used to backtrack the node/s from the given start to end.

  animateGraph(false); // Overwrite the red edges to white with no animation.
  
  for (let i = 0; i < totalNodes; i++) {
    shortestDistance[i] = Number.MAX_VALUE;
    isVisited[i] = false;
  }

  shortestDistance[start] = 0;
  backTrackedNodes[start] = -1;

  for (let count = 0; count < totalNodes - 1; count++) {
    let min = Number.MAX_VALUE;
    let min_index = -1;
    for (let v = 0; v < totalNodes; v++) {
      if (isVisited[v] == false && shortestDistance[v] <= min) {
        min = shortestDistance[v];
        min_index = v;
      }
    }

    isVisited[min_index] = true;
    for (let v = 0; v < totalNodes; v++) {
      if (!isVisited[v] && graph[min_index][v] != 0 &&
        shortestDistance[min_index] != Number.MAX_VALUE &&
        shortestDistance[min_index] + graph[min_index][v] < shortestDistance[v]) {

        shortestDistance[v] = shortestDistance[min_index] + graph[min_index][v]; // Calculate the shortest shortestDistanceance
        backTrackedNodes[v] = min_index; // Backtracking nodes 
      }
    }
  }

  // Start tracking paths and animate it
  isGraphAnimated = false;
  interval = 0;

  for (let vertex = 0; vertex < totalNodes; vertex++) {
    let trackNode = (end != -1) ? end : vertex;
    let trackedNodes = [];
    
    if (vertex == start)
      continue;
    
    while (true) {
      trackedNodes.push(trackNode);
      trackNode = backTrackedNodes[trackNode];
  
      if (trackNode == -1)
        break;
    }
  
    animateDijsktra(trackedNodes, 'red');
    
    if (end != -1)
      break;
  }
}

function animateDijsktra(backTrackArr, color) {
  for (let vertex = backTrackArr.length - 1; vertex >= 1; vertex--) { // Reverse the nodes and animate from start to end
    let trace = vertex;
    let vertex1 = backTrackArr[trace];
    let vertex2 = backTrackArr[--trace];
    // Node 1 details
    const n1 = vertices[vertex1][0];
    const x1 = vertices[vertex1][1];
    const y1 = vertices[vertex1][2];
    // Node 2 details
    const n2 = vertices[vertex2][0];
    const x2 = vertices[vertex2][1];
    const y2 = vertices[vertex2][2];
    // Animate the line
    drawLine(x1, y1, x2, y2, color, interval+=2, n1, n2, 0.3);

    if (vertex == 1) 
      setTimeout(() => isGraphAnimated = true, ++interval * 1000);
  }
}

function animateGraph(performAnimation) {
  let interval = 0;
  let speed = 100;

  // Keep track of the visited nodes
  let isVisited = new Array(adjacencyMatrix.length);
  for (let row = 0; row < adjacencyMatrix.length; row++) {
    isVisited[row] = new Array(adjacencyMatrix.length);
    for (let col = 0; col < adjacencyMatrix.length; col++)
      isVisited[row][col] = false;
  }

  for (let rows = 0; rows < adjacencyMatrix.length; rows++) {
    for (let cols = 0; cols < adjacencyMatrix.length; cols++) {
      if (adjacencyMatrix[rows][cols] != 0 && isVisited[rows][cols] == false) {
        if (performAnimation == true)
          interval+=2, speed = 0.2;

        // Node 1 details
        let n1 = vertices[rows][0];
        let x1 = vertices[rows][1];
        let y1 = vertices[rows][2];

        // Node 2 details
        let n2 = vertices[cols][0];
        let x2 = vertices[cols][1];
        let y2 = vertices[cols][2];
        
        // Function that draws the line
        drawLine(x1, y1, x2, y2, 'white', interval, n1, n2, speed)

        // If the node is already been visited, then don't animate it.
        adjacencyMatrix[cols][rows] = 1;
        isVisited[cols][rows] = true;
      }
      if (rows == adjacencyMatrix.length - 1 && cols == adjacencyMatrix.length - 1)
        setTimeout(() => isGraphAnimated = true, interval * 1000);
    }
  }
}

// Draw Node function
function drawNode(n, x, y) {
  stroke('black')
  circle(x, y, 50)
  textAlign(CENTER, CENTER)
  textStyle(BOLD)
  textSize(15)
  text(n, x, y)
}

// Draw Node function
function drawLine(x1, y1, x2, y2, color, interval, n1, n2, speed) {
  setTimeout(() => {
    let angle = 0;
    isGraphAnimated = false;
    const animate = setInterval(() => {
      let tempX = map(angle, 0, 100, x1, x2, 1);
      let tempY = map(angle, 0, 100, y1, y2, 1);

      angle += speed;
      if (tempX == x2 && tempY == y2)
        clearInterval(animate);

      stroke(color);
      strokeWeight(1);
      line(x1, y1, tempX, tempY);

      drawNode(n1, x1, y1)
      drawNode(n2, x2, y2)
    }, speed);
  }, 1000 * interval)
}
=======
function resetGraph() {
  strokeWeight(1);
  clear(); // Clear all objects in the canvas.
  console.clear(); // Clear adjacency matrix in the console.
  background("#1e1e1e"); // re-apply the background color again
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

function prim(vertices, graph) {
  let V = vertices.length
  let parent = [];
  let key = [];
  let mstSet = [];

  for (let i = 0; i < V; i++)
    key[i] = Number.MAX_VALUE, mstSet[i] = false;

  let interval = 0;
  key[0] = 0;
  parent[0] = -1; // First node is always root of MST

  for (let count = 0; count < V - 1; count++) {
    let min = Number.MAX_VALUE, min_index;
    for (let v = 0; v < V; v++) {

          animateLine(vertices[count][1], vertices[count][2], vertices[v][1], vertices[v][2], count, v, ++interval, 'white');  
      if (mstSet[v] == false && key[v] < min) {
        min = key[v];
        min_index = v;
      }
    }

    let u = min_index;
    mstSet[u] = true;
    for (let v = 0; v < V; v++) {
      if (graph[u][v] && mstSet[v] == false && graph[u][v] < key[v]) {
        parent[v] = u, key[v] = graph[u][v];
      }    
    }
  } 
  console.table(parent);
  for (let i = 1; i < V; i++) {
    let v = parent[i];
    let count = i;
    animateLine(vertices[v][1], vertices[v][2], vertices[count][1], vertices[count][2], count, v, ++interval, 'red');
  }
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
  let interval = 0;
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
>>>>>>> main

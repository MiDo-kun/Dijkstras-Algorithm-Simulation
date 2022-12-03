let graph = {
  vertices: [],
  adjacencyMatrix: [],
}

function setup() {
  createCanvas(1000, 600);
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

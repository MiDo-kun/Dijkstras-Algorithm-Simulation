window.onload = function () {
  const container = document.createElement("div");
  container.setAttribute('id', 'container')
  // Get current window width
  // Allow the canval be scrollable from left to right

  const screenWidth = window.innerWidth;
  console.log(screenWidth)
  container.style.minWidth = "100%";
  container.style.overflow = 'auto';
  const mainCanvas = document.getElementsByTagName('main')[0];
  mainCanvas.style.minWidth = "1000px";
  mainCanvas.style.overflow = 'auto';
  container.appendChild(mainCanvas);
  document.body.appendChild(container);
}

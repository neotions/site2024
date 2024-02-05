let circles = [];

let speed = 2;

let looping = false;

let circleSize = 200;

var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );



function setup() { 
  canvas = createCanvas(windowWidth,limit);
  canvas.position(0,0);
  canvas.style("z-index","-1");
  canvas.style("filter","blur(125px)");
  colorMode(HSB);

  circleSize = width/ 10;

  // Initialize circles
  for (let i = 0; i < 20; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      xspeed: random(0-speed, speed),
      yspeed: random(0-speed, speed),
      h: random(360),
      s: randomGaussian(100, 10),
      b: randomGaussian(100, 10)
    });
  }
  frameRate(60)
  
}


/* code to debounce resize canvas */

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
      var context = this, args = arguments;
      var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
  };
};

function resizeCanvasHandler() {
  resizeCanvas(window.innerWidth, windowHeight);
  console.log('Canvas resized to:', windowWidth, 'x', windowHeight);
}

// Debounce the resizeCanvasHandler function
var debouncedResizeCanvas = debounce(resizeCanvasHandler, 250); // Adjust 250 to your needs

// Add event listener to window resize
window.addEventListener('resize', debouncedResizeCanvas);



function draw() {

  console.log(windowWidth);

  //background(0); will take site's background
  // Update and draw circles

  temp_window_width = windowWidth;

  if (looping) { 
    if (frameCount % 10 == 0) {
      temp_window_width = windowWidth;
    }
  }

  for (let circle of circles) {
    fill(circle.h, circle.s, circle.b);
    ellipse(circle.x, circle.y, circleSize, circleSize);
    circle.x += circle.xspeed;
    circle.y += circle.yspeed;

    // Boundary check
    if (circle.x > width || circle.x < 0) {
      circle.xspeed *= -1;
    }
    if (circle.y > height || circle.y < 0) {
      circle.yspeed *= -1;
    }
  }
  

  //filter(BLUR, 25);


  if (!looping) {
    noLoop();
  }

  
}
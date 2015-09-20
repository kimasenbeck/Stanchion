(function() {
  const STAN_RADIUS = 10;
  const STAN_SPACING = 100;
  const INITIAL_SPACING = 25;
  const CLICK_SPACING = STAN_RADIUS;

  var stanchions = [[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1]];
  var controlCanvas = document.getElementById('controlCanvas'),
      bodyRect = document.body.getBoundingClientRect(),
      elemRect = controlCanvas.getBoundingClientRect(),
      elemLeft = elemRect.left - bodyRect.left,
      elemTop = elemRect.top - bodyRect.top,
      context = controlCanvas.getContext('2d'),
      elements = [];
  var ctx = controlCanvas.getContext("2d");

      /* looking at http://jsfiddle.net/BmeKr/ */

  function initControl() {
    // var ctx = controlCanvas.getContext("2d");
    for(i=0;i<stanchions.length;i++) {
      for(j=0;j<stanchions[i].length;j++) {
        // ctx.moveTo(0,0);
        if(stanchions[i][j]) {
          ctx.beginPath();
          ctx.arc(INITIAL_SPACING+STAN_SPACING*i,INITIAL_SPACING+STAN_SPACING*j,STAN_RADIUS,0,2*Math.PI);
          context.lineWidth = 1;
          ctx.fill();
          if(i+1 < stanchions.length && stanchions[i+1][j]) {
            var x1 = INITIAL_SPACING+STAN_SPACING*i+CLICK_SPACING,
                y1 = INITIAL_SPACING+STAN_SPACING*j,
                x2 = INITIAL_SPACING+STAN_SPACING*(i+1)-CLICK_SPACING,
                y2 = INITIAL_SPACING+STAN_SPACING*j;
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            context.strokeStyle = '#607D8B';
            context.lineWidth = 5;
            ctx.stroke();
            console.log(x1,y1);
            elements.push({
              width: STAN_SPACING-2*CLICK_SPACING,
              height: 2*CLICK_SPACING,
              top: INITIAL_SPACING+STAN_SPACING*j-CLICK_SPACING,
              left: INITIAL_SPACING+STAN_SPACING*i+CLICK_SPACING,
              pos: [[x1,y1],[x2,y2]],
              on: false,
            });
          }
          if(j+1 < stanchions[i].length && stanchions[i][j+1]) {
            var x1 = INITIAL_SPACING+STAN_SPACING*i,
                y1 = INITIAL_SPACING+STAN_SPACING*j+CLICK_SPACING,
                x2 = INITIAL_SPACING+STAN_SPACING*i,
                y2 = INITIAL_SPACING+STAN_SPACING*(j+1)-CLICK_SPACING;
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            context.strokeStyle = '#607D8B';
            context.lineWidth = 5;
            ctx.stroke();
            console.log(x1,y1);
            elements.push({
              width: 2*CLICK_SPACING,
              height: STAN_SPACING-2*CLICK_SPACING,
              top: INITIAL_SPACING+STAN_SPACING*j+CLICK_SPACING,
              left: INITIAL_SPACING+STAN_SPACING*i-CLICK_SPACING,
              pos: [[x1,y1],[x2,y2]],
              on: false,
            });
          }
        }
      }
    }
  }

  function drawControl() {
    // var ctx = controlCanvas.getContext("2d");
    for(i=0;i<stanchions.length;i++) {
      for(j=0;j<stanchions[i].length;j++) {
        // ctx.moveTo(0,0);
        if(stanchions[i][j]) {
          ctx.beginPath();
          ctx.arc(INITIAL_SPACING+STAN_SPACING*i,INITIAL_SPACING+STAN_SPACING*j,STAN_RADIUS,0,2*Math.PI);
          context.fillStyle = '#000000';
          context.strokeStyle = '#000000';
          context.lineWidth = 1;
          ctx.fill();
        }
      }
    }

    elements.forEach(function(element) {
      var x1 = element.pos[0][0],
        y1 = element.pos[0][1],
        x2 = element.pos[1][0],
        y2 = element.pos[1][1];

      ctx.beginPath();
      ctx.moveTo(x1,y1);
      ctx.lineTo(x2,y2);

      if (element.on) {
        context.strokeStyle = '#FFC107';
      } else {
        context.strokeStyle = '#607D8B';
      }
      context.lineWidth = 5;
      ctx.stroke();
      console.log(x1,y1,element.on);
      // appendMessage(String(element.left).concat(', ',String(element.top),', ',String(element.width),', ',String(element.height)));
    });
  }

  // Add event listener for `click` events.
  controlCanvas.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
      y = event.pageY - elemTop;
      console.log(x, y);
    elements.forEach(function(element) {
      if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
        // alert('clicked an element');
        element.on = !element.on;
        context.clearRect(0, 0, controlCanvas.width, controlCanvas.height);
        drawControl();
      }
    });
  }, false);

  // window.addEventListener('resize', resizeCanvas, false);
  // function resizeCanvas() {
  //   controlCanvas.width = window.innerWidth;
  //   controlCanvas.height = window.innerHeight;
  //   // bodyRect = document.body.getBoundingClientRect();
  //   // elemRect = controlCanvas.getBoundingClientRect();
  //   // elemLeft = elemRect.left - bodyRect.left;
  //   // elemTop = elemRect.top - bodyRect.top;
    
  //   drawControl();
  // }

  // window.bind("load", function() {
  //   resizeCanvas();
  // });

  function appendMessage(string) {
    var newParagraph = document.createElement('p');
    newParagraph.textContent = string;
    document.getElementById("par").appendChild(newParagraph);
  }

  initControl();
  // resizeCanvas();
  // elements.forEach(function(element) {
  //     context.fillStyle = '#05EFFF';
  //     context.fillRect(element.left, element.top, element.width, element.height);
  //     // appendMessage(String(element.left).concat(', ',String(element.top),', ',String(element.width),', ',String(element.height)));
  // });

})();
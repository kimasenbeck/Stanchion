const STAN_RADIUS = 10;
const STAN_SPACING = 100;
const INITIAL_SPACING = 15;

var stanchions = [[1,1],[1,1]];
var elem = document.getElementById('controlCanvas'),
    elemLeft = elem.offsetLeft,
    elemTop = elem.offsetTop,
    context = elem.getContext('2d'),
    elements = [];

    /* looking at http://jsfiddle.net/BmeKr/ */

function drawControl() {
  var c = document.getElementById("controlCanvas");
  var ctx = c.getContext("2d");
  for(i=0;i<stanchions.length;i++) {
    for(j=0;j<stanchions[i].length;j++) {
      // ctx.moveTo(0,0);
      if(stanchions[i][j]) {
        ctx.beginPath();
        ctx.arc(INITIAL_SPACING+STAN_SPACING*i,INITIAL_SPACING+STAN_SPACING*j,STAN_RADIUS,0,2*Math.PI);
        ctx.fill();
        if(i+1 < stanchions.length && stanchions[i+1][j]) {
          ctx.moveTo(INITIAL_SPACING+STAN_SPACING*i,INITIAL_SPACING+STAN_SPACING*j);
          ctx.lineTo(INITIAL_SPACING+STAN_SPACING*(i+1),INITIAL_SPACING+STAN_SPACING*j);
          ctx.stroke();
        }
        if(j+1 < stanchions[i].length && stanchions[i][j+1]) {
          ctx.moveTo(INITIAL_SPACING+STAN_SPACING*i,INITIAL_SPACING+STAN_SPACING*j);
          ctx.lineTo(INITIAL_SPACING+STAN_SPACING*i,INITIAL_SPACING+STAN_SPACING*(j+1));
          ctx.stroke();
        }
      }
    }
  }
}

function appendMessage(string) {
  var newParagraph = document.createElement('p');
  newParagraph.textContent = string;
  document.getElementById("par").appendChild(newParagraph);
}

drawControl();
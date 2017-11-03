<template>
    <div class="outroWindow">
      <link href="https://fonts.googleapis.com/css?family=Titillium+Web:300,400,600,700" rel="stylesheet">
      <div class="grid-container">
        <div class="upperPartOutro">
            <div class="grid-x grid-padding-x">
                <div class="large-8 medium-8 cell">
                </div>

                <div class="large-3 medium-3 cell" style="z-index: 1;">
                    <p id="outro-text">Alle Fäden der Viscosistadt wurden zerschnitten und der rote Faden somit komplett aufgelöst. Dadurch ist jedoch ein wunderschönes neues Fadengespann entstanden, womit du deinen eigenen roten Faden gezogen hast. Beim nächsten Mal wird das Gewobene bestimmt wieder anders aussehen – ein einzigartiges Muster – jedes Mal ein neuer Weg durch die Viscosistadt.</p>
                </div>
                <div class="large-1 medium-1 cell">
                </div>
            </div>
        </div>
                <div class="lowerPartOutro">
        </div>
      </div>
      <canvas id="mouseoverlayCanvas"></canvas>
    </div>
</template>

<script>
export default {
  name: "outrowindow",
  data: function() {
    return {
      //greeting: "Hello"
    };
  },
  props: [],
  mounted: function()
  {
    /*
    1. I write some code in the editor
    2. I try to execute it
    3. I messed it all up, jsut like everything else I do
    4. My code is exactly like my life
    5. A lot of bugs, unreadable
    6. and no one loves me...
    */
    window.mouseMoveTimer = null;
    window.trackMouseMove = false;
    window.mouseCoords = [];
    window.alreadyDrawnMouseCoords = [];
    window.alreadyDrawnPoints = [];
    window.drawCanvas = document.getElementById("mouseoverlayCanvas");

    // set canvas size
    window.drawCanvas.width = window.innerWidth;
    window.drawCanvas.height = window.innerHeight;

    if (!window.mouseMoveTimer)
    {
        window.mouseMoveTimer = window.setInterval(function()
        {
            // enable mouse tracking every 50 ms
            window.trackMouseMove = true;
        }, 50);
    }
    
    function mouseSafeTimer(evt)
    {
      if (!window.trackMouseMove)
      {
        return;
      }

      safeMouseCoords(evt);
      window.trackMouseMove = false;
    }

    /*
    function resizeCanvas()
    {
      // will erase the canvas
      window.drawCanvas.width = window.innerWidth;
      window.drawCanvas.height = window.innerHeight;
    }
    */

    function safeMouseCoords(evt)
    {
      window.mouseCoords.push({ x: evt.clientX, y: evt.clientY });
      drawPointsOnCanvas();
    }

    document.getElementById("app").onmousemove = mouseSafeTimer;
    //window.onresize = resizeCanvas;

    function getNewPoints()
    {
      let points = window.mouseCoords;
      window.mouseCoords = [];
      return points;
    }

    function getOldPoints()
    {
      return window.alreadyDrawnPoints ? window.alreadyDrawnPoints : [];
    }

    function addPointsToAlreadyDrawn(pointsArr)
    {
      window.alreadyDrawnPoints = window.alreadyDrawnPoints.concat(pointsArr);
    }

    function drawPointsOnCanvas()
    {
      let points = getNewPoints();

      let alreadyDrawnPoints = getOldPoints();
      let canvas = window.drawCanvas;
      let slicedArr = [];
      let maxDistanceForLinesSquared = 10000;
      let cSquared = maxDistanceForLinesSquared;
      let drawTransparency = 1;

      let ctx = canvas.getContext("2d");
      let radius = 1;

      // draw points
      points.forEach(function(ele)
      {
        ctx.beginPath();
        ctx.strokeColor = "black";
        ctx.arc(ele.x, ele.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      });

      // draw lines between all points
      points.forEach(function(point1, index)
      {
        alreadyDrawnPoints.forEach(function(point2)
        {
          cSquared =
            Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2);
          if (cSquared <= maxDistanceForLinesSquared) {
            drawTransparency = 1 - 1 / maxDistanceForLinesSquared * cSquared;
            ctx.strokeStyle = "rgba(255, 0, 22, " + drawTransparency + ")";
            ctx.beginPath();
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);
            ctx.stroke();
          }
        });
      });

      //console.log(window.alreadyDrawnPoints.length);
      //window.alreadyDrawnPoints = window.alreadyDrawnPoints.concat(points);
      //setTimeout(drawPointsOnCanvas, 200);
      addPointsToAlreadyDrawn(points);
    }
  }
};
</script>
<template>
    <div class="introWindow">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis et quibusdam, minima necessitatibus molestias veritatis, deleniti vitae velit iste id enim, nisi eveniet cumque rerum inventore similique natus tempore cupiditate!
        
        <div class="introLineCutAnim">
            <canvas id="introLineCutCanvas" width="500" height="5">
                too bad your browser died centuries ago
            </canvas>
        </div>
    </div>
</template>

<script>
export default {
  name: "introwindow",
  data: function() {
    return {
      //greeting: "Hello"
    };
  },
  props: [
    
  ],
  mounted: function()
  {
    //console.log($);
    let canvas = document.getElementById("introLineCutCanvas");
    let ctx = canvas.getContext('2d');
    //let theLine = {"x": 20, "y": canvas.height / 2, "x2": canvas.width - 20, "y2": canvas.height / 2};
    let theLine = {"x": 0, "y": canvas.height / 2, "x2": canvas.width, "y2": canvas.height / 2};

    /*
    let theRect = {"x": 20, "y": canvas.height / 2, "x2": canvas.width - 20, "y2": canvas.height / 2};

    ctx.beginPath();
    ctx.rect( theLine.x, theLine.y, theLine.x + 2, theLine.y + 2 );
    ctx.stroke();
    */
    
    ctx.strokeStyle = '#f22b29';
    ctx.lineWidth = "5";
    ctx.moveTo( theLine.x, theLine.y );
    ctx.lineTo( theLine.x2, theLine.y2 );
    ctx.stroke();

    canvas.onmouseover = function(e)
    {
        console.log("jo");

        $("#introLineCutCanvas").animate({opacity: 0}, 800, function()
        {
            $(".introWindow")
            .animate({top: '-100vh'}, 800, function()
            {
                //callback
            });

            /*
            $(".introWindow")
            .animate({opacity: 0.7}, 800, function()
            {
                $(".introWindow")
                .animate({top:-1000}, 800, function()
                {
                    //callback
                });
            });
            */
        });
    }    

    canvas.onmousemove = function(e)
    {
        /*
        //nothing works, just like my life
        let rect = this.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.lineWidth = "5";
        console.log(ctx.isPointInPath(x, y));
        ctx.strokeStyle = ctx.isPointInPath(x, y) ? 'red' : 'blue';
        ctx.rect( theLine.x, theLine.y, theLine.x + 2, theLine.y + 2 );
        ctx.stroke();        
        */

        /*
        ctx.moveTo( theLine.x, theLine.y );
        ctx.lineTo( theLine.x2, theLine.y2 );
        ctx.stroke();
        */
    };

  }
};
</script>
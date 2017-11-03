<template>
    <div class="introWindow">
        <!-- <div class="introLineCutAnim"> -->
        <div>
        <link href="https://fonts.googleapis.com/css?family=Titillium+Web:300,300i,400,600,700" rel="stylesheet">
            <div class="grid-container">
                <div class="upperPart"></div>
                <div class="lowerPart">
                    <div class="grid-x grid-padding-x">
                        <div class="large-7 medium-12 cell">
                        </div>

                        <div class="large-4 medium-12 cell">
                            <div class="introThreadTitleBox">
                                <span class="introThreadTitle">
                                DER ROTE <br> FADEN
                                </span>
                            </div>

                            <p id="intro-text">«Das zieht sich wie ein roter Faden durch die Geschichte», sagt man über ein Leitmotiv, das während eines Geschehens immer weiter fortgesponnen wird. Der Ursprung des roten Fadens findet sich in Goethes Roman: «Wir hören von einer besondern Einrichtung bei der englischen Marine. Sämtliche Tauwerke der königlichen Flotte, vom stärksten bis zum schwächsten, sind dergestalt gesponnen, dass ein roter Faden durch das Ganze durchgeht, den man nicht herauswinden kann, ohne alles aufzulösen, und woran auch die kleinsten Stücke kenntlich sind, dass sie der Krone gehören. Ebenso zieht sich durch Ottiliens Tagebuch ein Faden der Neigung und Anhänglichkeit, der alles verbindet und das Ganze bezeichnet.» <span id="italic">(Goethe, «Die Wahlverwandschaften», 1809)</span></p>
                        </div>
                        <div class="large-1 medium-12 cell">
                        </div>

                        <div class="large-1 medium-12 cell">
                        </div>

                        <div class="large-7 medium-12 cell">
                            <div>
                                <p id="faden-text">Zerschneide den Faden</p>
                                <canvas id="introLineCutCanvas">
                                        too bad your browser died centuries ago
                                </canvas>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
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

    // hide thread at start
    $("#faden-text").parent().css("opacity", 0);
    
    // display thread after 4 seconds
    setTimeout(function ()
    {
        $("#faden-text").parent().animate({opacity: 1}, 800, function ()
        {
            // callback
        });
    }, 4000);

    canvas.onmouseover = function(e)
    {
        console.log("jo");

        $("#introLineCutCanvas").animate({opacity: 0}, 800, function()
        {
            $(".introWindow")
            .animate({top: '100vh'}, 800, function()
            {
                $(".introWindow").hide();
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


	/* Lotto Ticket has 2 Layers : bridge, bridge2 ( Canvas 1, Canvas 2 ) */
	/* bridge2 is the top layer that can be scratched */
	/* bridge is the bottom layer that contains elements */	
	/* since one cannot know if the user will scratch manually or button click - both bridge and bridge2 has to draw elements  */		

	/* getnum - what button, "canvas image" has been pressed */	
    var getnum = 0;
	/* lottonumbers - store value numbers to highligth (yellow color) if winning-numbers later on  */	
	var lottonumbers = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	/* match - win ticket or lose ticket */		
	var match = 0;

	var buyticketbtn = new Image();
    buyticketbtn.src = "http://freeplay2.nyxinteractive.com/htmltest/img/buyticketbtn.jpg";
	
	var checkwinbtn = new Image();
    checkwinbtn.src = "http://freeplay2.nyxinteractive.com/htmltest/img/checkwinbtn.jpg";
	checkwinbtn.id = "checkwinbtn";	
	
	var gamelogo = new Image();
    gamelogo.src = "http://freeplay2.nyxinteractive.com/htmltest/img/gamelogo.png";	
	
	var pricebanner = new Image();
    pricebanner.src = "http://freeplay2.nyxinteractive.com/htmltest/img/pricebanner.png";	
	
	var winlose = new Image();
    winlose.src = "http://freeplay2.nyxinteractive.com/htmltest/img/winlose.png ";	
	winlose.id = "winlose";
	
	var bridge = document.getElementById("bridge");
	bridgeCanvas = bridge.getContext('2d');

	var img = new Image();
	img.src = 'http://freeplay2.nyxinteractive.com/htmltest/img/scratched.jpg';

	var bridge2 = document.getElementById("bridge2");
	bridge2Canvas = bridge2.getContext('2d');		
	
	brushRadius = (bridge2.width / 100) * 5;
	if (brushRadius < 50) { brushRadius = 50 } ;

	var img2 = new Image();
	img2.src = 'http://freeplay2.nyxinteractive.com/htmltest/img/unscratched.jpg';		

    img.onload = function(){ 
 
    bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);	

	bridgeCanvas.drawImage(winlose, 0, -299, 640, 459); 	
	bridgeCanvas.drawImage(gamelogo, 180, 50, 263, 173);

	bridgeCanvas.drawImage(buyticketbtn, 150, 850, 348, 84); 
	
    bridge2Canvas.drawImage(img2, 0, 0, bridge2.width, bridge2.height);	
    
	bridge2Canvas.drawImage(winlose, 0, -299, 640, 459); 	
	bridge2Canvas.drawImage(gamelogo, 180, 50, 263, 173);	

	bridge2Canvas.drawImage(buyticketbtn, 150, 850, 348, 84); 

	var x = document.createElement("IMG");
	x.setAttribute("src", "http://freeplay2.nyxinteractive.com/htmltest/img/pricebanner.png");
	x.setAttribute('class', 'image-right');		
	x.setAttribute("width", "128");
	x.setAttribute("height", "121");		
	document.getElementById("price-image0").appendChild(x); 	

    }

bridge2.addEventListener("click", function(e) {

    var rect = this.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;
	
    /* If any "Image Button" was pressed */	

    if (x >= 150 && x <= (150 + buyticketbtn.width) && y >= 850 && y <= (850 + buyticketbtn.height)) {
	
	if (getnum == 0)
	{
		/* Buy Ticket button was pressed */	
		
		play_buy();			

		getTicketLottoNumbers();
		getnum = 1;
	}
	else if (getnum == 1)
	{
	
		/* Check Win button was pressed */			
		
		/* If Lotto ticket "is" or "is not" scratched - draw elements on both bridge, bridge2 ( Canvas 1, Canvas 2 ) */	

		play_win();			
			
		bridge2Canvas.drawImage(img, 0, 0, bridge2.width, bridge2.height);
		
		var arr_x = [ 90, 270, 460, 90, 270, 460, 90, 270, 460 ];
		var arr_y = [ 370, 370, 370, 560, 560, 560, 740, 740, 740 ];
		var i = 0;  
	
		while (lottonumbers[i]) {	
			bridge2Canvas.fillStyle = 'white';
			bridge2Canvas.font = 'italic 38px sans-serif';
			bridge2Canvas.fillText(lottonumbers[i], arr_x[i], arr_y[i]);			
			i++;
		}		
        	
		bridgeCanvas.drawImage(img, 0, 0, bridge2.width, bridge2.height);
	
		var arr_x = [ 90, 270, 460, 90, 270, 460, 90, 270, 460 ];
		var arr_y = [ 370, 370, 370, 560, 560, 560, 740, 740, 740 ];
		var i = 0;  
	
		while (lottonumbers[i]) {	
			bridgeCanvas.fillStyle = 'white';
			bridgeCanvas.font = 'italic 38px sans-serif';
			bridgeCanvas.fillText(lottonumbers[i], arr_x[i], arr_y[i]);			
			i++;
		}		

		if (0 == match)
		{
	
			/* Show animation for Lose Ticket */
	
			setTimeout(showResultSlideDown(match), 3000);	

			var x = document.createElement("IMG");
			x.setAttribute("src", "http://freeplay2.nyxinteractive.com/htmltest/img/winlose.png");
			x.setAttribute("id", "winlose");	
			x.setAttribute("width", "640");
			x.setAttribute("height", "459");
			document.getElementById("number-box0").appendChild(x);	

			var a = document.createElement("div");
			a.setAttribute("style", "color:yellow;font-family:Calibri;font-size:38px;");
			a.setAttribute('class', 'centered');

			var b = document.createTextNode("Sorry, no win this time");
			a.appendChild(b);
			document.getElementById("number-box0").appendChild(a);

			var c = document.createElement("br");
			document.getElementById("number-box0").appendChild(c);	

		
	
		}
		else
		{
		
			/* Show animation for Win Ticket */
			
			setTimeout(showResultSlideDown(match), 3000);				

			/* Highligth Winning Lotto Ticket Numbers - Yellow */

			var arr_x = [ 90, 270, 460, 90, 270, 460, 90, 270, 460 ];
			var arr_y = [ 370, 370, 370, 560, 560, 560, 740, 740, 740];
			var i = 0;  
	
			while (lottonumbers[i]) {
			if (lottonumbers[i] == match) 
			{	
				bridge2Canvas.fillStyle = 'yellow';
				bridge2Canvas.font = 'italic 38px sans-serif';
				bridge2Canvas.fillText(lottonumbers[i], arr_x[i], arr_y[i]);	
			}		
			i++;
			}			
	
			var i = 0;  
	
			while (lottonumbers[i]) {
			if (lottonumbers[i] == match) 
			{	
				bridgeCanvas.fillStyle = 'yellow';
				bridgeCanvas.font = 'italic 38px sans-serif';
				bridgeCanvas.fillText(lottonumbers[i], arr_x[i], arr_y[i]);	
			}		
			i++;
			}
		
			var x = document.createElement("IMG");
			x.setAttribute("src", "http://freeplay2.nyxinteractive.com/htmltest/img/winlose.png");
			x.setAttribute("id", "winlose");	
			x.setAttribute("width", "640");
			x.setAttribute("height", "459");
			document.getElementById("number-box0").appendChild(x);	

			var a = document.createElement("div");
			a.setAttribute("style", "color:yellow;font-family:Calibri;font-size:38px;");
			a.setAttribute('class', 'centered');

			var b = document.createTextNode("You won $ " + match + " !");
			a.appendChild(b);
			document.getElementById("number-box0").appendChild(a);

			var c = document.createElement("br");
			document.getElementById("number-box0").appendChild(c);		

		}	
	    getnum = 2;
	} 
	else if (getnum == 2)
	{
		/* Buy Ticket button was pressed after showing Lotto results - Buy another Ticket */	

        showResultSlideUp();
		setTimeout(buyNewTicket, 6000);				

	}
	else
	{
	
	}
		
    scratchTicketLottoNumbers();	
	
	}	

}, false);

function getTicketLottoNumbers(){	

	/* Get the Lotto Ticket Numbers */

    bridge2Canvas.drawImage(checkwinbtn, 150, 850, 348, 84);
    bridgeCanvas.drawImage(checkwinbtn, 150, 850, 348, 84);	

	var num = Math.floor(Math.random() * 10);
	/* Temporarily set num for Win or Lose result when Testing ... */
	/* num = 2, win || num = 1, lose */

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://freeplay2.nyxinteractive.com/htmltest/nyx" + num + ".json", false);
    xhttp.send();
 
    /* Lotto Ticket Values from NYX */
	
    var str = xhttp.responseText;   
    var n = str.search(/values/i);   
    var res = str.slice(n + 10, str.length - 5); 
    var arr = res.split(",");  
	
    /* Lotto Ticket Result from NYX : 0 = lose, 22 = win */
	
	var str2 = str.slice(13, str.length - 3);   
	var arr2 = str2.split(","); 
	var str3 = arr2[3];
    match = str3.slice(13, str3.length - 1); 	
  
    var arr_x = [ 90, 270, 460, 90, 270, 460, 90, 270, 460 ];
	var arr_y = [ 370, 370, 370, 560, 560, 560, 740, 740, 740];
	var i = 0;  
	
	while (arr[i]) {	
		bridgeCanvas.fillStyle = 'white';
		bridgeCanvas.font = 'italic 38px sans-serif';
		bridgeCanvas.fillText(arr[i], arr_x[i], arr_y[i]);
		lottonumbers[i] = arr[i];		
		i++;
	}
	

}


function scratchTicketLottoNumbers(){	

/* Scratch the Lotto Ticket */		

bridge2.addEventListener("mousemove", function(e) {
    var brushPos = getBrushPos(e.clientX, e.clientY);
    var leftBut = detectLeftButton(e);
    if (leftBut == 1) {
        drawDot(brushPos.x, brushPos.y);
    }
}, false);

bridge2.addEventListener("touchmove", function(e) {

    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
        var brushPos = getBrushPos(touch.pageX, touch.pageY);
        drawDot(brushPos.x, brushPos.y);
    }
}, false);

function detectLeftButton(event) {
    if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return event.button === 1;
    }
}

function getBrushPos(xRef, yRef) {
    var bridge2Rect = bridge2.getBoundingClientRect();

    return {
      x: Math.floor((xRef - bridge2Rect.left) / (bridge2Rect.right - bridge2Rect.left) * bridge2.width),
      y: Math.floor((yRef - bridge2Rect.top) / (bridge2Rect.bottom - bridge2Rect.top) * bridge2.height)	
    };

}

function drawDot(mouseX,mouseY){
	play_scratch();
    bridge2Canvas.beginPath();
    bridge2Canvas.arc(mouseX, mouseY, brushRadius, 0, 2*Math.PI, true);
    bridge2Canvas.fillStyle = '#000';
    bridge2Canvas.globalCompositeOperation = "destination-out";
    bridge2Canvas.fill();
}


}


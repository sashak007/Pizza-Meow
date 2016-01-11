(function(){ 
	var width,
			height,
			canvas,
			ctx,
			headerContainer,
			focus,
			points,
			animateActive = true,
			userUpdate	  = [false];

	initHeader();
	initAnimation();
	addListeners();

	document.getElementById("surprise").onclick = function userClick() {
		userUpdate = [true, Math.floor(Math.random() * 4)];
	}

	function initHeader() {
		width  											 = window.innerWidth;
		height 											 = window.innerHeight;
		focus 											 = {x: width/2, y: height/2}; //focus is center by default
		headerContainer 						 = document.getElementById('container');
		canvas 											 = document.getElementById('tutorial');
		headerContainer.style.height = height+'px';
		canvas.width          			 = width; 
		canvas.height         			 = height;
		ctx 												 = canvas.getContext('2d');
		points 											 = []

		for(var x = 0; x < width; x = x + width/5) {
			for (var y = 0; y < height; y = y +height/5) {
				var px, py, p;

				px = x + Math.random() * width/5;
				py = y + Math.random() * height/5;
				p = {x: px, originX: px, y: py, originY: py};

				points.push(p);
			}
		}

		points.sort(function(a,b){return a - b});
		
		//Get closest 5 points
		for(var i = 0; i < points.length; i++) {
			var focusPoint = points[i],
					closest 	 = []; // needs to be out of nested for so the outter loop to have reference.
			
			for(var j = 0; j < points.length; j++) {
				var placed,
						surroundingPoint = points[j];

				if(!(focusPoint === surroundingPoint)){
					placed = false;
					
					for (var k = 0; k < 5; k++) {
						if (closest[k] === undefined) {
							closest[k] = surroundingPoint;
							placed = true;
						}
					}

					for (var k = 0; k < 5; k++) {
						if(!placed){
							if (roughDistance(focusPoint,surroundingPoint) < roughDistance(focusPoint,closest[k])) {
								closest[k] = surroundingPoint;
								break;
							}
						}
					}
					
				}
			}
			focusPoint.closest = closest;
		}
	}

	function addListeners() {
		if(!('ontouchstart' in window)) {
			window.addEventListener('mousemove', mouseMove);
		}
		window.addEventListener('scroll', scrollCheck);
		window.addEventListener('resize', resize);
	}

	function mouseMove(e) {
		var positionX = positionY = 0; 

		if(e.pageX || e.pageY) {
			positionX = e.pageX;
			positionY = e.pageY;
		}  else if (e.clientX || e.clientY)    {
       positionX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
       positionY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

		focus.x = positionX;
		focus.y = positionY;
	}

	function scrollCheck() {
		if (document.body.scrollTop > height) {
			animateActive = false;
		} else {
			animateActive = true;
		}
	}

	function resize() {
		width  											 = window.innerWidth;
		height 											 = window.innerHeight;
		headerContainer.style.height = height+'px';
		canvas.width  							 = width;
		canvas.height 							 = height;
	}

	function initAnimation() {
		animate();
		for(var i in points) {
			shiftImg(points[i]);
		}

	}

	function animate() {
		if(animateActive) {

			ctx.clearRect(0,0,width,height);

			for(var i in points) {
				if(Math.abs(roughDistance(focus,points[i])) < 4000) {
					points[i].active = .9;
				} else if(Math.abs(roughDistance(focus,points[i])) < 20000) {
					points[i].active = .6;
				} else if(Math.abs(roughDistance(focus,points[i])) < 40000) {
					points[i].active = .3;
				} else {
					points[i].active = 0;
				}

				drawLines(points[i]);
				
				if(userUpdate[0]) {
					drawImg(points[i], userUpdate[1])
				} else{
					drawImg(points[i]);
				}

			}
		}
		requestAnimationFrame(animate);
	}

	function drawLines(point){
		if(!point.active) {
			return;
		}

		for(var i in point.closest) {
			console.log()
			var gradient = ctx.createLinearGradient(0,0,width,0);
			
			gradient.addColorStop("0","magenta");
			gradient.addColorStop("0.5","blue");
			gradient.addColorStop("1.0","red");

			ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.closest[i].x, point.closest[i].y);
			ctx.strokeStyle = gradient;
			ctx.lineWidth = 3;
			ctx.stroke();
		}
	}

	function drawImg(point,img) {
		var imageObj   = new Image(),
				selectImgs = [
		'img/pizza-cat.png',
		'img/hipster-dog.png',
		'img/cat-donut.png',
		'img/taco-turtle-pizza-cat.png',
		'img/yu_yu_hakusho.png'
		];

		if(img) {
			imageObj.src = selectImgs[img]
		}	else{
			imageObj.src = selectImgs[0]
		}
		
		ctx.drawImage(imageObj, point.x, point.y);
		ctx.globalAlpha = point.active;
}

	function shiftImg(point) {
		TweenLite.to(point, 1 + 1 * Math.random(), {x: point.originX - 50 + (Math.random() * 200), y: point.originY - 50 + (Math.random() * 200), ease:Circ.easeOut, onComplete: function(){shiftImg(point);}});
	}

	function roughDistance(p1,p2) {
		return Math.pow((p2.x - p1.x),2) + Math.pow((p2.y - p1.y),2);
	}
})();
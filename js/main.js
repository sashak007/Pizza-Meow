(function(){ 
	var width,
			height,
			canvas,
			ctx,
			headerContainer,
			focus,
			points,
			animateActive = true;

	initHeader();
	initAnimation();
	addListeners();

	function initHeader() {
		width  					= window.innerWidth;
		height 					= window.innerHeight;
		focus 					= {x: width/2, y: height/2}; //focus is center by default
		headerContainer = document.getElementById('container');
		canvas 					= document.getElementById('tutorial');

		// headerContainer.style.width  = width;
		headerContainer.style.height = height+'px';

		//what happens if you do canvas.style.width / canvas.style.height ? 
		canvas.width  = width;
		canvas.height = height;

		ctx = canvas.getContext('2d');

		points = []

		for(var x = 0; x < width; x = x + width/20) {
			for (var y = 0; y < height; y = y +height/20) {
				var px, py, p;

				px = x + Math.random() * width/20;
				py = y + Math.random() * height/20;
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

				if(!(firstPoint === surroundingPoint)){
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
		// assign images for each point
		for(var x in points) {
			points[x].img
		}
	}

	function addListeners() {}

	function mouseMove() {}

	function scrollCheck() {}

	function resize() {}

	function initAnimation() {}

	function animate() {}

	function shiftImg() {}

	function roughDistance(p1,p2) {
		return Math.pow((p2.x - p1.x),2) + Math.pow((p2.y - p1.y),2);
	}
})();
let keysPressed = {};
document.addEventListener('keydown', function(event) {
	keysPressed[event.key] = true;
	//UI
    if (event.key === 'Escape') {
		const panel = document.getElementById('controlPanel');
		if (panel) {
			// Toggle visibility
			panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
		}
    }
	//Randomizer
	else if (event.key === 'r' || event.key === 'R') {
        randomize();
		//Also turn off box if on
        boxVisible =false;
		document.getElementById('boxVisible').checked = boxVisible;
    }
	else if (event.key === ' ') {
		dropdown = document.getElementById("modeDropdown")
		waveMode= (waveMode + 1 )% dropdown.options.length;
		dropdown.selectedIndex = waveMode;
    }
	//Scale W
	else if (event.key === 'w' || event.key === 'W') {
        scaleW = parseFloat(scaleW) + 0.1;
		document.getElementById('scaleW').value = scaleW;
    }
	else if (event.key === 's' || event.key === 'S') {
        scaleW = parseFloat(scaleW) - 0.1;
		document.getElementById('scaleW').value = scaleW;
    }
	//Frequency
	else if (event.key === 'd' || event.key === 'D') {        
        frequencyW = parseFloat(frequencyW) + 1;
		document.getElementById('frequencyW').value = frequencyW;
    }
	else if (event.key === 'a' || event.key === 'A') {   
        frequencyW = parseFloat(frequencyW) - 1;
		document.getElementById('frequencyW').value = frequencyW;
    }
	//Bounding Box
	else if (event.key === 'b' || event.key === 'B') {
        boxVisible =!boxVisible;
		document.getElementById('boxVisible').checked = boxVisible;
    }
	else if (keysPressed['ArrowLeft'] && keysPressed['ArrowRight']) {
        bx1 = parseFloat(bx1) - .1;
		bx2 = parseFloat(bx2) + .1;
		document.getElementById('bx1').value = bx1;
		document.getElementById('bx2').value = bx2;
    }
	else if (keysPressed['ArrowDown'] && keysPressed['ArrowUp']) {
        by1 = parseFloat(by1) - .1;
		by2 = parseFloat(by2) + .1;
		document.getElementById('by1').value = by1;
		document.getElementById('by2').value = by2;
    }
	else if (event.key === 'ArrowRight') {
        bx1 = parseFloat(bx1) + .1;
		bx2 = parseFloat(bx2) + .1;
		document.getElementById('bx1').value = bx1;
		document.getElementById('bx2').value = bx2;
    }
	else if (event.key === 'ArrowLeft') {
        bx1 = parseFloat(bx1) - .1;
		bx2 = parseFloat(bx2) - .1;
		document.getElementById('bx1').value = bx1;
		document.getElementById('bx2').value = bx2;
    }
	else if (event.key === 'ArrowUp') {
        by1 = parseFloat(by1) + .1;
		by2 = parseFloat(by2) + .1;
		document.getElementById('by1').value = by1;
		document.getElementById('by2').value = by2;
    }
	else if (event.key === 'ArrowDown') {
        by1 = parseFloat(by1) - .1;
		by2 = parseFloat(by2) - .1;
		document.getElementById('by1').value = by1;
		document.getElementById('by2').value = by2;
    }
	else if (event.key === '=') {
        steepnessB = parseFloat(steepnessB) + .1;
		document.getElementById('steepnessB').value = steepnessB;
    }
	else if (event.key === '-') {
        steepnessB = parseFloat(steepnessB) - .1;
		document.getElementById('steepnessB').value = steepnessB;
    }
	else if (event.key === ']') {
        baseFloor = parseFloat(baseFloor) + .1;
		document.getElementById('baseFloor').value = baseFloor;
    }
	else if (event.key === '[') {
        baseFloor = parseFloat(baseFloor) - .1;
		document.getElementById('baseFloor').value = baseFloor;
    }
	//Height
	else if (event.key === 'z' || event.key === 'Z') {  
		if(keysPressed['Shift']){
			brightnessDepth = parseFloat(brightnessDepth) - .1;
			document.getElementById('brightnessDepth').value = brightnessDepth;
		}		
		else{
			height2 = parseFloat(height2) - .1;
			document.getElementById('height2').value = height2;
		}
    }
	else if (event.key === 'x' || event.key === 'X') {   
		if(keysPressed['Shift']){
			brightnessDepth = parseFloat(brightnessDepth) + .1;
			document.getElementById('brightnessDepth').value = brightnessDepth;
		}		
		else{
			height2 = parseFloat(height2) + .1;
			document.getElementById('height2').value = height2;
		}
    }
	//Clipping
	else if (event.key === 'c' || event.key === 'C') {  
        clippingPlane = parseFloat(clippingPlane) - .05;
		document.getElementById('clippingPlane').value = clippingPlane;
    }
	else if (event.key === 'v' || event.key === 'V') {   
        clippingPlane = parseFloat(clippingPlane) + .05;
		document.getElementById('clippingPlane').value = clippingPlane;
    }
	//Eyedropper
	else if (event.key === 'e' || event.key === 'E') {
		if(eyedropperMode==false){	
			eyedropperMode = true;		
			changeCursor();			
		}
    }
});
document.addEventListener('keyup', function(event) {
    keysPressed[event.key] = false;
	if(eyedropperMode == true){		
		eyedropperMode = false;	
		changeCursor();			
	}
});
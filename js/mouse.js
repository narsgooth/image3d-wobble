let eyedropperMode = false;

window.addEventListener('click', (event) => {
	if(eyedropperMode)
	{
		const pixelRatio = window.devicePixelRatio;

		// Convert from client coordinates to render target pixel coordinates
		const x = Math.floor(event.clientX * pixelRatio);
		const y = Math.floor((window.innerHeight - event.clientY) * pixelRatio); // Y is flipped!
		
		pixelColor = getPixelColor(x, y);
		renderer.setClearColor(new THREE.Color(pixelColor), 1);
		document.getElementById('bg-color').value = pixelColor;
	}
	
});

/*
document.addEventListener('keydown', (e) => {
    if (e.key === 'e') {
        eyedropperMode = !eyedropperMode;
        document.body.style.cursor = eyedropperMode
            ? 'url("eyedropper.png") 0 16, crosshair'
            : 'default';
    }
});*/

function changeCursor()
{
	document.body.style.cursor = eyedropperMode
		? 'crosshair'
		: 'default';
}

function getPixelColor(pixelX, pixelY) {
    const pixelBuffer = new Uint8Array(4);

    renderer.readRenderTargetPixels(
        renderTarget,
        pixelX,
        pixelY,
        1,
        1,
        pixelBuffer
    );

    const [r, g, b, a] = pixelBuffer;
    const hexColor = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    return hexColor;
}
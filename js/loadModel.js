async function runModel(file,isUrl = false) {
    ///////////////////////////////////////////////////////////////
    const session = await ort.InferenceSession.create('models/depth_anything_v2_vits.onnx');
    const inputName = session.inputNames[0];

    const inputWidth = 336;
    const inputHeight = 504;

    const img = new Image();
	if(!isUrl){
		img.src = URL.createObjectURL(file);
	}
	else{
		img.crossOrigin = 'anonymous'; // IMPORTANT: to allow cross-origin image loading
		img.src = file;
	}

    img.onload = async() => {
        const canvas = document.createElement('canvas');
        canvas.width = inputWidth;
        canvas.height = inputHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, inputWidth, inputHeight);

        const imageData = ctx.getImageData(0, 0, inputWidth, inputHeight);
        const { data } = imageData;

        const floatData = new Float32Array(3 * inputWidth * inputHeight);
        for (let i = 0; i < inputWidth * inputHeight; i++) {
            floatData[i] = data[i * 4] / 255;
            floatData[i + inputWidth * inputHeight] = data[i * 4 + 1] / 255;
            floatData[i + 2 * inputWidth * inputHeight] = data[i * 4 + 2] / 255;
        }

        const inputTensor = new ort.Tensor('float32', floatData, [1, 3, inputHeight, inputWidth]);
        const feeds = {
            [inputName]: inputTensor
        };

        results = await session.run(feeds);
        console.log(results);
        run(session, results);
    };
}
/*
document.getElementById('imageUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file)
        runModel(file);
});*/

///////////////////////////////////////////////////////////////////////////
function displayGrayscaleOutputImage(tensor, canvasId) {
    const [batch, height, width] = tensor.dims;
    if (batch !== 1) {
        console.error('Only batch=1 output supported for display');
        return;
    }

    const data = tensor.data;
    let min = Infinity,
    max = -Infinity;
    for (let i = 0; i < data.length; i++) {
        if (data[i] < min)
            min = data[i];
        if (data[i] > max)
            max = data[i];
    }
    console.log('Output tensor min:', min, 'max:', max);

    const imageDataArray = new Uint8ClampedArray(height * width * 4);

    for (let i = 0; i < height * width; i++) {
        let gray = (data[i] - min) / (max - min);
        gray = Math.min(1, Math.max(0, gray));
        const value = Math.round(gray * 255);

        imageDataArray[i * 4] = value;
        imageDataArray[i * 4 + 1] = value;
        imageDataArray[i * 4 + 2] = value;
        imageDataArray[i * 4 + 3] = 255;
    }

    const imageData = new ImageData(imageDataArray, width, height);
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error('Canvas not found:', canvasId);
        return;
    }
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);
	material.uniforms.heightMap.value = new THREE.CanvasTexture(canvas);
	//image3d.material.displacementScale = prevDisplacementScale;
	//image3d.material.displacementMap.needsUpdate = true;
    console.log('Image drawn');
}

//////////////////////////////////////////////////////////////
function run(session, results) {
    const outputTensor = results[session.outputNames[0]];
    console.log('Output tensor shape:', outputTensor.dims);
    displayGrayscaleOutputImage(outputTensor, 'outputCanvas');
}
//////////////////////////////////////////////////////////////
function isWebGLEnabled() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (
                canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

console.log('WebGL enabled:', isWebGLEnabled());
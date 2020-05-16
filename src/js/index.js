import '@tensorflow/tfjs-core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs-data';

let coco;
const webcamElement = document.getElementById('webcam');
console.log("Started");


(async () => {
    console.log('Loading cocoSsd..');
    const content = document.getElementById('content');
    const predictionList = document.getElementById('predictionList');
    const webcam = await tf.webcam(webcamElement);
    // Load the model.
    coco = await cocoSsd.load();
    console.log('Successfully loaded model');
    content.innerText = '';
    document.getElementById('btn').addEventListener('click', () => predict());

    async function predict() {
        predictionList.innerHTML = '';
        const img = await webcam.capture();
        // Make a prediction through the model on our image.
        const predictions = await coco.detect(img);
        console.log('Predictions: ', predictions);
        content.innerText = '';
        predictionList.style.display = 'block';

        predictions.forEach(el => {
            let node = document.createElement("LI");
            let textnode = document.createTextNode(`It is a ${el.class} (Accuracy: ${el.score * 100} %)`);
            node.appendChild(textnode);
            predictionList.appendChild(node);
        });
    }
})();
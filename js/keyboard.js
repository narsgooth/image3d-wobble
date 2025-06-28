document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const panel = document.getElementById('controlPanel');
      if (panel) {
        // Toggle visibility
        panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
      }
    }
	else if (event.key === 'r' || event.key === 'R') {
        randomize();
    }
	else if (event.key === 'w' || event.key === 'W') {
        scaleW += .1;
		document.getElementById('scaleW').value = scaleW;
    }
	else if (event.key === 's' || event.key === 'S') {
        scaleW -= .1;
		document.getElementById('scaleW').value = scaleW;
    }
	else if (event.key === 'd' || event.key === 'D') {
        frequencyW += 1;
		document.getElementById('frequencyW').value = frequencyW;
    }
	else if (event.key === 'a' || event.key === 'A') {
        frequencyW -= 1;
		document.getElementById('frequencyW').value = frequencyW;
    }
	else if (event.key === 'b' || event.key === 'B') {
        boxVisible =!boxVisible;
		document.getElementById('boxVisible').checked = boxVisible;
    }
  });
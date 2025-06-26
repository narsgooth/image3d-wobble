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
  });
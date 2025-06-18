function addProgressBar() {
  const container = document.createElement('div');
  container.className = 'progress-container';

  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  bar.style.width = '10%'; 

  container.appendChild(bar);
  document.getElementById('progress-bars').appendChild(container);

 
  const allBars = document.querySelectorAll('.progress-bar');
  allBars.forEach((barElement) => {
    let currentWidth = parseInt(barElement.style.width);
    let newWidth = Math.min(currentWidth + 10, 100); 
    barElement.style.width = newWidth + '%';
  });
}

function generateGradientCube() {
    const positions = {};
    let counter = 1;
    const step = 64; // Control the gradient steps
  
    // Generate the red, green, and blue planes
    for (let r = 0; r <= 255; r += step) {
      for (let g = 0; g <= 255; g += step) {
        positions[`document-box-${counter}`] = {
          left: (counter % 12) * 50, // Adjust position for layout, using half the size of the initial boxes
          top: Math.floor(counter / 12) * 50,
          right: ((counter % 12) * 50) + 50,
          bottom: (Math.floor(counter / 12) * 50) + 50,
          className: `box-${counter}`,
          color: `rgb(${r}, ${g}, 255)`, // Blue plane, moving towards white
        };
        counter++;
      }
    }
  
    for (let g = 0; g <= 255; g += step) {
      for (let b = 0; b <= 255; b += step) {
        positions[`document-box-${counter}`] = {
          left: (counter % 12) * 50,
          top: Math.floor(counter / 12) * 50,
          right: ((counter % 12) * 50) + 50,
          bottom: (Math.floor(counter / 12) * 50) + 50,
          className: `box-${counter}`,
          color: `rgb(255, ${g}, ${b})`, // Red plane, moving towards white
        };
        counter++;
      }
    }
  
    for (let b = 0; b <= 255; b += step) {
      for (let r = 0; r <= 255; r += step) {
        positions[`document-box-${counter}`] = {
          left: (counter % 12) * 50,
          top: Math.floor(counter / 12) * 50,
          right: ((counter % 12) * 50) + 50,
          bottom: (Math.floor(counter / 12) * 50) + 50,
          className: `box-${counter}`,
          color: `rgb(${r}, 255, ${b})`, // Green plane, moving towards white
        };
        counter++;
      }
    }
  
    return positions;
  }
  
export default generateGradientCube
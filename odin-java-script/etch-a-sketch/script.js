const container = document.getElementById('grid-container');

function createGrid(size) {
    // Clear the existing grid
    container.innerHTML = '';
    
    const totalSquares = size * size;
    const squareSize = 960 / size; // Calculate the size of each square

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        // Add hover effect
        square.addEventListener('mouseover', () => {
            square.style.backgroundColor = 'lightblue'; // Change color on hover
        });

        container.appendChild(square);
    }
}

// Create initial grid
createGrid(16);

// Button to create a new grid
document.getElementById('new-grid-button').addEventListener('click', () => {
    let newSize = prompt("Enter the number of squares per side (max 100):");
    newSize = Math.min(Math.max(newSize, 1), 100); // Limit input between 1 and 100
    if (newSize) {
        createGrid(newSize);
    }
});
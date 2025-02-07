// Función para obtener los datos y crear la tabla
async function getData() {
  try {
    const response = await fetch('http://localhost:3000/api/data');
    const data = await response.json();
    
    // Obtener el contenedor de la tabla
    const tableBody = document.querySelector('#stations-table tbody');
    
    // Iterar sobre las líneas y estaciones
    Object.keys(data).forEach(line => {
      const lineData = data[line];
      
      // Crear una fila para cada estación
      lineData.estaciones.forEach(station => {
        const row = document.createElement('tr');
        
        // Columna para la línea
        const lineCell = document.createElement('td');
        lineCell.textContent = line.toUpperCase();  // Muestra la línea tal como está, como L1, L2, etc.
        
        // Columna para la estación
        const stationCell = document.createElement('td');
        stationCell.textContent = station.nombre;  // Nombre de la estación
        
        // Columna para el estado de la estación
        const stateCell = document.createElement('td');
        stateCell.textContent = station.descripcion;  // Descripción del estado
        
        // Agregar las celdas a la fila
        row.appendChild(lineCell);
        row.appendChild(stationCell);
        row.appendChild(stateCell);
        
        // Agregar la fila al cuerpo de la tabla
        tableBody.appendChild(row);
      });
    });
    
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

// Llamar a la función cuando la página se carga
getData();

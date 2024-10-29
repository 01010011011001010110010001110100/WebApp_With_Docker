// Elementos
const formMessagess = document.getElementById('formMessagess');
const nameInput = document.getElementById('nameInput');


// Cargar los nombres dentro del archivo
fetchNames();


// Obtener los nombres de la API
async function fetchNames() {

    // Limpiar mensajes
    formMessagess.textContent = '';

    // Cargar la data desde la API
    const response = await fetch('http://localhost:3000/api/messages');
    const data = await response.json();

    // Crear Elementos con la data del JSON
    data.forEach(message => {

        // Crear elemetons
        const messageContainer = document.createElement('div');
        const messageDate = document.createElement('h5');
        const messageContent = document.createElement('p');

        // Asignar clases
        messageContainer.classList.add("message-container");

        //Asignar valores
        messageDate.textContent = message.fecha;
        messageContent.textContent = message.contenido;

        // Unir elementos
        messageContainer.appendChild(messageDate);
        messageContainer.appendChild(messageContent);
        formMessagess.appendChild(messageContainer);
    });
}

// Agregar nombre a la API
async function addName() {
    // Agregarlo al JSON del server
    await fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contenido: nameInput.value })
    });

    // Limpiar y cargar nombres
    nameInput.value = '';
    fetchNames();
}

// Agregar evento de agregar nombre al boton 
document.getElementById('buttonAdd').addEventListener('click', function() {
    addName();
});
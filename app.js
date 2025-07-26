// Array para almacenar los nombres de los amigos
let amigos = [];

// Elementos del DOM
const inputAmigo = document.getElementById('amigo');
const listaAmigos = document.getElementById('listaAmigos');
const resultadoElement = document.getElementById('resultado');

/**
 * Agrega un amigo a la lista
 */
function agregarAmigo() {
    // Obtener y limpiar el nombre
    const nombreAmigo = inputAmigo.value.trim();
    
    // Validar que el campo no esté vacío
    if (!nombreAmigo) {
        mostrarAlerta('Por favor, inserte un nombre válido.');
        return;
    }
    
    // Validar que el nombre no exista ya en la lista
    if (amigos.includes(nombreAmigo)) {
        mostrarAlerta('Este nombre ya está en la lista.');
        return;
    }
    
    // Agregar el amigo al array
    amigos.push(nombreAmigo);
    
    // Limpiar el campo de entrada
    inputAmigo.value = '';
    
    // Actualizar la lista visual
    actualizarListaAmigos();
    
    // Enfocar nuevamente el input para mejor UX
    inputAmigo.focus();
}

/**
 * Actualiza la lista visual de amigos en el DOM
 */
function actualizarListaAmigos() {
    // Limpiar la lista existente
    listaAmigos.innerHTML = '';
    
    // Crear elementos li para cada amigo
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${amigo}`;
        
        // Agregar botón para eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => eliminarAmigo(index);
        
        li.appendChild(deleteBtn);
        listaAmigos.appendChild(li);
    });
}

/**
 * Elimina un amigo de la lista
 * @param {number} index - Índice del amigo a eliminar
 */
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarListaAmigos();
    limpiarResultado();
}

/**
 * Realiza el sorteo de un amigo secreto
 */
function sortearAmigo() {
    // Validar que haya amigos en la lista
    if (amigos.length === 0) {
        mostrarAlerta('Por favor, agregue al menos un amigo a la lista.');
        return;
    }
    
    // Limpiar resultado anterior
    limpiarResultado();
    
    // Mostrar animación de carga
    resultadoElement.textContent = 'Sorteando...';
    resultadoElement.style.color = 'var(--color-primary)';
    
    // Simular tiempo de sorteo para mejor experiencia
    setTimeout(() => {
        // Generar índice aleatorio
        const indiceAleatorio = Math.floor(Math.random() * amigos.length);
        const amigoSecreto = amigos[indiceAleatorio];
        
        // Mostrar resultado con estilo
        resultadoElement.innerHTML = `
            <span class="result-label">¡El amigo secreto es:</span>
            <span class="result-name">${amigoSecreto}</span>
        `;
        resultadoElement.style.color = 'var(--color-button)';
    }, 1000);
}

/**
 * Muestra una alerta al usuario
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarAlerta(mensaje) {
    alert(mensaje);
}

/**
 * Limpia el resultado del sorteo
 */
function limpiarResultado() {
    resultadoElement.textContent = '';
}

// Event listeners para mejor UX
inputAmigo.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarAmigo();
    }
});

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    inputAmigo.focus();
});
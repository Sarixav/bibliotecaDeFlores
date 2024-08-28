const URL_API = "http://localhost:3000/flowers";

// MÉTODO GET (READ)
async function getAllFlower() {
    try {
        const response = await fetch(URL_API, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return []; // Devuelve una lista vacía en caso de error
    }
}

// Obtener el elemento del DOM para la lista de flores
const listTag = document.getElementById('flowerList');

async function printFlower() {
    try {
        const flowers = await getAllFlower();
        listTag.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos

        flowers.forEach((flower) => {
            const listItem = document.createElement('li');
            listItem.className = 'max-w-sm rounded overflow-hidden shadow-md shadow-pink-400/60 hover:shadow-white/80 transition-all bg-pink-200 m-4 transform hover:scale-85';

            listItem.innerHTML = `
                <div class="px-6 py-4">
                    <div class="font-serif text-white text-center text-3xl mb-4 mt-2">${flower.nombre}</div>
                    <p class="text-pink-500 text-base">Tipo: ${flower.tipo}</p>
                    <p class="text-pink-500 text-base">Color: ${flower.color}</p>
                    <p class="text-pink-500 text-base">Altura media (metros): ${flower.alturaPromedio}</p>
                    <p class="text-pink-500 text-base">Zona: ${flower.zona}</p>
                </div>
                <div class="grid justify-items-center px-6 pt-4 pb-2">
                    <button onclick="updateFlower('${flower.id}', { nombre: 'Nuevo Nombre', tipo: 'Nuevo Tipo', color: 'Nuevo Color', alturaPromedio: 'Nueva Altura', zona: 'Nueva Zona' })" class="bg-pink-500 shadow-md shadow-pink-400/60 hover:shadow-white/80 transition-all text-white font-bold py-2 px-4 mb-2 w-full rounded">Actualizar</button>
                    <button onclick="deleteFlower('${flower.id}')" class="bg-white shadow-md shadow-pink-600/60 hover:shadow-pink-600/80 text-pink-500 transition-all font-bold py-2 px-4 w-full rounded mb-2">Eliminar</button>
                </div>
            `;

            listTag.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error printing flowers:", error);
    }
}

printFlower(); // Llamar a la función para mostrar las flores

// MÉTODO PUT (UPDATE)
async function updateFlower(id, updateFlowerData) {
    try {
        const response = await fetch(`${URL_API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateFlowerData)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar flor");
        }

        const result = await response.json();
        console.log("Flor actualizada:", result);
        printFlower(); // Refrescar la lista después de actualizar
        return result;
    } catch (error) {
        console.error("Error updating flower:", error);
    }
}


// MÉTODO POST (CREATE)
async function createFlower() {
    try {
        const form = document.getElementById("addFlower");
        const formData = new FormData(form);
        const newFlower = {
            nombre: formData.get("name"),
            color: formData.get("color"),
            tipo: formData.get("type"),  // Asegúrate de que el nombre coincide con el campo del formulario
            alturaPromedio: formData.get("height"),
            zona: formData.get("zone")
        };

        if (!newFlower.nombre || !newFlower.color || !newFlower.tipo || !newFlower.alturaPromedio || !newFlower.zona) {
            return alert("Todos los campos son obligatorios");
        }

        const response = await fetch(URL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFlower)
        });

        if (!response.ok) {
            throw new Error("Error al crear flor");
        }

        const result = await response.json();
        console.log("Flor creada:", result);
        printFlower(); // Refrescar la lista después de crear una nueva flor
    } catch (error) {
        console.error("Error creating flower:", error);
    }
}

// Manejar el envío del formulario
document.getElementById('addFlower').addEventListener('submit', function(event) {
    event.preventDefault();
    createFlower();
});

// MÉTODO DELETE
async function deleteFlower(id) {
    try {
        const response = await fetch(`${URL_API}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Error al eliminar la flor");
        }

        // Si la API no devuelve un JSON, elimina el siguiente bloque de código:
        try {
            const result = await response.json();
            console.log("Flor eliminada:", result);
        } catch (e) {
            console.log("Flor eliminada, sin respuesta JSON.");
        }

        printFlower(); // Refrescar la lista después de eliminar
    } catch (error) {
        console.error("Error deleting flower:", error);
    }
}

// Manejar el envío del formulario
document.getElementById('addFlower').addEventListener('submit', function(event) {
    event.preventDefault();
    createFlower();
});

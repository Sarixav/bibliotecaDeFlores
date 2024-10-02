const URL_API = "http://localhost:3000/flowers";

// MÉTODO GET (READ) - Leer y obtener todas las flores de la api
async function getAllFlower() {
    try {
        const response = await fetch(URL_API, {
            method: "GET",  //Obtener lista de flores
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`¡Algo salió mal!: ${response.status}`);
        }

        const data = await response.json();
        return data;
    
    } catch (error) {
        console.error("¡Algo salió mal!", error);
        return []; // Devuelve una lista vacía 
    }
}

const listTag = document.getElementById('flowerList');   //Obtener el elemento del DOM para 
                                                        //la lista de flores
async function printFlower() {
    try {
        const flowers = await getAllFlower();
        listTag.innerHTML = ''; //Antes de añadir, limpia el contenedor de flores 
                                //para eliminar cualquier dato antiguo.

        flowers.forEach((flower) => {  //Recorre cada flor y crea nuevo elemento
            const listItem = document.createElement('li'); 
            listItem.className = 'max-w-sm rounded overflow-hidden shadow-md shadow-pink-400/60 hover:shadow-white/80 transition-all bg-pink-200/95 m-4 transform hover:scale-85';
            listItem.innerHTML = `
                <div class="px-6 py-4">
                   <div class="font-serif text-white text-center text-3xl mb-4 mt-2">${flower.nombre}</div>
                      <ul class=" list-disc list-inside text-pink-500 text-base">
                          <li>Tipo: ${flower.tipo}</li>
                          <li>Color: ${flower.color}</li>
                          <li>Altura media (metros): ${flower.alturaPromedio}</li>
                          <li>Zona: ${flower.zona}</li>
                      </ul>
                    </div>
                <div class="grid justify-items-center px-6 pt-4 pb-2">
                    <button onclick="showUpdateForm('${flower.id}', '${flower.nombre}', '${flower.tipo}', '${flower.color}', '${flower.alturaPromedio}', '${flower.zona}')" class="bg-pink-500 shadow-md shadow-pink500/50 hover:shadow-white/100 transition-all text-white font-bold py-2 px-4 mb-2 w-full rounded">Actualizar</button>
                    <button onclick="deleteFlower('${flower.id}')" class="bg-white shadow-md shadow-pink-400/70 hover:shadow-pink-600/80 text-pink-500 transition-all font-bold py-2 px-4 w-full rounded mb-2">Eliminar</button>
                </div>
                `;

            listTag.appendChild(listItem);
        });
    } catch (error) {
        console.error("¡Algo salió mal!", error);
    }
}
printFlower(); 

// MÉTODO PUT (UPDATE) Actualizar y enviar datos al servidor
async function updateFlower(id, updateFlowerData) {
    try {
        const response = await fetch(`${URL_API}/${id}`, {
            method: "PUT",  //Enviar datos actualizados
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateFlowerData)
        });
        if (!response.ok) {                        //Verificar respuesta del servidor
            throw new Error("¡Algo salió mal!");
        }

        if (!updateFlowerData.nombre || !updateFlowerData.tipo || !updateFlowerData.color || !updateFlowerData.alturaPromedio || !updateFlowerData.zona) {
            return alert("Todos los campos son obligatorios"); // Mostrar un mensaje de error
             // Detener la ejecución de la función si hay campos vacíos
        }

        const result = await response.json();
        console.log("Flor actualizada:", result);
        printFlower(); 
    } catch (error) {
        console.error("¡Algo salió mal!", error);
    }
        
}
// Mostrar el formulario #actualizar
function showUpdateForm(id, nombre, tipo, color, alturaPromedio, zona) {
    document.getElementById('updateFlowerId').value = id; 
    document.getElementById('updateFlowerName').value = nombre;
    document.getElementById('updateFlowerType').value = tipo;
    document.getElementById('updateFlowerColor').value = color;
    document.getElementById('updateFlowerHeight').value = alturaPromedio;
    document.getElementById('updateFlowerZone').value = zona;
    document.getElementById('updateFlowerForm').classList.remove('hidden'); 
} 
// Ocultar el formulario #actualizar
function closeUpdateForm() {
    document.getElementById('updateFlowerForm').classList.add('hidden');
}

// Enviar los datos del formulario #actualizar
async function submitUpdateForm() {
    const id = document.getElementById('updateFlowerId').value; //Obtener valores
    const updateFlowerData = {                             //contiene datos recopilados
        nombre: document.getElementById('updateFlowerName').value,
        tipo: document.getElementById('updateFlowerType').value,
        color: document.getElementById('updateFlowerColor').value,
        alturaPromedio: document.getElementById('updateFlowerHeight').value,
        zona: document.getElementById('updateFlowerZone').value
    };

    await updateFlower(id, updateFlowerData);
    closeUpdateForm();
}
// MÉTODO POST (CREATE) Añadir nueva flor
async function createFlower() {  
    try {
        const form = document.getElementById("addFlower"); 
        const formData = new FormData(form);    //Recoge info del formulario
        const newFlower = {
            nombre: formData.get("name"),
            color: formData.get("color"),
            tipo: formData.get("type"),          // Asegúrarse de que el nombre coincide con el campo del formulario
            alturaPromedio: formData.get("height"),
            zona: formData.get("zone")
        };

        if (!newFlower.nombre || !newFlower.color || !newFlower.tipo || !newFlower.alturaPromedio || !newFlower.zona) {
            return alert("Todos los campos son obligatorios"); //validar que todos los campos esten completos
        }

        const response = await fetch(URL_API, {  //Enviar datos a traves de 'post'
            method: "POST", //Añade nueva flor
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFlower)
        });

        if (!response.ok) {                        //Verificar respuesta del servidor
            throw new Error("¡Algo salió mal!");
        }

        const result = await response.json();
        console.log("Flor creada:", result);
        printFlower(); 
    } catch (error) {
        console.error("Error al agregar flor:", error);
    }
}
// Envío del formulario #añadir
document.getElementById('addFlower').addEventListener('submit', function(event) {
    event.preventDefault();       //evitar que el formulario se envíe de la manera 
                                  //tradicional (el formulario se enviará al servidor)
                                  //y recarga la página
    createFlower();
});

// MÉTODO DELETE
async function deleteFlower(id) {
    try {
        const response = await fetch(`${URL_API}/${id}`, {
            method: "DELETE",  //Elimina flor
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

        printFlower(); //Actializa pagina despues de eliminar
    } catch (error) {
        console.error("Error al eliminar flor", error);
    }
}


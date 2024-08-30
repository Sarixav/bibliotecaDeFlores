
---

# 🌸 Biblioteca de Flores 🌼

## 📖 Descripción breve

"Biblioteca de Flores" es una aplicación web interactiva que permite a los usuarios explorar, añadir y gestionar una colección personal de flores. A través de una interfaz visualmente atractiva, los usuarios pueden ver una galería de flores, añadir nuevas flores a su biblioteca, actualizar la información existente y obtener consejos sobre el cuidado de las flores.

## ✨ Características

- 🌺 **Galería de Flores:** Los usuarios pueden explorar una colección de flores visualmente atractiva.
- 🌻 **Añadir Flores:** Permite a los usuarios agregar nuevas flores a su biblioteca personal.
- 🌷 **Actualizar Flores:** Los usuarios pueden actualizar la información de las flores existentes.
- 🌿 **Consejos de Cuidado:** Ofrece consejos prácticos para el cuidado adecuado de las flores.
- 🎨 **Interfaz Interactiva:** Utiliza un diseño moderno y receptivo con efectos visuales para mejorar la experiencia del usuario.

## 💻 Tecnologías Utilizadas

- **Frontend:**
  - 📝 HTML5
  - 🎨 CSS3 (con Tailwind CSS)
  - 🛠️ JavaScript

- **Backend:**
  - ⚙️ Node.js (con Express.js para la API)
  
- **API:** La aplicación se comunica con una API RESTful para realizar operaciones CRUD sobre las flores.

## 🔌 API Endpoints

La aplicación interactúa con una API que soporta las siguientes operaciones:

- **GET** `/flowers`: Obtiene todas las flores.
- **POST** `/flowers`: Añade una nueva flor.
- **PUT** `/flowers/:id`: Actualiza la información de una flor existente.
- **DELETE** `/flowers/:id`: Elimina una flor.

## 🛠️ Funcionamiento del Código

### 📄 HTML

- **Estructura de la página:** La página está organizada con diferentes secciones como el header, intro, galería de flores, cards de flores, consejos, testimonios, y footer.
- **Galería de flores:** Contiene una galería estática de imágenes que muestran diversas flores.
- **Formulario de Añadir Flor:** Un formulario que permite a los usuarios añadir nuevas flores a la lista interactiva.
- **Formulario de Actualización:** Un modal que se despliega cuando se quiere actualizar la información de una flor existente.

### ✍️ JavaScript

- **Servicios API:** El archivo `services.js` contiene la lógica para interactuar con la API usando `fetch`.
  - `getAllFlower()`: Realiza una petición GET para obtener todas las flores.
  - `addFlower(flower)`: Realiza una petición POST para añadir una nueva flor.
  - `updateFlower(flowerId, flower)`: Realiza una petición PUT para actualizar la información de una flor.
  - `deleteFlower(flowerId)`: Realiza una petición DELETE para eliminar una flor.
- **Manipulación del DOM:** Las funciones como `printFlower()` y `submitUpdateForm()` manejan la actualización y la visualización dinámica de las flores en la página.

## 🚀 Uso

- **Ver Flores:** Accede a la galería para explorar las diferentes flores.
- **Añadir Flor:** Completa el formulario "Añadir a tu biblioteca" para agregar una nueva flor.
- **Actualizar Flor:** Haz clic en la flor que deseas actualizar y completa el formulario emergente.
- **Consejos de Cuidado:** Consulta la sección de consejos para aprender cómo cuidar mejor tus flores.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes ideas para mejorar la aplicación, por favor abre un issue o envía un pull request.

---

🌷✨

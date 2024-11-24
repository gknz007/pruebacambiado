const myModal = new bootstrap.Modal("#exampleModal", {});
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const alertPlaceholder2 = document.getElementById("liveAlertPlaceholder2");
const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};
const appendAlert2 = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder2.append(wrapper);
};

function obtenerInformacion() {
  fetch("logica/tareas.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la red");
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then((data) => {
      if (data.length > 0) {
        completarTabla(data);
      } else {
        document.getElementById("contenidoTabla").innerHTML = `  <tr>
                                <td colspan="6" class="text-center table-warning" >Sin contenido</td>
                            </tr>`;
      }
    })
    .catch((error) => {
      console.error("Hubo un problema con la solicitud Fetch:", error);
    });
}

function save() {
  let nombre = document.getElementById("nombre").value;
  let descripcion = document.getElementById("contenido").value;
  let urlImg = document.getElementById("url").value;
  var url = "logica/tareas.php";
  var data = { nombre, descripcion, img: urlImg, save: 1 };

  fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      if (response.message == 200) {
        appendAlert("Se guardo la producto", "success");
        obtenerInformacion();
      }
    });
}

function completarTabla(data) {
  let string = "";
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let estado =
      item.estado == "1"
        ? { nombre: "Activo", class: "bg-info-subtle" }
        : item.estado == "2"
        ? { nombre: "Terminado", class: "bg-success-subtle" }
        : { nombre: "Eliminado", class: "bg-danger-subtle" };

    string += `<tr>
        <th scope="row">${item.id}</th>
        <td>${item.Nombre}</td>
        <td>${item.descripcion}</td>
           <td><img src="${item.url}" alt="${item.Nombre}" style="max-width: 100px; width:100%;" /></td>
        <td>
            <div class="${estado.class} text-secondary text-center p-1 border-opacity-10 rounded">
            ${estado.nombre}
            </div>
        </td>
        <td class="text-center" >
            <div class="btn-group" role="group" >
                <button type="button" class="btn btn-warning" 
                onclick="editData('${item.Nombre}','${item.descripcion}',${item.id},'${item.url}') " >Editar</button>
                <button type="button" class="btn btn-danger" onclick="updateEstado(${item.id},-1)" >Eliminar</button>
            </div>    
        </td>
    </tr>`;
  }
  document.getElementById("contenidoTabla").innerHTML = string;
}

function editData(nombre, descripcion, id, img) {
  document.getElementById("Uid").value = id;
  document.getElementById("UNombre").value = nombre;
  document.getElementById("Uurl").value = img;
  document.getElementById("UDescripcion").value = descripcion;

  myModal.show();
}
function update() {
  const id = document.getElementById("Uid").value;
  const nombre = document.getElementById("UNombre").value;
  const descripcion = document.getElementById("UDescripcion").value;
  const img = document.getElementById("Uurl").value;
  let data = { id, descripcion, nombre,img, update: 1 };

  var url = "logica/tareas.php";
  fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      if (response.message == 200) {
        appendAlert2("Se actualizo la producto", "success");
        myModal.hide();
        obtenerInformacion();
      } else {
        appendAlert2("No se actualizo la producto", "error");
      }
    });
}

function updateEstado(id, estado) {
  let data = { id, update: estado };

  var url = "logica/tareas.php";
  fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      if (response.message == 200) {
        if (estado == 2) {
          appendAlert2("Se Completo la producto", "info");
        } else {
          appendAlert2("Se Elimino la producto", "danger");
        }

        myModal.hide();
        obtenerInformacion();
      } else {
        appendAlert2("No se actualizo la producto", "error");
      }
    });
}

obtenerInformacion();

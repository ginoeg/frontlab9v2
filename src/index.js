const contenedor = document.querySelector("tbody");
let resultados = "";

const modalCategoria = new bootstrap.Modal(
  document.getElementById("modalCategoria")
);
const formCategoria = document.querySelector("form");
const nombre = document.getElementById("nombre");
var opcion = "";

const data = {};

nombre.onkeyup = function (event) {
  data.name = event.target.value;
};

async function getCategories() {
  try {
    const result = await get("/category");
    result.forEach((category) => renderRow(category));
  } catch (error) {
    console.log(error);
  }
}

getCategories();

btnCrear.addEventListener("click", () => {
  nombre.value = "";
  modalCategoria.show();
  opcion = "crear";
});

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

on(document, "click", ".btnBorrar", (e) => {
  const fila = e.target.parentNode.parentNode;
  const id = fila.firstElementChild.innerHTML;
  alertify.confirm(
    "This is a confirm dialog.",
    async function () {
      await remove("/category/", id);
    },
    function () {
      alertify.error("Cancel");
    }
  );
});

let idForm = 0;
on(document, "click", ".btnEditar", (e) => {
  const fila = e.target.parentNode.parentNode;
  idForm = fila.children[0].innerHTML;
  const nombreForm = fila.children[1].innerHTML;
  nombre.value = nombreForm;
  opcion = "editar";
  modalCategoria.show();
});

formCategoria.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (opcion == "crear") {
    const result = await post("/category", data);
    renderRow(result);
  }
  if (opcion == "editar") {
    await put("/category", idForm, data);
  }
  modalCategoria.hide();
});

function renderRow(category) {
  contenedor.innerHTML += `
        <tr>
          <td>${category.id}</td>
          <td>${category.name}</td>
          <td class="text-center"><a class="btnEditar btn btn-primary m-1">Editar</a><a class="btnBorrar btn btn-danger m-1">Borrar</a></td>
        </tr>
      `;
}

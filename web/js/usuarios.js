const APIURL = "http://localhost:3000/api/Usuario/";

// =======================
// Cargar usuarios (GET)
// =======================
async function cargarUsuarios() {

    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (response) {

            const tbody = $("#tablaUsuarios tbody");
            tbody.empty();

            response.forEach(usuario => {
                tbody.append(`
                    <tr>
                        <td>${usuario._id}</td>
                        <td>${usuario.nombreUsuario}</td>
                        <td>${usuario.correo}</td>
                        <td>${usuario.rol}</td>
                        <td>${usuario.estado}</td>
                        <td>
                            <button class="btn btn-primary btn-sm btn-editar" data-id="${usuario._id}">
                                <i class="fa fa-edit"></i>
                            </button>

                            <button class="btn btn-danger btn-sm btn-eliminar" data-id="${usuario._id}">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `);
            });

        },
        error: function (xhr) {
            console.error("Error al cargar usuarios:", xhr.responseText);
            alert("Error al cargar usuarios");
        }
    });

}

// =======================
// Guardar o Actualizar (POST / PUT)
// =======================
$("#btnGuardarUsuario").on("click", function () {
    const idUsuario = $("#idUsuario").val();

    const datos = {
        nombreUsuario: $("#nombreUsuario").val(),
        correo: $("#correoUsuario").val(),
        rol: $("#rolUsuario").val(),
        estado: $("#estadoUsuario").val()
    };

    if (!datos.nombreUsuario || !datos.correo || !datos.rol) {
        alert("Debe completar todos los campos!");
        return;
    }

    if (idUsuario) {
        // ======================= UPDATE (PUT) =======================
        $.ajax({
            type: "PUT",
            url: APIURL + idUsuario,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Usuario actualizado con éxito");
                cerrarModal();
                cargarUsuarios();
            },
            error: function () {
                alert("Error al actualizar usuario");
            }
        });

    } else {
        // ======================= CREAR (POST) =======================
        $.ajax({
            type: "POST",
            url: APIURL,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert("Usuario creado con éxito");
                cerrarModal();
                cargarUsuarios();
            },
            error: function () {
                alert("Falló la inserción de usuario");
            }
        });
    }
});

// =======================
// Llenar modal EDITAR (GET)
// =======================
$(document).on("click", ".btn-editar", function () {

    const id = $(this).data("id");

    $.ajax({
        type: "GET",
        url: APIURL + id,
        success: function (usuario) {
            $("#idUsuario").val(usuario._id);
            $("#nombreUsuario").val(usuario.nombreUsuario);
            $("#correoUsuario").val(usuario.correo);
            $("#rolUsuario").val(usuario.rol);
            $("#estadoUsuario").val(usuario.estado);

            const modal = new bootstrap.Modal(document.getElementById("modalUsuario"));
            modal.show();
        },
        error: function () {
            alert("No se pudo cargar el usuario");
        }
    });
});

// =======================
// Eliminar usuario (DELETE)
// =======================
$(document).on("click", ".btn-eliminar", function () {

    const id = $(this).data("id");

    if (!confirm("¿Seguro que desea eliminar este usuario?")) {
        return;
    }

    $.ajax({
        type: "DELETE",
        url: APIURL + id,
        success: function () {
            alert("Usuario eliminado");
            cargarUsuarios();
        },
        error: function () {
            alert("Error al eliminar usuario");
        }
    });

});

// =======================
// Función cerrar modal y limpiar
// =======================
function cerrarModal() {
    $("#formUsuario")[0].reset();
    $("#idUsuario").val("");
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalUsuario"));
    modal.hide();
}

// Ejecutar al cargar
cargarUsuarios();

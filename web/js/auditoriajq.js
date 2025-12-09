const APIURL = "http://localhost:3000/api/auditoria/";

async function cargarDatos() {

    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseAuditoria) {

            const tbody = $("#tablaAuditoria");
            tbody.empty();

            responseAuditoria.forEach(elementAuditoria => {
                tbody.append(`
                    <tr class="">
                        <td scope="row">${elementAuditoria._id}</td>
                        <td>${elementAuditoria.idUsuario}</td>
                        <td>${elementAuditoria.accion}</td>
                        <td>${elementAuditoria.fecha ? elementAuditoria.fecha.substring(0, 10) : ""}</td>
                        <td>${elementAuditoria.descripcion}</td>

                        <td>
                            <a class="btn btn-primary btn-sm btn-editar" data-id="${elementAuditoria._id}" href="#">
                                Editar
                            </a>

                            <a class="btn btn-danger btn-sm btn-eliminar" data-id="${elementAuditoria._id}" href="#">
                                Eliminar
                            </a>
                        </td>
                    </tr>
                `);
            });

        },
        error: function(xhr, status, error){
            console.error("Error al cargar auditorias:", error);
            console.error(xhr.responseText);
        }
    });

}

// ===============================
// Guardar nuevo proyecto (POST)
// ===============================
$("#auditoriaFormulario").on("submit", function (e) {
    e.preventDefault();

    const idUpdate = $("#auditoriaFormulario").attr("data-id");

    const datos = {
        idUsuario: $("#idUsuario").val(),
        accion: $("#accion").val(),
        fecha: $("#fecha").val(),
        descripcion: $("#descripcion").val()
    };

    if (idUpdate) {
        // ======================= UPDATE (PUT) =======================
        $.ajax({
            type: "PUT",
            url: APIURL + idUpdate,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (response) {
                console.log("Auditoria actrualizada:", response);
                $("#auditoriaFormulario")[0].reset();
                $("#auditoriaFormulario").removeAttr("data-id");
                cargarDatos();
                const modal = bootstrap.Modal.getInstance(document.getElementById("modalAuditoria"));
                modal.hide();
            },
            error: function (xhr) {
                console.error("Error al actualizar auditoria:", xhr.responseText);
                alert("Error al actualizar la auditoria");
            }
        });
    } else {
        // ======================= CREAR (POST) =======================
        $.ajax({
            type: "POST",
            url: APIURL,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (response) {
                console.log("Auditoria insertada:", response);
                $("#auditoriaFormulario")[0].reset();
                cargarDatos();
                const modal = bootstrap.Modal.getInstance(document.getElementById("modalAuditoria"));
                modal.hide();
            },
            error: function (xhr, status, error) {
                console.error("Error al insertar auditoria:", error);
                alert("Fallo la inserción de auditoria");
            }
        });
    }
});

// ===============================
// EDITAR proyecto (GET + llenar modal)
// ===============================
$(document).on("click", ".btn-editar", function (e) {
    e.preventDefault();
    const id = $(this).data("id");  // Obtén el ID del proyecto

    $.ajax({
        type: "GET",
        url: APIURL + id,  // Usa el ID en la URL
        success: function (proyecto) {
            // Llena el formulario con los datos del proyecto
            $("#idUsuario").val(proyecto.idUsuario);
            $("#accion").val(proyecto.accion);
            $("#fecha").val(proyecto.fecha ? proyecto.fecha.substring(0,10) : "");
            $("#descripcion").val(proyecto.descripcion);

            // Agrega el ID al formulario para futuras actualizaciones
            $("#auditoriaFormulario").attr("data-id", id);
            const modal = new bootstrap.Modal(document.getElementById("modalAuditoria"));
            modal.show();
        },
        error: function (xhr) {
            console.error("Error al cargar la auditoria:", xhr.responseText);
            alert("No se pudo cargar la auditoria");
        }
    });
});


$(document).on("click", ".btn-eliminar", function() {

    const id = $(this).data("id");

    if (!confirm("¿Seguro que desea eliminar esta auditoria?")) {
        return;
    }

    $.ajax({
        type: "DELETE",
        url: APIURL + id,
        success: function () {
            cargarDatos();
        },
        error: function(xhr){
            console.error("Error al eliminar:", xhr.responseText);
        }
    });

});

cargarDatos();

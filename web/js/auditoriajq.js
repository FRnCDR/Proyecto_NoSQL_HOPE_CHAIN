const APIURL = "http://localhost:3000/api/auditoria/";


// Cargar Auditorías (GET)
function cargarDatos() {

    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseAuditoria) {

            const tbody = $("#tablaAuditoria");
            tbody.empty();

            responseAuditoria.forEach(a => {
                tbody.append(`
                    <tr>
                        <td>${a._id}</td>
                        <td>${a.idUsuario}</td>
                        <td>${a.accion}</td>
                        <td>${a.fecha ? a.fecha.substring(0, 10) : ""}</td>
                        <td>${a.descripcion ?? ""}</td>

                        <td>
                            <a class="btn btn-primary btn-sm btn-editar" data-id="${a._id}" href="#">
                                Editar
                            </a>

                            <a class="btn btn-danger btn-sm btn-eliminar" data-id="${a._id}" href="#">
                                Eliminar
                            </a>
                        </td>
                    </tr>
                `);
            });

        },
        error: function (xhr, status, error) {
            console.error("Error al cargar auditorias:", error);
            console.error(xhr.responseText);
        }
    });

}



// Guardar Auditoría (POST o PUT)
$("#auditoriaFormulario").on("submit", function (e) {
    e.preventDefault();

    const idUpdate = $("#auditoriaFormulario").attr("data-id");

    const datos = {
        idUsuario: $("#idUsuario").val(),
        accion: $("#accion").val(),
        fecha: new Date($("#fecha").val()),  
        descripcion: $("#descripcion").val()
    };

    console.log("Enviando datos:", datos);

    if (idUpdate) {

// UPDATE (PUT)
        $.ajax({
            type: "PUT",
            url: APIURL + idUpdate,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (response) {

                console.log("Auditoría actualizada:", response);

                $("#auditoriaFormulario")[0].reset();
                $("#auditoriaFormulario").removeAttr("data-id");
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalAuditoria"));
                modal.hide();
            },
            error: function (xhr) {
                console.error("Error al actualizar auditoría:", xhr.responseText);
                alert("Error al actualizar la auditoría");
            }
        });

    } else {

// CREAR (POST)
        $.ajax({
            type: "POST",
            url: APIURL,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (response) {

                console.log("Auditoría insertada:", response);

                $("#auditoriaFormulario")[0].reset();
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalAuditoria"));
                modal.hide();
            },
            error: function (xhr, status, error) {
                console.error("Error al insertar auditoría:", error);
                console.error(xhr.responseText);
                alert("Fallo la inserción de auditoría");
            }
        });

    }

});



// EDITAR Auditoría (GET por ID)
$(document).on("click", ".btn-editar", function (e) {
    e.preventDefault();

    const id = $(this).data("id");

    $.ajax({
        type: "GET",
        url: APIURL + id,
        success: function (a) {

            $("#idUsuario").val(a.idUsuario);
            $("#accion").val(a.accion);
            $("#fecha").val(a.fecha ? a.fecha.substring(0, 10) : "");
            $("#descripcion").val(a.descripcion);

            $("#auditoriaFormulario").attr("data-id", id);

            const modal = new bootstrap.Modal(document.getElementById("modalAuditoria"));
            modal.show();
        },
        error: function (xhr) {
            console.error("Error al cargar auditoría:", xhr.responseText);
            alert("No se pudo cargar la auditoría para edición");
        }
    });
});



// ELIMINAR Auditoría (DELETE)
$(document).on("click", ".btn-eliminar", function (e) {
    e.preventDefault();

    const id = $(this).data("id");

    if (!confirm("¿Seguro que desea eliminar esta auditoría?")) return;

    $.ajax({
        type: "DELETE",
        url: APIURL + id,
        success: function () {
            cargarDatos();
        },
        error: function (xhr) {
            console.error("Error al eliminar auditoría:", xhr.responseText);
            alert("No se pudo eliminar la auditoría");
        }
    });

});

// CARGA INICIAL
cargarDatos();

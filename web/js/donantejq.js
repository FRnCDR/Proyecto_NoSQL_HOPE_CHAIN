const APIURL = "http://localhost:3000/api/Donante/";

// ===============================
// Cargar la lista en la tabla
// ===============================
function cargarDatos() {

    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseDonantes) {

            const tbody = $("#tablaDonantes");
            tbody.empty();

            responseDonantes.forEach(d => {
                tbody.append(`
                    <tr>
                        <td>${d._id}</td>
                        <td>${d.nombre}</td>
                        <td>${d.identificacion}</td>
                        <td>${d.correo}</td>
                        <td>${d.telefono}</td>
                        <td>${d.estado}</td>
                        <td>
                            <a class="btn btn-primary btn-sm btn-editar" data-id="${d._id}" href="#">
                                Editar
                            </a>
                            <a class="btn btn-danger btn-sm btn-eliminar" data-id="${d._id}" href="#">
                                Eliminar
                            </a>
                        </td>
                    </tr>
                `);
            });

        },
        error: function (xhr, status, error) {
            console.error("Error al cargar donantes:", error);
            console.error("Respuesta servidor:", xhr.responseText);
            alert("Error al cargar donantes");
        }
    });

}



// ===============================
// Guardar / Actualizar Donante
// ===============================
$("#donanteFormulario").on("submit", function (e) {
    e.preventDefault();

    // Si el form tiene data-id → es edición (PUT), si no → creación (POST)
    const idUpdate = $("#donanteFormulario").attr("data-id");

    const datos = {
        nombre: $("#nombre").val(),
        identificacion: $("#identificacionDonante").val(),
        correo: $("#correo").val(),
        telefono: $("#telefono").val(),
        estado: $("#estado").val()
    };

    console.log("Datos enviados:", datos);

    if (idUpdate) {
        // =======================
        // UPDATE (PUT)
        // =======================
        $.ajax({
            type: "PUT",
            url: APIURL + idUpdate,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (response) {
                console.log("Actualizado:", response);

                $("#donanteFormulario")[0].reset();
                $("#donanteFormulario").removeAttr("data-id");
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalDonante"));
                modal.hide();
            },
            error: function (xhr) {
                console.error("Error al actualizar:", xhr.responseText);
                alert("Error al actualizar el donante");
            }
        });

    } else {
        // =======================
        // CREAR (POST)
        // =======================
        $.ajax({
            type: "POST",
            url: APIURL,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (response) {
                console.log("Insertado:", response);

                $("#donanteFormulario")[0].reset();
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalDonante"));
                modal.hide();
            },
            error: function (xhr, status, error) {
                console.error("Error al insertar:", error);
                console.error("Respuesta servidor:", xhr.responseText);
                alert("Fallo la inserción de donante");
            }
        });
    }

});



// ===============================
// EDITAR (GET + llenar modal)
// ===============================
// OJO: necesitas un GET /api/Donante/:id en DonantesRoutes.js
$(document).on("click", ".btn-editar", function (e) {

    e.preventDefault();
    const id = $(this).data("id");

    $.ajax({
        type: "GET",
        url: APIURL + id,
        success: function (d) {

            $("#nombre").val(d.nombre);
            $("#identificacionDonante").val(d.identificacion);
            $("#correo").val(d.correo);
            $("#telefono").val(d.telefono);
            $("#estado").val(d.estado);

            $("#donanteFormulario").attr("data-id", id);

            const modal = new bootstrap.Modal(document.getElementById("modalDonante"));
            modal.show();
        },
        error: function (xhr) {
            console.error("Error al cargar donante:", xhr.responseText);
            alert("No se pudo cargar el donante para edición");
        }
    });

});



// ===============================
// ELIMINAR (DELETE)
// ===============================
$(document).on("click", ".btn-eliminar", function (e) {

    e.preventDefault();
    const id = $(this).data("id");

    if (!confirm("¿Seguro que desea eliminar este donante?")) return;

    $.ajax({
        type: "DELETE",
        url: APIURL + id,
        success: function () {
            cargarDatos();
        },
        error: function (xhr) {
            console.error("Error al eliminar:", xhr.responseText);
            alert("No se pudo eliminar el donante");
        }
    });

});



// ===============================
// BOTÓN GUARDAR → dispara submit
// ===============================
$("#btnGuardarDonante").on("click", function () {
    $("#donanteFormulario").submit();
});



// ===============================
// CARGA INICIAL
// ===============================
cargarDatos();

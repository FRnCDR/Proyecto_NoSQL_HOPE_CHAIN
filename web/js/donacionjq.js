const APIURL = "http://localhost:3000/api/Donacion/";


// Cargar Donaciones (GET)
function cargarDatos() {
    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseDonaciones) {
            const tbody = $("#tablaDonaciones");
            tbody.empty();

            responseDonaciones.forEach(donacion => {
                tbody.append(`
                    <tr>
                        <td>${donacion._id}</td>
                        <td>${donacion.idDonante}</td>
                        <td>₡${donacion.monto}</td>
                        <td>${donacion.fecha ? donacion.fecha.substring(0, 10) : ""}</td>
                        <td>${donacion.metodoPago}</td>
                        <td>${donacion.estado}</td>
                        <td>
                            <a class="btn btn-primary btn-sm btn-editar" data-id="${donacion._id}" href="#">Editar</a>
                            <a class="btn btn-danger btn-sm btn-eliminar" data-id="${donacion._id}" href="#">Eliminar</a>
                        </td>
                    </tr>
                `);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar donaciones:", error);
            alert("Error al cargar las donaciones");
        }
    });
}



// Guardar Donación (POST o PUT)
$("#donacionFormulario").on("submit", function (e) {
    e.preventDefault();

    const idUpdate = $("#donacionFormulario").attr("data-id");

    const datos = {
        idDonante: $("#idDonante").val(),
        monto: $("#monto").val(),
        fecha: $("#fecha").val(),
        metodoPago: $("#metodoPago").val(),
        estado: $("#estado").val()
    };

    if (idUpdate) {
        // UPDATE (PUT)
        $.ajax({
            type: "PUT",
            url: APIURL + idUpdate,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (response) {
                console.log("Donación actualizada:", response);
                $("#donacionFormulario")[0].reset();
                $("#donacionFormulario").removeAttr("data-id");
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalDonacion"));
                modal.hide();
            },
            error: function (xhr) {
                console.error("Error al actualizar donación:", xhr.responseText);
                alert("Error al actualizar la donación");
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
                console.log("Donación insertada:", response);
                $("#donacionFormulario")[0].reset();
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalDonacion"));
                modal.hide();
            },
            error: function (xhr, status, error) {
                console.error("Error al insertar donación:", error);
                alert("Fallo la inserción de la donación");
            }
        });
    }
});



// EDITAR Donación (GET por ID)
$(document).on("click", ".btn-editar", function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    $.ajax({
        type: "GET",
        url: APIURL + id,
        success: function (donacion) {

            $("#idDonante").val(donacion.idDonante);
            $("#monto").val(donacion.monto);
            $("#fecha").val(donacion.fecha ? donacion.fecha.substring(0, 10) : "");
            $("#metodoPago").val(donacion.metodoPago);
            $("#estado").val(donacion.estado);

            $("#donacionFormulario").attr("data-id", id);

            const modal = new bootstrap.Modal(document.getElementById("modalDonacion"));
            modal.show();
        },
        error: function (xhr) {
            console.error("Error al cargar la donación:", xhr.responseText);
            alert("No se pudo cargar la donación para edición");
        }
    });
});



// ELIMINAR Donación (DELETE)
$(document).on("click", ".btn-eliminar", function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    if (!confirm("¿Seguro que desea eliminar esta donación?")) return;

    $.ajax({
        type: "DELETE",
        url: APIURL + id,
        success: function () {
            cargarDatos();
        },
        error: function (xhr) {
            console.error("Error al eliminar donación:", xhr.responseText);
            alert("No se pudo eliminar la donación");
        }
    });
});

// CARGA INICIAL
cargarDatos();

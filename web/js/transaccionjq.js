const APIURL = "http://localhost:3000/api/Transaccion/";


// Cargar Transacciones (GET)
function cargarDatos() {
    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseTransacciones) {
            const tbody = $("#tablaTransacciones");
            tbody.empty();

            responseTransacciones.forEach(tx => {
                tbody.append(`
                    <tr>
                        <td>${tx._id}</td>
                        <td>${tx.idDonacion}</td>
                        <td>${tx.tipo}</td>
                        <td>₡${tx.monto}</td>
                        <td>${tx.fecha ? tx.fecha.substring(0, 10) : ""}</td>
                        <td>
                            <a class="btn btn-primary btn-sm btn-editar" data-id="${tx._id}" href="#">Editar</a>
                            <a class="btn btn-danger btn-sm btn-eliminar" data-id="${tx._id}" href="#">Eliminar</a>
                        </td>
                    </tr>
                `);
            });

        },
        error: function (xhr, status, error) {
            console.error("Error al cargar transacciones:", error);
            alert("Error al cargar las transacciones");
        }
    });
}



// Guardar Transacción (POST o PUT)
$("#transaccionFormulario").on("submit", function (e) {
    e.preventDefault();

    const idUpdate = $("#transaccionFormulario").attr("data-id");

    const datos = {
        idDonacion: $("#idDonacion").val(),
        tipo: $("#tipo").val(),
        monto: $("#monto").val(),
        fecha: $("#fecha").val()
    };

    if (idUpdate) {
        // UPDATE (PUT)
        $.ajax({
            type: "PUT",
            url: APIURL + idUpdate,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (response) {
                console.log("Transacción actualizada:", response);
                $("#transaccionFormulario")[0].reset();
                $("#transaccionFormulario").removeAttr("data-id");
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalTransaccion"));
                modal.hide();
            },
            error: function (xhr) {
                console.error("Error al actualizar transacción:", xhr.responseText);
                alert("Error al actualizar la transacción");
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
                console.log("Transacción creada:", response);
                $("#transaccionFormulario")[0].reset();
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalTransaccion"));
                modal.hide();
            },
            error: function () {
                alert("Fallo la inserción de la transacción");
            }
        });
    }
});



// EDITAR Transacción (GET por ID)
$(document).on("click", ".btn-editar", function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    $.ajax({
        type: "GET",
        url: APIURL + id,
        success: function (tx) {

            $("#idDonacion").val(tx.idDonacion);
            $("#tipo").val(tx.tipo);
            $("#monto").val(tx.monto);
            $("#fecha").val(tx.fecha ? tx.fecha.substring(0, 10) : "");

            $("#transaccionFormulario").attr("data-id", id);

            const modal = new bootstrap.Modal(document.getElementById("modalTransaccion"));
            modal.show();
        },
        error: function (xhr) {
            console.error("Error al cargar transacción:", xhr.responseText);
            alert("No se pudo cargar la transacción para edición");
        }
    });
});



// ELIMINAR Transacción (DELETE)
$(document).on("click", ".btn-eliminar", function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    if (!confirm("¿Seguro que desea eliminar esta transacción?")) return;

    $.ajax({
        type: "DELETE",
        url: APIURL + id,
        success: function () {
            cargarDatos();
        },
        error: function (xhr) {
            console.error("Error al eliminar transacción:", xhr.responseText);
            alert("No se pudo eliminar la transacción");
        }
    });
});




// CARGA INICIAL
cargarDatos();

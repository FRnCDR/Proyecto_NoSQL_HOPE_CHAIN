const APIURL = "http://localhost:3000/api/Donante/";

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

$("#donanteFormulario").on("submit", function (e) {
    e.preventDefault();

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

$("#btnGuardarDonante").on("click", function () {
    $("#donanteFormulario").submit();
});

cargarDatos();

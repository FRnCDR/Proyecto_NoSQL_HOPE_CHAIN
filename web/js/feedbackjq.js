const APIURL = "http://localhost:3000/api/Feedback/";


// Cargar Feedbacks (GET)
function cargarDatos() {
    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseFeedback) {
            const tbody = $("#tablaFeedback");
            tbody.empty();

            responseFeedback.forEach(fb => {
                tbody.append(`
                    <tr>
                        <td>${fb._id}</td>
                        <td>${fb.autor}</td>
                        <td>${fb.mensaje}</td>
                        <td>${fb.calificacion}</td>
                        <td>${fb.estado}</td>
                        <td>
                            <a class="btn btn-primary btn-sm btn-editar" data-id="${fb._id}" href="#">Editar</a>
                            <a class="btn btn-danger btn-sm btn-eliminar" data-id="${fb._id}" href="#">Eliminar</a>
                        </td>
                    </tr>
                `);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar feedback:", error);
            alert("Error al cargar los feedbacks");
        }
    });
}



// Guardar Feedback (POST o PUT)
$("#feedbackFormulario").on("submit", function (e) {
    e.preventDefault();

    const idUpdate = $("#feedbackFormulario").attr("data-id");

    const datos = {
        autor: $("#autor").val(),
        mensaje: $("#mensaje").val(),
        calificacion: $("#calificacion").val(),
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
                console.log("Feedback actualizado:", response);
                $("#feedbackFormulario")[0].reset();
                $("#feedbackFormulario").removeAttr("data-id");
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalFeedback"));
                modal.hide();
            },
            error: function (xhr) {
                console.error("Error al actualizar feedback:", xhr.responseText);
                alert("Error al actualizar el feedback");
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
                console.log("Feedback insertado:", response);
                $("#feedbackFormulario")[0].reset();
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalFeedback"));
                modal.hide();
            },
            error: function () {
                console.error("Error al insertar feedback");
                alert("Fallo la inserción del feedback");
            }
        });
    }
});



// EDITAR Feedback (GET por ID)
$(document).on("click", ".btn-editar", function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    $.ajax({
        type: "GET",
        url: APIURL + id,
        success: function (fb) {

            $("#autor").val(fb.autor);
            $("#mensaje").val(fb.mensaje);
            $("#calificacion").val(fb.calificacion);
            $("#estado").val(fb.estado);

            $("#feedbackFormulario").attr("data-id", id);

            const modal = new bootstrap.Modal(document.getElementById("modalFeedback"));
            modal.show();
        },
        error: function (xhr) {
            console.error("Error al cargar feedback:", xhr.responseText);
            alert("No se pudo cargar el feedback para edición");
        }
    });
});



// ELIMINAR Feedback (DELETE)
$(document).on("click", ".btn-eliminar", function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    if (!confirm("¿Seguro que desea eliminar este feedback?")) return;

    $.ajax({
        type: "DELETE",
        url: APIURL + id,
        success: function () {
            cargarDatos();
        },
        error: function (xhr) {
            console.error("Error al eliminar feedback:", xhr.responseText);
            alert("No se pudo eliminar el feedback");
        }
    });
});



// CARGA INICIAL
cargarDatos();

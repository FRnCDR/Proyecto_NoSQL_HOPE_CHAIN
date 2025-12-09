const APIURL = "http://localhost:3000/api/reporteImpacto/";


// Cargar Reportes (GET)
function cargarDatos() {
    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseReportes) {

            const tbody = $("#tablaReportes");
            tbody.empty();

            responseReportes.forEach(r => {
                tbody.append(`
                    <tr>
                        <td>${r._id}</td>
                        <td>${r.proyecto}</td>
                        <td>${r.beneficiariosAtendidos}</td>
                        <td>${r.periodo}</td>
                        <td>${r.estado}</td>
                        <td>
                            <a class="btn btn-primary btn-sm btn-editar" data-id="${r._id}" href="#">Editar</a>
                            <a class="btn btn-danger btn-sm btn-eliminar" data-id="${r._id}" href="#">Eliminar</a>
                        </td>
                    </tr>
                `);
            });

        },
        error: function (xhr, status, error) {
            console.error("Error al cargar reportes:", error);
            alert("Error al cargar los reportes");
        }
    });
}




// Guardar Reporte (POST o PUT)

$("#reporteFormulario").on("submit", function (e) {
    e.preventDefault();

    const idUpdate = $("#reporteFormulario").attr("data-id");

    const datos = {
        proyecto: $("#proyecto").val(),
        beneficiariosAtendidos: $("#beneficiariosAtendidos").val(),
        periodo: $("#periodo").val(),
        estado: $("#estado").val()
    };

    if (idUpdate) {
//  UPDATE 
        $.ajax({
            type: "PUT",
            url: APIURL + idUpdate,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (response) {

                console.log("Reporte actualizado:", response);
                $("#reporteFormulario")[0].reset();
                $("#reporteFormulario").removeAttr("data-id");
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalReporte"));
                modal.hide();
            },
            error: function (xhr) {
                console.error("Error al actualizar reporte:", xhr.responseText);
                alert("Error al actualizar el reporte");
            }
        });

    } else {

//  CREAR (POST) 
        $.ajax({
            type: "POST",
            url: APIURL,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (response) {
                console.log("Reporte creado:", response);
                $("#reporteFormulario")[0].reset();
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalReporte"));
                modal.hide();
            },
            error: function (xhr) {
                console.error("Error al insertar reporte:", xhr.responseText);
                alert("Error al insertar el reporte");
            }
        });
    }
});




// EDITAR (GET por ID)
$(document).on("click", ".btn-editar", function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    $.ajax({
        type: "GET",
        url: APIURL + id,
        success: function (r) {

            $("#proyecto").val(r.proyecto);
            $("#beneficiariosAtendidos").val(r.beneficiariosAtendidos);
            $("#periodo").val(r.periodo);
            $("#estado").val(r.estado);

            $("#reporteFormulario").attr("data-id", id);

            const modal = new bootstrap.Modal(document.getElementById("modalReporte"));
            modal.show();
        },
        error: function (xhr) {
            console.error("Error al cargar reporte:", xhr.responseText);
            alert("No se pudo cargar el reporte para edición");
        }
    });
});




// ELIMINAR Reporte
$(document).on("click", ".btn-eliminar", function (e) {
    e.preventDefault();

    const id = $(this).data("id");

    if (!confirm("¿Seguro que desea eliminar este reporte?")) return;

    $.ajax({
        type: "DELETE",
        url: APIURL + id,
        success: function () {
            cargarDatos();
        },
        error: function (xhr) {
            console.error("Error al eliminar:", xhr.responseText);
            alert("No se pudo eliminar el reporte");
        }
    });
});



// CARGA INICIAL
cargarDatos();

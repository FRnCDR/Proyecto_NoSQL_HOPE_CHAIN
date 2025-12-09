const APIURL = "http://localhost:3000/api/Ubicacion/";


// Cargar Ubicaciones (GET)
function cargarDatos() {
    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseUbicaciones) {
            const tbody = $("#tablaUbicaciones");
            tbody.empty();

            responseUbicaciones.forEach(u => {
                tbody.append(`
                    <tr>
                        <td>${u._id}</td>
                        <td>${u.pais}</td>
                        <td>${u.region}</td>
                        <td>${u.sede}</td>
                        <td>${u.estado}</td>
                        <td>
                            <a class="btn btn-primary btn-sm btn-editar" data-id="${u._id}" href="#">Editar</a>
                            <a class="btn btn-danger btn-sm btn-eliminar" data-id="${u._id}" href="#">Eliminar</a>
                        </td>
                    </tr>
                `);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar ubicaciones:", error);
            alert("Error al cargar las ubicaciones");
        }
    });
}



// Guardar Ubicación (POST o PUT)
$("#ubicacionFormulario").on("submit", function (e) {
    e.preventDefault();

    const idUpdate = $("#ubicacionFormulario").attr("data-id");

    const datos = {
        pais: $("#pais").val(),
        region: $("#region").val(),
        sede: $("#sede").val(),
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
                console.log("Ubicación actualizada:", response);
                $("#ubicacionFormulario")[0].reset();
                $("#ubicacionFormulario").removeAttr("data-id");
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalUbicacion"));
                modal.hide();
            },
            error: function (xhr) {
                console.error("Error al actualizar ubicación:", xhr.responseText);
                alert("Error al actualizar la ubicación");
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
                console.log("Ubicación insertada:", response);
                $("#ubicacionFormulario")[0].reset();
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalUbicacion"));
                modal.hide();
            },
            error: function () {
                alert("Fallo la inserción de la ubicación");
            }
        });
    }
});



// EDITAR Ubicación (GET por ID)
$(document).on("click", ".btn-editar", function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    $.ajax({
        type: "GET",
        url: APIURL + id,
        success: function (ubi) {

            $("#pais").val(ubi.pais);
            $("#region").val(ubi.region);
            $("#sede").val(ubi.sede);
            $("#estado").val(ubi.estado);

            $("#ubicacionFormulario").attr("data-id", id);

            const modal = new bootstrap.Modal(document.getElementById("modalUbicacion"));
            modal.show();
        },
        error: function (xhr) {
            console.error("Error al cargar la ubicación:", xhr.responseText);
            alert("No se pudo cargar la ubicación para edición");
        }
    });
});



// ELIMINAR Ubicación (DELETE)
$(document).on("click", ".btn-eliminar", function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    if (!confirm("¿Seguro que desea eliminar esta ubicación?")) return;

    $.ajax({
        type: "DELETE",
        url: APIURL + id,
        success: function () {
            cargarDatos();
        },
        error: function (xhr) {
            console.error("Error al eliminar ubicación:", xhr.responseText);
            alert("No se pudo eliminar la ubicación");
        }
    });
});



// CARGA INICIAL
cargarDatos();

const APIURL = "http://localhost:3000/api/organizacion/";

async function cargarDatos() {

    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseOrganizacion) {

            const tbody = $("#tablaOrganizacion");
            tbody.empty();

            responseOrganizacion.forEach(elementOrganizacion => {
                tbody.append(`
                    <tr class="">
                        <td scope="row">${elementOrganizacion._id}</td>
                        <td>${elementOrganizacion.nombre}</td>
                        <td>${elementOrganizacion.representante}</td>
                        <td>${elementOrganizacion.correo}</td>
                        <td>${elementOrganizacion.telefono}</td>
                        <td>${elementOrganizacion.estado}</td>

                        <td>
                            <a class="btn btn-primary btn-sm btn-editar" data-id="${elementOrganizacion._id}" href="#">
                                Editar
                            </a>

                            <a class="btn btn-danger btn-sm btn-eliminar" data-id="${elementOrganizacion._id}" href="#">
                                Eliminar
                            </a>
                        </td>
                    </tr>
                `);
            });

        },
        error: function(xhr, status, error){
            console.error("Error al cargar organizaciones:", error);
            console.error(xhr.responseText);
        }
    });

}

// ===============================
// Guardar nuevo proyecto (POST)
// ===============================
$("#organizacionFormulario").on("submit", function (e) {
    e.preventDefault();

    const idUpdate = $("#organizacionFormulario").attr("data-id");

    const datos = {
        nombre: $("#nombre").val(),
        representante: $("#representante").val(),
        correo: $("#correo").val(),
        telefono: $("#telefono").val(),
        estado: $("#estado").val()
    };

    if (idUpdate) {
        // ======================= UPDATE (PUT) =======================
        $.ajax({
            type: "PUT",
            url: APIURL + idUpdate,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (response) {
                console.log("Organización actrualizada:", response);
                $("#organizacionFormulario")[0].reset();
                $("#organizacionFormulario").removeAttr("data-id");
                cargarDatos();
                const modal = bootstrap.Modal.getInstance(document.getElementById("modalOrganizacion"));
                modal.hide();
            },
            error: function (xhr) {
                console.error("Error al actualizar organizacion:", xhr.responseText);
                alert("Error al actualizar la organizacion");
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
                console.log("Organizacion insertada:", response);
                $("#organizacionFormulario")[0].reset();
                cargarDatos();
                const modal = bootstrap.Modal.getInstance(document.getElementById("modalOrganizacion"));
                modal.hide();
            },
            error: function (xhr, status, error) {
                console.error("Error al insertar organizacion:", error);
                alert("Fallo la inserción de organizacion");
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
            $("#nombre").val(proyecto.nombre);
            $("#representante").val(proyecto.representante);
            $("#correo").val(proyecto.correo);
            $("#telefono").val(proyecto.telefono);
            $("#estado").val(proyecto.estado);

            // Agrega el ID al formulario para futuras actualizaciones
            $("#organizacionFormulario").attr("data-id", id);
            const modal = new bootstrap.Modal(document.getElementById("modalOrganizacion"));
            modal.show();
        },
        error: function (xhr) {
            console.error("Error al cargar la organizacion:", xhr.responseText);
            alert("No se pudo cargar la oranizacion");
        }
    });
});


$(document).on("click", ".btn-eliminar", function() {

    const id = $(this).data("id");

    if (!confirm("¿Seguro que desea eliminar esta campaña?")) {
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
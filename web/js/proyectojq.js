const APIURL = "http://localhost:3000/api/ProyectoSolidario/";


function cargarDatos() {
    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseProyectos) {
            const tbody = $("#tablaProyectos");
            tbody.empty();

            responseProyectos.forEach(proyecto => {
                tbody.append(`
                    <tr>
                        <td>${proyecto._id}</td>
                        <td>${proyecto.nombre}</td>
                        <td>${proyecto.descripcion}</td>
                        <td>${proyecto.fechaInicio ? proyecto.fechaInicio.substring(0, 10) : ""}</td>
                        <td>${proyecto.fechaFin ? proyecto.fechaFin.substring(0, 10) : ""}</td>
                        <td>${proyecto.estado}</td>
                        <td>
                            <a class="btn btn-primary btn-sm btn-editar" data-id="${proyecto._id}" href="#">Editar</a>
                            <a class="btn btn-danger btn-sm btn-eliminar" data-id="${proyecto._id}" href="#">Eliminar</a>
                        </td>
                    </tr>
                `);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar proyectos:", error);
            alert("Error al cargar proyectos");
        }
    });
}


$("#proyectoFormulario").on("submit", function (e) {
    e.preventDefault();

    const idUpdate = $("#proyectoFormulario").attr("data-id");

    const datos = {
        nombre: $("#nombre").val(),
        descripcion: $("#descripcion").val(),
        fechaInicio: $("#inicio").val(),
        fechaFin: $("#fin").val(),
        estado: $("#estado").val()
    };

    if (idUpdate) {
        //UPDATE (PUT) 
        $.ajax({
            type: "PUT",
            url: APIURL + idUpdate,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (response) {
                console.log("Proyecto actualizado:", response);
                $("#proyectoFormulario")[0].reset();
                $("#proyectoFormulario").removeAttr("data-id");
                cargarDatos();
                const modal = bootstrap.Modal.getInstance(document.getElementById("modalProyecto"));
                modal.hide();
            },
            error: function (xhr) {
                console.error("Error al actualizar proyecto:", xhr.responseText);
                alert("Error al actualizar el proyecto");
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
                console.log("Proyecto insertado:", response);
                $("#proyectoFormulario")[0].reset();
                cargarDatos();
                const modal = bootstrap.Modal.getInstance(document.getElementById("modalProyecto"));
                modal.hide();
            },
            error: function (xhr, status, error) {
                console.error("Error al insertar proyecto:", error);
                alert("Fallo la inserción de proyecto");
            }
        });
    }
});


// EDITAR proyecto 

$(document).on("click", ".btn-editar", function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    $.ajax({
        type: "GET",
        url: APIURL + id,  
        success: function (proyecto) {
            
            $("#nombre").val(proyecto.nombre);
            $("#descripcion").val(proyecto.descripcion);
            $("#inicio").val(proyecto.fechaInicio ? proyecto.fechaInicio.substring(0,10) : "");
            $("#fin").val(proyecto.fechaFin ? proyecto.fechaFin.substring(0,10) : "");
            $("#estado").val(proyecto.estado);

            $("#proyectoFormulario").attr("data-id", id);
            const modal = new bootstrap.Modal(document.getElementById("modalProyecto"));
            modal.show();
        },
        error: function (xhr) {
            console.error("Error al cargar el proyecto:", xhr.responseText);
            alert("No se pudo cargar el proyecto para edición");
        }
    });
});


// ELIMINAR proyecto (DELETE)

$(document).on("click", ".btn-eliminar", function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    if (!confirm("¿Seguro que desea eliminar este proyecto?")) return;

    $.ajax({
        type: "DELETE",
        url: APIURL + id,
        success: function () {
            cargarDatos();
        },
        error: function (xhr) {
            console.error("Error al eliminar proyecto:", xhr.responseText);
            alert("No se pudo eliminar el proyecto");
        }
    });
});


cargarDatos();

const APIURL = "http://localhost:3000/api/campana/";

// ===============================
// Cargar la lista en la tabla
// ===============================

async function cargarDatos() {

    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseCampanas) {

            const tbody = $("#tablaCampanas");
            tbody.empty();

            responseCampanas.forEach(elementCampana => {
                tbody.append(`
                    <tr class="">
                        <td scope="row">${elementCampana._id}</td>
                        <td>${elementCampana.nombre}</td>
                        <td>${elementCampana.objetivo}</td>
                        <td>${elementCampana.fechaInicio ? elementCampana.fechaInicio.substring(0,10) : ""}</td>
                        <td>${elementCampana.estado}</td>

                        <td>
                            <a class="btn btn-primary btn-sm btn-editar" data-id="${elementCampana._id}" href="#">
                                Editar
                            </a>

                            <a class="btn btn-danger btn-sm btn-eliminar" data-id="${elementCampana._id}" href="#">
                                Eliminar
                            </a>
                        </td>
                    </tr>
                `);
            });

        },
        error: function(xhr, status, error){
            console.error("Error al cargar campañas:", error);
            console.error(xhr.responseText);
        }
    });

}



// ===============================
// Guardar nueva campaña (POST)
// ===============================

$("#campanaFormulario").on("submit", function(e) {
    e.preventDefault();

    // Si tiene data-id → es UPDATE
    const idUpdate = $("#campanaFormulario").attr("data-id");

    const datos = {
    nombre: $("#nombreDonante").val(),
    identificacion: $("#identificacionDonante").val(),
    telefono: $("#telefonoDonante").val(),
    correo: $("#correoDonante").val(),
    estado: $("#tipoDonante").val()
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
                $("#campanaFormulario")[0].reset();
                $("#campanaFormulario").removeAttr("data-id");
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalCampana"));
                modal.hide();
            },
            error: function(xhr){
                console.error("Error al actualizar:", xhr.responseText);
                alert("Error al actualizar la campaña");
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
                console.log(response);
                $("#campanaFormulario")[0].reset();
                cargarDatos();

                const modal = bootstrap.Modal.getInstance(document.getElementById("modalCampana"));
                modal.hide();
            },
            error: function(xhr, status, error){
                console.error("Error: ", error);
                console.error("Error xhr: ", xhr.responseText);
                alert("Fallo la inserción");
            }
        });
    }

});



// ===============================
// EDITAR (GET + llenar modal)
// ===============================

$(document).on("click", ".btn-editar", function() {

    const id = $(this).data("id");

    $.ajax({
        type: "GET",
        url: APIURL + id,
        success: function(campana) {

            $("#nombre").val(campana.nombre);
            $("#objetivo").val(campana.objetivo);
            $("#fechaInicio").val(campana.fechaInicio ? campana.fechaInicio.substring(0,10) : "");
            $("#estado").val(campana.estado);

            $("#campanaFormulario").attr("data-id", id);

            const modal = new bootstrap.Modal(document.getElementById("modalCampana"));
            modal.show();
        },
        error: function(xhr){
            console.error("Error al cargar campaña:", xhr.responseText);
        }
    });

});



// ===============================
// ELIMINAR (DELETE)
// ===============================

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



// ===============================
// CARGA INICIAL
// ===============================

cargarDatos();

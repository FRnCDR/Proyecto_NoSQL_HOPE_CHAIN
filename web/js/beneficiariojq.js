const APIURL = "http://localhost:3000/api/beneficiario/";

async function cargarDatos() {

    $.ajax({
        type: "GET",
        url: APIURL,
        success: function (responseBeneficiario) {

            const tbody = $("#tablaBeneficiario");
            tbody.empty();

            responseBeneficiario.forEach(elementBeneficiario => {
                tbody.append(`
                    <tr class="">
                        <td scope="row">${elementBeneficiario._id}</td>
                        <td>${elementBeneficiario.nombre}</td>
                        <td>${elementBeneficiario.tipoBeneficiario}</td>
                        <td>${elementBeneficiario.contacto}</td>
                        <td>${elementBeneficiario.estado}</td>

                        <td>
                            <a class="btn btn-primary btn-sm btn-editar" data-id="${elementBeneficiario._id}" href="#">
                                Editar
                            </a>

                            <a class="btn btn-danger btn-sm btn-eliminar" data-id="${elementBeneficiario._id}" href="#">
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
$("#beneficiarioFormulario").on("submit", function (e) {
    e.preventDefault();

    const idUpdate = $("#beneficiarioFormulario").attr("data-id");

    const datos = {
        nombre: $("#nombre").val(),
        tipoBeneficiario: $("#tipoBeneficiario").val(),
        contacto: $("#contacto").val(),
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
                console.log("Beneficiario actrualizado:", response);
                $("#beneficiarioFormulario")[0].reset();
                $("#beneficiarioFormulario").removeAttr("data-id");
                cargarDatos();
                const modal = bootstrap.Modal.getInstance(document.getElementById("modalBeneficiario"));
                modal.hide();
            },
            error: function (xhr) {
                console.error("Error al actualizar beneficiario:", xhr.responseText);
                alert("Error al actualizar el beneficiario");
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
                console.log("Beneficiario insertado:", response);
                $("#beneficiarioFormulario")[0].reset();
                cargarDatos();
                const modal = bootstrap.Modal.getInstance(document.getElementById("modalBeneficiario"));
                modal.hide();
            },
            error: function (xhr, status, error) {
                console.error("Error al insertar beneficiario:", error);
                alert("Fallo la inserción de beneficiario");
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
            $("#tipoBeneficiario").val(proyecto.tipoBeneficiario);
            $("#contacto").val(proyecto.contacto);
            $("#estado").val(proyecto.estado);

            // Agrega el ID al formulario para futuras actualizaciones
            $("#beneficiarioFormulario").attr("data-id", id);
            const modal = new bootstrap.Modal(document.getElementById("modalBeneficiario"));
            modal.show();
        },
        error: function (xhr) {
            console.error("Error al cargar el beneficiario:", xhr.responseText);
            alert("No se pudo cargar el beneficiario");
        }
    });
});


$(document).on("click", ".btn-eliminar", function() {

    const id = $(this).data("id");

    if (!confirm("¿Seguro que desea eliminar este beneficiario?")) {
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
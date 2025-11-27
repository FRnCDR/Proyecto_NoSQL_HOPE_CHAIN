const menus = `
       
    <nav class="mt-3">
    <ul class="nav nav-pills justify-content-center bg-white p-2 rounded shadow-sm">
        <li class="nav-item">
            <a class="nav-link text-success fw-semibold" href="cursojq.html">
                <i class="fa fa-code"></i> Curso jQ
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link text-success fw-semibold" href="menu.html">
                <i class="fa fa-bars"></i> Menú
            </a>
        </li>
    </ul>
</nav>

`;



const htmlseccionMenu = $("#seccionMenu");
htmlseccionMenu.append(menus);
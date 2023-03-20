<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://kit.fontawesome.com/67cdbd520c.js" crossorigin="anonymous"></script>
    <script src="js/fetch.js" defer ></script>
    <title>No pé No Gain</title>
</head>
<body>
    
<header>
    <div class="logo">
        <span>No</span>
        <div>
            <span>pé</span>
            <span>gain LTDA.</span>
        </div>
    </div>

    <div class="search">
        <input type="search" name="search" placeholder="Buscar item..." data-id="search-input">
        <button data-id="search-button">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
    </div>
    
</header>

@if(Auth::check())
    <a href="{{route('logout')}}" class="logout-link">Sair</a>
@endif

<main>
    <section class="shoes-details">
        <div>
            <p><span class="details-title">Nome:</span> <span data-id="name"> {Shoes Model Name} </span></p>
            <p><span class="details-title">Marca:</span> <span data-id="brand"> {Shoes Brand Name} </span></p>
            <p><span class="details-title">Categoria:</span> <span data-id="category"> {Category} </span></p>
            <p><span class="details-title">Cor:</span> <span data-id="color"> {Color} </span></p>
            <p><span class="details-title">Valor:</span> <span data-id="price"> {R$520,00} </span></p>
            <div class="disponibility" data-id="disponibility">
                {disponibility}
            </div>
        </div>
    </section>

    <section class="shoes-image">
        <img src="img/shoes.png" data-id="image">
    </section>
</main>

<section class="itens">
    <div>
        <h3>Itens para a sua busca:</h3>
        <div>
            <button class="filter-btn" title="Filtro">
                <i class="fa-solid fa-sliders"></i>
            </button>
        </div>
    </div>
    <section class="carousel"></section>
</section>

<section class="filter">
    <div class="filter-modal">
        <section class="filter-header">
            <h4>Filtros</h4>
            <button class="close-modal"><i class="fa-solid fa-xmark"></i></button>
        </section>

        <section class="filter-section">
            <h4>Categoria</h4>
            <div class="check-options" data-filter="category"></div>
        </section>

        <section class="filter-section">
            <h4>Marca</h4>
            <div class="check-options" data-filter="brand"></div>
        </section>

        <section class="filter-section">
            <h4>Cor</h4>
            <div class="check-options" data-filter="color"></div>
        </section>

        <section class="filter-section">
            <h4>Disponibilidade</h4>
            <div class="radio-options" data-filter="disponibility">
                <label>
                    <input type="radio" name="disponibility" value="Disponivel" data-radio="disponibility"/> Disponivel
                </label>
                <label>
                    <input type="radio" name="disponibility" value="Indisponivel" data-radio="disponibility"/> Indisponivel
                </label>
                <label>
                    <input type="radio" name="disponibility" value="Tudo" data-radio="disponibility"/> Mostrar Tudo
                </label>
            </div>
        </section>

        <button class="apply-filters">Aplicar filtros</button>
    </div>
</section>

</body>
</html>
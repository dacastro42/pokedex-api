SET
    FOREIGN_KEY_CHECKS = 0;

INSERT INTO
    elementos (
        `id`,
        `nombre`,
        `descripcion`,
        `color`,
        `efecto_clima`
    )
VALUES
    (
        1,
        'Fuego',
        'Tipo fuerte contra Planta y Bicho',
        '#FF4500',
        'Aumenta en clima soleado'
    ),
    (
        2,
        'Agua',
        'Tipo fuerte contra Fuego y Roca',
        '#1E90FF',
        'Aumenta en lluvia'
    ),
    (
        3,
        'Planta',
        'Tipo fuerte contra Agua y Tierra',
        '#32CD32',
        'Aumenta en clima soleado'
    );

INSERT INTO
    estadisticas (
        `id`,
        `hp`,
        `ataque`,
        `defensa`,
        `velocidad`,
        `ataque_especial`,
        `defensa_especial`,
        `pokemon_id`
    )
VALUES
    (4, 39, 52, 43, 65, 60, 50, 1),
    (5, 44, 48, 65, 43, 50, 64, 2),
    (6, 45, 49, 49, 45, 65, 65, 3),
    (7, 45, 49, 49, 45, 65, 65, 4);

INSERT INTO
    evoluciones (
        `id`,
        `nivel_evolucion`,
        `metodo`,
        `evolucion_anterior_id`,
        `pokemon_id`
    )
VALUES
    (1, 1, 'Metodo 1', NULL, 1),
    (2, 2, 'Metodo 2', 1, 4);

INSERT INTO
    generaciones (`id`, `nombre`)
VALUES
    (1, 'Primera Generación'),
    (2, 'Segunda Generación'),
    (3, 'Tercera Generación');

INSERT INTO
    habilidades (`id`, `nombre`, `descripcion`)
VALUES
    (
        1,
        'Mar Llamas',
        'Aumenta el poder de los ataques de fuego cuando el HP es bajo.'
    ),
    (
        2,
        'Torrente',
        'Aumenta el poder de los ataques de agua cuando el HP es bajo.'
    ),
    (
        3,
        'Espesura',
        'Aumenta el poder de los ataques de planta cuando el HP es bajo.'
    );

INSERT INTO
    interacciones (
        `id`,
        `efecto`,
        `elemento_origen_id`,
        `elemento_destino_id`
    )
VALUES
    (1, 'super_efectivo', 1, 3),
    (2, 'super_efectivo', 2, 1),
    (3, 'super_efectivo', 3, 2);

INSERT INTO
    movimientos (
        `id`,
        `nombre`,
        `potencia`,
        `precision`,
        `pp`,
        `elemento_id`
    )
VALUES
    (1, 'Lanzallamas', 90, 100, 15, 1),
    (2, 'Surf', 90, 100, 15, 2),
    (3, 'Latigazo', 90, 85, 10, 3);

INSERT INTO
    pokemons (
        `id`,
        `numero`,
        `nombre`,
        `nombre_japones`,
        `generacion_id`
    )
VALUES
    (1, 4, 'Charmander', 'ヒトカゲ', 1),
    (2, 7, 'Squirtle', 'ゼニガメ', 1),
    (3, 1, 'Bulbasaur', 'フシギダネ', 1),
    (4, 5, 'Charmeleon', 'リザード', 1);

INSERT INTO
    pokemons_elementos (`id`, `pokemon_id`, `elemento_id`)
VALUES
    (1, 1, 1),
    (2, 2, 2),
    (3, 3, 3),
    (4, 4, 1);

INSERT INTO
    pokemons_habilidades (`pokemon_id`, `habilidad_id`)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);

SET
    FOREIGN_KEY_CHECKS = 1;
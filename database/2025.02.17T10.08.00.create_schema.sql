USE pokedex_v2;

CREATE TABLE elementos (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `efecto_clima` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE estadisticas (
  `id` int NOT NULL AUTO_INCREMENT,
  `hp` int NOT NULL,
  `ataque` int NOT NULL,
  `defensa` int NOT NULL,
  `velocidad` int NOT NULL,
  `ataque_especial` int NOT NULL,
  `defensa_especial` int NOT NULL,
  `pokemon_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c4cf7b26a1e52c6bafacc99f045` (`pokemon_id`),
  CONSTRAINT `FK_c4cf7b26a1e52c6bafacc99f045` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE evoluciones (
  `id` int NOT NULL AUTO_INCREMENT,
  `nivel_evolucion` int NOT NULL,
  `metodo` varchar(255) NOT NULL,
  `evolucion_anterior_id` int DEFAULT NULL,
  `pokemon_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0207053eeaa8c3e9febc6232154` (`evolucion_anterior_id`),
  KEY `FK_19916f03e8ebcd152b6f51a06d3` (`pokemon_id`),
  CONSTRAINT `FK_0207053eeaa8c3e9febc6232154` FOREIGN KEY (`evolucion_anterior_id`) REFERENCES `evoluciones` (`id`),
  CONSTRAINT `FK_19916f03e8ebcd152b6f51a06d3` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE generaciones (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE habilidades (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE interacciones (
  `id` int NOT NULL AUTO_INCREMENT,
  `efecto` varchar(255) NOT NULL,
  `elemento_origen_id` int NOT NULL,
  `elemento_destino_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e58da14885e64ac81aba7cd876b` (`elemento_origen_id`),
  KEY `FK_67d673bdec0954f76d20ac0490b` (`elemento_destino_id`),
  CONSTRAINT `FK_67d673bdec0954f76d20ac0490b` FOREIGN KEY (`elemento_destino_id`) REFERENCES `elementos` (`id`),
  CONSTRAINT `FK_e58da14885e64ac81aba7cd876b` FOREIGN KEY (`elemento_origen_id`) REFERENCES `elementos` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE movimientos (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `potencia` int NOT NULL,
  `precision` int NOT NULL,
  `pp` int NOT NULL,
  `elemento_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9f7da39e7f0e6e522503cadeb33` (`elemento_id`),
  CONSTRAINT `FK_9f7da39e7f0e6e522503cadeb33` FOREIGN KEY (`elemento_id`) REFERENCES `elementos` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE pokemons (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `nombre_japones` varchar(50) DEFAULT NULL,
  `generacion_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_324a0ca38aefbeea6069142dccb` (`generacion_id`),
  CONSTRAINT `FK_324a0ca38aefbeea6069142dccb` FOREIGN KEY (`generacion_id`) REFERENCES `generaciones` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE pokemons_elementos (
  `id` int NOT NULL AUTO_INCREMENT,
  `pokemon_id` int NOT NULL,
  `elemento_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c7ca20abc571ebafba918a6366e` (`pokemon_id`),
  KEY `FK_05b808c9156cfe5ccbda25ecb3b` (`elemento_id`),
  CONSTRAINT `FK_05b808c9156cfe5ccbda25ecb3b` FOREIGN KEY (`elemento_id`) REFERENCES `elementos` (`id`),
  CONSTRAINT `FK_c7ca20abc571ebafba918a6366e` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE pokemons_habilidades (
  `pokemon_id` int NOT NULL,
  `habilidad_id` int NOT NULL,
  PRIMARY KEY (`pokemon_id`, `habilidad_id`),
  KEY `IDX_950e37c0d86234685995d13295` (`pokemon_id`),
  KEY `IDX_2bd99c447e5ae52ade104cc791` (`habilidad_id`),
  CONSTRAINT `FK_2bd99c447e5ae52ade104cc791e` FOREIGN KEY (`habilidad_id`) REFERENCES `habilidades` (`id`),
  CONSTRAINT `FK_950e37c0d86234685995d132955` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
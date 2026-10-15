# UMBRÍA · Ecos de la cripta

Prototipo de roguelike de cartas con estética dark fantasy vintage. HTML, CSS y JavaScript nativos; Node.js 24 para el servidor de desarrollo, sin dependencias de instalación.

## Ejecutar

```sh
npm start
```

Puerto predeterminado: 3000; configurable mediante `PORT`. No necesita claves ni servicios externos. Las fuentes de Google son opcionales: dispone de fuentes locales de reserva.

## Probar

```sh
npm test
```

Revela monstruos desde el mazo (hasta tres simultáneos). Selecciona uno de tus tres personajes y pulsa un monstruo para atacar. Si sobrevive, contraataca. Derrota a los seis monstruos para ganar; si pierdes a toda la compañía, inicia otra incursión. «Nueva incursión» restaura el estado y baraja el mazo.

Primera estructura: zona de monstruos, tres espacios de compañía y mazo de seis monstruos. Las partidas viven en memoria; no se conservan al recargar. Arte vectorial original incluido en `assets/`. Todavía no hay progresión entre combates, recompensas ni construcción de mazos.

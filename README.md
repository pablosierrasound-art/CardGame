# UMBRÍA · Card Table 3D

Prototipo de juego de cartas con tablero 3D y miniaturas low-poly, creado con Three.js.

## Jugar

https://pablosierrasound-art.github.io/CardGame/

## Reglas

- Dos comandantes, tres posiciones para unidades por bando.
- Mazo inicial de 12 cartas con goblins, guardias, caballeros, arqueros, torres, hechizos y estandartes.
- Cuatro cartas por turno y tres puntos de energía.
- Selecciona una carta de la mano flotante inferior y toca una casilla de tu lado para jugarla.
- Los aliados atacan por su línea al terminar el turno. Los enemigos supervivientes contraatacan.
- Los huecos sin bloqueadores permiten dañar al comandante rival.
- Al finalizar el turno se descarta la mano y se roban cuatro cartas nuevas.

## Tecnología

Three.js 0.170.0 mediante jsDelivr, WebGL y cámara ortográfica isométrica. Se necesita conexión a Internet para cargar la librería.

Archivos: `index.html`, `cards3d.js`.

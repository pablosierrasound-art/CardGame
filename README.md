# UMBRÍA · Dungeon Keeper 3D

Tower defense 3D isométrico de fantasía retro para móvil. Construye defensas como señor de la mazmorra e impide que los aventureros alcancen el tesoro.

Jugar: https://pablosierrasound-art.github.io/CardGame/

## Motor gráfico

Three.js 0.170.0, cargado mediante módulo ES desde jsDelivr. Renderizado WebGL, cámara ortográfica isométrica, geometrías low-poly, iluminación, sombras y personajes 3D construidos con primitivas. Requiere conexión a Internet para cargar Three.js.

## Controles

Elige Goblin (40 oro), Esqueleto (60) o Trampa (30). Toca una casilla para construir: tropas fuera del camino, trampas sobre el camino. Inicia la oleada, gana oro al derrotar aventureros y vende defensas cuando necesites reorganizar la mazmorra. Pierdes si se agota el tesoro.

## Archivos

- `index.html`: interfaz móvil y HUD.
- `dungeon3d.js`: escena Three.js, renderizado, interacción, unidades y oleadas.

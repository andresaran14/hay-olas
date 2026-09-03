# ¿Hay Olas? — Reporte de Surf · Chile

App web que muestra las condiciones de surf en tiempo real para la costa chilena. Tipo shouldyousurf.com pero específico para Chile.

## Estado actual

- **v2 — Todas las regiones de Chile**: ~150 spots desde Arica y Parinacota hasta Magallanes.
- Marea calculada localmente con modelo armónico SHOA (sin API externa).
- Oleaje y viento desde Open-Meteo (ECMWF / GFS / DWD).
- Selector de nivel (Principiante / Intermedio / Avanzado).
- 5 días de pronóstico.
- Selector de regiones con autocompletado.

## Cómo correrlo localmente

No necesita build. Abrí `hay_olas.html` en cualquier navegador moderno, o servila con:

```bash
python -m http.server 8000
# luego andá a http://localhost:8000
```

## Cómo agregar un spot nuevo

Editá `REGIONS` en el `<script>` del HTML. Ejemplo:

```js
maule: {
  name: 'Maule',
  tideMaster: 'talcahuano',
  spots: [
    { id:'nuevo', name:'Nuevo Spot', lat:-35.5, lon:-72.3,
      idealSwellDir:[200,260], idealWindDir:[70,110], minPeriod:9 },
    // ...
  ]
}
```

Si el spot necesita coeficientes de marea propios (en desembocaduras de río, por ejemplo), agregá una entrada en `TIDE_COEFFS`. Si no, hereda del `tideMaster` de la región.

## Créditos

- Datos de oleaje y viento: [Open-Meteo](https://open-meteo.com/) (modelos ECMWF / GFS / DWD, CC BY 4.0).
- Coeficientes de marea: SHOA (Servicio Hidrográfico y Oceanográfico de la Armada de Chile).
- Iconos de verdict: autor original del proyecto.

## Licencia

MIT (o la que prefieras).
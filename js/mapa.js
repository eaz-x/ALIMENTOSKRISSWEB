// Configuración del mapa
document.addEventListener('DOMContentLoaded', function() {
    // Coordenadas de Alimentos Kriss (10.521880, -66.901234)
    const coordinates = [10.521880, -66.901234];
    
    // Inicializar mapa
    const map = L.map('osm-map').setView(coordinates, 16);

    // Capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
        detectRetina: true
    }).addTo(map);

    // Marcador personalizado
    const foodIcon = L.icon({
        iconUrl: 'images/Fabrica-de-Macarrones-con-Queso-Alimentos-Kriss.png', // Ruta a tu icono
        iconSize: [38, 38],
        iconAnchor: [19, 38]
    });

    // Añadir marcador
    L.marker(coordinates, { icon: foodIcon })
     .bindPopup(`
        <div class="map-popup">
            <h4>Alimentos Kriss, C.A.</h4>
            <p>Caracas, Venezuela</p>
        </div>
     `)
     .addTo(map);

    // Ajustar mapa al contenedor
    map.invalidateSize();
});
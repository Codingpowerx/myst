/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoid2Vic2l0ZW1hcGJveCIsImEiOiJja3Q4OWwwb3AxMDR0MzRvOGQyOGVra3ZiIn0.Rs1ccdwFoQ97aJa45_Q5Jg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/websitemapbox/cktj1cv1t6qc517ppr5b3ccqf',
    scrollZoom: false
    //center: [-118.137259, 34.120197],
    //zoom: 10,
    //interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    ///Create a marker
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    //Extend the map bound to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};

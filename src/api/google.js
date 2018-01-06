export const fetchNearbyPlaces = ({lat, lng}) => {
  return fetch(`https://serene-ocean-70888.herokuapp.com/google/${lat},${lng}`)
  .then(resp => resp.json())
  .then(data => data)
  .catch(error => {
    console.log('google error', error)
    // return error
  })
}

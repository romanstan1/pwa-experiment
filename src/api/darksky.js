export const fetchWeather = (lat, lng) => {
  return fetch(`https://serene-ocean-70888.herokuapp.com/darksky/${lat},${lng}`)
  .then(resp => resp.json())
  .then(resp => resp)
  .catch(error => {
    console.log('darksky error:')
    console.log(error)
  })
}

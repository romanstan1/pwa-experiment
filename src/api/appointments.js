export const fetchAppointmentsData = (placeId) => {
  return fetch(`https://serene-ocean-70888.herokuapp.com/appointments/${placeId}`)
  .then(resp => resp.json())
  .then(data => data )
  .catch(error => {
    console.log(error)
    return error
  })
}

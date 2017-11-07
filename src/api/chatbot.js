export const fetchChatBotResponse = (inputText) => {
  return fetch(`https://serene-ocean-70888.herokuapp.com/chatbot`,
  {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `input=${inputText}`
  })
  .then(resp => resp.json())
  .then(resp => resp)
  .catch(error => console.log(error))
}

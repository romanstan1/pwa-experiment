import React, {Component} from 'react'
import {fetchChatBotResponse} from '../../api/chatbot.js'

const Replies = ({message, click}) => {
  const onClick = (e) => click('', e.target.dataset.value)
  if(!!message.replies) return (
    <div className='replies'>
     {message.replies.map((reply, index) =>
      <span data-value={reply} onClick={onClick} key={index}>{reply} </span>
      )}
    </div>
  )
  else return null
}


export default class ChatIntercom extends Component {
  state = {
    open: false,
    inputText:'',
    messages: []
  }

  handleKeyPress = (e,replyOnClick) => {

    if (e.key === 'Enter' || !!replyOnClick) {
      let inputText
      if(!!replyOnClick) inputText = replyOnClick
      else inputText = this.state.inputText
      this.setState({ messages: this.state.messages.concat([{
          author: 'Me',
          text: inputText.charAt(0).toUpperCase() + inputText.slice(1)
        }])
      })
      fetchChatBotResponse(inputText)
      .then(res => {
        const messages = res.result.fulfillment.messages
        const lastMessage = messages[messages.length-1]
        console.log("chatbot res",messages)
        this.setState({ messages: this.state.messages.concat([
          {
            author: "Specsaver's Chatbot",
            text: !!lastMessage.title? lastMessage.title: lastMessage.speech,
            replies: !!lastMessage.replies ? lastMessage.replies : ''
          }])
        })
      })
    }
  }

  handleChange = (e) => this.setState({inputText: e.target.value})

  closeChat = () => this.setState({open: !this.state.open})
  popUp = () => this.setState({open: !this.state.open})

  render () {

    return (
      <span className ='chatIntercomWrap'>
        <span onClick={this.popUp} className ='chatIntercom'>
          <span>
            Chat
          </span>
        </span>
        {this.state.open?
        <div className='chatDialog'>
          <div>
            <div className='title'> Chat Bot
              <span className='close' onClick={this.closeChat} style={{cursor:'pointer'}}></span>
            </div>

            <div className='history'>
              {this.state.messages.map((message, index) =>
                 <div key={index} className = {message.author === 'Me'? 'message me': 'message them' }>
                   <div className='text'>{message.text}</div>
                   {/* <span className='author'> -{message.author}</span> */}
                   <Replies click={this.handleKeyPress} message={message}/>
                 </div>
               )}
            </div>

            <input type="text"
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              placeholder="Type message"/>

          </div>
        </div>
        : null}

      </span>
    )
  }
}

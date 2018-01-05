import React, {Component} from 'react'
import {fetchChatBotResponse} from '../../api/chatbot.js'
import {connect} from 'react-redux'
import {handleFocus} from '../../store/modules/actions'


const Replies = ({message, click}) => {
  const onClick = (e) => click('', e.target.dataset.value)
  if(!!message.replies) {
    return (
      <div className='replies'>
        {message.replies.map((reply, index) =>
          <span data-value={reply} onClick={onClick} key={index}>{reply} </span>
        )}
      </div>
    )
  } else {
    return null
  }
}


class ChatIntercom extends Component {
  state = {
    open: false,
    inputText:'',
    messages: []
  }

  focusHandler = (event) => {
    event.target.value = ''
    this.props.dispatch(handleFocus(event.type))
  }

  updateMessage = (author,text,replies) => {

    this.setState({ messages: this.state.messages.concat([
      {
        author,
        text,
        replies
      }])
    })


  }

  fetchResponse = (inputText) => {

    fetchChatBotResponse(inputText).then(res => {
      const {fulfillment} = res.result

      console.log("res", res)

      if(fulfillment.data) {

        const text = fulfillment.data.facebook.text
        const replies = fulfillment.data.facebook.quick_replies.map(reply => reply.title)
        this.updateMessage("Specsaver's Chatbot", text,replies)

      } else if(fulfillment.messages[0].platform) {

        const text = fulfillment.messages[0].title
        const replies = fulfillment.messages[0].replies
        this.updateMessage("Specsaver's Chatbot", text,replies)

      } else if(fulfillment.messages.speech) {

        console.log("fulfillment.messages.speech",fulfillment.messages.speech)

      } else {

        const lastMessage = fulfillment.messages[fulfillment.messages.length-1]
        const text = lastMessage.title || lastMessage.speech
        const replies =  lastMessage.replies || ''
        this.updateMessage("Specsaver's Chatbot", text,replies)

      }

    }).catch(error => {
      console.log("error",error)
    })

  }



  handleKeyPress = (e,replyOnClick) => {
    if (e.key === 'Enter' || !!replyOnClick) {
      let inputText
      if(!!replyOnClick) inputText = replyOnClick
      else inputText = this.state.inputText

      this.updateMessage("Me", inputText.charAt(0).toUpperCase() + inputText.slice(1))
      this.fetchResponse(inputText)
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
                   <Replies click={this.handleKeyPress} message={message}/>
                 </div>
               )}
            </div>

            <input type="text"
              onFocus={this.focusHandler}
              onBlur={this.focusHandler}
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

export default connect(state => ({}))(ChatIntercom)

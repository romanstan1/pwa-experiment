import React, {Component} from 'react'
import {fetchChatBotResponse} from '../../api/chatbot.js'
import {connect} from 'react-redux'
import {handleFocus} from '../../store/modules/actions'
// import { Link, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
// import smoothScroll from 'smoothscroll'


const Loading = () =>
<div className="sk-circle">
  <div className="sk-circle1 sk-child"></div>
  <div className="sk-circle2 sk-child"></div>
  <div className="sk-circle3 sk-child"></div>
  <div className="sk-circle4 sk-child"></div>
  <div className="sk-circle5 sk-child"></div>
  <div className="sk-circle6 sk-child"></div>
  <div className="sk-circle7 sk-child"></div>
  <div className="sk-circle8 sk-child"></div>
  <div className="sk-circle9 sk-child"></div>
  <div className="sk-circle10 sk-child"></div>
  <div className="sk-circle11 sk-child"></div>
  <div className="sk-circle12 sk-child"></div>
</div>


class Replies extends Component {
  state = {
    clicked:false
  }
  onClick = (e) => {
    this.setState({clicked: e.target.dataset.value})
    this.props.click('', e.target.dataset.value)
  }
  render() {
    const {message} = this.props
    if(!!message.replies) return (
      <div className='replies'>
        {message.replies.map((reply, index) =>
          <span key={index}
            className={this.state.clicked === reply? 'clicked': ''}
            data-value={reply}
            onClick={this.onClick}>
            {reply}
          </span>
        )}
      </div>)
    else return null
  }
}

function scrollToBottom(history) {
  history.scrollTop = history.scrollTop + 3
  if(history.scrollTop < history.scrollHeight - history.clientHeight) {
    setTimeout(() => scrollToBottom(history), 5)
  }
}

class ChatIntercom extends Component {
  state = {
    open: false,
    inputText:'',
    messages: [],
    loading: false
  }

  focusHandler = (event) => {
    event.target.value = ''
    this.props.dispatch(handleFocus(event.type))
  }

  updateMessage = (author,text,replies) => {
    this.setState({
      messages: this.state.messages.concat([{author,text,replies}])
    })
    scrollToBottom(this.refs.history)
  }

  fetchResponse = (inputText) => {
    this.setState({loading: true})
    fetchChatBotResponse(inputText).then(res => {
      this.setState({loading: false})

      const {fulfillment} = res.result

      if(fulfillment.data) {

        const text = fulfillment.data.facebook.text
        const replies = fulfillment.data.facebook.quick_replies.map(reply => reply.title)
        this.updateMessage("Specsaver's Chatbot", text,replies)

      } else if(fulfillment.messages[0].platform) {

        const text = fulfillment.messages[0].title
        const replies = fulfillment.messages[0].replies
        this.updateMessage("Specsaver's Chatbot", text,replies)

      } else if(fulfillment.speech === "Roman") {
        this.updateMessage("Specsaver's Chatbot", "I cannot understand that! Please re-enter your message")
      } else if(fulfillment.speech === 'The location you have provided is invalid. Please specify another location.') {

        console.log(fulfillment.speech, res.result.resolvedQuery)
        this.fetchResponse(res.result.resolvedQuery)

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
      let inputText, me

      if(!!replyOnClick) {
        inputText = replyOnClick;
        me = 'Me hide';
      } else {
        inputText = this.state.inputText
        me = 'Me'
      }

      this.updateMessage(me, inputText.charAt(0).toUpperCase() + inputText.slice(1))
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M22 3v13h-6.961l-3.039 3.798-3.039-3.798h-6.961v-13h20zm2-2h-24v17h8l4 5 4-5h8v-17z"/>
          </svg>
        </span>
        {this.state.open?
        <div className='chatDialog'>
          <div>
            <div className='title'>Specsavers Chat Bot
              <span className='close' onClick={this.closeChat} style={{cursor:'pointer'}}></span>
            </div>
            <div ref='history' className='history'>
              {this.state.messages.map((message, index) =>
                <div
                  key={index}
                  className = {
                    message.author === 'Me hide'? 'message me hide' :
                    message.author === 'Me'?  'message me': 'message them' }>
                    <div className='text'>{message.text}</div>
                    <Replies click={this.handleKeyPress} message={message}/>
                  </div>
                )}
                <br/>
                <br/>
                <br/>
                <br/>
                {this.state.loading?<Loading/>: null}
            </div>

            <input type="text"
              onFocus={this.focusHandler}
              onBlur={this.focusHandler}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              placeholder="Write a reply..."/>

          </div>
        </div>
        : null}

      </span>
    )
  }
}

export default connect(state => ({}))(ChatIntercom)

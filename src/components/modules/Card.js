import React, {Component} from 'react'

export default class Card extends Component {
  render () {
    const {title,children,onClick,index} = this.props
    let {align} = this.props
    if(!align) align = 'left'
    return (
      <div className='cardStyle' >
        {!!onClick?  <span id={index} className='close' onClick={onClick} style={{cursor:'pointer'}}></span> : null }
        {!!title?<div>{title}</div>:null}
        <div>{children}</div>
      </div>)
  }
}

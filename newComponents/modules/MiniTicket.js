import React, {Component} from 'react'

export default class MiniTicket extends Component {
  render () {
    const {title, children, className} = this.props
    const classNameFunc = () => {
      if(!className) return 'miniTicket'; else return (`miniTicket ` + className)
    }
    return (
      <div className={classNameFunc()}>
        <div className='miniTicketInnerWrap'>
            {!!title?<span>{title}</span>:null}
          <div className='miniTicketBody'>{children}</div>
        </div>
      </div>)
  }
}

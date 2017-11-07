import React, {Component} from 'react'
import { Link } from 'react-router-dom'


export default class LinkButton extends Component {
  render () {
    const {to,children} = this.props
    return (
      <span className='linkButton'>
        <Link to={to} >{children}</Link>
      </span>)
  }
}

export class BigButton extends Component {
  render () {
    const {to,children} = this.props
    return (
      <span className='linkButton big'>
        <Link to={to} >{children}</Link>
      </span>)
  }
}

// {/* <a href={to} style={{width:'100%',fontWeight:600, display:'block',lineHeight:'40px',fontSize:'17px',}}>{children}</a> */}

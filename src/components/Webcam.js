import React, {Component} from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom'
import LinkButton from './modules/LinkButton'



export default class WebcamComponent extends Component {
  render() {
    const width = window.innerWidth
    const height = window.innerHeight
    console.log("height",height)
    return (
      <div className='webcam'>
        <div className='webcamWrap'>
          <Webcam
            width={width}
            height={height - 70 - 80}
            audio={false}/>
        </div>
        <div className='capture'>Capture</div>
        <Link to='ShopPage'>Back to shop</Link>
      </div>
    )
  }
}
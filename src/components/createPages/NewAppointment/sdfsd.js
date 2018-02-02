import React, {Component} from 'react'
// import ReactDOM from 'react-dom';
import {compose, withProps, lifecycle } from 'recompose'
// import PropTypes from 'prop-types';


const ThisComponent = compose(
  withProps({}), lifecycle({ componentWillMount() {
    this.setState({
        componentData: [1,2,3,4,5],
        moreData: "hey"
      })

    },


  }),
)(props => <span></span>)

export default class HigherOrderComp extends Component {

    // static propTypes = {value: PropTypes.number}
    // static defaultProps = {initialCount: 0}
    // state = {count: this.props.initialCount}

  render () {
    // console.log(this);
    return (<span>
      <ThisComponent/>

    </span>)
  }
}

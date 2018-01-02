import React, {Component} from 'react'
import Collapsible from 'react-collapsible';

export default class CollapsibleParent extends Component {
  onOpen = () => {
    const {clickedOnNotifications,name} = this.props
    if(!!clickedOnNotifications) clickedOnNotifications(name.toLowerCase())
  }
  render () {
    const {numberOfNotifications,numberOfEntities,children,name,clickedOnNotifications,open} = this.props
    return (
      <Collapsible
        open={open || false}
        onOpen={this.onOpen}
        triggerSibling={ ()=><span className='titleCollapse'> {!!clickedOnNotifications? 'Upcoming ': null} {name}</span>}
        transitionTime={100} trigger=" ">
      <span className='notificationBubble home'><div>{numberOfEntities}</div></span>
      {numberOfNotifications > 0? <span className='notificationBubble home dot homedot'><div></div></span> :null}
        {children}
      </Collapsible>
    )
  }
}

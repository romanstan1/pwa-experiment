import React, {Component} from 'react'
import Ticket from './modules/Ticket'
import MiniTicket from './modules/MiniTicket'
import Card from './modules/Card'
// import LinkButton from './modules/LinkButton'

export default class ShopPage extends Component {

  render () {
    return (
      <span >
        <Ticket title="Shop">
          <MiniTicket title="Recommendations">
            <br/>
            <Card>
              Recommendations here
            </Card>
            <br/><br/>
          </MiniTicket>
          <MiniTicket title="Favourites">
            <br/>
            <Card>
              Favourites Here
            </Card>
            <br/><br/>
          </MiniTicket>
          <MiniTicket title="Men's Glasses">
            <br/>
            <Card>
              Glasses Here
            </Card>
            <br/><br/>
          </MiniTicket>
          <MiniTicket title="Womens's Glasses">
            <br/>
            <Card>
              Glasses Here
            </Card>
            <br/><br/>
          </MiniTicket>
        </Ticket>
      </span>
    )
  }
}
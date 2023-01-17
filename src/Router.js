import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SlotBooking from './components/SlotBooking'

const Routes = () => {
  return (
      <Switch>
        <Route exact path='/' component={SlotBooking} />
      </Switch>
  )
}

export default Routes;

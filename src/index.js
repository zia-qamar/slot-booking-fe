import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import SlotBooking from './components/SlotBooking'

ReactDOM.render(
    <BrowserRouter>
        <SlotBooking />
    </BrowserRouter>,
    document.getElementById('root')
)

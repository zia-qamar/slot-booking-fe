import React, { Component } from 'react';
import '../index.css';
import axios from 'axios';
import Dropdown from './Dropdown';
import Alert from './Alert';
import API_URL from '../config';

class SlotBooking extends Component {
    state = {
        date: '',
        duration: 15,
        possible_slots: [],
        selected_slot: {},
        alert: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, possible_slots: []});
    }

    handleSlotSelect = (slot) => {
        this.setState({ selected_slot: slot });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            date: this.state.date,
            duration: this.state.duration
        }

        axios.get(`${API_URL}/slots/new?date=${data.date}&duration=${data.duration}`)
            .then(response => {
                this.setState({ possible_slots: response.data.possible_slots });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleBook = (slot) => {
        axios.post(` ${API_URL}/slots/book`,
            {start_time: slot.start, end_time: slot.end, duration: this.state.duration}
        )
            .then(response => {
                this.setState({
                    date: '',
                    possible_slots: [],
                    selected_slot: {},
                    alert: response.data.message
                });
                setTimeout(() => {
                    this.setState({
                        alert: ''
                    });
                }, 3000);
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        const durationOptions = [15, 30, 45, 60];
        const { date, duration, possible_slots } = this.state;
        return (
            <div>
                <Alert message={this.state.alert} />
                <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Date:</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={this.handleChange}
                                    name="date"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Duration:</label>
                                <Dropdown
                                    options={durationOptions}
                                    value={duration}
                                    onChange={(e) => this.handleChange({target:{name:"duration", value: e}})}
                                    name="duration"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3" disabled={date === ""}>
                                Find Slots
                            </button>
                        </form>
                    </div>
                    <div className="col-sm-3">
                        <div className="slots-container">
                            {possible_slots.map((slot, index) => (
                                <div key={index} className="slot-row">
                                    <button
                                        className="btn btn-secondary full-width mt-1"
                                        onClick={() => this.handleBook(slot)}>
                                        {slot.slot}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }

}

export default SlotBooking;

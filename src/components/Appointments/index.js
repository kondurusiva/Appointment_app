// Write your code here
import {Component} from 'react'

import {format} from 'date-fns'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isFilterActive: false,
  }

  toggleIsClicked = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formateDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formateDate,
      isStared: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(each => each.isStared === true)
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredAppointmentsList = this.getFilteredAppointmentList()
    const staredBtn = isFilterActive ? 'filter-filled' : 'filter-empty'
    return (
      <div className="app-container">
        <div className="bg-card">
          <div className="sub-card">
            <form className="form" onSubmit={this.onAddAppointment}>
              <h1>Add Appointment</h1>
              <label htmlFor="text">TITLE</label>
              <input
                value={titleInput}
                onChange={this.onChangeTitleInput}
                id="text"
                type="text"
                placeholder="title"
              />
              <label htmlFor="date">DATE</label>
              <input
                value={dateInput}
                onChange={this.onChangeDateInput}
                id="date"
                type="date"
              />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              className="appointments-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="hr" />
          <div className="appointment-container">
            <h1 className="appointment">Appointments</h1>
            <button
              className={`stared ${staredBtn}`}
              onClick={this.onFilter}
              type="button"
            >
              starred
            </button>
          </div>
          <ul className="appointment-list">
            {filteredAppointmentsList.map(each => (
              <AppointmentItem
                key={each.id}
                appointmentDetails={each}
                toggleIsClicked={this.toggleIsClicked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments

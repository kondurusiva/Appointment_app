// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsClicked} = props
  const {id, date, title, isStared} = appointmentDetails

  const onClickStar = () => {
    toggleIsClicked(id)
  }

  const starImageUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const newDate = date.length > 0 ? `Date:${date}` : ''
  return (
    <li className="list-container">
      <div className="star-container">
        <h1 className="title">{title}</h1>
        <button
          className="image"
          type="button"
          testid="star"
          onClick={onClickStar}
        >
          <img className="star" src={starImageUrl} alt="star" />
        </button>
      </div>
      <p className="description">{newDate}</p>
    </li>
  )
}

export default AppointmentItem

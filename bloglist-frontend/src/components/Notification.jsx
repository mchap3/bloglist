import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  if (message !== null) {
    return (
      <div className={type}>
        {message}
      </div>
    )
  }

  return null
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification
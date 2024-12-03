import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  const { message, style } = useNotificationValue()

  if (message) {
    return (
      <div className={style}>
        {message}
      </div>
    )
  }

  return null
}

export default Notification
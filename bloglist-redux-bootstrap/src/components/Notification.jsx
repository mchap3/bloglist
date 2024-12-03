import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, style } = useSelector(state => state.notification)

  if (message) {
    return <div className={style}>{message}</div>
  }

  return null
}

export default Notification

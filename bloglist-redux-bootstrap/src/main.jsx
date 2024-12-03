import ReactDOM from 'react-dom/client'
import 'bootswatch/dist/flatly/bootstrap.min.css'
import './index.css'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <div className='container-fluid'>
      <App />
    </div>
  </Provider>
)

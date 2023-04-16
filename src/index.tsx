import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './themes/ThemeProvider';
import { NotificationProvider } from './contexts/notificationContext';

ReactDOM.render(
  <NotificationProvider>
    <Router basename="/admin">
      {/* <CompatRouter> */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
      {/* </CompatRouter> */}
    </Router>
  </NotificationProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

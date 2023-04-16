import Login from './components/pages/Login';
import AuthorizedRoute from './common/AuthorizedRoute';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthService from './services/authService';
import PageLayout from './components/layout';
import { ConfigProvider } from 'antd';
import en_GB from 'antd/lib/locale-provider/en_GB';
import 'moment/locale/en-gb'; // important!

const App = () => {
  return (
    <Switch>
      <ConfigProvider locale={en_GB}>
        <Route path="/login" exact component={Login}>
          {AuthService.isLoggedIn() && <Redirect to="/" />}
        </Route>
        <AuthorizedRoute path="/" Component={PageLayout}></AuthorizedRoute>
        {/* <MaintenancePage /> */}
      </ConfigProvider>
    </Switch>
  );
};

export default App;

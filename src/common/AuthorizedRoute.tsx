import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import AuthService from '../services/authService';

interface Props {
  Component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
}

const AuthorizedRoute = ({ Component, path, exact = false }: Props): JSX.Element => {
  const message = 'You must be logged in to view the requested page';

  return (
    <Route
      path={path}
      exact={exact}
      render={(props: RouteComponentProps) =>
        AuthService.isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { message, requestedPath: path } }} />
        )
      }
    />
  );
};

export default AuthorizedRoute;

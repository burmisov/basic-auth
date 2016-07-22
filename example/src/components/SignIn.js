import React, { PropTypes, Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { calcMd5 } from '../../../src';

class SignIn extends Component {
  componentDidMount() {
    this.refs.username.focus();
  }

  handleSignIn() {
    this.props.actions.login(
      this.refs.username.input.value,
      calcMd5(this.refs.password.input.value)
    );
  }

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <TextField
              ref="username"
              hintText="Имя пользователя"
              style={{ marginLeft: 20 }}
              floatingLabelText="Имя пользователя"
              underlineShow={false}
            />
            <Divider />
            <TextField
              ref="password"
              type="password"
              hintText="Пароль"
              style={{ marginLeft: 20 }}
              floatingLabelText="Пароль"
              underlineShow={false}
            />
            <Divider />
            <FlatButton
              label="Войти"
              style={{ margin: 12 }}
              onClick={::this.handleSignIn}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

SignIn.propTypes = {
  users: PropTypes.object,
  user: PropTypes.object,
  actions: PropTypes.object,
};

export default SignIn;

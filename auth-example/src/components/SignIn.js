import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    this.refs.username.focus();
  }

  handleSignIn() {}

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
              onClick={this.handleSignIn}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default SignIn;

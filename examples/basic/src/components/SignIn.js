import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    this.refs.username.focus();
  }

  handleSignIn() {}

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper
          style={{
            width: '20%',
            margin: '150px auto',
          }}
          zDepth={2}
        >
          <TextField
            ref="username"
            hintText="Имя пользователя"
            onEnterKeyDown={this.handleSignIn}
            style={{ marginLeft: 20 }}
            floatingLabelText="Имя пользователя"
            underlineShow={false}
          />
          <Divider />
          <TextField
            ref="password"
            type="password"
            onEnterKeyDown={this.handleSignIn}
            hintText="Пароль"
            style={{ marginLeft: 20 }}
            floatingLabelText="Пароль"
            underlineShow={false}
          />
          <Divider />
          <RaisedButton
            label="Войти"
            secondary={'true'}
            style={{ margin: 12 }}
            onClick={this.handleSignIn}
          />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default SignIn;

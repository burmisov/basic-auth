import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import { browserHistory } from 'react-router';

const style = {
  marginLeft: 20,
};

class Test1 extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme()}>

          <Paper zDepth={2}>
            <FlatButton
              label="Зайцы"
              onClick={() => {
                browserHistory.push({
                  pathname: '/test2/',
                });
              }}
            />
            <FlatButton
              label="Загрузить"
              onClick={() => {
                this.props.actions.loadTest1();
              }}
            />
            <Divider />
            <TextField
              hintText="Описание"
              style={style}
              underlineShow={false}
              ref="description"
            />
            <Divider />

            <FlatButton
              label="Добавить"
              onClick={() => {
                this.props.actions.insertTest1({
                  description: this.refs.description.input.value,
                });
              }}
            />
            <List>
              {
                this.props.test1.get('items').map((item) => (
                  <ListItem
                    key={item.description}
                  >
                    {item.description}
                  </ListItem>
                ))
              }
            </List>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

Test1.propTypes = {
  test1: PropTypes.object,
  test2: PropTypes.object,
  actions: PropTypes.object,
};

export default Test1;

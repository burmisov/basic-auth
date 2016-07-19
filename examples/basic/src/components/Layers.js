import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import uuid from 'uuid';

const style = {
  marginLeft: 20,
};

class Layers extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme()}>

          <Paper zDepth={2}>
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
                this.props.actions.insertLayer({
                  description: this.refs.description.input.value,
                });
              }}
            />
            <List>
              {
                this.props.layers.get('items') &&
                this.props.layers.get('items').map((item) => (
                  <ListItem
                    key={uuid.v4()}
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

Layers.propTypes = {
  layers: PropTypes.object,
  users: PropTypes.object,
  actions: PropTypes.object,
};

export default Layers;

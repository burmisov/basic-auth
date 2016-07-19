import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { List, ListItem } from 'material-ui/List';
import uuid from 'uuid';

const Layers = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <List>
      {
        this.props.layers.get('items') &&
        this.props.layers.get('items').map((item) => (
          <ListItem
            key={uuid.v4()}
          >
            {item.displayName}
          </ListItem>
        ))
      }
    </List>
  </MuiThemeProvider>
);

Layers.propTypes = {
  layers: PropTypes.object,
  users: PropTypes.object,
  actions: PropTypes.object,
};

export default Layers;

import React from 'react';
import {
  AppBar, Toolbar, Typography, Button
} from '@mui/material';
import './TopBar.css';
import axios from 'axios';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick () {
    axios.post('admin/logout')
    .then(() => {
      this.props.changeContext({
        loggedUser:null
      });
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            {this.props.loggedUser ? `hi ${this.props.loggedUser}` : '登录以使用电影推荐系统'}
          </Typography>
          {
            this.props.loggedUser ? 
            <Button className='right' component="button" variant="contained" color="error" onClick={this.handleClick}>注销</Button> : 
            ''
          }
        </Toolbar>
      </AppBar>
    );
  }
}
export default TopBar;

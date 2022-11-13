import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, Link
} from '@mui/material';
import './TopBar.css';
import {Link as RouterLink}from 'react-router-dom';
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
        <Toolbar justifyContent="space-around">
          <Typography variant="h5" color="inherit">
            {this.props.loggedUser ? '' : '登录以使用电影推荐系统'}
          </Typography>

          <Link sx={{mx:3}} component={RouterLink} color="inherit" underline='none' to={'/ratings'}>电影评分</Link>
          <Link sx={{mx:3}} component={RouterLink} color="inherit" underline='none' to={'/recommendations'}>电影推荐</Link>

          {
            this.props.loggedUser ? 
            <Button component="button" variant="contained" color="error" onClick={this.handleClick}>注销</Button> : 
            ''
          }
        </Toolbar>
      </AppBar>
    );
  }
}
export default TopBar;

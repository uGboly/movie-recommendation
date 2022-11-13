import React from 'react';
import {
  HashRouter, Route, Switch, Redirect
} from 'react-router-dom';
import './App.css';
import {
  Grid, Paper
} from '@mui/material';

import TopBar from './components/topBar/TopBar';
import LoginRegister from './components/LoginRegister/LoginRegister';
import MoiveRating from './components/movieRating/MovieRating';
import MoiveRecommendation from './components/movieRecommendation/MovieRecommendation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeContext = this.changeContext.bind(this);

    this.state = {
      loggedUser:null
    };
  }

  changeContext(context){
    this.setState(context);
  }

  render() {
    return (
      <HashRouter>
      <div>
      <Grid container spacing={8} justifyContent='center'>
        <Grid item xs={12}>
        <TopBar loggedUser={this.state.loggedUser} changeContext={this.changeContext}/>
        </Grid>
        <div className="main-topbar-buffer"/>

        <Grid item sm={8}>
          <Paper className="main-grid-item">
            <Switch>
              <Route exact path="/" render={ props => <LoginRegister {...props} changeContext={this.changeContext}/>}/>
              {
                this.state.loggedUser ? (
                <Route path="/ratings"
                  render={ props => <MoiveRating {...props} /> }
                />
                ) :
                <Redirect path="/ratings" to="/" />
              }

              {
                this.state.loggedUser ? (
                <Route path="/recommendations"
                  render={ props => <MoiveRecommendation {...props} /> }
                />
                ) :
                <Redirect path="/recommendations" to="/" />
              }              
            </Switch>
          </Paper>
        </Grid>
      </Grid>
      </div>
      </HashRouter>
    );
  }
}


export default App;

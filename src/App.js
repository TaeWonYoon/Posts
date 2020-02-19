import React, { Component } from 'react';
import {PostContainer} from './containers';
import { Header } from './components';

class App extends Component {
    render() {
        return (
            <div>
              <Header></Header>
              <PostContainer/>
          </div>
        );
    }
}

export default App;

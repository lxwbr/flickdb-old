import * as React from 'react';
import List from './list';
import { movies } from '../data/movies'
import { IMovie } from '../data/interfaces';

// SplitPane component
export default class SplitPane extends React.Component<{}, any> {
      constructor(props: any) {
        super(props);
        this.state = {
          text: ''
        };
        this.onMovieChanged = this.onMovieChanged.bind(this);
      }
      
      onMovieChanged(movies: IMovie[]) {
        switch (movies.length) {
          case 0: // TODO:
          case 1: this.setState({text: movies[0].original_title}) 
          default: // TODO:
        }
      }

      render() {
        const SplitPane = require('react-split-pane');

        return (
          <SplitPane defaultSize="30%" split="vertical">
                <List movies={movies}
                      onMovieChanged={this.onMovieChanged}/>
                <div>{this.state.text}</div>
            </SplitPane>
        );
      }
    }
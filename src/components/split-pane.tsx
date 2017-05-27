import * as React from 'react';
import List from './list';
import MovieDetails from './movie-details';
import { movies } from '../data/movies'
import { IMovie } from '../data/interfaces';
import linkState from 'react-link-state';

// SplitPane component
export default class SplitPane extends React.Component<{}, any> {
      constructor(props: any) {
        super(props);
        this.state = {
          movie: {}
        };
        this.handleSelectedMoviesChanged = this.handleSelectedMoviesChanged.bind(this);
        this.handleMoviePropChange = this.handleMoviePropChange.bind(this);
      },
      handleSelectedMoviesChanged(movies: IMovie[]) {
        switch (movies.length) {
          case 0: ; // TODO:
          case 1: this.setState({movie: movies[0]});
          default: ; // TODO:
        }
      },
      handleMoviePropChange(prop: String, value: any) {
        const movie = this.state.movie;
        movie[prop] = value;

        this.setState({movie: movie});
      }
      render() {
        const SplitPane = require('react-split-pane');

        return (
          <SplitPane defaultSize="30%" split="vertical">
                <List movies={movies}
                      onMovieChanged={this.handleSelectedMoviesChanged}/>
                <MovieDetails movie={this.state.movie}
                              onMoviePropChange={this.handleMoviePropChange} />

            </SplitPane>
        );
      }
    }

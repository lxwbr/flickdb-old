import * as React from 'react';
import { IMovie, IListProps, IListState } from '../data/interfaces';

function comp(movie: IMovie) {
	return <div className='movie'>
		<div className='name'>{movie.original_title}</div>
		<div className='email'>{movie.id}</div>
	</div>
}

// List component
export default class List extends React.Component<IListProps, IListState> {
  constructor(props: IListProps){
        super(props);
        this.state = {
          selectedMovies: []
        };
        this.changedMovie = this.changedMovie.bind(this);
    }

  changedMovie(index: number | number[]) {
    if (typeof index === "number") {
      this.setState({ selectedMovies: [this.props.movies[index]] });
      if (this.props.onMovieChanged)
        this.props.onMovieChanged([this.props.movies[index]])
    } else {
      // TODO: test
      this.setState({ selectedMovies: index.map(i => this.props.movies[i]) });
      if (this.props.onMovieChanged)
        this.props.onMovieChanged(this.state.selectedMovies)
    }
  }

  render() {
    const ReactList = require('./react-list-select/List')

    return (
      <ReactList items={this.props.movies.map(function(movie: IMovie) {return comp(movie)})}
                 multiple={false}
                 onChange={this.changedMovie}
                 />
    );
  }
}
import * as React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { uniqBy } from 'lodash/array';
import { Autocomplete } from 'react-md';
import GenreChip from './genre-chip';
import IGenresSelectorProps from '../data/interfaces.ts'

export default class GenresSelector extends React.Component<IGenresSelectorProps, any> {
  constructor(props) {
    super(props);
    this.state = { filteredGenres: this.props.possibleGenres };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.genres !== nextProps.genres) {
      this.setState({
        filteredGenres: this.props.possibleGenres.filter(state => nextProps.genres.indexOf(state) === -1),
      });
    }
  }

  _addGenre = (state, genreIndex, genres) => {
    const newGenres = [...this.props.genres, genres[genreIndex]];
    this.props.onGenresChanged(uniqBy(newGenres, s => s))
  };

  _removeGenre = (genre) => {
    const genres = this.props.genres.slice();
    genres.splice(genres.indexOf(genre), 1);
    this.props.onGenresChanged(genres);
  };

  render() {
    const chips = this.props.genres.map(genre => (
      <GenreChip key={genre} genre={genre} onClick={this._removeGenre} />
    ));
    return (
      <div>
        {chips}
        <Autocomplete
          id="genres"
          label="Genres"
          data={this.state.filteredGenres}
          dataLabel="name"
          onAutocomplete={this._addGenre}
          clearOnAutocomplete
          deleteKeys="genre"
        />
      </div>
    );
  }
}

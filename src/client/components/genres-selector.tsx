import * as React from 'react';

import { uniqBy } from 'lodash/array';
import { Autocomplete } from 'react-md';
import GenreChip from './genre-chip';
import { IGenresSelectorProps, IGenre } from '../data/interfaces'

export default class GenresSelector extends React.Component<IGenresSelectorProps, any> {
  constructor(props: IGenresSelectorProps) {
    super(props);
  }

  _addGenre = (state: any, genreIndex: any, genres: string[]) => {
    const newGenres = [...this.props.genres, genres[genreIndex]];
    if (this.props.onGenresChanged)
      this.props.onGenresChanged(uniqBy(newGenres, (s: string) => s))
  };

  _removeGenre = (genre: IGenre) => {
    const genres = this.props.genres.slice();
    genres.splice(genres.indexOf(genre), 1);
    if (this.props.onGenresChanged)
      this.props.onGenresChanged(genres);
  };

  render() {
    const chips = this.props.genres.map(genre => (
      <GenreChip key={genre.value} genre={genre} onClick={this._removeGenre} />
    ));
    return (
      <div>
        {chips}
        <Autocomplete
          id="genres"
          label="Genres"
          filter={Autocomplete.fuzzyFilter}
          data={this.props.possibleGenres.map(genre => genre.name)}
          onAutocomplete={this._addGenre}
          clearOnAutocomplete
          deleteKeys={this.props.genres.map(genre => genre.name)}
        />
      </div>
    );
  }
}

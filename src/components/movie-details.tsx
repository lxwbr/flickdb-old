import * as React from 'react';
import { IMovie } from '../data/interfaces';
import { TextField, Checkbox, Toolbar } from 'react-md';
import GenresSelector from './genres-selector';

const GENRES = ['Drama', 'Comedy', 'Action'];

export default class MovieDetails extends React.Component<IMovieDetailsProps, undefined> {
      constructor(props: IMovieDetailsProps) {
        super(props);
      },
      render() {
        return (
          <div>
            <Toolbar
              actions={<Checkbox
                id="adult"
                name="simpleCheckboxes"
                defaultChecked={this.props.movie.adult ? this.props.movie.adult : false}
                onChange={(value) => {
                  if (this.props.onMoviePropChange)
                    this.props.onMoviePropChange("adult", value);
                }}
              />}>
              <TextField
                  id="originalTitle"
                  lineDirection="center"
                  placeholder="Original Title"
                  className="md-cell"
                  value={this.props.movie.original_title ? this.props.movie.original_title : ''}
                  onChange={(value) => {
                    if (this.props.onMoviePropChange)
                      this.props.onMoviePropChange("original_title", value);
                  }}
                />
            </Toolbar>
            <form className="md-grid">
                <TextField
                  id="budget"
                  label="Budget"
                  type="number"
                  step={100.0}
                  pattern="^\d+(\.|\,)\d{2}"
                  className="md-cell md-cell--12"
                  value={this.props.movie.budget ? this.props.movie.budget : ''}
                  onChange={(value) => {
                    if (this.props.onMoviePropChange)
                      this.props.onMoviePropChange("budget", value);
                  }}
                />
                <GenresSelector
                  genres={this.props.movie.genres ? this.props.movie.genres : []}
                  possibleGenres={GENRES}
                  className="md-cell--12"
                  onGenresChanged={(genres: String[]) => {
                    if (this.props.onMoviePropChange)
                      this.props.onMoviePropChange("genres", genres);
                  }/>
                <TextField
                  id="original_language"
                  label="Original Language"
                  type="text"
                  className="md-cell md-cell--3"
                  value={this.props.movie.original_language ? this.props.movie.original_language : ''}
                  onChange={(value) => {
                    if (this.props.onMoviePropChange)
                      this.props.onMoviePropChange("original_language", value);
                  }}
                />
                <TextField
                  id="overview"
                  label="Overview"
                  rows={2}
                  className="md-cell md-cell--12"
                  value={this.props.movie.overview ? this.props.movie.overview : ''}
                  onChange={(value) => {
                    if (this.props.onMoviePropChange)
                      this.props.onMoviePropChange("overview", value);
                  }}
                />
                <TextField
                  id="popularity"
                  label="Popularity"
                  type="number"
                  step={0.1}
                  value={this.props.movie.popularity ? this.props.movie.popularity : ''}
                  pattern="^\d+(\.|\,)\d{2}"
                  className="md-cell md-cell--3"
                  onChange={(value) => {
                    if (this.props.onMoviePropChange)
                      this.props.onMoviePropChange("popularity", value);
                  }}
                />
            </form>
          </div>
        );
      }
    }

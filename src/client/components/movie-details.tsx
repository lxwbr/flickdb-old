import * as React from 'react';
import { TextField, Checkbox, Toolbar, Button } from 'react-md';
import { CSSTransitionGroup } from 'react-transition-group'
import GenresSelector from './genres-selector';
import { IMovieDetailsProps, IGenre } from '../data/interfaces';

const GENRES = [{value: 1, name: 'Drama'},
                {value: 2, name: 'Comedy'},
                {value: 3, name: 'Action'}];

export default class MovieDetails extends React.Component<IMovieDetailsProps, undefined> {
      constructor(props: IMovieDetailsProps) {
        super(props);
      }
      
      render() {
        return (
          <div>
            <Toolbar
              actions={<Checkbox
                id="adult"
                name="simpleCheckboxes"
                defaultChecked={this.props.movie.adult ? this.props.movie.adult : false}
                onChange={(value: boolean) => {
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
                  onChange={(value: string) => {
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
                  onChange={(value: number) => {
                    if (this.props.onMoviePropChange)
                      this.props.onMoviePropChange("budget", value);
                  }}
                />
                <GenresSelector
                  genres={this.props.movie.genres ? this.props.movie.genres : []}
                  possibleGenres={GENRES}
                  onGenresChanged={(genres: IGenre[]) => {
                    if (this.props.onMoviePropChange)
                      this.props.onMoviePropChange("genres", genres);
                  }}/>
                <TextField
                  id="original_language"
                  label="Original Language"
                  type="text"
                  className="md-cell md-cell--3"
                  value={this.props.movie.original_language ? this.props.movie.original_language : ''}
                  onChange={(value: string) => {
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
                  onChange={(value: string) => {
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
                  onChange={(value: number) => {
                    if (this.props.onMoviePropChange)
                      this.props.onMoviePropChange("popularity", value);
                  }}
                />
            </form>
            <Button
              floating
              secondary
              fixed
            >
              add
            </Button>
          </div>
        );
      }
    }

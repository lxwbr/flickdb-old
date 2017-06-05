import * as React from 'react';
import { IGenreChipProps } from '../data/interfaces'

import { Chip } from 'react-md';

export default class GenreChip extends React.Component<IGenreChipProps, any> {
  _handleRemove = () => {
    if (this.props.onClick)
      this.props.onClick(this.props.genre);
  };

  render() {
    return (
      <Chip
        onClick={this._handleRemove}
        removable
        label={this.props.genre}
      />
    );
  }
}

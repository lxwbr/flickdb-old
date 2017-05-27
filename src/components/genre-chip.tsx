import * as React from 'react';
import { IStateChipProps,  } from '../data/interfaces.ts'

import { Chip } from 'react-md';

export default class GenreChip extends React.Component<IGenreChipProps, any> {
  _handleRemove = () => {
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

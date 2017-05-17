import * as React from 'react';
import { IMovie } from '../data/interfaces';

function comp(movie: IMovie) {
	return <div className='movie'>
		<div className='name'>{movie.original_title}</div>
		<div className='email'>{movie.id}</div>
	</div>
}

// List component
export default class List extends React.Component<any, any> {
  constructor(props: any){
        super(props);
        this.state = { data: this.props.data };
    }

  private handleChange(i: number) : void {
        // TODO: fix this (not referring to the component)
        this.setState({ selected: this.state.data[i] });
    }

  render() {
    const List = require('react-list-select')
    
    return (
      <List items={this.state.data.map(function(movie: IMovie) {return comp(movie)})}
            selected={[0]}
            multiple={false}
            onChange={this.handleChange} />
    );
  }
}
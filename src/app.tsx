import * as React from 'react';
import { IMovie } from './interfaces';

const items: Array<IMovie> = [
      { original_title: 'Ant-Man', id: 124141 },
      { original_title: 'Spiderman' },
      { original_title: 'Batman' },
      { original_title: 'Beauty and The Beast' },
      { original_title: 'Lego Movie' }
    ]
  
function comp(movie: IMovie) {
	return <div className='movie'>
		<div className='name'>{movie.original_title}</div>
		<div className='email'>{movie.id}</div>
	</div>
}

// List component
class List extends React.Component<any, any> {
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

// SplitPane component
class SplitPane extends React.Component<{}, undefined> {
      render() {
        const SplitPane = require('react-split-pane');

        return (
          <SplitPane defaultSize="20%" split="vertical">
                <List data={items}/>
                <div></div>
            </SplitPane>
        );
      }
    }

// App
export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <div>
        <SplitPane/>
      </div>
    );
  }
}

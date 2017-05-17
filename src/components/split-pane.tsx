import * as React from 'react';
import List from './list';
import { movies } from '../data/movies'

// SplitPane component
export default class SplitPane extends React.Component<{}, undefined> {
      render() {
        const SplitPane = require('react-split-pane');

        return (
          <SplitPane defaultSize="30%" split="vertical">
                <List data={movies}/>
                <div></div>
            </SplitPane>
        );
      }
    }
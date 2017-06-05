import * as React from 'react';
import { createPaginationContainer, graphql } from 'react-relay';
import { IViewer, IMovie } from '../data/interfaces';
import MovieEntry from './MovieEntry';

const MoviesList = (viewer: IViewer, onMovieChanged: (movie: IMovie) => void) => ({
  changedMovie(index: number | number[]) {
    if (typeof index === "number") {
      if (onMovieChanged)
            onMovieChanged(viewer.movies.edges[index].node)
    } else {
      // TODO: implement
    }
  },

  render() {
    const ReactList = require('./react-list-select/List')

    return (
      <ReactList items={viewer.movies.edges.map(
                        edge => <MovieEntry movie={edge.node} />
                    )}
                 multiple={false}
                 onChange={(index: number | number[]) => this.changedMovie(index)}
                 />
    );
  }
});

export default createPaginationContainer (MoviesList,
    graphql`fragment MovieList_viewer on Viewer {
        movies(
            first: $count
            after: $cursor
            orderby: $orderBy
        ) @connection(key: "MovieList_movies") {
            edges {
                node {
                    id
                    ...MovieEntry_movie
                }
            }
        }
    }`,
    {
        direction: 'forward',
        getConnectionFromProps(props) {
            return props.viewer.movies;
        },
        getFragmentVariables(prevVars, totalCount) {
            return {
                ...prevVars,
                count: totalCount,
            };
        },
        getVariables(_: any, {count, cursor}, fragmentVariables) {
            return {
                count,
                cursor,
                orderBy: fragmentVariables.orderBy,
            };
        },
        query: graphql`query MovieList_PaginationQuery(
            $count: Int!
            $cursor: String
            $orderby: String!
        ) {
            user {
                ...MovieList_viewer
            }
        }`
    }
);
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { IMovie } from '../data/interfaces';

const MovieEntry = (movie: IMovie) => (
    <div className='movie'>
        <div className='name'>{movie.original_title}</div>
    </div>
);  

export default createFragmentContainer (MovieEntry,
    graphql`fragment MovieEntry_movie on Movie {
        original_title
    }`
);
import * as casual from 'casual';
import { MockList } from 'graphql-tools';

const mocks = {
    String: () => 'It works!',
    Query: () => ({
        hello: () => { return casual.text },
        viewer: () => ({
            movies: () => ({
                edges: () => new MockList(4,
                    (o, {node}) => ({node})
                )
            })
        })
    }),
};

export default mocks;

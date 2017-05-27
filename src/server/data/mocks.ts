import * as casual from 'casual';

const mocks = {
  String: () => 'It works!',
  Query: () => ({
    hello: () => { return casual.text }
  }),
};

export default mocks;

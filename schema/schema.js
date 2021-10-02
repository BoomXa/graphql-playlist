const { find } = require('lodash');

const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = graphql;

const BOOKS = [
  {
    id: '1',
    name: 'Name of the Wind',
    genre: 'Fantasy',
    authorId: '1',
  },
  {
    id: '2',
    name: 'The Final Empire',
    genre: 'Fantasy',
    authorId: '2',
  },
  {
    id: '3',
    name: 'The Long Earth',
    genre: 'Sci-Fi',
    authorId: '3',
  },
  {
    id: '4',
    name: 'The Hero of ages',
    genre: 'Fantasy',
    authorId: '2',
  },
  {
    id: '5',
    name: 'The Colour of Magic',
    genre: 'Fantasy',
    authorId: '3',
  },
  {
    id: '6',
    name: 'The Light Fantastic',
    genre: 'Sci-Fi',
    authorId: '3',
  },
];

const AUTHORS = [
  {
    id: '1',
    name: 'Patrick Rothfuss',
    age: 44,
  },
  {
    id: '2',
    name: 'Brandon Sanderson',
    age: 42,
  },
  {
    id: '3',
    name: 'Terry Pratchett',
    age: 66,
  },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return find(AUTHORS, {
          id: parent.authorId,
        });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootqueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return find(BOOKS, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return find(AUTHORS, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

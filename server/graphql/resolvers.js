const {Users, Posts,Tags} = require("../models");


const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    books: (parent, args, ctx) => {
      if(!ctx?.user) return null

      return books;
    },
		users: async () => {
			const users = await Users.findAll({
        include: 'posts'
      });
			return users;
		},
    user: async (parent, args, contextValue) => {
      console.log("🚀 ~ file: resolvers.js:65 ~ books: ~ req", contextValue)
      if(!contextValue?.user) return null
      return contextValue?.user;
    },
    posts: async () => {
      const posts = await Posts.findAll({
        include: 'tags'
      });
      return posts;
    }
  },
  Mutation:{
    createPost: async (parent,args,contextValue )=>{
      const {title,content,userId,tags} = args.postInput;
      console.log("🚀 ~ file: resolvers.js:43 ~ createPost: ~ tags:", tags)
      const post = await Posts.create({
        title,
        content,
        userId
      })
      post.addTags(tags)
      return post;
    },
    createTag: async (parent,args,contextValue )=>{
      const {name} = args;
      const tag = await Tags.create({
        name
      })
      return tag;
    }
  }
};

module.exports =  resolvers;



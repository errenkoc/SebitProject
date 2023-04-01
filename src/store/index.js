import { createStore } from 'vuex';
import postsData from '@/assets/posts.json';
import usersData from '@/assets/users.json';
import commentsData from '@/assets/comments.json';

export default createStore({
  state: {
    posts: postsData,
    users: usersData,
    comments: commentsData,
  },
  getters: {
    allPosts: (state) => state.posts,
    allUsers: (state) => state.users,
    allComments: (state) => state.comments,
    getPostById: (state) => (id) => {
      return state.posts.find((post) => post.id === id);
    },
    getUserById: (state) => (id) => {
      return state.users.find((user) => user.id === id);
    },
    getCommentsByPostId: (state) => (postId) => {
      return state.comments.filter((comment) => comment.postId === postId);
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});

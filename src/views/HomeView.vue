<template>
  <v-row>
    <v-col class="d-flex d-md-none">
      <p class="text-subtitle-3">Hello Vue Title!</p>
    </v-col>
  </v-row>
  <v-divider class="mt-10 mx-0"></v-divider>
  <v-container>
    <v-row class="ml-1">
      <h2>Example Blog Project</h2>
      <p class="text-subtitle-3 mt-2 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irre dolor in reprehenderit in voluptate velit esse cillum dolore eu
        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </v-row>
    <v-row>
      <v-col
        v-for="(post, index) in paginatedPosts"
        :key="post.id"
        :cols="12"
        :sm="6"
        :md="4"
        :lg="3"
      >
        <v-card>
          <img :src="require(`@/assets/images/image${post.imageId}.jpg`)" alt="Post Image" />
          <v-card-text class="text-subtitle-1">{{ post.title }}</v-card-text>
            <v-row class="d-flex justify-start ma-4">
              <v-btn text @click="viewPost(post)">View</v-btn>
              <v-btn text @click="editPost(post)">Edit</v-btn>
              <v-spacer></v-spacer>
              <v-badge
                color="grey darken-1"
                content-class="white--text"
                :content="'Post-' + (index + 1)"
                overlap
                offset-y
                class="mr-6"
              >
              <v-span></v-span>
              </v-badge>
            </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-end">
      <v-btn @click="previousPage" :disabled="currentPage === 1">Previous</v-btn>
      <v-btn @click="nextPage" :disabled="currentPage === totalPages">Next</v-btn>
    </v-row>
  </v-container>

  <PostViewModal
    :post="selectedPost"
    v-model="showViewModal"
    @close="showContextMenu = false"
  />

  <PostEditModal
    :post="selectedPost"
    v-model="showEditModal"
    @update-post="updatePost"
    @close="resetSelectedPost"
  />
</template>

<script>
  import { defineComponent } from 'vue';
  import { mapGetters } from 'vuex';

  // Components
  import PostViewModal from '../components/PostViewModal.vue';
  import PostEditModal from '../components/PostEditModal.vue';

  export default defineComponent({
    name: 'HomeView',

    components: {
      PostViewModal,
      PostEditModal,
    },

    data: () => ({
      posts: [],
      selectedPost: null,
      showViewModal: false,
      showEditModal: false,
      perPage: 8,
      currentPage: 1,
    }),

    computed: {
      ...mapGetters(['allPosts']),
      paginatedPosts() {
        const pageSize = 8;
        const startIndex = (this.currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return this.allPosts.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.allPosts.length / 8);
      },
    },

    methods: {
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      viewPost(post) {
        this.selectedPost = post;
        this.showViewModal = true;
      },
      editPost(post) {
        this.selectedPost = Object.assign({}, post);
        this.showEditModal = true;
      },
      updatePost(updatedPost) {
        const index = this.posts.findIndex((post) => post.id === updatedPost.id);
        if (index !== -1) {
          this.posts.splice(index, 1, updatedPost);
        }
      },
      resetSelectedPost() {
        this.selectedPost = null;
      },
    },
  });
</script>
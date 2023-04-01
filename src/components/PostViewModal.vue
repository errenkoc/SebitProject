<template>
  <v-dialog :value="show" max-width="80%">
    <v-card>
      <v-row class="ma-4"><h3>Post Details</h3></v-row>
      <v-divider></v-divider>
      <v-row class="mt-1">
        <v-col cols="12" lg="3" sm="12">
          <img :src="require(`@/assets/images/image${post.imageId}.jpg`)" alt="Post Image" class="ma-2"/>
        </v-col>
        <v-col lg="8" sm="12">
          <v-card-title class="ml-4">{{ post.title }} ({{ author.name }})</v-card-title>
          <v-card-text class="ml-4">{{ post.body }}</v-card-text>
        </v-col>
      </v-row>
      <v-row class="ma-4">
        <h3 class="mb-4">Comments ({{ commentCount() }})</h3>
        <div>
          <v-card
            v-for="(comment, index) in postComments"
            :key="comment.id"
            class="mb-3"
            outlined
            color="grey-lighten-2"
            rounded="0"
            elevation="0"
          >
            <v-row>
              <v-col cols="12" lg="1" sm="1" class="shorter-width">
                <v-avatar class="ma-3" style="width: 30px; height: 30px;">
                  <img :src="require(`@/assets/images/profile/profile${comment.userId}.jpg`)" alt="User Avatar" />
                </v-avatar>
              </v-col>
              <v-col lg="11" sm="11">
                <v-card-title>
                  <div>
                    <div class="text-title-3 mb-4 mt-1">{{ allUsers.find(user => user.id === comment.userId).name }}</div>
                    <div class="text-subtitle-1">{{ comment.name }}</div>
                  </div>
                </v-card-title>
                <v-card-text>
                  {{ comment.body }}
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {

    props: {
      post: Object,
      show: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({

    }),

    computed: {
      ...mapGetters(['allUsers', 'allComments',]),
      author() {
        return this.allUsers.find((user) => user.id === this.post.userId);
      },
      postComments() {
        return this.allComments.filter((comment) => comment.postId === this.post.id);
      },
    },
    
    methods: {
      commentCount() {
        return this.allComments.filter((comment) => comment.postId === this.post.id).length;
      }
    },
  }
</script>
<style scoped>
.shorter-width {
  max-width: 40px;
}
h3 {
  font-family:sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
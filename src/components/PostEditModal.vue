<template>
  <v-dialog :value="show" max-width="80%">
    <v-card>
      <v-row class="ma-4"><h3>Edit Post</h3></v-row>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card-text>Title</v-card-text>
              <v-text-field label="Title" v-model="editedPost.title" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-card-text>Description</v-card-text>
              <v-textarea label="Body" v-model="editedPost.body" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="success" text @click="save">Apply</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'PostEditModal',

  props: {
    post: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      dialog: this.modelValue,
      editedPost: { ...this.post },
    };
  },

  watch: {
    modelValue(newValue) {
      this.dialog = newValue;
    },
    dialog(newValue) {
      this.$emit('update:modelValue', newValue);
    },
  },

  methods: {
    saveEdit() {
      this.$emit('update-post', this.editedPost);
      this.dialog = false;
    },
  },
};
</script>
  
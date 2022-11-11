<script lang="ts" setup>
import { ref, onMounted, watch, watchEffect } from 'vue';
import { Post, TimelinePost } from '../posts';
import { useRouter } from 'vue-router';
import { marked } from 'marked';
import highlightjs from 'highlight.js';
import debounce from 'lodash/debounce';
import { usePosts } from '../stores/posts';
import { useUsers } from '../stores/users';

const props = defineProps<{
  post: TimelinePost | Post;
}>();

const emit = defineEmits<{
  (event: 'submit', post: Post): void;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref('');
const contentEditable = ref<HTMLDListElement>();

const posts = usePosts();
const router = useRouter();
const usersStore = useUsers();

function parseHtml(markdown: string) {
  marked.parse(
    markdown,
    {
      gfm: true, // GitHub Format
      breaks: true,
      highlight: (code) => {
        return highlightjs.highlightAuto(code).value;
      },
    },
    (err, parseResult) => {
      html.value = parseResult;
    }
  );
}

// Watch changes for content on input and make appropriate changes
watch(
  content,
  // Debounce delays 250ms
  debounce((newContent) => {
    parseHtml(newContent);
  }, 250),
  {
    immediate: true,
  }
);

// On load show the inserted value and watches for newly inserted values
onMounted(() => {
  if (!contentEditable.value) {
    throw Error('Content Editable DOM node was not found');
  }
  // Assign content value with the inner text
  contentEditable.value.innerText = content.value;
});

function handleInput() {
  if (!contentEditable.value) {
    throw Error('Content Editable DOM node was not found');
  }

  console.log(contentEditable.value?.innerText);

  // Assign content value with the inner text
  content.value = contentEditable.value?.innerText;
}

async function handleClick() {
  if (!usersStore.currentUserId) {
    throw Error(`User was not Found!`);
  }
  const newPost: Post = {
    ...props.post,
    createdAt:
      typeof props.post.createdAt === 'string'
        ? props.post.createdAt
        : props.post.createdAt.toISO(),
    title: title.value,
    author: usersStore.currentUserId,
    markdown: content.value,
    html: html.value,
  };
  emit('submit', newPost);
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input type="text" class="input" v-model="title" />
        {{ title }}
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div
        id="contenteditable"
        contenteditable
        ref="contentEditable"
        class="contentEditable"
        @input="handleInput"
      />
    </div>
    <div class="column">
      <div v-html="html"></div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <button
        id="submit"
        class="button is-primary is-pulled-right"
        @click="handleClick"
      >
        Save Post
      </button>
    </div>
  </div>
</template>

<style>
.contentEditable {
  border: 1px solid #8080808a;
  border-radius: 10px;
  padding: 10px 0 10px 10px;
}
</style>

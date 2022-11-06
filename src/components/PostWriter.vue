<script lang="ts" setup>
import { ref, onMounted, watch, watchEffect } from "vue";
import { TimelinePost } from "../posts";
import { marked } from "marked";
import highlightjs from "highlight.js";
import debounce from "lodash/debounce";

const props = defineProps<{
  post: TimelinePost;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref("");
const contentEditable = ref<HTMLDListElement>();

function parseHtml(markdown: string) {
  marked.parse(
    markdown,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => {
        return highlightjs.highlightAuto(code).value;
      },
    },
    (err, parseResult) => {
      // console.log(parseResult);
      html.value = parseResult;
    }
  );
}

// Watch Example 1
// watchEffect(() => {
//   marked.parse(content.value, (err, parseResult) => {
//     // console.log(parseResult);
//     html.value = parseResult;
//   });
// });

// Watch Example 2
watch(
  content,
  debounce((newContent) => {
    parseHtml(newContent);
  }, 250),
  {
    immediate: true,
  }
);

onMounted(() => {
  if (!contentEditable.value) {
    throw Error("Content Editable DOM node was not found");
  }

  contentEditable.value.innerText = content.value;
});

function handleInput() {
  if (!contentEditable.value) {
    throw Error("Content Editable DOM node was not found");
  }
  content.value = contentEditable.value?.innerText;
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
</template>

<style>
.contentEditable {
  border: 1px solid #8080808a;
  border-radius: 10px;
  padding: 10px 0 10px 10px;
}
</style>

<script setup lang="ts">
import { TimelinePost } from "../posts";

defineProps<{
  post: TimelinePost;
}>();
</script>

<template>
  <a class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
    <a>{{ post.title }}</a>
    <p>{{ post.description }}</p>
    <div>{{ post.createdAt.toFormat("d MMM") }}</div>
  </a>
</template>

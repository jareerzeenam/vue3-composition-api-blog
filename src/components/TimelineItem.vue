<script setup lang="ts">
import { TimelinePost } from "../posts";

defineProps<{
  post: TimelinePost;
}>();
</script>

<template>
  <RouterLink
    :to="`/posts/${post.id}`"
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start"
  >
    <a>{{ post.title }}</a>
    <p>{{ post.description }}</p>
    <div>{{ post.createdAt.toFormat("d MMM") }}</div>
    {{ post.author }}
  </RouterLink>
</template>

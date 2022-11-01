<script setup lang="ts">
import { DateTime } from "luxon";
import { ref, computed } from "vue";
import { TimelinePost, today, thisWeek, thisMonth, thisYear } from "../posts";
import TimelineItem from "./TimelineItem.vue";

// Read only const
const periods = ["Today", "This Week", "This Month", "This Year"] as const;

// TS (as const "Today" | "This Week" | "This Month" | "This Year")
type Period = typeof periods[number];

const selectedPeriod = ref<Period>("Today");

const selectPeriod = (period: Period) => {
  selectedPeriod.value = period;
};

const posts = computed<TimelinePost[]>(() => {
  return [today, thisWeek, thisMonth, thisYear]
    .map((post) => {
      return {
        ...post,
        createdAt: DateTime.fromISO(post.createdAt),
      };
    })
    .filter((post) => {
      if (selectedPeriod.value === "Today") {
        return post.createdAt >= DateTime.now().minus({ day: 1 });
      }
      if (selectedPeriod.value === "This Week") {
        return post.createdAt >= DateTime.now().minus({ week: 1 });
      }
      if (selectedPeriod.value === "This Month") {
        return post.createdAt >= DateTime.now().minus({ month: 1 });
      }

      return post;
    });
});
</script>

<template>
  <nav class="is-primary panel">
    {{ selectedPeriod }}
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active': period === selectedPeriod }"
        @click="selectPeriod(period)"
      >
        {{ period }}
      </a>
    </span>

    <TimelineItem v-for="post of posts" :key="post.id" :post="post" />
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Read only const
const periods = ["Today", "This Week", "This Month", "This Year"] as const;

// TS (as const "Today" | "This Week" | "This Month" | "This Year")
type Period = typeof periods[number];

const selectedPeriod = ref<Period>("Today");

const selectPeriod = (period: Period) => {
  selectedPeriod.value = period;
};
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
  </nav>
</template>

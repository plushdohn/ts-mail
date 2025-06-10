<script setup lang="ts">
import { data } from "../data/home.data";
</script>

<template>
  <div class="container">
    <div v-html="data.codeHtml" class="code" />
    <iframe class="template" :srcdoc="data.templateHtml"></iframe>
  </div>
</template>

<style scoped>
.container {
  max-width: 1152px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  border-radius: 0.25rem;
  overflow: hidden;
}

.code {
  flex: 1;
}

.code > * {
  margin: 0;
  padding: 1rem;
  overflow-x: scroll;
  font-size: 12px;
  line-height: 1.5;
}

.template {
  filter: invert(1);
  flex: 1;
  border: none;
  width: 100%;
}
</style>

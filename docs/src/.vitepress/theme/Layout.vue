<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { Content, useRoute } from "vitepress";
import HeroExamples from "../../components/HeroExamples.vue";

const { Layout, VPBackdrop, VPNav, VPLocalNav, VPSkipLink } = DefaultTheme;

const route = useRoute();
</script>

<template>
  <Layout>
    <template #home-features-before>
      <div class="hero">
        <div class="tagline">
          <h1 class="heading">Design emails in Typescript</h1>
          <p class="subtitle">
            Write emails in markdown and get beautiful, HTML emails on any
            platform
          </p>
        </div>

        <HeroExamples />
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.hero {
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.tagline {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.heading {
  font-size: 3rem;
  line-height: 1.2;
  font-weight: bold;
  text-align: center;
}
</style>

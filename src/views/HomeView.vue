<script setup lang="ts">
import ViewportDemo from '../components/ViewportDemo.vue'
import LessDemo from '../components/LessDemo.vue'
</script>

<template>
  <main>
    <LessDemo />
    <!-- <ViewportDemo /> -->
  </main>
</template>

<style lang="less" scoped>
@import '../assets/styles/variables.less';

main {
  max-width: 800px;
  margin: 0 auto;
  padding: @padding-md;
  background-color: @white;
  border-radius: @border-radius-md;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>

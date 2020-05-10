<template>
  <component :is="this.$route.meta.layout || 'default-layout'">
    <router-view></router-view>
  </component>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
});
</script>

<template>
  <section class="c_wrapper movie-video">
    <div class="center">
      <div class="c_header">
        <h3>{{ payload.subtitle }}</h3>
        <h1>{{ payload.title }}</h1>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "movie-video",
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="less" scoped>
.movie-video {
  padding-left: 0;
  padding-right: 0;
  .center {
  }
}
</style>

<template>
  <div id="app">
    <error v-if="isError" />
    <Suspense v-else>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <loading />
      </template>
    </Suspense>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import Error from "@/components/Error";
import Loading from "@/components/Loading";

export default {
  name: "app",
  components: {
    Error,
    Loading,
  },
  setup(props) {
    const store = useStore();
    const isError = ref(store.state.error);
    return { isError };
  },
};
</script>

<style lang="less">

#app {
  background-color: @primary-color;
}
</style>

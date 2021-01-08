<template>
  <error v-if="errorStatus" />
  <Suspense v-else>
    <template #default>
      <div class="content">
        <FixedHeader />
        <router-view />
      </div>
    </template>
    <template #fallback>
      <loading />
    </template>
  </Suspense>
</template>

<script>
import Error from "@/components/Error.vue";
import Loading from "@/components/Loading";
import FixedHeader from "@/components/FixedHeader";
import { useStore } from "vuex";
import { debounce } from "lodash-es";
import { computed, ref, watch } from "vue";
import { CHANGE_SCREEN } from "@/store/mutations-types";

export default {
  name: "app",
  components: {
    Error,
    Loading,
    FixedHeader,
  },
  setup(props) {
    const store = useStore();
    const screenWidth = ref(document.body.clientWidth);
    const onResize = () => {
      screenWidth.value = document.body.clientWidth;
      store.commit(CHANGE_SCREEN, screenWidth.value <= 414 ? true : false);
    };
    const errorStatus = computed(() => store.state.error.status);

    window.addEventListener("resize", debounce(onResize, 300));
    
    return { errorStatus };
  },
};
</script>

<style lang="less">
.content {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans,
    Ubuntu, Cantarell, Helvetica Neue, PingFang SC, Hiragino Sans GB, STHeiti,
    Microsoft Yahei, Wenquanyi Micro Hei, sans-serif;
  font-size: 14px;
}
</style>

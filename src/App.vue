<template>
  <error v-if="errorStatus" />
  <Suspense v-else>
    <template #default>
      <div class="content">
        <FixedHeader />
        <router-view :key="$route.params.kind" />
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
import { computed, ref, watch, provide } from "vue";
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
    const errorStatus = computed(() => store.state.error.status);
    const isMobile = computed(() => store.state.isMobile);

    // 是否为移动端
    const onResize = () => {
      screenWidth.value = document.body.clientWidth;
      document.documentElement.style.fontSize =
        100 * ((screenWidth.value > 650 ? 650 : screenWidth.value) / 375) +
        "px";
      store.commit(CHANGE_SCREEN, screenWidth.value <= 414 ? true : false);
    };
    window.addEventListener("resize", debounce(onResize, 300));
    document.addEventListener("DOMContentLoaded", onResize, false);
    document.addEventListener("visibilitychange", function() {
      const audio = store.state.globalAudio;
      if (!audio) return;
      // document.hidden ? audio.pause() : audio.play();
      document.hidden ? audio.pause() : '';
    });
    provide("isMobile", isMobile);

    return { errorStatus };
  },
};
</script>

<style lang="less">
@import "~@/assets/styles/reset.css";

.content {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans,
    Ubuntu, Cantarell, Helvetica Neue, PingFang SC, Hiragino Sans GB, STHeiti,
    Microsoft Yahei, Wenquanyi Micro Hei, sans-serif;
  font-size: 14px;
}
</style>

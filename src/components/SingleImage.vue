<template>
  <section class="c_wrapper single-image" :class="{ xs: isMobile }">
    <div class="center">
      <img :src="bgImg" alt=""/>
    </div>
  </section>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, inject, toRefs } from "vue";

interface PayloadType {
  mobile_background_img?: string;
  background_img?: string;
}

interface PropsType {
  payload: PayloadType;
}

type Ref<T = any> = {
  value: T;
};

export default {
  name: "single-image",
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: PropsType) {
    const { payload } = toRefs(props);
    const { mobile_background_img, background_img } = payload.value;
    const isMobile = inject("isMobile") as Ref<boolean>;
    const bgImg = computed(() =>
      isMobile.value ? mobile_background_img : background_img
    );

    return { isMobile, bgImg };
  },
};
</script>

<style lang="less" scoped>
.single-image {
  &.xs {
    padding: 0;
    padding-bottom: 1.4rem;
  }
  .center {
    .c_center;
    img {
      width: 100%;
    }
  }
}
</style>

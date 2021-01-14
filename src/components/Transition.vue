<template>
  <section class="transition" ref="domRef">
    <template v-if="title === 'cinema'">
      <div class="cinema c_wrapper">
        <div class="center">
          <img :src="cinemaImg" alt="" />
          <img :src="textImg" alt="" />
        </div>
      </div>
    </template>
    <template v-else-if="title === 'renwu'"></template>
  </section>
</template>

<script lang="ts">
import { computed, toRefs, ref, onMounted, inject } from "vue";

interface PayloadType {
  title?: string;
}

interface PropsType {
  payload: PayloadType;
}

interface HTMLAttributes<T> {
  offsetTop?: number;
}

type Ref<T = any> = {
  value: T;
};

export default {
  name: "transition",
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: PropsType) {
    const domRef = ref(null);
    const isActive = ref(false);
    const { payload } = toRefs(props);
    const { title } = payload.value;

    const isMobile = inject("isMobile") as Ref<boolean>;
    const bgImg = computed(() =>
      isMobile.value
        ? "https://img3.doubanio.com/dae/staticng/search_static/ithil/gen/2020/pic1_95d2f65ab2.jpg"
        : "https://img3.doubanio.com/dae/staticng/search_static/ithil/gen/2020/pic1_web_e1e6efb6cc.jpg"
    );
    const bgActiveImg = computed(() =>
      isMobile.value
        ? "https://img3.doubanio.com/dae/staticng/search_static/ithil/gen/2020/pic2_3f9e413a43.jpg"
        : "https://img3.doubanio.com/dae/staticng/search_static/ithil/gen/2020/pic2_web_6a57ace0e4.jpg"
    );
    const textImg = computed(() =>
      isMobile.value
        ? "https://img3.doubanio.com/dae/staticng/search_static/ithil/gen/2020/open_9b1bb11f17.png"
        : "https://img3.doubanio.com/dae/staticng/search_static/ithil/gen/2020/open_web_db676f0807.png"
    );
    const cinemaImg = computed(() =>
      isActive.value ? bgActiveImg.value : bgImg.value
    );

    onMounted(() => {
      window.addEventListener("scroll", () => {
        const el = document.documentElement;
        const dom: HTMLElement | null = domRef.value;
        if (!dom) return;
        const { offsetTop } = dom;
        isActive.value = el.scrollTop > offsetTop - el.clientHeight / 4;
      });
    });

    return { title, cinemaImg, textImg, domRef, isActive };
  },
};
</script>

<style lang="less" scope>
.cinema {
  margin-top: -1.5rem;
  position: relative;
  padding-left: 0;
  padding-right: 0;
  @media (max-width: 1024px) {
    padding: 0;
    padding-bottom: 1.4rem;
  }
  .center {
    max-width: 800px;
    margin: 0 auto 1.2rem;
    img {
      width: 100%;
    }
    :first-child {
      margin-bottom: -1rem;
    }
  }
}
</style>

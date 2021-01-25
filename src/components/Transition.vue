<template>
  <section class="transition" ref="domRef">
    <template v-if="title === 'cinema'">
      <div class="cinema">
        <div class="center">
          <img :src="cinemaImg" alt="" />
          <img :src="textImg" alt="" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="fade c_wrapper">
        <img :src="imgList[title]['topImg']" :alt="title" ref="topImgRef" />
        <img
          :src="imgList[title]['bottomImg']"
          :alt="title"
          ref="bottomImgRef"
        />
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import { computed, toRefs, ref, onMounted, inject, reactive } from "vue";

interface PayloadType {
  title: string;
}

interface PropsType {
  payload: PayloadType;
}

interface HTMLAttributes<T> {
  offsetTop: number;
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
    const data = reactive({
      imgList: {
        renwu: {
          topImg:
            "https://img3.doubanio.com/dae/staticng/search_static/ithil/gen/2020/niandurenwu_niandu_4e5155ff0a.png",
          bottomImg:
            "https://img3.doubanio.com/dae/staticng/search_static/ithil/gen/2020/niandurenwu_renwu_718bdf61ae.png",
        },
        yiqingzhixia: {
          topImg:
            "https://img3.doubanio.com/dae/staticng/search_static/ithil/gen/2020/yiqingzhixia_yiqing_a92ed3c9a3.png",
          bottomImg:
            "https://img3.doubanio.com/dae/staticng/search_static/ithil/gen/2020/yiqingzhixia_zhixia_c9b1c888a5.png",
        },
        qidai: {
          topImg:
            "https://img3.doubanio.com/dae/staticng/search_static/ithil/gen/2020/qidai2021_qidai_20b180fd1e.png",
          bottomImg:
            "https://img3.doubanio.com/dae/staticng/search_static/ithil/gen/2020/qidai2021_2021_39478bb1eb.png",
        },
      },
    });
    const domRef = ref();
    const topImgRef = ref();
    const bottomImgRef = ref();
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
        try {
          const dom: HTMLElement = domRef.value;
          if (!dom) return;
          const { offsetTop, attributes } = dom;
          if (!offsetTop) return;
          const domH = el.clientHeight;
          const scrollH = el.scrollTop - (offsetTop - domH);
          isActive.value = el.scrollTop > offsetTop - (domH / 3);
          if (payload.value.title !== "cinema") {
            const o = 0.3 + scrollH / domH;
            const opacity = o > 1 ? 1 : o;
            dom.style.opacity = String(opacity);
            if (opacity <= 1 && opacity >= 0) {
              const trans = (1 - opacity) * (isMobile.value ? 50 : 120);
              const topImg: HTMLElement | null = topImgRef.value;
              const bottomImg: HTMLElement | null = bottomImgRef.value;
              if (!(topImg && bottomImg)) return;
              topImg.style.transform = `translateX(${trans}px) translateY(-${trans}px) translateZ(0px)`;
              bottomImg.style.transform = `translateX(-${trans}px) translateY(${trans}px) translateZ(0px)`;
            }
          }
        } catch (err) {}
      });
    });

    return {
      title,
      textImg,
      cinemaImg,
      domRef,
      topImgRef,
      bottomImgRef,
      ...toRefs(data),
    };
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
.fade {
  width: 3.3rem;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  .flex-center(column);
}
</style>

<template>
  <section class="start-page">
    <div
      class="bg-video"
      :style="isMobile ? { backgroundImage: `url(${bgVideo})` } : {}"
    >
      <div class="main">
        <video loop autoplay muted v-if="!isMobile">
          <source :src="bgVideo" type="video/mp4" ref="noreferrer" />
        </video>
      </div>
    </div>
    <div class="bg-img">
      <div class="center">
        <img :src="bgImg" ref="noreferrer" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { computed, toRefs, ref, inject } from "vue";

interface PayloadType {
  mobile_background_img?: string;
  video?: string;
}

interface PropsType {
  payload: PayloadType;
}

type Ref<T = any> = {
  value: T;
};

export default {
  name: "start-page",
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: PropsType) {
    const route = useRoute();
    const { payload } = toRefs(props);
    const { mobile_background_img, video } = payload.value;
    const isMobile = inject("isMobile") as Ref<boolean>;
    const bgVideo = computed(() =>
      isMobile.value ? mobile_background_img : video
    );
    const bgImgObj = {
      movie: "icon_movie_7f23c30c4c",
      book: "icon_book_0fd04c8451",
    };
    const { kind } = route.params;
    const bgImg = computed(
      () =>
        `https://img3.doubanio.com/dae/staticng/search_static/ithil/gen/2020/${
          bgImgObj[kind as string]
        }.png`
    );
    return {
      isMobile,
      bgImg,
      bgVideo,
    };
  },
};
</script>

<style lang="less" scoped>
.common {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  max-height: 100%;
}
.start-page {
  position: relative;
  margin-bottom: 1.4rem;
  @media (max-width: 1024px) {
    height: 101vh;
  }
  .bg {
    &-video {
      .flex-center;
      .common;
      background: no-repeat 50% / cover;
      opacity: 0;
      animation: fade 0.3s linear 0s 1 forwards;
      height: 100%;
      .main {
        .common;
        overflow: hidden;
        height: 100%;
        &::after {
          content: "";
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.4) 90%,
            #000
          );
        }
        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    &-img {
      .c_center;
      position: relative;
      .center {
        .flex-center(column);
        padding: 0.4rem 0;
        height: 100vh;
        box-sizing: border-box;
        img {
          max-height: 80vh;
          max-width: 1.75rem;
          width: auto;
        }
      }
    }
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

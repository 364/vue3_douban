<template>
  <section class="c_wrapper movie-video">
    <div class="center">
      <div class="c_header">
        <h3>{{ payload.subtitle }}</h3>
        <h1>{{ payload.title }}</h1>
        <span>{{ payload.description }}</span>
      </div>
      <div class="video">
        <video
          loop
          webkit-playsinline
          playsinline
          :controls="isPlay"
          @play="handlePlayVideo(true)"
          @pause="handlePlayVideo(false)"
        >
          <source :src="videoUrl" type="video/mp4" />
        </video>
        <div
          v-if="!isPlay"
          @click="changePlay"
          class="bg"
          :style="{
            backgroundImage: `url(https://images.weserv.nl/?url=${videoPoster})`,
          }"
        >
          <img
            class="icon"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjRkZGIiBvcGFjaXR5PSIuOCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMzAiLz48cGF0aCBkPSJNNDIgMzEuNzMybC0xNi41IDkuNTI2YTIgMiAwIDAxLTMtMS43MzJWMjAuNDc0YTIgMiAwIDAxMy0xLjczMkw0MiAyOC4yNjhhMiAyIDAgMDEwIDMuNDY0eiIgZmlsbD0iIzAwMCIvPjwvZz48L3N2Zz4K"
            alt="play-icon"
          />
        </div>
      </div>

      <ul>
        <li v-for="item in subjects" :key="item.id">
          <a :href="item.url" target="_blank">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { inject, toRefs, ref, computed } from "vue";

interface SubjectsType {
  name: string;
}
interface PayloadType {
  [propName: string]: string;
}
interface PropsType {
  payload: PayloadType;
  subjects: Array<SubjectsType>;
}

type Ref<T = any> = {
  value: T;
};
export default {
  name: "movie-video",
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
    subjects: {
      type: Array,
      default: () => [],
    },
  },
  setup(props: PropsType) {
    const store = useStore();
    const isPlay = ref(false);
    const isMobile = inject("isMobile") as Ref<boolean>;
    const { payload } = toRefs(props);
    const {
      background_img,
      mobile_background_img,
      video,
      mobile_video,
    } = payload.value;
    const videoPoster = computed(() =>
      isMobile.value ? mobile_background_img : background_img
    );
    const videoUrl = computed(
      () => (isMobile.value ? mobile_video : mobile_video) + "#t=1"
    );
    
    const changePlay = () => (isPlay.value = !isPlay.value);
    const handlePlayVideo = (playing) => {
      const audio = store.state.globalAudio;
      if (!audio) return;
      playing ? audio.pause() : audio.play();
    };
    return {
      isPlay,
      isMobile,
      videoUrl,
      videoPoster,
      changePlay,
      handlePlayVideo,
    };
  },
};
</script>

<style lang="less" scoped>
.movie-video {
  padding-left: 0;
  padding-right: 0;
  .center {
    @media (min-width: 1024px) {
      .c_center;
    }
    .c_header {
      margin-bottom: 20px;
      span {
        display: block;
        margin: 20px 20px 0;
        opacity: 0.6;
        font-size: 13px;
        color: #fff;
        letter-spacing: 0;
        text-align: center;
        line-height: 26px;
        white-space: pre-wrap;
      }
    }
    .video {
      position: relative;
      cursor: pointer;
      video {
        outline: none;
        object-fit: fill;
        width: 100%;
      }
      .bg {
        .flex-center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: no-repeat 50% / cover;
        .icon {
          width: 60px;
          height: 60px;
          @media (min-width: 1024px) {
            width: 100px;
            height: 100px;
          }
        }
      }
    }
    ul {
      .flex;
      .wrap;
      font-size: 13px;
      color: hsla(0, 0%, 100%, 0.5);
      letter-spacing: 0;
      line-height: 26px;
      padding: 15px;
      li {
        flex: 0 0 50%;
        &::before {
          content: " - ";
        }
      }
    }
  }
}
</style>

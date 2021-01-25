<template>
  <section class="c_wrapper end-page">
    <div class="mask">
      <img :src="bgImg" :alt="payload.title" />
    </div>
    <div class="c_center">
      <div class="c_header">
        <h1>{{ payload.title }}</h1>
      </div>
      <div class="content">{{ payload.content }}</div>
      <ul class="btn">
        <li v-for="item in btnList" :key="item.kind">
          <router-link :to="`/annual/2020/${item.kind}`">
            <img :src="item.logo" alt="" />
            <span>{{ item.text }}</span>
          </router-link>
        </li>
        <li v-if="payload.url_text">
          <a target="_blank" :href="payload.url">{{ payload.url_text }}</a>
        </li>
      </ul>
      <img
        class="logo"
        src="data:image/png;base64,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"
      />
      <div class="end" v-html="endText"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { useRouter, useRoute } from "vue-router";
import { computed, inject, toRefs } from "vue";

interface PayloadType {
  [propName: string]: string;
}
interface PropsType {
  payload: PayloadType;
}
type Ref<T = any> = {
  value: T;
};

export default {
  name: "end-page",
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: PropsType) {
    const router = useRouter();
    const route = useRoute();
    const isMobile = inject("isMobile") as Ref<boolean>;
    const { payload } = toRefs(props);
    const { end_text, background_img, mobile_background_img } = payload.value;
    const bgImg = computed(() =>
      isMobile.value ? mobile_background_img : background_img
    );
    const endText = computed(() => end_text.replace(/\s/g, ""));
    const arr = [
      {
        kind: "book",
        logo: "https://img1.doubanio.com/img/files/file-1608284359.png",
        text: "豆瓣2020年度读书榜单",
      },
      {
        kind: "music",
        logo: "https://img9.doubanio.com/img/files/file-1608284306.png",
        text: "豆瓣2020年度音乐榜单",
      },
      {
        kind: "movie",
        logo: "https://img9.doubanio.com/img/files/file-1608286886.png",
        text: "豆瓣2020年度电影榜单",
      },
    ];
    const btnList = computed(() =>
      arr.filter((item) => item.kind !== route.params.kind)
    );
    return { isMobile, bgImg, endText, btnList };
  },
};
</script>

<style lang="less" scoped>
.end-page {
  overflow: hidden;
  .mask {
    width: 100%;
    max-height: 100%;
    background: no-repeat 50% / cover;
    position: absolute;
    left: 0;
    top: 0;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    &::after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
        180deg,
        #000,
        rgba(0, 0, 0, 0.3) 50%,
        #000
      );
    }
  }
  .c_center {
    text-align: center;
    .direction(column);
    .align(center);
  }
  .c_header {
    padding-top: 1.8rem;
    margin-bottom: 0;
  }
  .content {
    margin: 20px;
    opacity: 0.6;
    font-size: 13px;
    color: #fff;
    letter-spacing: 0;
    line-height: 26px;
    white-space: pre-wrap;
  }
  .logo {
    display: block;
    width: 83px;
    margin-top: 40px;
  }
  .end {
    font-size: 13px;
    color: hsla(0, 0%, 100%, 0.4);
    margin-top: 20px;
    padding-top: 20px;
    position: relative;
    line-height: 1.4;
  }
  .btn {
    position: relative;
    li {
      .flex-center;
      margin: 0 auto;
      border: 1px solid rgba(255, 235, 204, 0.5);
      border-radius: 8px;
      padding: 12px 15px;
      transition: all 0.3s ease-in-out;
      font-size: 16px;
      color: #ffebcc;
      letter-spacing: 0.5px;
      text-align: center;
      white-space: nowrap;
      min-height: 20px;
      cursor: pointer;
      & + li {
        margin-top: 0.2rem;
      }
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }
}
</style>

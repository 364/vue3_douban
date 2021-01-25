<template>
  <section class="c_wrapper top10">
    <div class="bg">
      <img :src="bgImg" :alt="info.title" />
    </div>
    <div class="center">
      <div class="main">
        <div class="c_header">
          <h3>- {{ info.subtitle }} -</h3>
          <h1>{{ info.topTitle }}</h1>
        </div>
        <exhibit :info="info" :user="user" :isMobile="isMobile"></exhibit>
        <limited :subjects="subjects" :isMobile="isMobile"></limited>
        <div class="btn" v-if="payload.ad_button_text">
          <a target="_blank" :href="payload.ad_button_uri">{{
            payload.ad_button_text
          }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, toRefs, inject } from "vue";
import exhibit from "./exhibit.vue";
import limited from "./limited.vue";

interface PayloadType {
  ad_button_text?: string;
  ad_button_uri?: string;
  mobile_background_img: string;
  background_img: string;
  short_comment: string;
  subtitle: string;
  title: string;
}
type subjectType = "movie" | "book" | "music";
interface SubjectType {
  id: string;
  url: string;
  m_url: string;
  cover: string;
  title: string;
  orig_title: string;
  type: subjectType;
  rating: number;
  rating_count: number;
}
interface UserType {
  [propName: string]: string;
}
declare interface TopPropsType {
  payload: PayloadType;
  subject: SubjectType;
  subjects: SubjectType[];
  user: UserType;
}

type Ref<T = any> = {
  value: T;
};
export default {
  name: "top10",
  components: {
    exhibit,
    limited,
  },
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
    subject: {
      type: Object,
      default: () => ({}),
    },
    subjects: {
      type: Array,
      default: () => [],
    },
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: TopPropsType) {
    const { payload, subject, subjects, user } = toRefs(props);
    const { title: topTitle, ...arg } = payload.value;
    const info = computed(() => ({ topTitle, ...arg, ...subject.value }));
    const isMobile = inject("isMobile") as Ref<boolean>;
    const bgImg = computed(() => {
      const { mobile_background_img, background_img } = info.value;
      return isMobile.value
        ? mobile_background_img
        : background_img || mobile_background_img;
    });
    return { isMobile, info, user, subjects, bgImg };
  },
};
</script>

<style lang="less" scoped>
.top10 {
  position: relative;
  padding-left: 0;
  padding-right: 0;
  overflow: hidden;
  .bg {
    width: 100%;
    max-height: 100%;
    background: no-repeat 50% / cover;
    position: absolute;
    left: 0;
    top: 0;
    .flex-center;
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
  .center {
    @media (min-width: 1024px) {
      .c_center;
    }
    .main {
      position: relative;
      @media (min-width: 1024px) {
        margin-left: -36px;
        margin-right: -36px;
      }
    }
    .btn {
      .flex-center;
      margin-top: 0.4rem;
      a {
        border-radius: 10px;
        font-size: 16px;
        color: #fff;
        letter-spacing: 0.5px;
        text-align: center;
        padding: 12px 25px;
        display: inline-block;
        box-shadow: 0 2px 0 rgba(217, 159, 71, 0.7);
        background-image: linear-gradient(90deg, #d99f47, #ce8d2a);
      }
    }
  }
}
</style>

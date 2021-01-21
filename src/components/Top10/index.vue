<template>
  <section class="c_wrapper top10">
    <div class="bg">
      <img
        :src="isMobile ? info.mobile_background_img : info.background_img"
        :alt="info.title"
      />
    </div>
    <div class="center">
      <div class="main">
        <div class="c_header">
          <h3>- {{ info.subtitle }} -</h3>
          <h1>{{ info.topTitle }}</h1>
        </div>
        <exhibit :info="info" :user="user" :isMobile="isMobile"></exhibit>
        <limited :subjects="subjects" :isMobile="isMobile"></limited>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, toRefs, inject } from "vue";
import exhibit from "./exhibit.vue";
import limited from "./limited.vue";

interface PayloadType {
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
    return { isMobile, info, user, subjects };
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
  }
}
</style>

<template>
  <section class="c_wrapper top-users">
    <div class="bg">
      <img :src="bgImg" :alt="payload.title" />
    </div>
    <div class="center">
      <div class="c_header">
        <h3>- {{ payload.subtitle }} -</h3>
        <h1>{{ payload.title }}</h1>
      </div>
      <div class="c_des">{{ payload.description }}</div>
      <ul>
        <li v-for="item in users" :key="item.id">
          <a target="_blank" :href="item.url">
            <img :src="item.avatar" :alt="item.name" />
            <div>{{ item.name }}</div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { toRefs, computed, inject } from "vue";

interface UsersType {
  cover: string;
  m_url: string;
  url: string;
  title: string;
  info: string;
}
interface PayloadType {
  background_img: string;
  mobile_background_img: string;
  description: string;
  subtitle: string;
  title: string;
}
interface PropsType {
  payload: PayloadType;
  users: UsersType[];
}
type Ref<T = any> = {
  value: T;
};
export default {
  name: "top-users",
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  setup(props: PropsType) {
    const isMobile = inject("isMobile") as Ref<boolean>;
    const { payload } = toRefs(props);
    const { mobile_background_img, background_img } = payload.value;
    const bgImg = computed(() =>
      isMobile.value ? mobile_background_img : background_img
    );
    return { bgImg, isMobile };
  },
};
</script>

<style lang="less" scoped>
.top-users {
  overflow: hidden;
  .bg {
    width: 100%;
    max-height: 100%;
    background: no-repeat 50% / cover;
    position: absolute;
    left: 0;
    top: 0;
    .flex-center;
    &:after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
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
    text-align: center;
    .direction(column);
    .align(center);
    @media (min-width: 1024px) {
      .c_center;
    }
  }
  .c_header {
    margin-bottom: 0;
  }
  ul {
    .flex;
    .wrap;
    position: relative;
    li {
      line-height: 17px;
      color: #fff;
      white-space: normal;
      word-wrap: break-word;
      .ellipsis(2);
      @media (min-width: 1024px) {
        font-size: 12px;
        margin-top: 5px;
        flex: 0 12.5%;
        margin-bottom: 50px;
      }
      @media (max-width: 1024px) {
        flex: 0 25%;
        margin-bottom: 15px;
      }
      img {
        border-radius: 50%;
        @media (min-width: 1024px) {
          width: 60px;
          height: 60px;
        }
        @media (max-width: 1024px) {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}
</style>

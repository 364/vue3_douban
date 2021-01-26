<template>
  <section class="c_wrapper person-2020">
    <div class="bg">
      <img
        :src="isMobile ? payload.mobile_background_img : payload.background_img"
        :alt="payload.title"
      />
    </div>
    <div class="center">
      <div class="c_header">
        <h3>- {{ payload.subtitle }} -</h3>
        <h1>{{ payload.title }}</h1>
      </div>
      <ul>
        <li v-for="item in subjects" :key="item.id">
          <a target="_blank" :href="item.url">
            <img :src="item.cover" :alt="item.name" />
            <div class="info">
              <div>{{ item.name }}</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { inject } from "vue";

type Ref<T = any> = {
  value: T;
};
export default {
  name: "person-2020",
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
  setup() {
    const isMobile = inject("isMobile") as Ref<boolean>;
    return { isMobile };
  },
};
</script>

<style lang="less" scoped>
.person-2020 {
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
  ul {
    white-space: nowrap;
    display: inline-flex;
    align-items: stretch;
    position: relative;
    &::-webkit-scrollbar {
      display: none;
    }
    @media (max-width: 1024px) {
      width: 100%;
      overflow-x: auto;
    }
    li {
      .direction(column);
      margin-right: 10px;
      text-align: left;
      white-space: pre-wrap;
      width: 0.9rem;
      @media (min-width: 1024px) {
        width: 88px;
        padding-right: 10px;
        box-sizing: border-box;
        margin: 0;
      }
      img {
        border-radius: 6px;
        object-fit: cover;
        height: 1.26rem;
        @media (min-width: 1024px) {
          height: 123px;
        }
        @media (max-width: 1024px) {
          width: 0.9rem;
        }
      }
      .info {
        margin-top: 8px;
        span {
          opacity: 0.4;
          font-size: 11px;
          color: #fff;
          letter-spacing: 0;
          display: block;
          margin-top: 4px;
        }
      }
    }
  }
}
</style>

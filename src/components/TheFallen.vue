<template>
  <section class="c_wrapper the-fallen">
    <div class="center">
      <div class="c_header">
        <h3>- {{ payload.subtitle }} -</h3>
        <h1>{{ payload.title }}</h1>
      </div>
      <div class="c_des">{{ payload.description }}</div>
      <ul>
        <li v-for="item in people" :key="item.id">
          <a target="_blank" :href="item.url">
            <img :src="item.cover" :alt="item.name" />
            <div class="info">
              <div>{{ item.name }}</div>
              <span v-if="item.type === 'author' && item.age"
                >{{ item.profession }} {{ item.age }}</span
              >
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "the-fallen",
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
    people: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
.the-fallen {
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
    white-space: nowrap;
    display: inline-flex;
    align-items: stretch;
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

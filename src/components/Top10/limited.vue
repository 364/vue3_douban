<template>
  <ul class="limited">
    <li v-for="(info, index) in subjects.slice(1)" :key="info.id">
      <a target="_blank" :href="isMobile ? info.m_url : info.url">
        <div class="cover" :class="{ music: info.type === 'music' }">
          <div class="c_tag" :class="{ c_top: index < 2 }">
            <span>{{ index + 2 }}</span>
          </div>
          <img :src="info.cover" :alt="info.title" />
          <div class="mask" :class="{ xs: isMobile }">
            <div class="title">
              <span>{{ info.title }}</span>
              <strong>{{ info.rating }}</strong>
            </div>
          </div>
        </div>
        <div class="title" v-if="!isMobile">
          <span>{{ info.title }}</span>
          <strong>{{ info.rating }}</strong>
        </div>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    subjects: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
.limited {
  .flex;
  .justify(space-between);
  @media (max-width: 1024px) and (min-width: 900px) {
    justify-content: flex-start;
  }
  @media (min-width: 1024px) {
    .flex-center;
    .align(flex-start);
  }
  @media (max-width: 1024px) {
    .wrap;
  }
  li {
    display: inline-block;
    overflow: hidden;
    white-space: normal;
    color: #fff;
    vertical-align: top;
    position: relative;
    z-index: 1;
    margin-right: 10px;
    a {
      .direction(column);
      text-decoration: none;
      position: relative;
      z-index: 1;
      margin-bottom: 0.18rem;
      @media (min-width: 1024px) {
        width: 88px;
      }
      .cover {
        overflow: hidden;
        border-radius: 6px;
        @media (min-width: 1024px) {
          width: 88px;
          height: 123px;
          &.music {
            height: 88px;
          }
        }
        @media (max-width: 1024px) {
          width: 0.9rem;
          height: 1.26rem;
          &.music {
            height: 88px;
          }
        }
        img {
          object-fit: cover;
          height: 100%;
        }
      }
      .title {
        padding: 0.06rem 0 0;
        line-height: 18px;
        font-weight: 700;
        color: #fff;
        word-break: break-word;
        margin-bottom: 0.1rem;
        @media (min-width: 1024px) {
          font-size: 14px;
        }
        @media (max-width: 1024px) {
          font-size: 0.13rem;
          width: 0.9rem;
          span {
            .ellipsis(1);
          }
        }
        strong {
          color: #ffac2d;
          font-weight: 600;
          padding-left: 3px;
        }
      }
      .mask {
        display: none;
        width: 100%;
        position: absolute;
        bottom: 0;
        &.xs {
          display: block;
          &::before {
            content: "";
            height: 50px;
            display: block;
            background-image: linear-gradient(180deg, transparent, #000);
            position: absolute;
            bottom: 0;
            width: 100%;
          }
          .title {
            margin-bottom: 0;
            position: relative;
          }
        }
      }
    }
  }
}
</style>

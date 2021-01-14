<template>
  <a
    target="_blank"
    :href="isMobile ? info.m_url : info.url"
    :title="info.title"
    class="exhibit"
  >
    <div class="cover">
      <div class="c_tag c_top">
        <span>1</span>
      </div>
      <img :src="info.cover" :alt="info.title" />
    </div>
    <div class="info">
      <div class="detail">
        <div class="left">
          <div :class="{ title: isMobile }">
            <div>
              <h3>{{ info.title }}</h3>
              <h5>{{ info.orig_title }}</h5>
            </div>
            <rating v-if="isMobile" :rating="info.rating" />
          </div>
          <div class="comment">
            <span>{{ info.short_comment }}</span
            ><a target="_blank" :href="user.url"> —— {{ user.name }}</a>
          </div>
        </div>
        <div class="right" v-if="!isMobile">
          <rating :rating="info.rating" />
          <div class="count">{{ info.rating_count }} 人评价</div>
        </div>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import rating from "./rating.vue";
export default {
  name: "top10-exhibit",
  components: {
    rating,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      default: () => ({}),
    },
    user: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="less" scoped>
.exhibit {
  .flex;
  margin-bottom: .18rem;
  .cover {
    border: 3px solid rgba(226, 170, 85, 0.6);
    border-radius: 9px;
    overflow: hidden;
    position: relative;
    left: -3px;
    @media (min-width: 1024px) {
      width: 88px;
      height: 123px;
    }
    @media (max-width: 1024px) {
      width: 0.9rem;
      height: 1.26rem;
    }
  }
  .info {
    flex: 1;
    margin-left: 15px;
    min-width: 0;
    .detail {
      .flex;
      .left {
        h3 {
          font-size: 23px;
          line-height: 29px;
          margin-bottom: 1px;
          font-weight: 700;
          @media (max-width: 1024px) {
            font-size: 19px;
            line-height: 24px;
            margin-bottom: 2px;
          }
        }
        h5 {
          font-size: 14px;
          line-height: 18px;
        }
        .comment {
          font-size: 14px;
          line-height: 19px;
          color: hsla(0, 0%, 100%, 0.5);
          @media (min-width: 1024px) {
            margin-top: 5px;
            min-width: 568px;
          }
          @media (max-width: 1024px) {
            font-size: 12px;
            line-height: 17px;
          }
        }
        .title {
          .flex-bt;
        }
      }

      .right {
        min-width: 160px;
        margin-left: 15px;
        border-left: 1px solid hsla(0, 0%, 100%, 0.5);
        .flex-center(column);
        @media (min-width: 1024px) {
          min-height: 112px;
        }

        .count {
          font-size: 13px;
          line-height: 16px;
          color: hsla(0, 0%, 100%, 0.6);
        }
      }
    }
  }
}
</style>

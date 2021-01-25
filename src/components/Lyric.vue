<template>
  <section class="c_wrapper lyric">
    <div class="c_center" :class="{ xs: isMobile }">
      <ul>
        <li
          v-for="item in lyricList"
          :key="item"
          :class="{ light: item.light }"
        >
          {{ item.text }}
        </li>
        <li>
          <a target="_blank" :href="isMobile ? subject.m_url : subject.url">
            {{ `——《 ${subject.title} 》` }}</a
          >
        </li>
      </ul>
      <div class="record">
        <div class="border">
          <a target="_blank" :href="isMobile ? subject.m_url : subject.url">
            <img
              :class="{ xs: isMobile }"
              :src="subject.cover"
              :alt="subject.info"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { toRefs, computed, inject } from "vue";

interface SubjectType {
  cover: string;
  m_url: string;
  url: string;
  title: string;
  info: string;
}
interface PayloadType {
  background_img: string;
  mobile_background_img: string;
  content: string;
}
interface PropsType {
  payload: PayloadType;
  subject: SubjectType;
}

type Ref<T = any> = {
  value: T;
};
export default {
  name: "lyric",
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
    subject: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: PropsType) {
    const isMobile = inject("isMobile") as Ref<boolean>;
    const { payload } = toRefs(props);
    const { content } = payload.value;
    const lyricList = computed(() => {
      const arr = content.split(/\n/g);
      return arr.map((item) => ({
        text: item.replace(/\[|\]/g, ""),
        light: /\[(.+?)\]/g.test(item),
      }));
    });
    return { isMobile, lyricList };
  },
};
</script>

<style lang="less" scoped>
.lyric {
  .c_center {
    .direction;
    .align(center);
    @media (max-width: 1024px) {
      .direction(column);
    }
    ul {
      @media (min-width: 1024px) {
        flex: 1 1 60%;
      }
      li {
        line-height: 2.1;
        font-size: 22px;
        text-align: center;
        color: hsla(0, 0%, 100%, 0.35);
        @media (max-width: 1024px) {
          font-size: 0.16rem;
          line-height: 1.9;
        }
        &.light {
          font-weight: 600;
          color: white;
          text-shadow: 0 0 4px hsla(0, 0%, 100%, 0.5);
          @media (max-width: 1024px) {
            font-size: 19px;
          }
        }
        a {
          margin: 10px 0;
          color: white;
          display: inline-block;
        }
      }
    }
    .record {
      @media (min-width: 1024px) {
        flex: 1 1 40%;
      }
      padding: 20px 0;
      .border {
        display: inline-block;
        padding: 4px;
        border-radius: 50%;
        background: linear-gradient(
          to right top,
          rgba(76, 60, 43, 0.01) 50%,
          rgb(76, 60, 43) 80%
        );
        a {
          display: inline-block;
          padding: 20px;
          border-radius: 50%;
          background: linear-gradient(
            to right top,
            transparent 50%,
            rgba(0, 0, 0, 0.9)
          );
          img {
            border-radius: 50%;
            width: 240px;
            &.xs {
              width: 130px;
            }
          }
        }
      }
    }
  }
}
</style>

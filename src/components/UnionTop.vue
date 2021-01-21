<template>
  <section class="c_wrapper" id="union-top">
    <div class="bg">
      <img :src="bgImg" :alt="payload.title" />
    </div>
    <div class="main">
      <div class="center">
        <template v-if="widgets.length === 1">
          <div class="c_header" v-for="item in widgets" :key="item.id">
            <h3>- {{ item.payload.subtitle }} -</h3>
            <h1>{{ item.payload.title }}</h1>
          </div>
        </template>
        <swiper
          v-else
          class="pagination"
          :mousewheel="{
            invert: true,
          }"
          slides-per-view="auto"
          :slide-to-clicked-slide="true"
          :centered-slides="widgets.length > 2"
          :centered-slides-bounds="true"
          :observer="true"
          :observeParents="true"
          @swiper="onPagination"
        >
          <swiper-slide
            class="box"
            v-for="(item, index) in widgets"
            :key="item.id"
            :class="{ active: index == active }"
            @click="onSlideTo(index)"
          >
            <h3>{{ item.payload.subtitle }}</h3>
            <h2>{{ item.payload.title }}</h2>
          </swiper-slide>
        </swiper>
        <swiper
          class="swiper"
          :observer="true"
          :observeParents="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="item in widgets" :key="item.id">
            <div class="slide" :class="{ column: item.subjects.length <= 5 }">
              <a
                target="_blank"
                v-for="(cItem, index) in item.subjects"
                :key="cItem.id"
                :href="isMobile ? cItem.m_url : cItem.url"
              >
                <div class="cover">
                  <div class="c_tag" :class="{ c_top: index < 3 }">
                    <span>{{ index + 1 }}</span>
                  </div>
                  <img :src="cItem.cover" :alt="cItem.title" />
                </div>
                <div class="mask" :class="{ xs: isMobile }">
                  <div class="title">
                    <span>{{ cItem.title }}</span>
                    <strong>{{ cItem.rating }}</strong>
                  </div>
                  <div class="info">{{ cItem.short_info }}</div>
                </div>
              </a>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, toRefs, ref, inject } from "vue";

import "swiper/swiper.less";
import "swiper/components/pagination/pagination.less";

SwiperCore.use([Pagination]);

interface PayloadType {
  mobile_background_img: string;
  background_img: string;
  short_comment: string;
  subtitle: string;
  title: string;
}
type annualType = "movie" | "book" | "music";
interface SubjectType {
  id: string;
  url: string;
  m_url: string;
  cover: string;
  title: string;
  orig_title: string;
  type: annualType;
  rating: number;
  rating_count: number;
}
interface TopPropsType {
  payload: PayloadType;
  subject: SubjectType;
  subjects: SubjectType[];
}
interface SubPayloadType {
  widgets: TopPropsType[];
}
interface PropsType {
  payload: SubPayloadType;
}

type Ref<T = any> = {
  value: T;
};
export default {
  name: "union-top",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: PropsType) {
    const pagination = ref();
    const swiper = ref();
    const active = ref(0);
    const isMobile = inject("isMobile") as Ref<boolean>;
    const { payload } = toRefs(props);
    const { widgets } = payload.value;
    const current = computed(() => widgets[active.value]);
    const currentIntr = computed(() => current.value["payload"]);
    const currentList = computed(() => current.value["subjects"]);
    const bgImg = computed(() => {
      const { mobile_background_img, background_img } = currentIntr.value;
      return isMobile.value ? mobile_background_img : background_img;
    });

    const onSwiper = (el: Swiper) => {
      swiper.value = el;
    };
    const onPagination = (el: Swiper) => {
      pagination.value = el;
    };
    const onSlideTo = (i: number) => {
      if (i === active.value) return;
      swiper.value && swiper.value.slideTo(i);
    };
    const onSlideChange = (e) => {
      const { activeIndex } = e;
      active.value = activeIndex;
      pagination.value.slideTo(activeIndex);
    };
    return {
      bgImg,
      active,
      widgets,
      isMobile,
      currentIntr,
      currentList,
      onSwiper,
      onSlideTo,
      onPagination,
      onSlideChange,
    };
  },
};
</script>

<style lang="less" scoped>
#union-top {
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
  .main {
    @media (min-width: 1024px) {
      .c_center;
    }
    .center {
      padding: 0 15px;
    }
  }
  .swiper {
    .slide {
      .flex;
      .wrap;
      &.column {
        .direction(column);
      }
      a {
        .flex;
        flex: 0 0 50%;
        margin-top: 10px;
        padding-right: 0.15rem;
        box-sizing: border-box;
        color: #fff;
        overflow: hidden;
        .cover {
          position: relative;
          margin-right: 10px;
          @media (min-width: 1024px) {
            width: 88px;
            height: 123px;
          }
          @media (max-width: 1024px) {
            width: 0.6rem;
            height: 0.84rem;
          }
          img {
            height: 100%;
            border-radius: 6px;
          }
        }
        .mask {
          flex: 1;
          .title {
            font-weight: 700;
            font-size: 15px;
            line-height: 16px;
            strong {
              color: #ffac2d;
              font-weight: 600;
              padding-left: 3px;
              font-size: 13px;
              line-height: 13px;
            }
          }
          .info {
            margin-top: 8px;
            font-size: 13px;
            line-height: 16px;
            color: hsla(0, 0%, 100%, 0.5);
            .ellipsis(2);
          }
        }
      }
    }
  }
  .pagination {
    color: #fff;
    position: relative;
    margin-bottom: 90px;
    overflow: inherit;
    .box {
      flex: 0 0 auto;
      transition: opacity 0.2s;
      margin-right: 60px;
      opacity: 0.5;
      width: auto;
      cursor: pointer;
      &.active {
        opacity: 1;
      }
      h3 {
        font-size: 21px;
        line-height: 36px;
        opacity: 0.6;
      }
      h2 {
        font-size: 40px;
        line-height: 56px;
        font-weight: 700;
      }
    }
  }
}
</style>

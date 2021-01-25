<template>
  <a target="_blank" :href="info.url">
    <div class="c_tag" :class="{ c_top: index < 3 }">
      <span>{{ index + 1 }}</span>
    </div>
    <div
      class="bg"
      :style="{
        backgroundImage: `url(https://images.weserv.nl/?url=${info.header_bg_image})`,
      }"
    >
      <div class="owner">{{ info.owner_name }}</div>
    </div>
    <img class="avatar" :src="info.cover_url" alt="" />
    <div class="info">
      <h1>{{ info.title }}</h1>
      <span
        >{{ info.total }}部 · {{ formatNumber(info.n_followers) }}人关注</span
      >
    </div>
  </a>
</template>

<script>
export default {
  name: "list-box",
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const formatNumber = (num) => {
      return num >= 1e3 && num < 1e4
        ? (num / 1e3).toFixed(1) + "k"
        : num >= 1e4
        ? (num / 1e4).toFixed(1) + "w"
        : num;
    };
    return { formatNumber };
  },
};
</script>

<style lang="less" scoped>
a {
  position: relative;
  margin: 0 10px 10px 0;
  width: 150px;
  border-radius: 8px;
  background: rgba(51, 51, 51, 0.7);
  overflow: hidden;
  display: block;
  .c_tag {
    z-index: 3;
  }
  .bg {
    width: 100%;
    height: 85px;
    background: no-repeat 50% / cover;
    position: relative;
    .owner {
      opacity: 0.4;
      font-size: 11px;
      color: #fff;
      padding: 8px 15px;
      position: relative;
      z-index: 1;
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
        225deg,
        rgba(58, 56, 53, 0.5) 0%,
        rgba(58, 56, 53, 0.85) 85%,
        rgb(58, 56, 53) 100%
      );
      border-radius: 8px 8px 0 0;
    }
  }
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    margin-left: 15px;
    transform: translateY(-65%);
    position: absolute;
  }
  .info {
    padding: 35px 10px 12px;
    color: #fff;
    h1 {
      font-size: 15px;
      color: hsla(0, 0%, 100%, 0.9);
      letter-spacing: 0;
      line-height: 20px;
      margin-bottom: 8px;
      .ellipsis(2);
    }
    span {
      opacity: 0.4;
      font-size: 11px;
      color: #fff;
      letter-spacing: 0;
    }
  }
}
</style>

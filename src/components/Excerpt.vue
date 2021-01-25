<template>
  <section class="c_wrapper excerpt">
    <div class="c_center">
      <div class="main">
        <div class="left"></div>
        <div class="snippet">
          <div class="text" v-html="formatText(payload.content)"></div>
          <div class="info">
            <p>—— {{ subject.title }}</p>
            <p>{{ subject.info }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "excerpt",
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
  setup() {
    const formatText = (str) => {
      return (
        "<p>" + str.replace(/(.*)\[(.*)\](.*)/, "$1<span>$2</span>$3") + "</p>"
      );
    };
    return { formatText };
  },
};
</script>

<style lang="less" scoped>
.excerpt {
  .main {
    .flex-bt;
    background-image: url(https://images.weserv.nl/?url=https://img3.doubanio.com/img/files/file-1575626352.png);
    background-size: cover;
    background-position: 50%;
    max-width: 500px;
    position: relative;
    box-sizing: border-box;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    @media (min-width: 1024px) {
      padding-right: 30px;
      min-height: 500px;
      margin: 0 auto;
      padding-bottom: 40px;
    }
    .left {
      background-image: url(https://images.weserv.nl/?url=https://img3.doubanio.com/img/files/file-1575626423.png);
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
      @media (min-width: 1024px) {
        width: 80px;
        height: 395px;
      }
    }
    .snippet {
      flex: 1;
      &::before {
        content: "";
        width: 18px;
        height: 15px;
        margin: 40px 0 10px;
        display: block;
        background: e(
          "no-repeat
          url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAgCAYAAAB+ZAqzAAAABGdBTUEAALGPC/xhBQAAArdJREFUWAndl+dy2zAQhOXYiUuKE7e0yViZvP8r2XJLGZf0uMVlP1qACPAAgYh/ZWdOJMotF+DdgRoM/kPMa02P7nldnnO2J/Gc5m/I3sneyv7ITmX/ApOTzhKwgJdje1DiUDAny1kibFkPGcpK5hboaaa80O+mLPnGcg+bkeMb2SvZfQFOQoDdzyIlDIL3MlaWw01uMBojBD7InkX9cbPhTAkjuHOijjSO/Y5ZE20WOpTlRAWclrDXIliXWUDISHZmDWb6cgv9Jb9dWZDdsbAnmkBcWfiuzi3ZtTWY6SN5Ugs91NierBMSbWFsN5li4USdI1mHwJrc6oM/xflFY/utucFtuyaRKQvB6F3jhy4jWV9ReBMWD7mJwO4fRH1B0wnjaqXwlfp3ZDWiqFFrshh/1TGSZTmdsOea2H6tajb4pN+L8X3fy6ocHH/b96MaiMvCOVorY7dI4VogLAacx3Gn1UYYRjbGILYgqgGvcclwJLaKshpREJCRMagvtXiccCwtyM1upUhqYwtN1m7Rf85PCQh4K53xXZERe+wqIqnM32Ql5FYiyXVA3FFs4YSHE4TX2zlJXFG1gl/zOyDFyarPnZGwY6imFfzhrEmLYktd8yUE5anVTdwmdyyk5LOlDyfs1FCKsQfCaoA465RwXH7lrqPgynffopuHsJqSwM5BlEItpz99EFabfanMQ2wtZ7Bj/NOpAa/Sqn9wkcE1CIT9FENNTHDepfxqOf2p4GLsa8XycruCaOpTX3hOl5XUJq+2kI2zNAe+TPqCL9oGHLaALML4DC4BK9uZMvFS48Tg0ynz3DCnChvUwAmj4ZJgGhEZty3jwdNArPEM6+ul7cvhDqd/a1ZWIYwqHAtEyLGMV+QJdF8C/rbBGQtkkRxvfPcFiWQJ05wGHCvz43sO2ZqiOXb3l2LOWw5se4Lj4vxNAAAAAElFTkSuQmCC)
          50%/100%"
        );
      }
      .text,
      .info {
        color: rgba(0, 0, 0, 0.7);
        font-family: STFangsong, Fangsong, FangSong_GB2312, STSong, serif;
      }
      .text {
        @media (min-width: 1024px) {
          font-size: 16px;
          line-height: 40px;
        }
        span {
          border-bottom: 1px solid #000;
        }
      }
      .info {
        margin-top: 30px;
        text-align: right;
        line-height: 1;
        :first-child {
          margin-bottom: 13px;
          @media (min-width: 1024px) {
            font-size: 16px;
          }
        }
        :last-child{
          @media (min-width: 1024px) {
            font-size: 11px;
          }
        }
      }
    }
  }
}
</style>

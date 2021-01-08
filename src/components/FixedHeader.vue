<template>
  <div class="header">
    <div class="center" :class="{ xs: isMobile }" v-if="isShow">
      <div class="left">
        <i class="logo" :class="{ xs: isMobile }"></i>
        <span class="title">{{ payload.title + payload.sub_title }}</span>
        <div class="share" v-if="!isMobile">
          <span>
            分享给朋友
          </span>
          <div class="share-board">
            <ul>
              <li
                class="icon-douban"
                @click="shareTo('douban', shareData.douban)"
              >
                分享到豆瓣
              </li>
              <li class="icon-weibo" @click="shareTo('sina', shareData.sina)">
                分享到微博
              </li>
              <li class="icon-wechat">扫码分享到微信</li>
            </ul>
            <div class="qr-code"><img :src="payload.qr_img" /></div>
          </div>
        </div>
      </div>
      <div
        class="right"
        @click="togglePlay"
        @mouseenter="toggleHover(true)"
        @mouseleave="toggleHover(false)"
      >
        <img class="icon" :src="getIcon" alt="play-icon" />
        <span v-if="!isMobile" class="name">{{ getMusicName }}</span>
        <audio
          class="audio"
          ref="audioRef"
          preload="auto"
          rel="noreferrer"
          loop="true"
          :src="playMusic.url"
        ></audio>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { ref, computed, reactive, toRefs, watch, onMounted } from "vue";

export default {
  name: "fixed-header",
  setup(props, context) {
    const audioRef: any | null = ref(null);
    const store = useStore();
    const playIcon: string =
      "data:image/gif;base64,R0lGODlhHAAcAPABAP///wAAACH5BAkeAAEAIf8LTkVUU0NBUEUyLjADAQAAACH/C0ltYWdlTWFnaWNrDWdhbW1hPTAuNDU0NTUALAAAAAAcABwAAAJPjI+py+0BIngUyvrkxE3zfn2LJypkiZyooaah0x6x+SazXbsRdd/6RttlcjJiEIgTwowWZVKD/DGgzB41WnT+rNosdFq9grss8ShMXqkZBQAh+QQJHgABACH/C0ltYWdlTWFnaWNrDWdhbW1hPTAuNDU0NTUALAAAAAAcABwAAAJGjI+py+0PDZggPlptw3rTznCgIo5IaUrYZ67s6E5pnMHxfLe57eL9gjrtEsEDLfQiDoUy4NKYZK6QTdJTVVX+rFlp6qspAAAh+QQJHgABACH/C0ltYWdlTWFnaWNrDWdhbW1hPTAuNDU0NTUALAAAAAAcABwAAAJQjI+py+1vgAQQTlrdzXrytn1LKCZkeZxooKbe00ZvJzGxOeM1nCO333PtaBjFT1jUXZLAofIGXTqbTGR0ag3KsNulTcuSVrtfaXkc5q7WjAIAOw==";
    const hoverIcon: string =
      "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABGdBTUEAALGPC/xhBQAAAftJREFUSA29ljFOwzAUhglzuQBMFVL3VqyoCwdg6NR7VGLtxF06VFyALgzdYG0PUCYEEt2QUPj+1m5cYydOiHjSX9vP/3t/7SR+zk4SLM/zPrRbcA0uwDmQvYINeAIPWZa90DY3hEZgBVJN3FFtRYK6YJmqEuAptpskDHEI3sBfTTmGpaIigC/gm3wzMAY90DFQXz7NxeLCogRoG0Mrm+O/LP2nTIoDQs9bOX9vL07/mX3jm1QJ2Xm49yBmS8vbtbD0NvrWlpjNW7y9ePytmB/9o5IBsaGVveN/tEqmXdnV9b0JPfzKZ6ZgeDGxgXIA/0XqK2gKXJuVLOgwRUBUzJLg6O11bSrBheuhP7YBsRZOpZhilcvLvZBz7Tl7MSGTJEnMcPWduraW4Nb10O/EBJlLFjOCOiBc2yYLElVLzAieuWr0P5O2tIlYbEtPmVA9c+3KHUiM8Z3ro/8Bbqh/z57fHx7lYnIjQRVP11Rod/ZHMeU45NpnRIukwQ+/6TaaxMob/vBFYNI/2vwxlFzH1cAmrGrhqsq4tj/ajGDo8HbJdcUmbrDpF4e3EV0GSHI1EVNpc+24PBnBWAHWqV95mIsD/G2UaLgAG9EhBP+EV5B87V4xJCgj8RCErhq4a5lyhO8ze6niF+L/XRML2d1qW78IZ65ArM+KW7vq/wAYdECWtmmIzAAAAABJRU5ErkJggg==";
    const pauseIcon: string =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAAABGdBTUEAALGPC/xhBQAAAF1JREFUSA3tlcEKACAIQzX8/1+ujrLLEMXTPDWyiU8kt2LcH/mJ/8ianQ9LmL5XwWmiJqTjSGPcEQxxbzVDANSXQtpnCA7rSAP3pPq/QQNUrneognQm1QQhrRKj+Q9prwww1XTWTQAAAABJRU5ErkJggg==";
    const state = reactive({
      index: 0,
      isPlaying: false,
      isHover: false,
    });
    const isMobile = computed(() => store.state.isMobile);
    const payload = computed(() => ({
      ...store.state.info.payload,
      title: store.state.info.title,
    }));
    const isShow = computed(() => !!payload.value.title.length);
    const musicList = computed(() =>
      JSON.parse(payload.value?.background_musics || "[]")
    );
    const shareData = computed(() =>
      JSON.parse(payload.value?.share_data || "{}")
    );
    const playMusic = computed(() => musicList.value[state.index] || {});
    const getIcon = computed(() =>
      state.isPlaying ? (state.isHover ? hoverIcon : playIcon) : pauseIcon
    );
    const getMusicName = computed(() =>
      state.isPlaying
        ? state.isHover
          ? "关闭背景音乐"
          : playMusic.value.name
        : "播放背景音乐"
    );
    const togglePlay = () => {
      if (!audioRef) return;
      !state.isPlaying ? audioRef.value.play() : audioRef.value.pause();
    };
    const toggleHover = (flag: boolean): void => {
      state.isHover = isMobile.value ? false : flag;
    };
    type shareType = "douban" | "sina";
    interface ShareData {
      url: string;
      [propName: string]: string;
    }
    const shareTo = (t: shareType, data: ShareData): void => {
      const { url, title, content, comment, img } = data;
      switch (t) {
        case "douban":
          window.open(
            `https://www.douban.com/share/service?href=${encodeURIComponent(
              url
            )}&name=${encodeURIComponent(title)}&text=${encodeURIComponent(
              content
            )}&comment=${encodeURIComponent(
              comment
            )}&image=${encodeURIComponent(img)}`,
            "",
            "width=500,height=415,toolbar=no,menubar=no,scrollbars=no,resizable=no"
          );
          break;
        case "sina":
          window.open(
            `http://service.weibo.com/share/share.php?appkey=3015934887&url=${encodeURIComponent(
              url
            )}&title=${encodeURIComponent(title)}&pic=${encodeURIComponent(
              img
            )}`,
            "",
            "width=500,height=415,toolbar=no,menubar=no,scrollbars=no,resizable=no"
          );
          break;
        default:
          break;
      }
    };

    onMounted(() => {
      if (audioRef) {
        const audio = audioRef.value;
        audio?.play();
        audio?.addEventListener("playing", () => (state.isPlaying = true));
        audio?.addEventListener("pause", () => (state.isPlaying = false));
        audio?.addEventListener("timeupdate", () => {
          if (parseInt(audio.currentTime) === parseInt(audio.duration - 1)) {
            state.index =
              state.index + 1 == musicList.value.length ? 0 : state.index + 1;
            audio.load();

            fetch(playMusic.value.url)
              .then(() => {
                setTimeout(() => {
                  audio.play();
                }, audio.duration);
              })
              .catch((e) => audio.pause());
          }
        });
      }
    });

    return {
      ...toRefs(state),
      audioRef,
      isMobile,
      getIcon,
      getMusicName,
      isShow,
      shareData,
      payload,
      musicList,
      playMusic,
      togglePlay,
      toggleHover,
      shareTo,
    };
  },
};
</script>
<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 40px;
  // background: fade(black, 40%);
  color: white;
  .flex-center(column);
  .center {
    .flex-bt;
    width: 100vw;
    padding: 0 40px;
    box-sizing: border-box;
    &.xs {
      padding: 0 10px;
    }
    .left,
    .right {
      .flex;
      .align;
    }
    .left {
      .logo {
        width: 24px;
        height: 24px;
        display: block;
        margin-right: 5px;
        background: e(
          "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjUgKDY3NDY5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Mb2dvL01vbm9ncmFtL1N0YW5kYXJkLzgwQDN4PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiIGlkPSJsaW5lYXJHcmFkaWVudC0xIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzA3RDgxNCIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMDVBQTEwIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgPGcgaWQ9Iumhtemdoi0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5aSn5qac5Y2VIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDAuMDAwMDAwLCAtOC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Im5hdiI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAuMDAwMDAwLCA4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJMb2dvL01vbm9ncmFtL1N0YW5kYXJkLzgwIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IjgwIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik00LDI0IEwyMCwyNCBDMjIuMjA5MTM5LDI0IDI0LDIyLjIwOTEzOSAyNCwyMCBMMjQsNCBDMjQsMS43OTA4NjEgMjIuMjA5MTM5LC00LjA1ODEyMjUxZS0xNiAyMCwwIEw0LDAgQzEuNzkwODYxLDQuMDU4MTIyNTFlLTE2IC0yLjcwNTQxNWUtMTYsMS43OTA4NjEgMCw0IEwwLDIwIEMyLjcwNTQxNWUtMTYsMjIuMjA5MTM5IDEuNzkwODYxLDI0IDQsMjQgWiIgaWQ9IkZpbGwtMSIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0xKSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuOTYwMDAwLCA1LjA0MDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMy42MzMzMzYsMCBMMC41MDc0OTYsMCBDMC4zMTc0OTYsMCAwLjE1OTk3NiwwLjExMjQ4IDAuMTU5OTc2LDAuMzQ0OTYgTDAuMTU5OTc2LDEuMDU4MzIgTDAuMTU5OTc2LDEuMDg2NjQgQzAuMTU5OTc2LDEuMjg0OTYgMC4zMjk5NzYsMS40NCAwLjQ2ODc3NiwxLjQ0IEwwLjUwODM3NiwxLjQ0IEwxMy42MzI1MzYsMS40NCBDMTMuODQ1MDE2LDEuNDQgMTMuOTk5OTc2LDEuMjY1MDQgMTMuOTk5OTc2LDEuMDc1MDQgTDEzLjk5OTk3NiwwLjMyNjY0IEMxMy45OTk5NzYsMC4wOTMzNiAxMy44MTY2OTYsMCAxMy42MzMzMzYsMCIgaWQ9IkZpbGwtMyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLjU5MjUwNCw3Ljc2IEMzLjU1MDk4NCw3Ljc2IDMuNTIwMDI0LDcuNzEzNTIgMy41MjAwMjQsNy42NCBMMy41MjAwMjQsNC4zODE2OCBDMy41MjAwMjQsNC4zNDA0IDMuNTM2NjY0LDQuMzIgMy41NzgzNDQsNC4zMiBMMTAuNDIzMzA0LDQuMzIgQzEwLjUwNjY2NCw0LjMyIDEwLjU2MDAyNCw0LjM1IDEwLjU2MDAyNCw0LjQwOTA0IEwxMC41NjAwMjQsNy41OTUwNCBDMTAuNTYwMDI0LDcuNjg3MjggMTAuNDkyNTA0LDcuNzYgMTAuNDA1MDY0LDcuNzYgTDMuNTkyNTA0LDcuNzYgWiBNMTMuNjQ3MzA0LDEyLjQ4IEwxMy42MjA5ODQsMTIuNDggTDEwLjUyMDAyNCwxMi40OCBDMTAuNDM0OTg0LDEyLjQ4IDEwLjQzMTcwNCwxMi4zNjY5NiAxMC40MzE3MDQsMTIuMzY2OTYgTDExLjM2MDc0NCw5LjI2NTEyIEMxMS4zNjA3NDQsOS4yNjUxMiAxMS4zODAwMjQsOS4yIDExLjQ2MDAyNCw5LjIgTDEyLjM3MTA2NCw5LjIgTDEyLjQyNjAyNCw5LjIgQzEyLjU5NjAyNCw5LjIgMTIuODAwMDI0LDkuMDM0IDEyLjgwMDAyNCw4Ljg0NDggTDEyLjgwMDAyNCw4Ljc4NzM2IEwxMi44MDAwMjQsMy4yMzczNiBMMTIuODAwMDI0LDMuMTgxNzYgQzEyLjgwMDAyNCwzLjAyIDEyLjY0NzMwNCwyLjg3MzM2IDEyLjQ3NzMwNCwyLjg3MzM2IEMxMi40NjU4NjQsMi44NzMzNiAxMi40MTUzMDQsMi44OCAxMi40MTUzMDQsMi44OCBMMS42MjMzMDQsMi44OCBMMS41Nzk2MjQsMi44OCBDMS40MDMzMDQsMi44OCAxLjI4MDAyNCwzLjAzMzg0IDEuMjgwMDI0LDMuMjAxNzYgTDEuMjgwMDI0LDMuMjM4IEwxLjI4MDAyNCw4Ljc5MzUyIEwxLjI4MDAyNCw4LjgzMTEyIEMxLjI4MDAyNCw5LjAwOTM2IDEuNDIwMDI0LDkuMiAxLjYxNDUwNCw5LjIgTDEuNjQ0NTA0LDkuMiBMOS4yMTAwMjQsOS4yIEM5LjMxNDk4NCw5LjIgOS4yODcxNDQsOS4yOTA4IDkuMjg3MTQ0LDkuMjkwOCBMOC4xNzYwMjQsMTIuMzkzNiBDOC4xNzYwMjQsMTIuMzkzNiA4LjEzNjY2NCwxMi40OCA4LjA1MzMwNCwxMi40OCBMNS43MzY2NjQsMTIuNDggQzUuNjU0OTg0LDEyLjQ4IDUuNjI4MDI0LDEyLjM5OTQ0IDUuNjI4MDI0LDEyLjM5OTQ0IEw0Ljc0NjY2NCwxMC4xNjQ5NiBDNC43NDY2NjQsMTAuMTY0OTYgNC42ODY2NjQsOS45MiA0LjM1ODM0NCw5LjkyIEwyLjgzNTYyNCw5LjkyIEMyLjcwODM0NCw5LjkyIDIuNzE2NjY0LDEwLjA0MzYgMi43MTY2NjQsMTAuMDQzNiBMMy4zNzY1ODQsMTIuMzcxNTIgQzMuMzc2NTg0LDEyLjM3MTUyIDMuMzk2NjY0LDEyLjQ4IDMuMjgzMzA0LDEyLjQ4IEwwLjM2MTMwNCwxMi40OCBMMC4zMjAxMDQsMTIuNDggQzAuMTAzMzA0LDEyLjQ4IDIuNGUtMDUsMTIuNjQ3NTIgMi40ZS0wNSwxMi43NzU2OCBMMi40ZS0wNSwxMi44MjU2OCBMMi40ZS0wNSwxMy40NDY5NiBMMi40ZS0wNSwxMy40ODQ0OCBDMi40ZS0wNSwxMy42MzUwNCAwLjEwNjY2NCwxMy44NCAwLjMyMzcwNCwxMy44NCBMMC4zNjEyMjQsMTMuODQgTDEzLjYxNjUwNCwxMy44NCBMMTMuNjUzMTQ0LDEzLjg0IEMxMy44NzA5ODQsMTMuODQgMTQuMDAwMDI0LDEzLjY1NiAxNC4wMDAwMjQsMTMuNTAzODQgTDE0LjAwMDAyNCwxMy40NzA0OCBMMTQuMDAwMDI0LDEyLjc5ODggTDE0LjAwMDAyNCwxMi43NzMzNiBDMTQuMDAwMDI0LDEyLjYyNzY4IDEzLjg2MDAyNCwxMi40OCAxMy42NDczMDQsMTIuNDggTDEzLjY0NzMwNCwxMi40OCBaIiBpZD0iRmlsbC01Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==) no-repeat 50%/100%"
        );
        &.xs {
          width: 18px;
          height: 18px;
        }
      }
      .share {
        margin-left: 32px;
        cursor: pointer;
        position: relative;
        height: 100%;
        .flex-center;
        &::before {
          display: inline-block;
          vertical-align: text-top;
          content: "";
          width: 16px;
          height: 16px;
          background: e(
            "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTIgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjUgKDY3NDY5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5TaGFyZSBibGFja0AzeDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSLpobXpnaItMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuWkp+amnOWNlSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQwMS4wMDAwMDAsIC0xMi4wMDAwMDApIiBzdHJva2U9IiNGRkZGRkYiPgogICAgICAgICAgICA8ZyBpZD0ibmF2Ij4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC04IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MC4wMDAwMDAsIDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNTkuMDAwMDAwLCAyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iU2hhcmUtd2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMDAwMDAwLCAyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJTaGFyZSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik03LjY0NzIzNDI0LDQuOTI4NTcxNSBMOC44MTIwNTgzNyw0LjkyODU3MTQ2IEM5Ljc0Nzc3MjU3LDQuOTI4NTcxNDYgMTAuNDk2MDkzNyw1LjcwNzg5OTE5IDEwLjQ5NjA5MzcsNi42OTE4MTExNCBMMTAuNDk2MDkzOCwxMS43NDU1MDk0IEMxMC40OTYwOTM4LDEyLjcyOTQyMTQgOS43NDc3NzI2MiwxMy41IDguODEyMDU4NDIsMTMuNSBMMi4yMDA4MzU5LDEzLjUgQzEuMjY1MTIxNjksMTMuNSAwLjQ5NjA5MzgwMywxMi43Mjk0MjE0IDAuNDk2MDkzODAzLDExLjc0NTUwOTUgTDAuNDk2MDkzNzUsNi42OTE4MTExNCBDMC40OTYwOTM3NSw1LjcwNzg5OTE5IDEuMjY1MTIxNjQsNC45Mjg1NzE0NiAyLjIwMDgzNTg0LDQuOTI4NTcxNDYgTDMuMzUyNDk1NDcsNC45Mjg1NzE0NiIgaWQ9IlN0cm9rZS0zIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik01LjQ5NjA5Mzc1LDkuMjE0Mjg1NzUgTDUuNDk2MDkzNzUsMC42NDI4NTcxNzkiIGlkPSJTdHJva2UtNSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlN0cm9rZS0xIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHBvaW50cz0iOC4zNTMyMzY2MSAyLjA3MTQyODYxIDUuNDk2MDkzNzUgMC4wOTMwNjEyMTA1IDIuNjM4OTUwODkgMi4wNzE0Mjg2MSI+PC9wb2x5bGluZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)
            no-repeat 50%/100% 100%"
          );
          margin-right: 3px;
        }
        .share-board {
          position: absolute;
          top: 100%;
          left: 0;
          box-sizing: border-box;
          padding: 20px;
          color: #fff;
          display: none;
          ul {
            .direction(column);
            .justify(space-between);
            li {
              cursor: pointer;
              white-space: nowrap;
              &::before {
                display: inline-block;
                vertical-align: top;
                content: "";
                width: 13px;
                height: 13px;
                margin-right: 5px;
              }
            }
            .icon-douban::before {
              background: e(
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABGdBTUEAALGPC/xhBQAAAiFJREFUSA29lj9IAlEcx72nnlsYLlaTQuGfIYfbWoQaImgLp8bGFh2C5pasLWgOKhpqiWhO225L4QQNIR36Q+BQIWX5p+8vTa7Td1513oPj/f5/3p97d0+woWUymQmXy7UFMSoIwjjZzGqtVusOtdK1Wm0tEoncCh1YFiCPWZB+dQCuADrNaGbDhtEAiEEsBjlKBotalJm9Z3oDJxbN0NLm4NGazWYcPpnn17NjJgL8O+gkbRwXiMDrUql0pU0wqvv9/ud+sUI+n2/1cwzLpjdDG85OAcuS/A0cOR7kbPNydIFIKgQCgT1KzmazPlEUx3iFALoJhUL3siyPuN3uPwO79QFLYOSrXUOvsA7TZq/5p8XyY2E5cNAeqtfjA0pNbVDL2MM3tc6TDQODwWACRej5VxsEDORyuWW73a53Vl/wJp/RKBA7yxiL6I1IF4i3cgqwAxQ4xadOhi7hWVIXxFLuQz9LpVIOwE7gH1X7tbKhlwZFH3HGktVqdQUFXtVF4Dsk3ev1zgyCUZwhIOLmKViSpCcAjkmmBvlBUZSLtmZb7PS6HXdJUWwXI1YoGz3tjxgOh9/r9fqG0+n8+osgphiLxRodwiX6IslYfqQIcTyTHV+34368G43GQrlc/h59N8Go4PP5zgGc08ZzgdpAs3Sje2gWz8awD3RvtKQRi2aYtoTWhqQZ3YhBrgwbSgxiMbp+040YhiOastlgqkm1iUGsTwM3zdqayEvyAAAAAElFTkSuQmCC)
                  no-repeat 50%/100%"
              );
            }
            .icon-weibo::before {
              background: e(
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAYAAAAEN20fAAAABGdBTUEAALGPC/xhBQAABWVJREFUSA21l31M1VUYx7mXe7kpzGlotsoJZPEOSbhaNRqlVqyRlYKbVmvO2XKrqBnN1cZ6m3PaVvzTslw6m4Ca1pIy/tBehphE8Y69DLMspRnLgClvt8/3es9v5/64V23psz2c5/k+L+f5nfOccy6euMtAzc3Nk5OSkjaQeiF8TTAY9Hk8nhOM38M7h4aGthcWFo7YU3ts5VLJXV1dS71e7/ZY+Sjm6Pj4+JPZ2dmfGh+vES7xeJDJjsF/wQ3wt+Q/a+ZgdVLi4+P3UnClwS5LIVlZWb/U1tamZmZmTocXwoVjY2NTKGgx3BWe3MOqrevu7n5M+kVvDQHJ+CtoIV90A+MA/GZGRsZmxosm+sefmJi4iRyhAiisn22ac8FC1HhQFYGr4cmuGckxns8KdLhwqR6K38V4G3waPsCkr2m1wrZ95FuALHrxvFvT2dk5l+5vYwnXRClCCRRfLsFNfIBOSh74NDgFeSV8qL29fRZ6cGRk5Ckr5t6YhdBICyjgC5yvtwImiCSfOgEE0PGsqam5kf4IDA4OTmXl3sZ3pt/vf1b+eXl5PazQEcmMBT4JbmIllhO0Gfa7bVH0H4RReBH+S+AiEqcCDcOflZaWVhQUFPxJzjXoq7DNZzSkLU0n5ooJhfT09CzDuBW+YP8oG0kqiXke8TrpIrBzQlzcMvpLTX4fd8YAPdOPHDBGxtCRprixiEKo+i7A90nkZLKCYonXxjIIJ9/dln2A1CrGUKYEsG6nEJZ2NsAO2MGM9/8cdWJCNDw8fDt9F7raW1tbE5nrJhkotsVMCubZCl95LiTq318JOIRFN2afApAnwSlwDupcxmgruRM8RPn5+b8ZmVMzHAgEfkfXih4IBbJ3OlrvGCczMuFJ+F30LZz/Hw0ebeS4TqcflvPFOhU6ooa+5lZ9nW3/vKysbMyAGpuamqZAc8j9nae+vj6Qlpb2M7i918wf3EhxL3Nz/mMHV1VVeeFxG7NlLXlCQkI1sY/bOPk64QdjfZCH3ljEV+y2gs5y5pcSsMdgJL+K5C+g38MEWWG8l3EbX/sqJ0JHNYJY5S34PmqDFNKPf3FOTk6rjUumBu/DNkgRq+0iOjo65rGXR0haYRWhkFT4JeIb6urq4u0ckumBZ5g4YjWJn+bz+d5w+0r34nyHMSA3U8R7Rtc7w3P9MXrU21N+JC/iC58wMWbk5tQx3W90MzJHUWNjo5o8gnTF2xfRNtvKK/kIE11tY2F5PQm/NDg+S4zsGk+4dBXuY5snnC4Vctw4k1xNa9OdYaWVvV2EXb8nfgJrhp3rn+Sz7CBL1va56Tjv0JAb1Av5FeBsGZhkpu2ALaRTRCkNeUw2juEktqsOm+NK3ElHCQu8soo1H+KY8dVPgwmkHnFOB413v+2BTT/1RkZHR08ZHJ95RrbGDy05JNKUr1Bsgo2Ta5DDsNHGjOzlmVaSb8LAA3pFjZHAD0jmZ08bOI7P8bhpJezfEXLd09vbW21iNJJjBX4rbUwy2Fqzsm6beiRIlSv09fLli3cx6c1y1DEGX4WYQRL9e+A0pb4O3tDW1ra4pKQk9IrqsiN2LTk2Kd4mfNdxOb5lY7bsbLTuC5ZzL8YZ8BmKq+L/j2o1Vvi21GWWScIz2E/xY2c3tr9NMq0k9vXwLQYLj/KvPF8R8nMKkdLS0jKD90LLXC4d6mPiHRT1CQ3aRjI9UiFiJXQ5pfP18/F5iAL06EUQ+D76qyI3N7c7whBFiSjE2DkZ2UzwNLomSDY4iXWVaxu84IkGd42n0T+igGouusMuW0w1aiHGW3teXl5+K3oBnG5xMoXoJ4SW/Q/4KHyYY36wr69vf3FxsfD/RP8ClG5UJ6kDXBMAAAAASUVORK5CYII=) no-repeat 50%/100%"
              );
            }
            .icon-wechat::before {
              background: e(
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAcCAYAAAAJKR1YAAAABGdBTUEAALGPC/xhBQAABBRJREFUSA3Fl1lIlFEUx50lxbJokbIVIxJHCy0iECOUaMGXCvIheyijooegKOilIluEgrAIIiiIFoKZgXoIsoT2HsKwTGRUogcjrKaNogZ01n5HusM3d76Z+aYJ+uB67jnnf5bv3O+cO9ry0jz9/f01NpttbSwWqwE2n/0k9g7oD+hbZF3Qu4ODg3caGhpG0riyrLKZIQcGBjYQ6DCBF5jpdRnYr8jORqPRtsrKyl+6Phs+IaGurq7ioqKiKzhoyMaJAfuO/eby8vKHBllW23hCPp9vjsPheID1vKw8JIMjiHaQ1KVkVWbJaEIc0XignSxXZhNLCE4x1uhyuW5YQhtAdtljfAqiJzOEfAfytawBVtKD/jLfzUpom6bk87Nd6unpmaXJM7J2OqkM4206kiAneMOLlP4W+3Mmej/65oqKinu9vb37wXzTMBPy8/OParKMrB1HksxopTT0Kr6rIq/X60Beq+nyeInivr6+5SKnsxbCTzbBNHV3d0/U5el4GxV6ibNFKUDDJPwD/bQUehFLZ81kyUtFwXdDX7LeYxeORCJuEn4Db+mRhAIYjrWETgEiiZ/4OENwD526FL4Ovhw6CZMo+8/sX7Hu+v3+jvr6+nAKV3k2OiyWSmlRfp9EdhN0u91ulyYozGA3hP642+2+0NLSEtWxUqEvOJuiK6zwvPF1kjnvdDo94OXYLD/YPgkGg41VVVWfjEZy7nLmf/M8xekFjqgD46ySkWAUYTld+JTRMNUYXLrsplFgZY9NMBwO78OpmzXOio0ZBtsykpLqxm8MeygUukqAD2YGqWQ4ukZlNkKnGzH4eQQ/k2FpNtcODA8Py6D0Gm3wUcd42aRkds4wALNLCaxQAntxtFXHIutkkL4nsAzTkKbvqK6ulul/X5Pn0Qy7lSxeKobcMRQHlSIVxWGYCqymQkmO0QWxu01iS6CzjT7QyVx6jmw1K6kTaY4pzKtv8QnNFXAIoxajE7M9Tv0kXpJCl49+PbqEZASLfAZkHSspGdHjc+4olT/q4W46QlI7FW9G0UeQ5zq7klxT9dGZFK+QQhAw7d3Dm8o1Mqjw/4ISM0TXvhZfTt0hARtFBugZ5AiJf0e2mFUBXwJ1IhviG/oCX8zK+cFn+5/mSkyIISXnGCKZNRyfDDz1dKqNolw559kfUnwOVC7kY8o+oUKBQOAjmdYoZTo6MjJysqCgoAlMrj95W3n5FypWvO2VIBvKQKukOx5T8r+9C6+SzBZixpsk6aPOJiHmho9kail5XzZ2gsXmlMfjaZat0TanCilH7e3tBaWlpXuo1l5kCZelwuiUQTjf7IfbP0lIBeP/ujGFhYUr6MA6KuCSo4TKj7G37F+QhA+dXFPr6NS9DOPTyva/Ur69ZfwOazVL4jcM6Lpurj/prAAAAABJRU5ErkJggg==) no-repeat 50%/100%"
              );
            }
          }
          .qr-code {
            padding-left: 20px;
            border-left: 1px solid #333;
            margin-left: 20px;
            width: 90px;
            img {
              width: 100%;
              height: 90px;
              background: #fff;
              padding: 2px;
              box-sizing: border-box;
            }
          }
          &::after {
            position: absolute;
            top: 3px;
            left: 0;
            display: block;
            content: "";
            z-index: -1;
            width: 100%;
            height: 100%;
            background: #222;
            border-radius: 4px;
          }
        }
        &:hover {
          .share-board {
            .flex;
          }
        }
      }
    }
    .right {
      cursor: pointer;
      .icon {
        width: 14px;
        margin-right: 6px;
        display: inline-block;
        vertical-align: middle;
      }
      .name {
        width: 150px;
        .ellipsis(1);
      }
      .audio {
        display: none;
      }
    }
  }
}
</style>

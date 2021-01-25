<template>
  <section class="c_wrapper news">
    <div class="c_center">
      <div class="line">
        <img
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDJweCIgaGVpZ2h0PSI0MnB4IiB2aWV3Qm94PSIwIDAgNDIgNDIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+55u057q/PC90aXRsZT4KICAgIDxnIGlkPSLpobXpnaItMiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iMC42Ij4KICAgICAgICA8ZyBpZD0iLSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5LjAwMDAwMCwgLTk1LjAwMDAwMCkiIHN0cm9rZT0iI0ZGRUJDQyIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAuMDAwMDAwLCA5Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtMiI+CiAgICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9IjAiIHkxPSI0MCIgeDI9IjQwIiB5Mj0iMi44NDIxNzA5NGUtMTMiIGlkPSLnm7Tnur8iIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"
          alt=""
        />
        <h1>{{ payload.title }}</h1>
      </div>
      <ul>
        <li v-for="(item, index) in payload.news" :key="index">{{ item }}</li>
      </ul>
      <div class="line">
        <img
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDJweCIgaGVpZ2h0PSI0M3B4IiB2aWV3Qm94PSIwIDAgNDIgNDMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+55u057q/PC90aXRsZT4KICAgIDxnIGlkPSLpobXpnaItMiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iMC42Ij4KICAgICAgICA8ZyBpZD0iLSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMxNC4wMDAwMDAsIC02OTYuMDAwMDAwKSIgc3Ryb2tlPSIjRkZFQkNDIiBzdHJva2Utd2lkdGg9IjIiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDk2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNjcuNTAwMDAwLCA2MjEuMDAwMDAwKSBzY2FsZSgtMSwgLTEpIHRyYW5zbGF0ZSgtMTY3LjUwMDAwMCwgLTYyMS4wMDAwMDApIHRyYW5zbGF0ZSgwLjAwMDAwMCwgNjAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxsaW5lIHgxPSIwIiB5MT0iNDEiIHgyPSI0MCIgeTI9IjMuMjY1OTk4NThlLTEzIiBpZD0i55u057q/IiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="
          alt=""
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "news",
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="less" scoped>
.news {
  .line {
    .flex-bt;
    border-radius: 1px;
    border-style: solid;
    border-color: rgba(255, 235, 204, 0.6);
    &:nth-of-type(1) {
      border-bottom-width: 2px;
    }
    &:nth-of-type(2) {
      justify-content: flex-end;
      border-top-width: 2px;
    }
    img {
      width: 42px;
      height: 42px;
    }
    h1 {
      color: #ffebcc;
      letter-spacing: 0.71px;
      text-align: right;
      height: 42px;
      line-height: 42px;
      font-weight: 700;
      font-size: 24px;
      @media (min-width: 1024px) {
        font-size: 40px;
        position: relative;
        top: -6px;
      }
    }
  }
  ul {
    li {
      padding: 15px 0;
      font-size: 17px;
      color: rgba(255, 235, 204, 0.9);
      letter-spacing: 0;
      line-height: 1.3;
      @media (min-width: 1024px) {
        font-size: 20px;
      }
      &:not(:last-child) {
        border-bottom: 2px solid rgba(255, 235, 204, 0.25);
      }
      &::before {
        content: "·";
        width: 20px;
        display: inline-block;
        text-align: center;
        font-weight: bold;
      }
    }
  }
}
</style>

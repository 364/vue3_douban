<template>
  <div class="rater">
    <h1>{{ rating }}</h1>
    <a
      v-for="i in 5"
      :class="{
        'is-active': i <= Math.ceil(rating) / 2,
        'is-active-half': i * 2 - Math.ceil(rating) == 1,
      }"
      :key="i"
    ></a>
  </div>
</template>

<script lang="ts">
export default {
  name: "rating",
  props: {
    rating: {
      type: Number,
      default: 10,
    },
  },
};
</script>

<style lang="less" scoped>
.rater {
  display: inline-block;
  vertical-align: top;
  text-align: center;
  @media (min-width: 1024px) {
    margin-bottom: 14px;
  }
  h1 {
    color: #ffac2d;
    font-size: 40px;
    line-height: 1.2;
    @media (max-width: 1024px) {
      font-size: 25px;
    }
  }
  a {
    display: inline-block;
    vertical-align: top;
    margin-left: 1px;
    width: 10px;
    height: 10px;
    background-size: contain;
    background-position: 100% 100%;
    background-repeat: no-repeat;
    &:first-child {
      margin-left: 0;
    }
    @media (min-width: 1024px) {
      width: 14px;
      height: 14px;
    }
    @media (max-width: 1024px) {
      margin-bottom: 10px;
    }
  }
  .is-active {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTBweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMTAgMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjIgKDY3MTQ1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5pY19zdGFyX29yYW5nZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnlLXlvbEt5YiG5qacIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTE2MS4wMDAwMDAsIC0xMjcuMDAwMDAwKSIgZmlsbD0iI0ZGQUMyRCI+CiAgICAgICAgICAgIDxnIGlkPSJpY19zdGFyX29yYW5nZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE2MS4wMDAwMDAsIDEyNy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05LjY5NzUzLDMuNTM3MTE0MDMgTDYuNTM4NDA0NDMsMy4zNTcwODU3NyBMNS4zMzI0NzUwMSwwLjE2MDg0Mjk2NiBDNS4zMjg2NjA0MywwLjE0ODU3NTI4MiA1LjI1MjYyOTYzLDAgNS4wMzk0MzY5LDAgQzQuODMxNDkzMywwIDQuNzQ4Mjg5NzgsMC4xMzk0NzY3NSA0Ljc0MjU4NDIxLDAuMTYwODQyOTY2IEwzLjU0OTY2MzUsMy4zNDMwMTIwMSBDMy41NDk2NjM1LDMuMzQzMDEyMDEgMC4yOTE3NTAwNDMsMy41NDAxODA5NSAwLjI3NTE4NzU4NywzLjU0MTM3MzY0IEMwLjA5Njc4MjU0MywzLjU1NDI4ODc5IDAuMDIxNjk3MjMzLDMuNzI3ODc2NTEgMC4wMDg5MTY3NTQ3NCwzLjc4ODQzMTE2IEMtMC4wMjM2ODY1MDYyLDMuOTQzMjA4NDQgMC4wNDAzMTM2OTUsNC4wNjExODI2NyAwLjA4NTAxMjc2NTgsNC4xMDc5MDIxIEwyLjU4MDMzNTk1LDYuMjk3OTkwMzYgTDEuNzkyNjA4NTYsOS42MzQwNTA2OCBDMS43OTI2MDg1Niw5LjYzNDA1MDY4IDEuNzQ3MjU3NDIsOS44MDM1NDkxOCAxLjk0ODgxMDc4LDkuOTM3OTE0NCBDMi4xMzYyNzk1MywxMC4wNjI4NDAzIDIuMzAzMzcxMjQsOS45NjA2MDk2MSAyLjMwMzM3MTI0LDkuOTYwNjA5NjEgTDUuMDQ3MzU5NDksOC4xNzU2Mjc1MyBMNy43ODYzOTIwNSw5Ljk1OTk5NjIzIEM3Ljc4NjM5MjA1LDkuOTU5OTk2MjMgNy45NjE0MDYzNSwxMC4wNjU3MDI4IDguMTQ2MTY5MDMsOS45MTgwMTM0OSBDOC4zMzQ3MTM2OSw5Ljc2NzMyNTQ0IDguMjY2ODk4OTEsOS41NTk3Mjg5NyA4LjI2Njg5ODkxLDkuNTU5NzI4OTcgTDcuNDg1MjY4MzMsNi4yNzQ1MTEzOCBMOS45MDk0NTEyLDQuMTc4OTE4MzYgQzkuOTA5NDUxMiw0LjE3ODkxODM2IDEwLjA0NzMzMDQsNC4wNDExNzk1MyA5Ljk4MjgwODUzLDMuODAxMjEgQzkuOTE0MTQ2MDcsMy41NDU5MDU4NyA5LjY5NzUzLDMuNTM3MTE0MDMgOS42OTc1MywzLjUzNzExNDAzIFoiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+);
  }
  .is-active-half {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTBweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMTAgMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjIgKDY3MTQ1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5pY19zdGFyX2hhbGY8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNOS45ODI4MDg1MywzLjgwMTIxIEM5LjkxNDE0NjA3LDMuNTQ1OTA1ODcgOS42OTc1MywzLjUzNzExNDAzIDkuNjk3NTMsMy41MzcxMTQwMyBMNi41Mzg0MDQ0MywzLjM1NzA4NTc3IEw1LjMzMjQ3NTAxLDAuMTYwODQyOTY2IEM1LjMyODY2MDQzLDAuMTQ4NTc1MjgyIDUuMjUyNjI5NjMsMCA1LjAzOTQzNjksMCBDNC44MzE0OTMzLDAgNC43NDgyODk3OCwwLjEzOTQ3Njc1IDQuNzQyNTg0MjEsMC4xNjA4NDI5NjYgTDMuNTQ5NjYzNSwzLjM0MzAxMjAxIEMzLjU0OTY2MzUsMy4zNDMwMTIwMSAwLjI5MTc1MDA0MywzLjU0MDE4MDk1IDAuMjc1MTg3NTg3LDMuNTQxMzczNjQgQzAuMDk2NzgyNTQzLDMuNTU0Mjg4NzkgMC4wMjE2OTcyMzMsMy43Mjc4NzY1MSAwLjAwODkxNjc1NDc0LDMuNzg4NDMxMTYgQy0wLjAyMzY4NjUwNjIsMy45NDMyMDg0NCAwLjA0MDMxMzY5NSw0LjA2MTE4MjY3IDAuMDg1MDEyNzY1OCw0LjEwNzkwMjEgTDIuNTgwMzM1OTUsNi4yOTc5OTAzNiBMMS43OTI2MDg1Niw5LjYzNDA1MDY4IEMxLjc5MjYwODU2LDkuNjM0MDUwNjggMS43NDcyNTc0Miw5LjgwMzU0OTE4IDEuOTQ4ODEwNzgsOS45Mzc5MTQ0IEMyLjEzNjI3OTUzLDEwLjA2Mjg0MDMgMi4zMDMzNzEyNCw5Ljk2MDYwOTYxIDIuMzAzMzcxMjQsOS45NjA2MDk2MSBMNS4wNDczNTk0OSw4LjE3NTYyNzUzIEw3Ljc4NjM5MjA1LDkuOTU5OTk2MjMgQzcuNzg2MzkyMDUsOS45NTk5OTYyMyA3Ljk2MTQwNjM1LDEwLjA2NTcwMjggOC4xNDYxNjkwMyw5LjkxODAxMzQ5IEM4LjMzNDcxMzY5LDkuNzY3MzI1NDQgOC4yNjY4OTg5MSw5LjU1OTcyODk3IDguMjY2ODk4OTEsOS41NTk3Mjg5NyBMNy40ODUyNjgzMyw2LjI3NDUxMTM4IEw5LjkwOTQ1MTIsNC4xNzg5MTgzNiBDOS45MDk0NTEyLDQuMTc4OTE4MzYgMTAuMDQ3MzMwNCw0LjA0MTE3OTUzIDkuOTgyODA4NTMsMy44MDEyMSIgaWQ9InBhdGgtMSI+PC9wYXRoPgogICAgPC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IueUteW9sS3liIbmppwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTg3LjAwMDAwMCwgLTEyNy4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9ImljX3N0YXJfaGFsZiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE4Ny4wMDAwMDAsIDEyNy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxtYXNrIGlkPSJtYXNrLTIiIGZpbGw9IndoaXRlIj4KICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgPC9tYXNrPgogICAgICAgICAgICAgICAgPHVzZSBpZD0ic3RhciIgZmlsbC1vcGFjaXR5PSIwLjQiIGZpbGw9IiNGRkZGRkYiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iI0ZGQUMyRCIgZmlsbC1ydWxlPSJub256ZXJvIiBtYXNrPSJ1cmwoI21hc2stMikiIHg9IjAiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjEwIj48L3JlY3Q+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==);
  }
}
</style>

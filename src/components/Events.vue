<template>
  <section class="c_wrapper events">
    <div class="center">{{ payload.description }}</div>
  </section>
</template>

<script lang="ts">
export default {
  name: "events",
  props: {
    payload: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="less" scoped>
.events {
  padding-left: 0;
  padding-right: 0;
  @media (min-width: 1024px) {
    .c_center;
  }
  .center {
    margin: 0 0.3rem;
    padding: 30px;
    font-size: 17px;
    color: rgba(255, 235, 204, 0.9);
    border: 2px solid rgba(255, 235, 204, 0.35);
    border-radius: 12px 0 12px 0;
    letter-spacing: 0;
    line-height: 40px;
    position: relative;
    @media (min-width: 1024px) {
      margin: 0 auto;
      max-width: 505px;
      font-size: 20px;
      padding: 45px;
      line-height: 50px;
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      display: block;
      width: 25px;
      height: 40px;
      background: no-repeat 50% / contain;
    }
    &::before {
      left: -1px;
      top: -19px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iNDIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC01NCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHJlY3Qgc3Ryb2tlPSIjRkZFQkNDIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii42IiB4PSIxIiB5PSI3MyIgd2lkdGg9IjIyIiBoZWlnaHQ9IjIyIiByeD0iMTEiIC8+CiAgICAgICAgPHBhdGggc3Ryb2tlPSIjRkZFQkNDIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii42IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBkPSJNNC41IDc2bDIwLTIwIiAvPgogICAgPC9nPgo8L3N2Zz4K);
    }
    &::after {
      right: -1px;
      bottom: -19px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iNDIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBzdHJva2U9IiNGRkVCQ0MiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InJvdGF0ZSgxODAgMTMgMjApIiBvcGFjaXR5PSIuNiI+CiAgICAgICAgICAgIDxyZWN0IHg9IjEiIHk9IjE3IiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHJ4PSIxMSIgLz4KICAgICAgICAgICAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgZD0iTTQuNSAyMGwyMC0yMCIgLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=);
    }
  }
}
</style>

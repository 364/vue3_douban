<template>
  <section class="c_wrapper film-list">
    <div class="c_center">
      <div class="c_header">
        <h3>- {{ payload.subtitle }} -</h3>
        <h1>{{ payload.title }}</h1>
      </div>
      <div class="content" :class="{ xs: isMobile }">
        <div>
          <list-row
            v-for="(item, index) in lists.slice(0, lists.length / 2)"
            :key="item.chart_id"
            :info="item"
            :index="index"
          ></list-row>
        </div>
        <div>
          <list-row
            v-for="(item, index) in lists.slice(lists.length / 2)"
            :key="item.chart_id"
            :info="item"
            :index="index + lists.length / 2"
          ></list-row>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import ListRow from "./box";
import { inject, toRefs } from "vue";

interface ListsType {
  chart_id: number;
  url: string;
  cover_url: string;
  header_bg_image: string;
  owner_name: string;
  title: string;
  total: number;
  n_followers: number;
}
interface PayloadType {
  title: string;
  subtitle: string;
}
interface PropsType {
  lists: ListsType[];
  payload: PayloadType;
}

type Ref<T = any> = {
  value: T;
};
export default {
  name: "film-list",
  components: {
    ListRow,
  },
  props: {
    lists: {
      type: Array,
      default: () => [],
    },
    payload: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: PropsType) {
    const isMobile = inject("isMobile") as Ref<boolean>;
    const { lists, payload } = toRefs(props);
    return { isMobile, lists, payload };
  },
};
</script>

<style lang="less" scoped>
.film-list {
  padding-left: 0;
  padding-right: 0;
  .c_header {
    margin-bottom: 40px;
  }
  .content {
    &.xs {
      width: 100%;
      overflow-x: auto;
      box-sizing: border-box;
      padding: 0 0.15rem;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    & > div {
      white-space: nowrap;
      display: inline-flex;
      align-items: stretch;
    }
  }
}
</style>

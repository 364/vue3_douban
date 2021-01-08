<template>
  <div class="home">
    <div class="mask">
      <component
        v-for="section in widgets"
        :key="section.id"
        :is="section.kind_str == 'image' ? 'single-image' : section.kind_str"
        :payload="section.payload"
        :subject="section.subject"
        :subjects="section.subjects"
        :user="section.users"
        :people="section.people"
        :list="section.lists"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import Fetch from "@/axios";
import components from "@/components/index";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { defineComponent, onErrorCaptured } from "vue";
import { GET_ANNUAL_INFO, SET_ERROR_INFO } from "@/store/mutations-types";
import { InfoResProps, InfoStatusProps } from "@/store/types";

interface InfoType {
  r: number;
  res: InfoResProps;
  status: InfoStatusProps;
}

export default defineComponent({
  name: "Home",
  components: {
    ...components,
  },
  async setup() {
    // 获取路由器实例
    const router = useRouter();
    // route是响应式对象,可监控器变化
    const route = useRoute();
    const store = useStore();
    const widgets = computed(() => store.state.info.widgets);
    try {
      const info: InfoType = await Fetch.get(
        `/${route.params.kind}_annual2020?with_widgets=1`
      );
      console.log("info", info);
      if (info.status.code == 200) {
        const { res } = info;
        store.commit(GET_ANNUAL_INFO, res);
      }
      return { info, widgets };
    } catch (err) {
      onErrorCaptured((e) => {
        store.commit(SET_ERROR_INFO, {
          status: true,
          message: typeof err == "string" ? err : err.message,
        });
        return true;
      });
    }
  },
});
</script>

<style lang="less" scoped>
.mask {
  .loading;
}
</style>

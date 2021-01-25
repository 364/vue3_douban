<template>
  <div class="home">
    <div class="mask" />
    <div class="container">
      <component
        class="w"
        v-for="section in widgets"
        :key="section.id"
        :is="getIsName(section.kind_str)"
        :payload="section.payload"
        :subject="section.subject"
        :subjects="section.subjects"
        :user="section.user"
        :users="section.users"
        :people="section.people"
        :lists="section.lists"
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
import { InfoResProps, InfoStatusProps } from "@/store/types";
import { defineComponent, onErrorCaptured, provide } from "vue";
import { GET_ANNUAL_INFO, SET_ERROR_INFO } from "@/store/mutations-types";

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
    const route = useRoute();
    const store = useStore();
    const widgets = computed(() => store.state.info.widgets);
    // 组件名不能为内置标签
    const labelList = `html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot,image`.split(
      ","
    );
    const getIsName = (kind_str: string): string =>
      labelList.includes(kind_str)
        ? `single-${kind_str}`
        : kind_str.replace("_", "-");

    try {
      // 获取数据
      const info: InfoType = await Fetch.get(
        `/${route.params.kind}_annual2020?with_widgets=1`
      );
      if (info.status.code == 200) {
        const { res } = info;
        store.commit(GET_ANNUAL_INFO, res);
      }
      provide("kind", route.params.kind);
      return { info, widgets, getIsName };
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
  position: fixed;
}
.container {
  background: black;
}
.w {
  position: relative;
  color: white;
}
</style>

import { createStore } from "vuex";
import { GlobalDataProps } from "./types";
import {
  CHANGE_SCREEN,
  GET_ANNUAL_INFO,
  SET_ERROR_INFO,
  SET_AUDIO_NODE,
} from "@/store/mutations-types";

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    loading: false,
    isMobile: document.body.clientWidth <= 414 ? true : false,
    info: {
      title: "",
      payload: {},
      widget_infos: [],
      widgets: [],
    },
    globalAudio: null,
  },
  mutations: {
    [CHANGE_SCREEN](state, bool) {
      state.isMobile = bool;
    },
    [GET_ANNUAL_INFO](state, { title, payload, widget_infos, widgets }) {
      state.info = { title, payload, widget_infos, widgets };
    },
    [SET_ERROR_INFO](state, payload) {
      state.error = { ...state.error, ...payload };
    },
    [SET_AUDIO_NODE](state, node) {
      state.globalAudio = node;
    },
  },
  actions: {},
  modules: {},
});

export default store;

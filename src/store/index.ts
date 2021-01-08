import { createStore } from "vuex";
import { GlobalDataProps } from "./types";
import {
  CHANGE_SCREEN,
  GET_ANNUAL_INFO,
  SET_ERROR_INFO,
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
  },
  mutations: {
    [CHANGE_SCREEN](state, payload) {
      state.isMobile = payload;
    },
    [GET_ANNUAL_INFO](state, { title, payload, widget_infos, widgets }) {
      state.info = { title, payload, widget_infos, widgets };
    },
    [SET_ERROR_INFO](state, payload) {
      state.error = { ...state.error, ...payload };
    },
  },
  actions: {},
  modules: {},
});

export default store;

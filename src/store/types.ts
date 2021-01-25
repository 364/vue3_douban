export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

export interface GlobalDataProps {
  error: GlobalErrorProps;
  loading: boolean;
  isMobile: boolean;
  info: InfoResProps;
  globalAudio: null | AudioNode;
}

type status = 0 | 1;
export interface InfoResProps {
  TYPE?: string;
  id?: number;
  kind?: number;
  payload: PayloadProps;
  pv?: string;
  status?: status;
  title: string;
  url?: string;
  url_name?: string;
  version?: string;
  widget_infos: WidgetInfoList[];
  widgets?: WidgetsList[];
}
export interface PayloadProps {
  [propName: string]: string;
}
export interface WidgetInfoList {
  id: number;
  show_divider: boolean;
  show_divider_txt: string;
  title: string;
}
export interface WidgetsList {
  TYPE: string;
  comment_count: number;
  id: number;
  kind: number;
  kind_cn: string;
  kind_str: string;
  page_id: number;
  payload: PayloadProps;
  show_kind: string;
  status: status;
}

export interface InfoStatusProps {
  code: number;
}

import axios from 'axios';
// 配置默认api_url路径，使用的时候不需添加
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
export default axios;
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//按需引入element-ui组件
import {
  Carousel,
  Input,
  Button,
  Slider, 
  Tooltip, 
  Drawer, 
  CarouselItem,
  Pagination,
  Row,
  Message,
  MessageBox,
  Loading,
  Table,
  TableColumn,
  Image,
  Popover,
  InfiniteScroll
} from 'element-ui';
//使用element-ui组件
Vue.use(Carousel);
Vue.use(CarouselItem)
Vue.use(Input);
Vue.use(Button);
Vue.use(Slider)
Vue.use(Tooltip)
Vue.use(Drawer)
Vue.use(Row);
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Image)
Vue.use(Popover)
Vue.use(InfiniteScroll)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;
Vue.config.productionTip = false
//注册全局组件
import TabClick from '@/components/common/TabClick/TabClick.vue'
Vue.component(TabClick.name,TabClick)
//添加事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')

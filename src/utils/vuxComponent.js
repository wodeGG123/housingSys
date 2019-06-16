import Vue from 'vue'
import { Grid, GridItem, XHeader, ViewBox, Group, Cell, XTextarea, XInput, Selector, Radio, Calendar,
 XButton, PopupRadio, Search, Checklist, Datetime, Loading, Alert, Confirm, Tab, TabItem, XDialog } from 'vux'
import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)
import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

Vue.component('Grid', Grid)
Vue.component('GridItem', GridItem)
Vue.component('ViewBox', ViewBox)
Vue.component('XHeader', XHeader)
Vue.component('Group', Group)
Vue.component('Cell', Cell)
Vue.component('XTextarea', XTextarea)
Vue.component('XInput', XInput)
Vue.component('Selector', Selector)
Vue.component('Radio', Radio)
Vue.component('Calendar', Calendar)
Vue.component('XButton', XButton)
Vue.component('PopupRadio', PopupRadio)
Vue.component('Search', Search)
Vue.component('Checklist', Checklist)
Vue.component('Datetime', Datetime)
Vue.component('Loading', Loading)
Vue.component('Alert', Alert)
Vue.component('Confirm', Confirm)
Vue.component('Tab', Tab)
Vue.component('TabItem', TabItem)
Vue.component('XDialog', XDialog)

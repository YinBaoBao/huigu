import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    provinceInformation: '',
    token:'',	
    api:window.__config.serve,
    userId:'',
    userNames:'',
    logoImg:'',
    admin:window.__config.serveqwe,
  },
  mutations:{
  	newProvinceInformation(state,msg){
  		state.provinceInformation=msg
  	},
  	newDemo(state,msg){
  		state.token=msg
  	},
    newroleID(state,msg){
      state.roleId=msg
    },
    newuserID(state,msg){
      state.roleId=msg
    },
    newuserNames(state,msg){
      state.userNames=msg
    },
    newlogoImg(state,msg){
      state.logoImg=msg
    },
  }
})

export default store
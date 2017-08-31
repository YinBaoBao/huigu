import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/page/Login'
import Main from '../components/page/Main'

import Province from '../components/page/allContent/province.vue'
import Urban from '../components/page/allContent/urban.vue'
import District from '../components/page/allContent/district.vue'
import Headoffice from '../components/page/allContent/headoffice.vue'
import Branch from '../components/page/allContent/branch.vue'

import Agency from '../components/page/organization/agency.vue'
import Bank from '../components/page/organization/bank.vue'
import Department from '../components/page/organization/department.vue'

import Module from '../components/page/management/module.vue'
import Operation from '../components/page/management/operation.vue'
import Role from '../components/page/management/role.vue'
import User from '../components/page/management/user.vue'

import AgencyMore from '../components/page/organization/agencymore.vue'
import Bankmore from '../components/page/organization/bankmore.vue'
import Bankdepartment from '../components/page/organization/bankdepartment.vue'
import Bankuser from '../components/page/management/bankuser.vue'

Vue.use(Router)

  const routes=[
    {
    	path:'/',
    	redirect: '/main'
    },{
    	path:'/main',
    	component:Main,
    	children:[/*{
    		path:'/',
    		component:Bank
    	},*/{
    		path:'/province',
    		component:Province
    	},{
    		path:'/urban',
    		component:Urban
    	},{
    		path:'/district',
    		component:District
    	},{
    		path:'/headoffice',
    		component:Headoffice
    	},{
    		path:'/branch',
    		component:Branch
    	},{
            path:'/agency',
            components:{a:Agency},
            children:[{
                path:'/',
                component:AgencyMore
            },{
                path:'/agencymore',
                component:AgencyMore
            },{
                path:'/department',
                component:Department
            },{
                path:'/user',
                component:User
            }]
        },{
            path:'/bank',
            components:{a:Bank},
            children:[{
                path:'/',
                component:Bankmore
            },{
                path:'/bankmore',
                component:Bankmore
            }/*,{
                path:'/bankdepartment',
                component:Bankdepartment
            }*/,{
                path:'/bankuser',
                component:Bankuser
            }]
        }/*,{
            path:'/department',
            component:Department
        }*/,{
            path:'/module',
            components:{b:Module}
        },{
            path:'/operation',
            components:{b:Operation}
        },{
            path:'/role',
            components:{b:Role}
        }/*,{
            path:'/user',
            component:User
        }*/]
    },{
      path: '/login',
      component: Login
    }
  ];

const router = new Router({
    routes
});

export default router;

import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Jingle from '@/components/Jingle'
import Login from '@/components/Login'
import PageError from '@/components/404'
import HomePage from '@/components/home/HomePage'

import DeviceList from '@/components/device/DeviceList'
import VersionManager from '@/components/device/VersionManager'

import PicBook from '@/components/book/PicBook'
import AddBook from '@/components/book/AddBook'
import TagList from '@/components/book/TagList'
import ResourceList from '@/components/book/ResourceList'
import AddResource from '@/components/book/AddResource'

import Banner from '@/components/operation/Banner'

import UserList from '@/components/system/UserList'
import RoleList from '@/components/system/RoleList'
import MenuManager from '@/components/system/MenuManager'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/homePage',
      name: '概览',
      component: Index,
      icon: 'fa fa-th-large fa-lg',
      leaf: true,//只有一个节点
      children: [
        {path: '/homePage', component: HomePage, name: '概览'}
      ]
    },
    {
      path: '/deviceList',
      name: '设备',
      component: Index,
      icon: 'fa fa-android fa-lg',
      children: [
        {path: '/deviceList', component: DeviceList, name: '设备库'},
        {path: '/versionManager', component: VersionManager, name: '版本管理'}
      ]
    },
    {
      path: '/picBook',
      name: '绘本',
      component: Index,
      icon: 'fa fa-book fa-lg',
      children: [
        {path: '/picBook', component: PicBook, name: '绘本 '},
        {path: '/addBook', component: AddBook, name: '添加绘本', hidden: true},
        {path: '/resourceList', component: ResourceList, name: '资源'},
        {path: '/addResource', component: AddResource, name: '添加资源', hidden: true},
        {path: '/tagList', component: TagList, name: '标签分类'}
      ]
    },
    {
      path: '/banner',
      name: '运营',
      component: Index,
      icon: 'fa fa-book fa-lg',
      children: [
        {path: '/banner', component: Banner, name: 'banner管理'}
      ]
    },
    {
      path: '/userList',
      name: '系统',
      component: Index,
      icon: 'fa fa-cog fa-lg',
      children: [
        {path: '/userList', component: UserList, name: '用户'},
        {path: '/roleList', component: RoleList, name: '角色'},
        {path: '/menuManager', component: MenuManager, name: '权限'}
      ]
    },
    {
      path: '/jingle',
      name: '巴学社官网',
      hidden: true,
      component: Jingle
    },
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      name: '',
      hidden: true,
      component: PageError
    },
    {
      path: '*',
      hidden: true,
      redirect: {path: '/404'}
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

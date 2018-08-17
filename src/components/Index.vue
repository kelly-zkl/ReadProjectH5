<template>
  <div>
    <el-container class="main-container">
      <el-header style="background: #000B2A;color:#fff">
        <el-row>
          <el-col :span="8" align="left">
            <img src="../assets/img/icon_logo.png" style="height: 40px;margin: 10px;">
          </el-col>
          <el-col :span="8" align="right" :offset="8">
            <el-popover ref="modifyPsw" placement="bottom" width="200" trigger="click">
              <el-col :span="24">
                <el-button
                  style="width: 100%;border-radius: 0 0 0 4px;border: none;height: 45px"
                  type="text" @click="runModifyPsw = true;psw={}">修改密码
                </el-button>
              </el-col>
            </el-popover>
            <el-button class="item" style="text-align: center;width: 120px" v-popover:modifyPsw>
              <i class="fa fa-user fa-2x" style="display: inline-block;padding-top: 13px"></i>
              <span style="display: inline-block;padding-left: 5px;height:60px;line-height: 60px">用户名</span>
            </el-button>
            <div class="item" style="text-align: center" @click="loginOut">
              <i class="fa fa-sign-out fa-2x" style="padding-top: 13px"></i>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="main-content">
        <!--左侧菜单栏-->
        <el-aside :width="collapseWidth" v-bind:class="isCollapse ? 'content-aside-close' : 'content-aside'">
          <el-menu :default-active="$route.path" :collapse="isCollapse" unique-opened router mode="vertical"
                   background-color="#333" text-color="#ccc" active-text-color="#59aaf4" @select="handleActive">
            <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
              <el-submenu :index="index+''" v-if="!item.leaf" style="text-align: left">
                <template slot="title">
                  <i :class="item.icon" style="margin-right: 16px"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path"
                              v-if="!child.hidden" style="padding-left: 70px">{{child.name}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"
                            style="text-align: left">
                <i :class="item.icon" style="margin-right: 16px"></i>
                <span>{{item.name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <!--main-->
        <el-main class="content-main">
          <div>
            <el-col :span="24" align="left">
              <div v-if="$route.path !='/deviceList' && $route.path !='/homePage' &&
                  $route.path !='/versionManager' && $route.path !='/roleList'&& $route.path !='/menuManager' &&
                  $route.path !='/picBook' && $route.path !='/tagList'&& $route.path !='/resourceList' &&
                  $route.path !='/userList'">
                <el-button type="text" style="padding: 0;margin-right: 10px" @click="$router.go(-1)">返回上一级</el-button>
                <div class="bar">
                  <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-for="item in $route.matched" v-if="item.name && item.path"
                                        :to="{path: item.path}" :key="item.name">{{ item.name}}
                    </el-breadcrumb-item>
                  </el-breadcrumb>
                </div>
              </div>
              <span v-else>{{$route.name}}</span>
            </el-col>
            <el-col :span="24" style="padding-top: 20px;margin-left: 10px">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!--修改密码-->
    <el-dialog title="修改密码" width="500px" :visible.sync="runModifyPsw">
      <div class="block">
        <el-form label-width="100px" :rules="rules" ref="psw" :model="psw">
          <el-form-item label="当前密码" prop="password">
            <el-input type="password" :maxlength="18" :minlength="6" placeholder="输入密码"
                      v-model="psw.password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password1">
            <el-input type="password" v-model="psw.password1"
                      placeholder="请输入6-16位密码" :maxlength="18" :minlength="6"></el-input>
          </el-form-item>
          <el-form-item label="密码确认" prop="password2">
            <el-input type="password" v-model="psw.password2"
                      placeholder="请再次输入新密码" :maxlength="18" :minlength="6"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button @click="runModifyPsw = false">取消</el-button>
          <el-button type="primary" @click="modifyPsw('psw')">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import {pswValidator} from '../assets/js/api';

  export default {
    data() {
      let pswValidate = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'));
        } else if (value.length > 18) {
          callback(new Error('密码不能大于18位'));
        } else if (!pswValidator(value)) {
          callback(new Error("密码由英文字母、数字以及~!@#$%^&*=+/-组成"));
        } else {
          callback();
        }
      };
      return {
        isCollapse: false,
        collapseWidth: '200px',
        runModifyPsw: false,
        psw: {password: '', password1: '', password2: ''},
        imsiWarning: {},
        rules: {
          password1: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {validator: pswValidate, trigger: "change,blur"}
          ], password2: [
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {validator: pswValidate, trigger: "change,blur"}
          ], password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      //菜单激活回调
      handleActive(index, indexPath) {
        sessionStorage.removeItem("deviceTab");
        sessionStorage.removeItem("query");
        sessionStorage.removeItem("activeName");
        sessionStorage.removeItem("cTime");
      },
      //退出
      loginOut() {
        this.$confirm('确认退出系统吗?', '提示', {type: 'info'}).then(() => {
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("button");
          sessionStorage.removeItem("menu");
          sessionStorage.removeItem("deviceTab");
          sessionStorage.removeItem("query");
          sessionStorage.removeItem("activeName");
          sessionStorage.removeItem("cTime");
          sessionStorage.removeItem("link");
          this.$router.push("/login");
        }).catch(() => {
        });
      },
      //修改密码
      modifyPsw(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post('/manager/user/updatePwdByOldPwd', {
              userId: this.userId,
              oldPwd: md5(this.psw.password),
              newPwd: md5(this.psw.password2)
            }, '修改成功');
            this.runModifyPsw = false;
          }
        });
      },
    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bar {
    width: 50%;
    display: inline-block;
  }

  .main-container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    min-width: 1280px;
    margin-left: -8px;
  }

  .item {
    display: inline-block;
    cursor: pointer;
    width: 80px;
    height: 60px;
    padding: 0;
    margin: 0;
    color: #fff;
    background: transparent;
    font-size: 14px;
    vertical-align: middle;
    border: none;
    border-radius: 0;
  }

  .item:hover, .item:active {
    background: #021446;
  }

  .item i {
    display: block;
    margin-top: 3px;
  }
</style>

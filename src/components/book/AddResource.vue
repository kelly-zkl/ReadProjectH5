<template>
  <div>
    <section>
      <el-form :model="book" align="left" label-position="left" label-width="80px">
        <el-row style="background: #F2F2F2">
          <el-col :span="8" align="left">
            <div style="font-size:14px;padding:10px 20px">资源信息</div>
          </el-col>
        </el-row>
        <div class="add-appdiv" style="border-top: none;border-radius: 0 0 4px 4px">
          <el-form-item label="ISBN">
            <el-input v-model="book.isbn" :maxlength=30 placeholder="书名/系列名"></el-input>
          </el-form-item>
        </div>
        <el-row style="background: #F2F2F2">
          <el-col :span="8" align="left">
            <div style="font-size:14px;padding:10px 20px">添加资源</div>
          </el-col>
        </el-row>
        <div class="add-appdiv" style="border-top: none;border-radius: 0 0 4px 4px;padding-top: 0">
          <el-row>
            <el-col :span="8" align="left">
              <el-button type="text">删除</el-button>
            </el-col>
            <el-col :span="8" :offset="8" align="right">
              <el-button type="text">增加一页</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div align="center">
        <el-button type="primary" @click="">确认</el-button>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        book: {}
      }
    },
    methods: {},
    mounted() {
    }
  }
</script>

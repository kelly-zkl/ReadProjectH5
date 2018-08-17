<template>
  <div>
    <section>
      <el-form :inline="true" :model="query" align="left" style="margin-bottom: 10px">
        <el-row>
          <el-col :span="16" align="left">
            <el-form-item style="margin-bottom: 10px">
              <el-input v-model="query.name" size="medium" :maxlength=30 placeholder="标签名称"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 10px">
              <el-button type="primary" size="medium" @click="getData()">搜索</el-button>
            </el-form-item>
            <el-form-item style="margin-bottom: 10px">
              <el-button type="text" @click="clearData()">重置</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8" align="right">
            <el-form-item style="margin-bottom: 10px">
              <el-button type="primary" size="medium" @click="runAddTag = true">添加标签</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="tagList" v-loading="listLoading" class="center-block" stripe>
        <el-table-column type="selection" width="45" align="left"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="65"></el-table-column>
        <el-table-column align="left" prop="deviceName" label="标签" :formatter="formatValue"></el-table-column>
        <el-table-column align="left" prop="ISBN" label="状态" :formatter="formatValue"></el-table-column>
        <el-table-column align="left" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="">启用</el-button>
            <el-button type="text" @click="">修改</el-button>
            <el-button type="text" @click="">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top: 20px" align="right">
        <el-pagination
          @size-change="handleSizeChange" @current-change="pageChange" :current-page="query.page" background
          :page-sizes="[10, 15, 20, 30]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper"
          :total="count"></el-pagination>
      </div>
      <!--添加标签-->
      <el-dialog title="添加标签" :visible.sync="runAddTag" center width="500px">
        <el-input v-model="tagName" size="medium" :maxlength=30 placeholder="标签名称"></el-input>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button type="primary" @click="runAddTag = false">确认</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        listLoading: false,
        runAddTag: false,
        query: {page: 1, size: 10},
        tagList: [],
        count: 0,
        tagName: ''
      }
    },
    methods: {
      clearData() {
        this.query = {page: 1, size: 10};
        this.getData();
      },
      handleSizeChange(val) {
        this.query.size = val;
        this.getData();
      },
      pageChange(val) {
        this.query.page = val;
        this.getData();
      },
      getData() {

      },
      formatValue(row, column) {
        if (column.property === 'groupId') {
          return row[column.property];
        } else {
          return row[column.property] && row[column.property] !== "null" ? row[column.property] : '--';
        }
      }
    },
    mounted() {
      this.tagList = [{}, {}]
    }
  }
</script>

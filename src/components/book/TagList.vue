<template>
  <div>
    <section>
      <el-row :gutter="20">
        <el-col :span="6" style="border:1px #f2f2f2 solid;padding: 0">
          <div>
            <el-button type="primary" size="mini" style="width: 100%;border-radius: 0"
                       @click="runAddClass=true;">添加分类
            </el-button>
          </div>
          <div v-for="(item,idx) in [1,2,3,4,5,6]" v-bind:class="indx==idx?'tag select':'tag'"
               @click="handleSelectItem(idx)">分类A{{item}}
          </div>
        </el-col>
        <el-col :span="18">
          <el-form :inline="true" :model="query" align="left" style="margin-bottom: 10px">
            <el-row>
              <el-col :span="16" align="left">
                <el-form-item style="margin-bottom: 10px">
                  <el-button type="text">停用分类</el-button>
                </el-form-item>
                <el-form-item style="margin-bottom: 10px">
                  <el-button type="text">修改分类</el-button>
                </el-form-item>
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
        </el-col>
      </el-row>
      <!--添加分类-->
      <el-dialog title="添加分类" :visible.sync="runAddClass" center width="500px">
        <el-input v-model="className" size="medium" :maxlength=30 placeholder="分类名称"></el-input>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button type="primary" @click="addClass()">确认添加</el-button>
        </div>
      </el-dialog>
      <!--添加标签-->
      <el-dialog title="添加标签" :visible.sync="runAddTag" center width="500px">
        <el-input v-model="tagName" size="medium" :maxlength=30 placeholder="标签名称"></el-input>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button type="primary" @click="addTag()">确认添加</el-button>
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
        runAddClass: false,
        className: '',
        query: {page: 1, size: 10},
        tagList: [],
        count: 0,
        tagName: '',
        indx: 0
      }
    },
    methods: {
      //添加标签
      addTag() {
        this.runAddTag = false;
      },
      //添加分类
      addClass() {
        this.runAddClass = false;
      },
      handleSelectItem(val) {
        this.indx = val;
      },
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
<style scoped>
  .tag {
    height: 56px;
    line-height: 56px;
    background: #E4E4E4;
    cursor: pointer;
    border-top: 1px #fff solid;
  }

  .tag.select, .tag:hover, .tag:active {
    background: #fff;
    border-left: 5px #6699FF solid;
  }
</style>

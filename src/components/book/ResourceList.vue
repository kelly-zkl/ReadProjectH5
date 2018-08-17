<template>
  <div>
    <section>
      <el-form :inline="true" :model="query" align="left" style="margin-bottom: 10px">
        <el-row>
          <el-col :span="16" align="left">
            <el-form-item style="margin-bottom: 10px">
              <el-input v-model="query.name" size="medium" :maxlength=30 placeholder="资源编号/ISBN"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 10px" label="所属运营商">
              <el-select v-model="query.operator" placeholder="所属运营商" size="medium">
                <el-option v-for="item in operators" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
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
              <el-button type="primary" size="medium" @click="getData()" :disabled="sels.length==0">批量删除</el-button>
            </el-form-item>
            <el-form-item style="margin-bottom: 10px">
              <el-button type="primary" size="medium" @click="clearData()" :disabled="sels.length==0">批量录入</el-button>
            </el-form-item>
            <el-form-item style="margin-bottom: 10px">
              <el-button type="primary" size="medium" @click="addResource()">添加资源</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="resourceList" v-loading="listLoading" class="center-block" @selection-change="selsChange" stripe>
        <el-table-column type="selection" width="45" align="left"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="65"></el-table-column>
        <el-table-column align="left" prop="deviceName" label="资源编号" min-width="150" max-width="250"
                         :formatter="formatValue"></el-table-column>
        <el-table-column align="left" prop="ISBN" label="ISBN" min-width="150" max-width="250"
                         :formatter="formatValue"></el-table-column>
        <el-table-column align="left" prop="serviceCode" label="播放次数" min-width="150" max-width="200"
                         :formatter="formatValue"></el-table-column>
        <el-table-column align="left" prop="deviceTypeVal" label="图片页数" min-width="150" max-width="250"
                         :formatter="formatValue"></el-table-column>
        <el-table-column align="left" prop="deviceFormVal" label="中文音频" min-width="150" max-width="250"
                         :formatter="formatValue"></el-table-column>
        <el-table-column align="left" prop="userName" label="英文音频" min-width="150" max-width="250"
                         :formatter="formatValue"></el-table-column>
        <el-table-column align="left" prop="lineStatus" label="所属运营商" min-width="150" max-width="250"
                         :formatter="formatValue"></el-table-column>
        <el-table-column align="left" label="操作" width="180">
          <template slot-scope="scope">
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
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        listLoading: false,
        query: {page: 1, size: 10},
        resourceList: [],
        operators: [{value: '', label: '全部运营商'}, {value: 'a', label: 'A'}, {value: 'b', label: 'B'}],
        sels: [],
        count: 0
      }
    },
    methods: {
      selsChange(val) {
        this.sels = val;
      },
      //跳转添加资源页面
      addResource() {
        this.$router.push('/addResource')
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
      this.resourceList = [{}, {}]
    }
  }
</script>

<template>
  <div>
    <section>
      <el-row>
        <el-col :span="18" align="left">
          <el-tabs v-model="activeItem" @tab-click="handleType">
            <el-tab-pane label="已发布" name="release"></el-tab-pane>
            <el-tab-pane label="未发布" name="unrelease"></el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="6" align="right">
          <el-button type="primary" size="medium" @click="addBook()">添加绘本</el-button>
        </el-col>
      </el-row>
      <el-form :inline="true" :model="query" align="left">
        <el-form-item style="margin-bottom: 10px" label="搜索">
          <el-input v-model="query.bookName" size="medium" :maxlength=30 placeholder="书名/系列名"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 10px" label="所属运营商">
          <el-select v-model="query.operator" placeholder="所属运营商" size="medium">
            <el-option v-for="item in operators" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 10px;margin-left: 50px">
          <el-button type="text" @click="isShow=!isShow">{{isShow ? '收起' : '展开'}}</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 10px">
          <el-button type="primary" size="medium" @click="getData()">搜索</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 10px">
          <el-button type="text" @click="clearData()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="query" label-position="left" label-width="80px" v-show="isShow">
        <el-form-item label="内容" style="margin-bottom: 10px" align="left">
          <el-checkbox-group v-model="query.content" size="medium">
            <el-checkbox-button v-for="item in contentTypes" :label="item.value" :key="item.value">{{item.label}}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="年龄" style="margin-bottom: 10px" align="left">
          <el-checkbox-group v-model="query.age" size="medium">
            <el-checkbox-button v-for="item in ages" :label="item.value" :key="item.value">{{item.label}}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="语种" style="margin-bottom: 10px" align="left">
          <el-checkbox-group v-model="query.language" size="medium">
            <el-checkbox-button v-for="item in languages" :label="item.value" :key="item.value">{{item.label}}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="性别" style="margin-bottom: 10px" align="left">
          <el-checkbox-group v-model="query.sex" size="medium">
            <el-checkbox-button v-for="item in sexes" :label="item.value" :key="item.value">{{item.label}}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="推荐" style="margin-bottom: 10px" align="left">
          <el-checkbox-group v-model="query.recommend" size="medium">
            <el-checkbox-button v-for="item in recommends" :label="item.value" :key="item.value">{{item.label}}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <el-row style="margin: 10px 0">
        <el-col :span="18" align="left">
          <el-button type="primary" size="medium" @click="" :disabled="sels.length==0">取消精选</el-button>
          <el-button type="primary" size="medium" @click="" :disabled="sels.length==0">设为精选</el-button>
          <el-button type="primary" size="medium" @click="" v-show="activeItem=='release'"
                     :disabled="sels.length==0">取消首推
          </el-button>
          <el-button type="primary" size="medium" @click="" v-show="activeItem=='release'"
                     :disabled="sels.length==0">设为首推
          </el-button>
          <el-button type="primary" size="medium" @click="" v-show="activeItem=='release'"
                     :disabled="sels.length==0">取消发布
          </el-button>
          <el-button type="primary" size="medium" @click="" v-show="activeItem=='unrelease'"
                     :disabled="sels.length==0">发布
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="bookList" v-loading="listLoading" class="center-block" @selection-change="selsChange" stripe>
        <el-table-column type="selection" width="45" align="left"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="65"></el-table-column>
        <el-table-column align="left" prop="ISBN" label="ISBN" min-width="150" max-width="250"
                         :formatter="formatValue"></el-table-column>
        <el-table-column align="left" prop="deviceName" label="封面" width="150"
                         :formatter="formatValue">
          <template slot-scope="scope">
            <img src="../../assets/img/icon_book1.png" style="width: 120px"/>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="serviceCode" label="书名" min-width="150" max-width="200"
                         :formatter="formatValue"></el-table-column>
        <el-table-column align="left" prop="deviceTypeVal" label="丛书名" min-width="150" max-width="250"
                         :formatter="formatValue"></el-table-column>
        <el-table-column align="left" prop="deviceFormVal" label="上传时间" width="170"
                         :formatter="formatValue"></el-table-column>
        <el-table-column align="left" prop="userName" label="上传用户" min-width="130" max-width="180"
                         :formatter="formatValue"></el-table-column>
        <el-table-column align="left" prop="groupId" label="状态" width="120"
                         :formatter="formatValue"></el-table-column>
        <el-table-column align="left" prop="lineStatus" label="推荐" width="120"></el-table-column>
        <el-table-column align="left" prop="lineStatus" label="所属运营商" min-width="120"
                         max-width="150" :formatter="formatValue"></el-table-column>
        <el-table-column align="left" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="" v-show="activeItem=='release'">取消发布</el-button>
            <el-button type="text" @click="" v-show="activeItem=='unrelease'">发布</el-button>
            <el-button type="text" @click="">修改</el-button>
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
        isShow: false,
        activeItem: 'release',
        bookList: [],
        query: {page: 1, size: 10, content: [], age: [], language: [], sex: [], recommend: []},
        operators: [{value: '', label: '全部运营商'}, {value: 'a', label: 'A'}, {value: 'b', label: 'B'}],
        contentTypes: [{value: 'tale', label: '童话'}, {value: 'cartoon', label: '卡通动漫'},
          {value: 'art', label: '艺术'}, {value: 'fable', label: '寓言'}, {value: 'rhymes', label: '童谣'},
          {value: 'toy', label: '玩具书'}, {value: 'wikipedia', label: '百科'}, {value: 'literature', label: '文学'}],
        ages: [{value: '0', label: '0-2岁'}, {value: '1', label: '3-6岁'}, {value: '2', label: '7-10岁'},
          {value: '3', label: '11-14岁'}, {value: '4', label: '15岁以上'}],
        languages: [{value: 'zh', label: '中文'}, {value: 'en', label: '英文'}],
        sexes: [{value: 'male', label: '男'}, {value: 'female', label: '女'}],
        recommends: [{value: 'select', label: '精选'}, {value: 'first', label: '首推'}],
        count: 0,
        sels: []
      }
    },
    methods: {
      selsChange(val) {
        this.sels = val;
      },
      handleType(val) {

      },
      //跳转添加绘本页面
      addBook() {
        this.$router.push('/addBook')
      },
      clearData() {
        this.query = {page: 1, size: 10, content: [], age: [], language: [], sex: [], recommend: []};
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
        this.listLoading = true;

        this.$post(2, "book/query", {page: 1, size: 10}).then((data) => {
          this.bookList = data.data.content;
          this.count = data.data.count;
          setTimeout(() => {
            this.listLoading = false;
          }, 500);
        }).catch((err) => {
          this.listLoading = false;
          this.bookList = [];
          this.$message.error(err);
        });
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
      this.getData();
    }
  }
</script>

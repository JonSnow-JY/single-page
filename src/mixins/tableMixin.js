export default {
  data() {
    return {
      // 总数
      total: 0,
      // 当前页码数
      currentPage: 1,
      // 一页多少条
      pageSize: 10,
      // 数据
      tableData: [],
      // 存储搜索栏中的数据
      searchObj: {},
      // 内容区域loading
      loading: false,
      // 整体的loading
      containerLoading: false,
      // 直接拉取列表数据
      loadDataDirectory: true,
      // 第一次加载列表数据
      firstLoad: true,
      // 是否为分页的列表
      isPageData: true,
      // 动态控制loading：设置为true的时候，需要配合closeLoading方法同时使用
      dynamicLoadingFlag: false,
    };
  },
  async mounted() {
    await this.$nextTick();
    this.loadDataDirectory && this.getTableData();
  },
  methods: {
    /**
     * 手动重置table
     */
    resetTable() {
      this.firstLoad = true;
      this.total = 0;
      this.currentPage = 1;
      this.pageSize = 10;
      this.tableData = [];
    },
    /**
     * 拉取上一页的数据，单个删除使用
     */
    backPrePageWhenDelOne() {
      if (this.tableData.length === 1 && this.currentPage !== 1) {
        this.currentPage -= 1;
      }
    },
    /**
     * 拉取上一页的数据，批量删除使用
     */
    backPrePageWhenDelMany() {
      if (
        this.tableData.length === this.multipleSelection.length &&
        this.currentPage !== 1
      ) {
        this.currentPage -= 1;
      }
    },
    /**
     * 分页器的点击事件
     * @return {Number} 一页多少条数据
     */
    handleSizeChange(val) {
      // 返回第一页
      this.currentPage = 1;
      this.pageSize = val;
      this.getTableData();
    },
    /**
     * 切换页码的点击事件
     * @param  {Number} val 当前点击的页码
     */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    /**
     * 格式化提交的参数
     */
    postDataFormat() {
      const tempObj = this.searchObjFormat
        ? this.searchObjFormat()
        : this.searchObj;
      // 清空没有值的字段
      return this.$clearEmptyObjAttritube(tempObj);
    },
    /**
     * 获取列表数据
     * @param  {Object}  obj  分页之外的其他参数
     */
    // async otherSyncMethod1() {
    //   const data = await DictKeys('field_default_type')
    //   return data
    // },
    // async otherSyncMethod2() {
    //   const data = await DictKeys('parameter_format')
    //   return data
    // },
    // async otherSyncMethod() {
    //   return [
    //     await this.otherSyncMethod1(),
    //     await this.otherSyncMethod2(),
    //   ]
    // },
    async getTableData() {
      if (!this.getTableListSyncMethod) return false;
      try {
        // 使用了布局模板
        if (this.$refs.containerTable) {
          if (this.firstLoad && this.dynamicLoadingFlag) {
            this.$refs.containerTable.wrapperLoading = true;
          } else {
            this.$refs.containerTable.loading = true;
          }
        } else {
          if (this.firstLoad) {
            this.containerLoading = true;
          } else {
            this.loading = true;
          }
        }
        // table初始化之前需要执行的异步方法(一般会用来设置header中from的默认搜索条件)
        if (this.firstLoad && this.loadTableInitDataBySyncMethod) {
          await this.loadTableInitDataBySyncMethod();
        }
        // 判断是否进行额外接口处理
        const hasOtherSyncMethod = this.firstLoad && this.otherSyncMethod;
        const [tableList, ...otherData] = await Promise.all([
          this.getTableList(),
          ...[hasOtherSyncMethod && this.otherSyncMethod()],
        ]);
        // 进行额外接口数据处理
        if (hasOtherSyncMethod) {
          this.otherSyncDataFormat(otherData);
        }
        if (tableList) {
          const { records, total, ...restParams } = tableList;
          if (this.isPageData) {
            // 分页数据
            // 格式化后台返回的数据，有些不需要格式化，直接赋值
            this.tableData = this.tableDataFormat
              ? this.tableDataFormat(records)
              : records;
            this.total = total;
          } else {
            // 不分页数据
            this.tableData = this.tableDataFormat
              ? this.tableDataFormat(tableList)
              : tableList;
            await this.$nextTick();
          }
          // 根据列表数据，做其他操作
          this.otherDataOperation &&
            this.otherDataOperation({ arr: this.tableData, restParams });
          this.tempRefreshKey && (this.tempRefreshKey = Date.now());
        }
      } catch (e) {
        console.log(e);
        // 接口报错的额外处理
        this.handleError && this.handleError();
      } finally {
        if (this.$refs.containerTable) {
          if (this.firstLoad && this.dynamicLoadingFlag) {
            this.$refs.containerTable.wrapperLoading = false;
          } else {
            this.$refs.containerTable.loading = false;
          }
        } else {
          if (this.firstLoad) {
            this.containerLoading = false;
          } else {
            this.loading = false;
          }
        }
        this.firstLoad = false;
      }
    },
    /**
     * 获取列表数据
     */
    async getTableList() {
      try {
        const data = await this.getTableListSyncMethod({
          ...(this.isPageData && {
            current: this.currentPage,
            size: this.pageSize,
          }),
          ...this.postDataFormat(),
        });
        return data;
      } catch (e) {
        console.log(e.message);
      }
    },
    /**
     * 搜索
     */
    doSearch(obj = {}) {
      let objs = obj;
      // 返回第一页
      this.currentPage = 1;
      objs && (this.searchObj = objs);
      this.getTableData();
    },
    /**
     * 顶栏重置、新增(很奇怪的交互)
     */
    doReset() {
      this.currentPage = 1;
      this.searchObj = {};
      this.getTableData();
    },
    /**
     * 新增、编辑成功的回调
     */
    addOrEditSuccess() {
      if (this.currentId) {
        // 编辑回调
        this.doSearch();
      } else {
        // 新增回调
        this.$refs.pageHeader.doReset();
      }
    },
  },
};

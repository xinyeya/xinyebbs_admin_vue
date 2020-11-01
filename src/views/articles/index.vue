<template>
    <el-card>
        <el-row style="margin-bottom: 15px;">
            <el-col>
                <div>
                    <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题"
                    width="240">
            </el-table-column>
            <el-table-column
                    prop="create_time"
                    label="时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="look_num"
                    label="阅读量"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="content_num"
                    label="评论量"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="100">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.status==1">已发布</el-tag>
                        <el-tag type="info" v-if="scope.row.status==0">草稿文</el-tag>
                    </template>
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="handleStatus(scope.row)" size="small">状态</el-button>
                    <el-button type="warning" @click="handleEdit(scope.row.id)" size="small">编辑</el-button>
                    <el-button type="danger" @click="handleDelete(scope.row.id)" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" style="margin-top: 15px">
            <el-pagination
                background
                :page-size="5"
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :total="total">
            </el-pagination>
        </el-row>
    </el-card>
</template>

<script>
    import {delArticle, editStatus, getAllData, getSearchData} from "../../api/article";
    export default {
        name: "index",
        data() {
            return {
                search: '',
                tableData: [],
                total: 0
            }
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取全部数据
            async getData(page=0) {
                try {
                    let {code, msg, data} = await getAllData(page);
                    if (code === 200) {
                        this.tableData = data.data;
                        this.total = data.count;
                    }else{
                        this.$notify({
                            title: '警告',
                            type: 'warning',
                            message: msg
                        });
                    }
                }catch (e) {
                    this.$notify.error({
                        title: '错误',
                        message: '客户端错误'
                    });
                }
            },

            // 修改文章
            handleEdit(id) {
                this.$router.push({name:'index',params:{aid: id}});
                console.log(id)
            },

            // 删除文章
            handleDelete(id) {
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        let {code, msg} = await delArticle(id);
                        if (code === 200) {
                            this.getData();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$notify({
                                title: '警告',
                                type: 'warning',
                                message: msg
                            });
                        }
                    } catch (e) {
                        this.$notify.error({
                            title: '错误',
                            message: '客户端错误'
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            // 修改状态
            async handleStatus(row) {
                try {
                    let {id, status} = row;
                    if (status === 0) {
                        status = 1
                    }else{
                        status = 0
                    }
                    let {code, msg} = await editStatus(id, status);
                    if (code === 200) {
                        this.getData();
                    }else{
                        this.$notify({
                            title: '警告',
                            type: 'warning',
                            message: msg
                        });
                    }
                }catch (e) {
                    this.$notify.error({
                        title: '错误',
                        message: '客户端错误'
                    });
                }
            },

            // 改变页
            handleCurrentChange(val) {
                this.getData(val-1);
            },

            // 搜索文章
            async handleSearch() {
                try {
                    let {code, msg, data} = await getSearchData(this.search, this.total=0);
                    if (code === 200) {
                        this.tableData = data.data;
                        this.total = data.count;
                    }else{
                        this.$notify({
                            title: '警告',
                            type: 'warning',
                            message: msg
                        })
                    }
                }catch (e) {
                    this.$notify.error({
                        title: '错误',
                        message: '客户端错误'
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
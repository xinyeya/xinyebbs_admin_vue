<template>
    <el-card>
        <el-row style="margin-bottom: 15px">
            <el-input placeholder="请输入留言人名称" v-model="search" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
        </el-row>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" @click="handleDel(scope.row.id)">删除留言</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" style="margin-top: 15px">
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="5"
                @current-change="handleCurrentChange"
                :total="total">
            </el-pagination>
        </el-row>
    </el-card>
</template>

<script>
    import {getAllContent, getSearch, removeContent} from "@/api/content";

    export default {
        name: "index",
        data() {
            return {
                search: "",
                tableData: [],
                total: 0
            }
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取数据
            async getData(page=0) {
                try {
                    let {code, msg, data} = await getAllContent(page);
                    if (code === 200) {
                        this.tableData = data.data;
                        this.total = data.count;
                    }else{
                        this.$notify({
                            type: "warning",
                            title: "警告",
                            message: msg
                        })
                    }
                }catch (e) {
                    this.$notify.error({
                        title: "错误",
                        message: "客户端错误"
                    })
                }
            },

            // 搜索数据
            async handleSearch() {
                try {
                    if (this.search === "") {
                        this.getData();
                        return;
                    }
                    let {code, msg, data} = await getSearch(this.search);
                    if (code === 200) {
                        this.tableData = data;
                    }else{
                        this.$notify({
                            type: "warning",
                            title: "警告",
                            message: msg
                        })
                    }
                } catch (e) {
                    this.$notify.error({
                        title: "错误",
                        message: "客户端错误"
                    })
                }
            },

            // 删除
            handleDel(id) {
                this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        let {code, msg} = await removeContent(id);
                        if (code === 200) {
                            this.getData();
                            this.$notify({
                                type: 'success',
                                title: '成功',
                                message: msg
                            });
                        }else{
                            this.$notify({
                                type: 'warning',
                                title: '警告',
                                message: msg
                            });
                        }
                    }catch (e) {
                        this.$notify.error({
                            title: "错误",
                            message: "客户端错误"
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            // 翻页
            handleCurrentChange(val) {
                this.getData(val-1);
            },
        }
    }
</script>

<style scoped>

</style>
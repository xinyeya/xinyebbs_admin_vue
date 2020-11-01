<template>
    <div>
        <el-card>
            <el-row style="margin-bottom: 15px" type="flex" justify="space-between">
                <el-col :span="5">
                    <el-button type="primary" @click="handleAdd">添加友链</el-button>
                </el-col>
                <el-col :span="10">
                    <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
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
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="link"
                        label="链接">
                </el-table-column>
                <el-table-column
                        width="200"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="margin-top: 15px" type="flex" justify="end">
                <el-pagination
                        background
                        :page-size="5"
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="total">
                </el-pagination>
            </el-row>
        </el-card>
        <el-dialog title="友情链接" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="网站标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="网站链接" prop="link">
                    <el-input v-model="ruleForm.link"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getAllLink, getFindLink,
        getSearchLink,
        removeLink,
        setInsertLink,
        setUpdateLink
    } from "../../api/friend_link";

    export default {
        name: "index",
        data() {
            return {
                search: "",
                tableData: [],
                dialogFormVisible: false,
                ruleForm: {
                    title: "",
                    link: ""
                },
                rules: {
                    title: [
                        { required: true, message: '请输入网站标题', trigger: 'blur' }
                    ],
                    link: [
                        { required: true, message: '请输入网站链接', trigger: 'blur' }
                    ]
                },
                total: 0,
                update: false,
                id: null
            }
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取数据
            async getData(page=0) {
                try {
                    let {code, msg, data} = await getAllLink(page);
                    if (code === 200) {
                        this.tableData = data.data;
                        this.total = data.count;
                    }else{
                        this.$notify({
                            type: "warning",
                            title: "警告",
                            message: msg
                        });
                    }
                }catch (e) {
                    this.$notify.error({
                        title: "错误",
                        message: "客户端错误"
                    });
                }
            },

            //修改链接
            async handleEdit(id) {
                try {
                    this.id = id;
                    this.update = true;
                    let {code, msg, data} = await getFindLink(id);
                    if (code === 200) {
                        this.ruleForm = data;
                    }else{
                        this.$notify({
                            type: "warning",
                            title: "警告",
                            message: msg
                        })
                    }
                    this.dialogFormVisible = true;
                }catch (e) {
                    this.$notify.error({
                        title: "错误",
                        message: "客户端错误"
                    })
                }
            },

            // 搜索链接
            async handleSearch() {
                if (this.search !== "") {
                    try {
                        let {code, msg, data} = await getSearchLink(this.search);
                        if (code === 200) {
                            this.tableData = data;
                            this.$notify({
                                type: "success",
                                title: "成功",
                                message: msg
                            });
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
                        });
                    }
                }else{
                    this.getData();
                }
            },

            //删除链接
            handleDelete(id) {
                this.$confirm('此操作将永久删除该链接, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        let {code, msg} = await removeLink(id);
                        if (code === 200) {
                            this.getData();
                            this.$notify({
                                type: "success",
                                title: "成功",
                                message: msg
                            });
                        }else{
                            this.$notify({
                                type: "warning",
                                title: "警告",
                                message: msg
                            });
                        }
                    }catch (e) {
                        this.$notify.error({
                            title: "错误",
                            message: "客户端错误"
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //验证表单
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        try {
                            if (this.update) {
                                let {code, msg} = await setUpdateLink(this.id, this.ruleForm);
                                if (code === 200) {
                                    this.$notify({
                                        type: "success",
                                        title: "成功",
                                        message: msg
                                    });
                                }else{
                                    this.$notify({
                                        type: "warning",
                                        title: "警告",
                                        message: msg
                                    });
                                }
                            }else{
                                let {code, msg} = await setInsertLink(this.ruleForm);
                                if (code === 200) {
                                    this.$notify({
                                        type: "success",
                                        title: "成功",
                                        message: msg
                                    });
                                }else{
                                    this.$notify({
                                        type: "warning",
                                        title: "警告",
                                        message: msg
                                    });
                                }
                            }
                        }catch (e) {
                            this.$notify.error({
                                title: "警告",
                                message: "客户端错误"
                            });
                        }
                        this.getData();
                        this.dialogFormVisible = false;
                    } else {
                        return false;
                    }
                });
            },
            //重置表单
            resetForm(formName) {
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
            },
            // 添加友链
            handleAdd() {
                this.ruleForm = {};
                this.dialogFormVisible = true;
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
<template>
    <div>
        <el-card>
            <el-row style="margin-bottom: 15px" type="flex" justify="space-between">
                <el-col :span="4">
                    <el-button type="primary" @click="handleAddClassify">添加分类</el-button>
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
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="desc"
                        label="描述"
                        width="570">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button
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
        <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="分类标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="分类描述" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
        getAllData,
        getSearchData,
        getFindSearch,
        removeClassify,
        insertClassify,
        updateClassify
    } from '@/api/classify'
    export default {
        name: "classify",
        data() {
            return {
                search: "",
                tableData: [],
                dialogFormVisible: false,
                ruleForm: {
                    title: '',
                    desc: ''
                },
                rules: {
                    title: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                },
                total: 0,
                update: false,
                update_id: null
            }
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取数据
            async getData(page=0) {
                try {
                    let {code, msg, data} = await getAllData(page);
                    if (code === 200) {
                        this.tableData = data.data;
                        this.total = data.count;
                    }else{
                        this.$notify({
                            type: "警告",
                            title: "warning",
                            message: msg
                        })
                    }
                }catch(e) {
                    this.$notify.error({
                        type: "警告",
                        message: "客户端错误"
                    });
                }
            },

            // 搜索分类
            async handleSearch() {
                try {
                    if (this.search === "") {
                        this.getData();
                        return;
                    }
                    let {code, msg, data} = await getSearchData(this.search);
                    if (code === 200) {
                        this.tableData = data;
                    }else{
                        this.$notify({
                            title: "警告",
                            type: "warning",
                            message: msg
                        })
                    }
                }catch(e) {
                    this.$notify.error({
                        title: "警告",
                        message: "客户端错误"
                    })
                }
            },

            // 修改分类
            async handleEdit(id) {
                try {
                    let {code, msg, data} = await getFindSearch(id);
                    if (code === 200) {
                        this.ruleForm = data;
                        this.update_id = id;
                        this.update = true;
                    }else{
                        this.$notify({
                            title: "警告",
                            type: "warning",
                            message: msg
                        })
                    }
                    this.dialogFormVisible = true;
                } catch(e) {
                    this.$notify.error({
                        title: "错误",
                        message: "客户端错误"
                    })
                }
            },

            //删除分类
            handleDelete(id) {
                this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let {code, msg} = await removeClassify(id);
                    if (code === 200) {
                        this.$notify({
                            title: "成功",
                            type: 'success',
                            message: msg
                        });
                        this.getData();
                    }else{
                        this.$notify({
                            title: "警告",
                            type: 'warning',
                            message: msg
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            // 添加分类
            handleAddClassify() {
                this.dialogFormVisible = true;
                this.ruleForm = {};
                this.update = false;
            },

            // 提交表单
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (this.update) {
                            let {code, msg} = await updateClassify(this.update_id, this.ruleForm);
                            if (code === 200) {
                                this.$notify({
                                    type: "success",
                                    title: "成功",
                                    message: msg
                                })
                            }else{
                                this.$notify({
                                    type: "warning",
                                    title: "警告",
                                    message: msg
                                })
                            }
                        }else{
                            let {code, msg} = await insertClassify(this.ruleForm);
                            if (code === 200) {
                                this.$notify({
                                    type: "success",
                                    title: "成功",
                                    message: msg
                                })
                            }else{
                                this.$notify({
                                    type: "warning",
                                    title: "警告",
                                    message: msg
                                })
                            }
                        }
                        this.getData();
                        this.dialogFormVisible = false;
                        this.$refs[formName].resetFields();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 重置分类表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
            },

            // 改变页
            handleCurrentChange(val) {
                this.getData(val-1);
            },
        }
    }
</script>

<style scoped>

</style>
<template>
    <div>
        <el-card>
            <el-row type="flex" justify="space-between" style="margin-bottom: 15px;">
                <el-col :span="5">
                    <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                </el-col>
                <el-col :span="10">
                    <el-input placeholder="请输入标题" v-model="search" class="input-with-select">
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
                        prop="image"
                        label="封面">
                    <template slot-scope="scope">
                        <img :src="scope.row.image" height="40px" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="author"
                        label="作者">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="handleEdit(scope.row.id)">修改</el-button>
                        <el-button type="danger" @click="handleDel(scope.row.id)">删除</el-button>
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

        <el-dialog title="音乐" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="image">
                <el-upload
                        :headers="headers"
                        name="music_image"
                        class="avatar-uploader"
                        action="http://www.xinyejs.com/admin/v1.0/music/image_file"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                    <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="文件" prop="file_path">
                <el-upload
                        class="upload-demo"
                        name="music_file"
                        :headers="headers"
                        action="http://www.xinyejs.com/admin/v1.0/music/music_file"
                        :show-file-list="false"
                        :on-success="handleMusicFile">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div v-if="this.ruleForm.file_path">{{file_name}}</div>
                    <div slot="tip" class="el-upload__tip">只能上传mp3/flac文件</div>
                </el-upload>
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
        getAllMusic, getFindMusic,
        getSearchMusic,
        removeMusic,
        setInsertMuisc,
        setUpdateMusic
    } from "../../api/music";
    import store from "../../store";

    export default {
        name: "index",
        data() {
            return {
                search: "",
                tableData: [],
                ruleForm: {
                    title: "",
                    author: "",
                    image: "",
                    file_path: ""
                },
                file_name: "",
                rules: {
                    title: [
                        {required: true, message: '请输入音乐标题', trigger: 'blur'},
                    ],
                    author: [
                        {required: true, message: '请输入作者名称', trigger: 'blur'},
                    ],
                    image: [
                        {required: true, message: '请上传音乐封面', trigger: 'blur'},
                    ],
                    file_path: [
                        {required: true, message: '请上传音乐文件', trigger: 'blur'},
                    ],
                },
                dialogFormVisible: false,
                total: 0,
                update: false,
                id: null,
            }
        },
        created() {
            this.getData();
        },

        computed: {
            headers () {
                return {
                    'tokenXinye': store.state.userinfo.token
                }
            }
        },

        methods: {
            // 获取数据
            async getData(page=0) {
                try {
                    let {code, msg, data} = await getAllMusic(page);
                    if (code === 200) {
                        this.tableData = data.data;
                        this.total = data.count
                    }else{
                        this.$notify({
                            type: "warning",
                            title: "警告",
                            message: msg
                        });
                    }
                } catch (e) {
                    this.$notify.error({
                        title: "错误",
                        message: "客户端错误"
                    })
                }
            },

            // 改变页数
            handleCurrentChange(val) {
                this.getData(val-1);
            },

            // 搜索音乐
            async handleSearch() {
                if (this.search === "") {
                    this.getData();
                    return;
                }
                let {code, msg, data} = await getSearchMusic(this.search);
                if (code === 200) {
                    this.tableData = data;
                    this.total = 0;
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
            },

            // 修改音乐
            async handleEdit(id) {
                try {
                    let {code, msg, data} = await getFindMusic(id);
                    if (code === 200) {
                        this.ruleForm = data;
                        this.id = id;
                        this.update = true;
                        this.dialogFormVisible = true
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

            // 删除音乐
            handleDel(id) {
                this.$confirm('此操作将永久删除该音乐, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        let {code, msg} = await removeMusic(id);
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
                    } catch (e) {
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

            // 验证音乐表单
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (this.update) {
                            let {code, msg} = await setUpdateMusic(this.id, this.ruleForm);
                            if (code === 200) {
                                this.getData();
                                this.$notify({
                                    type: "success",
                                    title: "成功",
                                    message: msg
                                });
                            }else{
                                this.$notify({
                                    type: "warining",
                                    title: "警告",
                                    message: msg
                                });
                            }
                        }else{
                            let {code, msg} = await setInsertMuisc(this.ruleForm);
                            if (code === 200) {
                                this.getData();
                                this.$notify({
                                    type: "success",
                                    title: "成功",
                                    message: msg
                                });
                            }else{
                                this.$notify({
                                    type: "warining",
                                    title: "警告",
                                    message: msg
                                });
                            }
                        }
                        this.resetForm('ruleForm');
                        this.dialogFormVisible = false;
                    } else {
                        return false;
                    }
                });
            },
            // 清空表单
            resetForm(formName) {
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
            },

            // 获取封面路径
            handleAvatarSuccess(res) {
                let {code, msg, data} = res;
                if (code === 200) {
                    this.ruleForm.image = data
                }else{
                    this.$notify({
                        type: "warning",
                        title: "警告",
                        message: msg
                    });
                }
            },

            // 获取音乐文件路径
            handleMusicFile(res, file) {
                let {code, msg, data} = res;
                if (code === 200) {
                    this.ruleForm.file_path = data;
                    this.file_name = file.name;
                    if (this.ruleForm.title === "") {
                        this.ruleForm.title = file.name.split('.')[0];
                    }
                }else{
                    this.$notify({
                        type: "warning",
                        title: "警告",
                        message: msg
                    });
                }
            },
        }
    }
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
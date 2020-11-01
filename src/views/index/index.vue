<template>
    <el-card>
        <el-row>
            <el-col>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="封面">
                        <el-upload
                                class="avatar-uploader"
                                method="post"
                                action="http://www.bbsxinye.com/admin/v1.0/article/upload"
                                :headers="headers"
                                :show-file-list="false"
                                name="image"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img crossorigin = "anonymous" v-if="ruleForm.image" :src="ruleForm.image" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" prop="desc">
                        <el-input v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="分类" prop="classify_id">
                        <el-select v-model="ruleForm.classify_id" placeholder="请选择分类" style="width: 100%">
                            <el-option
                                    v-for="item in classifyList"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标签" prop="labels">
                        <el-select
                                style="width: 100%"
                                v-model="ruleForm.labels"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择文章标签">
                            <el-option
                                    v-for="items in labelList"
                                    :key="items.id"
                                    :label="items.title"
                                    :value="items.title">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="content" style="height: 100vh">
                        <quill-editor
                          style="height: 80vh"
                          v-model="ruleForm.content"
                          ref="myQuillEditor">
                        </quill-editor>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">保存文章</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    import {findArticle, getAllClassify, insertArticle, update_article, getAllLabels} from "../../api/article";
    import store from "../../store";

    export default {
        name: "index",
        data(){
            return {
                ruleForm: {
                    image: '',
                    title: '',
                    desc: '',
                    classify_id: '',
                    labels: [],
                    content: ''
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                    ],
                    desc: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                    ],
                    classify_id: [
                        {required: true, message: '请选择分类', trigger: 'blur'},
                    ],
                    labels: [
                        {required: true, message: '请输入标签', trigger: 'blur'},
                    ],
                    content: [
                        {required: true, message: '请输入文章', trigger: 'blur'},
                    ]
                },
                classifyList: [],
                labelList: [],
            }
        },

        created() {
            this.getData();
            this.getClassify();
            this.getLabels();
        },

        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },

            headers () {
                return {
                    'token': store.state.userinfo.token
                }
            }
        },

        methods: {
            // 判断是否是编辑
            async getData() {
                if (this.$route.params.aid) {
                    let {code, msg, data} = await findArticle(this.$route.params.aid);
                    if (code === 200) {
                        this.ruleForm = data;
                        this.ruleForm.labels = data.labels.split("|");
                    }else{
                        this.$notify({
                            title: '警告',
                            type: 'warning',
                            message: msg
                        });
                    }
                }
            },

            // 获取分类的数据
            async getClassify() {
                try {
                    let {code, msg, data} = await getAllClassify();
                    if (code === 200) {
                        this.classifyList = data
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
                        message: "客户端错误"
                    });
                }
            },

            // 获取所有标签
            async getLabels() {
                try {
                    let {code, msg, data} = await getAllLabels();
                    if (code === 200) {
                        this.labelList = data;
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
                        message: "客户端错误"
                    });
                }
            },

            // 验证并提交表单
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        try {
                            this.ruleForm.labels = this.ruleForm.labels.join("|");
                            if (this.$route.params.aid) {
                                // 更新
                                let {code, msg} = await update_article(this.$route.params.aid, this.ruleForm);
                                if (code === 200) {
                                    this.$notify({
                                        title: '成功',
                                        message: msg,
                                        type: 'success'
                                    });
                                    this.resetForm(formName);
                                    this.$router.push({
                                        name: "articles"
                                    })
                                }else{
                                    this.$notify({
                                        title: '警告',
                                        message: msg,
                                        type: 'warning'
                                    });
                                }
                            }else{
                                // 添加
                                let {code, msg} = await insertArticle(this.ruleForm);
                                if (code === 200) {
                                    this.$notify({
                                        title: '成功',
                                        message: msg,
                                        type: 'success'
                                    });
                                    this.resetForm(formName);
                                    this.$router.push({
                                        name: "articles"
                                    })
                                }else{
                                    this.$notify({
                                        title: '警告',
                                        message: msg,
                                        type: 'warning'
                                    });
                                }
                            }
                        }catch(e) {
                            console.log(e)
                        }
                    } else {
                        return false;
                    }
                });
            },

            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            // 上传成功预览图片
            handleAvatarSuccess(res) {
                let {code, msg, data} = res;
                if (code === 200) {
                    this.ruleForm.image = data;
                }else{
                    this.$notify({
                        title: '警告',
                        type: 'warning',
                        message: msg
                    });
                }
            },
            // 验证图片大和文件格式
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                    this.$message.error('上传封面图片大小不能超过 10MB!');
                }

                return isLt2M;
            }
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
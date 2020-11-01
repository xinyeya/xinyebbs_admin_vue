<template>
    <el-row style="margin-top: 100px" type="flex" justify="center">
        <el-col :span="10">
            <el-card>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                    <el-form-item prop="name">
                        <el-input v-model="ruleForm.username" placeholder="请输入用户名">
                            <template slot="prepend">
                                <i class="el-icon-user-solid"></i>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="name">
                        <el-input v-model="ruleForm.password" show-password placeholder="请输入密码">
                            <template slot="prepend">
                                <i class="el-icon-lock"></i>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item style="text-align: center">
                        <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import {setStorage} from "../../utils/storage";
    import sha256 from "js-sha256";
    import {login} from "../../api/login";
    export default {
        name: "index",
        data() {
            return {
                ruleForm: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                }
            }
        },
        created() {
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let password = this.ruleForm.password;
                        this.ruleForm.password = sha256(password);
                        let {code, msg, data} = await login(this.ruleForm);
                        if (code === 200) {
                            setStorage("userinfo", data);
                            this.$store.commit("userinfo", data);
                            this.$router.push({
                                name: "index"
                            });
                        }else{
                            this.$message({
                                message: msg,
                                type: 'warning'
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
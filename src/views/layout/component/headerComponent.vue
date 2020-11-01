<template>
    <el-row type="flex" align="middle" justify="space-between">
        <el-col :span="6">
            <h1>BBS</h1>
        </el-col>
        <el-col :span="1">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <div class="demo-basic--circle">
                        <div class="block"><el-avatar :size="60" :src="circleUrl"></el-avatar></div>
                    </div>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="outLogin">安全退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
    import {clearStorage} from "@/utils/storage";

    export default {
        name: "header",
        data() {
            return{
                circleUrl: this.$store.getters.getUsername.avatar
            }
        },
        methods: {
            handleCommand() {
                clearStorage();
                this.$router.push({
                    name: "login"
                })
            }
        }
    }
</script>

<style lang="less" scoped>
h1{
    font-size: 50px;
}
</style>
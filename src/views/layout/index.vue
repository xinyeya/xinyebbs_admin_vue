<template>
    <el-container>
        <el-header>
            <HeaderComponent></HeaderComponent>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <AsideComponent></AsideComponent>
            </el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>

<script>
    import HeaderComponent from "./component/headerComponent";
    import AsideComponent from "./component/asideComponent";
    export default {
        name: "index",
        components: {AsideComponent, HeaderComponent}
    }
</script>

<style lang="less" scoped>
    .el-container {
        height: 100%;
    }
    .el-header {
        background-color: #B3C0D1;
    }

    .el-aside {
        text-align: center;
        line-height: 200px;
    }
</style>
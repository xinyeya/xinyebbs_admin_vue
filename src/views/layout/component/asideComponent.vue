<template>
    <el-row class="tac">
            <el-col :span="24">
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        router>
                    <el-menu-item index="/">
                        <i class="el-icon-edit"></i>
                        <span slot="title">编辑文章</span>
                    </el-menu-item>
                    <el-menu-item index="/articles">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">文章管理</span>
                    </el-menu-item>
                    <el-menu-item index="/classify">
                        <i class="el-icon-menu"></i>
                        <span slot="title">分类管理</span>
                    </el-menu-item>
                    <el-menu-item index="/labels">
                        <i class="el-icon-price-tag"></i>
                        <span slot="title">标签管理</span>
                    </el-menu-item>
                    <el-menu-item index="/musics">
                        <i class="el-icon-service"></i>
                        <span slot="title">音乐管理</span>
                    </el-menu-item>
                    <el-menu-item index="/contents">
                        <i class="el-icon-chat-line-round"></i>
                        <span slot="title">留言管理</span>
                    </el-menu-item>
                    <el-menu-item index="/links">
                        <i class="el-icon-link"></i>
                        <span slot="title">友情链接</span>
                    </el-menu-item>
                    <el-menu-item index="/about">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">关于博主</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
</template>

<script>
    export default {
        name: "aside"
    }
</script>

<style lang="less" scoped>
*{
    color: #000000;
}
</style>
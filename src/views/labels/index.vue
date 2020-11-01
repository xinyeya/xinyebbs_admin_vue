<template>
    <el-card>
        <el-row>
            <el-tag
                    :key="tag.id"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag.id)">
                {{tag.title}}
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-row>
    </el-card>
</template>

<script>
    import {getAllLabels, insertLabel, removeLabel} from "../../api/labels";

    export default {
        name: "labels",
        data() {
            return {
                dynamicTags: [],
                inputVisible: false,
                inputValue: ''
            }
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取所有数据
            async getData() {
                let {code, msg, data} = await getAllLabels();
                if(code === 200) {
                    this.dynamicTags = data;
                }else{
                    this.$notify({
                        title: "警告",
                        type: "warning",
                        message: msg
                    });
                }
            },

            // 显示输入框
            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            // 删除标签
            async handleClose(id) {
                try {
                    let {code, msg} = await removeLabel(id);
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
            },

            // 添加标签
            async handleInputConfirm() {
                try {
                    let inputValue = this.inputValue;
                    if (inputValue) {
                        let {code, msg} = await insertLabel(inputValue);
                        if (code === 200) {
                            this.getData();
                            this.$notify({
                                title: "成功",
                                type: "success",
                                message: msg
                            });
                        }else{
                            this.$notify({
                                title: "警告",
                                type: "warning",
                                message: msg
                            });
                        }
                    }
                }catch (e) {
                    this.$notify.error({
                        title: "错误",
                        message: "客户端错误"
                    });
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    }
</script>

<style lang="less" scoped>
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
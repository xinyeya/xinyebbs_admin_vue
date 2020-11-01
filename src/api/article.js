import request from "@/utils/request";

// 获取所有文章
const getAllData = (page) => {
    return request({
        method: "get",
        url: `article/index?page=${page}`
    })
};

// 删除文章
const delArticle = (id) => {
    return request({
        method: "get",
        url: `article/delete?id=${id}`
    })
};

// 修改状态
const editStatus = (id, status) => {
    return request({
        method: "GET",
        url: `article/update_status?id=${id}&status=${status}`
    })
};

// 搜索文章
const getSearchData = (title) => {
    return request({
        method: "GET",
        url: `article/search?search=${title}`
    })
};

// 添加文章
const insertArticle = (data) => {
    return request({
        method: "POST",
        url: `article/insert`,
        data: data
    })
};

// 查询单个文章
const findArticle = (id) => {
    return request({
        method: "GET",
        url: `article/exit_find?id=${id}`
    })
};

// 更新文章
const update_article = (id, data) => {
    return request({
        method: "POST",
        url: `article/update_article?id=${id}`,
        data: data
    })
};

// 获取所有分类
const getAllClassify = () => {
    return request({
        url: `classify/select`,
        method: "get"
    });
};

const getAllLabels = () => {
    return request({
        url: `labels/index`,
        method: "get"
    })
};

export {
    getAllData,
    delArticle,
    editStatus,
    getSearchData,
    insertArticle,
    findArticle,
    update_article,
    getAllClassify,
    getAllLabels
}
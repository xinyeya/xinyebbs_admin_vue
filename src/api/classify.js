import request from "@/utils/request";

// 获取所有分类
const getAllData = (page) => {
    return request({
        url: `classify/index?page=${page}`,
        method: 'get'
    });
};

// 搜索分类
const getSearchData = (title) => {
    return request({
        url: `classify/search?title=${title}`,
        method: "get"
    })
};

// 查询单个
const getFindSearch = (id) => {
    return request({
        url: `classify/find?id=${id}`,
        method: "get"
    })
};

// 删除分类
const removeClassify = (id) => {
    return request({
        url: `classify/remove?id=${id}`,
        method: "get"
    });
};

// 添加分类
const insertClassify = (data) => {
    return request({
        url: `classify/insert`,
        method: "post",
        data: data
    });
};

// 修改分类
const updateClassify = (id, data) => {
    return request({
        url: `classify/update?id=${id}`,
        method: "post",
        data: data
    })
};

export {
    getAllData,
    getSearchData,
    getFindSearch,
    removeClassify,
    insertClassify,
    updateClassify
}

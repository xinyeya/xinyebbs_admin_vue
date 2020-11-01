import request from "../utils/request";

// 获取音乐列表
const getAllMusic = (page) => {
    return request({
        url: `music/index?page=${page}`,
        method: "get"
    });
};

// 查询单条音乐
const getFindMusic = (id) => {
    return request({
        url: `music/find?id=${id}`,
        method: "get"
    });
};

// 搜索音乐
const getSearchMusic = (title) => {
    return request({
        url: `music/search?title=${title}`,
        method: "get"
    });
};

// 添加音乐数据
const setInsertMuisc = (data) => {
    return request({
        url: `music/insert`,
        method: "post",
        data: data
    });
};

// 删除音乐
const removeMusic = (id) => {
    return request({
        url: `music/remove?id=${id}`,
        method: "get"
    });
};

// 修改音乐数据
const setUpdateMusic = (id, data) => {
    return request({
        url: `music/update?id=${id}`,
        method: "post",
        data: data
    });
};

export {
    getAllMusic,
    getFindMusic,
    getSearchMusic,
    setInsertMuisc,
    setUpdateMusic,
    removeMusic
};
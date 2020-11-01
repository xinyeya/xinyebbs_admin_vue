import request from "@/utils/request";

// 获取所有数据
const getAllLink = (page) => {
    return request({
        url: `friend_link/index?page=${page}`,
        method: `get`
    });
};

// 获取单条数据
const getFindLink = (id) => {
    return request({
        url: `friend_link/find?id=${id}`,
        method: `get`
    });
};

// 搜索链接
const getSearchLink = (title) => {
    return request({
        url: `friend_link/search?title=${title}`,
        method: `get`
    });
};

// 删除链接
const removeLink = (id) => {
    return request({
        url: `friend_link/remove?id=${id}`,
        method: `get`
    });
};

// 添加链接
const setInsertLink = (data) => {
    return request({
        url: `friend_link/insert`,
        method: `post`,
        data: data
    });
};

// 修改链接
const setUpdateLink = (id, data) => {
    return request({
        url: `friend_link/update?id=${id}`,
        method: `post`,
        data: data
    });
};

export {
    getAllLink,
    getFindLink,
    getSearchLink,
    setInsertLink,
    setUpdateLink,
    removeLink
};
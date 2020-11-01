import request from "@/utils/request";

// 获取所有数据
const getAllContent = (page) => {
    return request({
        url: `content/index?page=${page}`,
        method: "get"
    });
};

// 搜索留言人
const getSearch = (username) => {
    return request({
        url: `content/search?username=${username}`,
        method: 'get'
    })
};

// 删除留言
const removeContent = (id) => {
    return request({
        url: `content/remove?id=${id}`,
        method: 'get'
    })
};

export {
    getAllContent,
    getSearch,
    removeContent
}
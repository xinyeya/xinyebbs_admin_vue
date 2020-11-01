import request from "@/utils/request";

// 获取所有标签
const getAllLabels = () => {
    return request({
        url: `labels/index`,
        method: "get"
    })
};

// 添加标签
const insertLabel = (title) => {
    return request({
        url: `labels/insert?title=${title}`,
        method: "get",
    })
};

// 删除标签
const removeLabel = (id) => {
    return request({
        url: `labels/remove?id=${id}`,
        method: "get"
    })
};

export {
    getAllLabels,
    removeLabel,
    insertLabel
}
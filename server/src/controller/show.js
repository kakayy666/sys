const fs = require('fs');
const path = require('path');
const directoryPath ='/data/s2v/dist/S2VulnHub/user_cve'
const getshowList = () => {
    return new Promise((resolve, reject) => {
        // 创建一个空对象用于存储category计数
        const dataList = {};
        // 读取指定目录下的所有文件
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                reject(err);
                return;
            }

            // 生成读取文件的Promise数组
            const filePromises = files.map(file => {
                const filePath = path.join(directoryPath, file);
                // 读取文件内容并返回Promise
                return new Promise((resolve, reject) => {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error(`Error reading file ${filePath}:`, err);
                            reject(err);
                            return;
                        }
                        try {
                            // 解析JSON数据
                            const jsonData = JSON.parse(data);
                            // 提取category属性值
                            const category = jsonData.category;
                            // 如果该category已存在于dataList中，则计数加1，否则初始化为1
                            dataList[category] = (dataList[category] || 0) + 1;
                            resolve();
                        } catch (error) {
                            console.error(`Error parsing JSON data from file ${filePath}:`, error);
                            reject(error);
                        }
                    });
                });
            });

            // 等待所有文件读取完成
            Promise.all(filePromises)
                .then(() => {
                    resolve(dataList);
                })
                .catch(error => {
                    reject(error);
                });
        }); 
    });
}

const getyearList = () => {
    return new Promise((resolve, reject) => {
        // 创建一个空对象用于存储category计数
        const dataList = {};
        // 读取指定目录下的所有文件
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                reject(err);
                return;
            }

            // 生成读取文件的Promise数组
            const filePromises = files.map(file => {
                const filePath = path.join(directoryPath, file);
                // 读取文件内容并返回Promise
                return new Promise((resolve, reject) => {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error(`Error reading file ${filePath}:`, err);
                            reject(err);
                            return;
                        }
                        try {
                            // 解析JSON数据
                            const jsonData = JSON.parse(data);
                            // 提取category属性值
                            const fileyear = extractYearFromFileName(jsonData.id);
                            // 如果该category已存在于dataList中，则计数加1，否则初始化为1
                            dataList[fileyear] = (dataList[fileyear] || 0) + 1;
                            resolve();
                        } catch (error) {
                            console.error(`Error parsing JSON data from file ${filePath}:`, error);
                            reject(error);
                        }
                    });
                });
            });

            // 等待所有文件读取完成
            Promise.all(filePromises)
                .then(() => {
                    resolve(dataList);
                })
                .catch(error => {
                    reject(error);
                });
        }); 
    });
} 

// 从文件名中提取年份信息的辅助函数
const extractYearFromFileName = (fileName) => {
    const regex = /CVE-(\d{4})-\d+/; // 匹配以CVE-开头，后跟4位数字年份的正则表达式
    const match = fileName.match(regex);
    if (match && match[1]) {
        console.log('match[1]',match[1])
        return match[1];
    } else {
        return null;
    }
}

module.exports = {
    getshowList,
    getyearList,
}

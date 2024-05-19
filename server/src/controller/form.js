const fs = require('fs');
const { exec } = require('child_process');
const createNewForm = (postData) => {
    console.log(postData)
    return new Promise((resolve, reject) => {
        console.log('postData',postData)
        const newFormData = { 
        "schema_version": postData.schema_version,
        "id": postData.id,
        "category": postData.category,
        "version": postData.version,
        "trigger": {
            "poc": postData.poc,
            "guide": postData.guide
        }
        };
        // web/public/S2VulnHub/user_cve
        const jsonData = JSON.stringify(newFormData, null, 2);
        const filePath = `/data/s2v/dist/S2VulnHub/user_cve/${postData.id}.json`;
        fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
        console.error('Error writing JSON file:', err);
        return;
    }
        console.log('JSON file has been written successfully.');
             
                // 要执行的命令数组
                const commands = [
                    'cd /data/s2v/dist/S2VulnHub',
                    `bash writedocf.sh ${postData.id}`,
                ];
                // 将命令数组转换为用 && 连接的字符串
                const command = commands.join(' && ');

                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Execution error: ${error}`);
                        reject(error);
                    } else {
                        console.log(`Commands output: ${stdout}`);
                        resolve(newFormData);
                    }
                });
});
        // 在异步操作成功后，调用resolve，将新表单数据传递给then方法

        resolve(newFormData);
    });
}

module.exports = {
    createNewForm,
}


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
        const filePath = `/Users/s2v/dist/S2VulnHub/user_cve/${postData.id}.json`;
        fs.writeFile(filePath, jsonData, (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return;
            }
            console.log('JSON file has been written successfully.');
             
            // 要执行的命令数组
            const commands = [
                'cd /Users/s2v/dist/S2VulnHub',
                `bash writedocf.sh ${postData.id}`,
            ];
            // 将命令数组转换为用 && 连接的字符串
            const command = commands.join(' && ');

            exec(command, (error, stdout, stderr) => { 
                if (error) {
                    console.error(`Execution error: ${error}`);
                    // 为了安全性原则，数据库只进不出
                    // 执行删除创建好的json文件命令
                    // console.log(`deleteCommand: rm ${filePath}`);
                    // const deleteCommand = `rm ${filePath}`;
                    // exec(deleteCommand, (error, stdout, stderr) => {
                    //     if (error) {
                    //         console.error(`Execution error: ${error}`);
                    //     } else {
                    //         console.log(`Commands output: ${stdout}`);
                    //     }
                    // });
                    resolve("failed");
                } else {
                    console.log(`Commands output: ${stdout}`);
                    resolve("success");
                }
            });
        })
    });
}
 
module.exports = {
    createNewForm,
}


class BaseModel {
    constructor(data, message) {
        
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

// Success Model

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = 0
    }
}

// Error Model

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = -1
    }
}


module.exports = {
    SuccessModel,
    ErrorModel
}
// Path: src/routes/blog.js

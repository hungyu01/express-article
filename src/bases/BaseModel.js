const mongoose = require('mongoose');

class BaseModel {
    constructor(schema, modelName) {
        this.schema = schema;
        this.modelName = modelName;
        
        // 添加時間戳記並設定格式
        this.schema.set('timestamps', {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        });
        
        // 添加 toJSON 轉換
        this.schema.set('toJSON', {
            transform: (doc, ret) => {
                // 轉換 _id 為 id
                if (ret._id) {
                    ret.id = ret._id;
                    delete ret._id;
                }
                
                // 轉換時間戳記格式
                if (ret.created_at) {
                    ret.created_at = ret.created_at.toISOString();
                }
                if (ret.updated_at) {
                    ret.updated_at = ret.updated_at.toISOString();
                }
                
                // 移除 __v
                delete ret.__v;
                
                return ret;
            }
        });
        
        // 添加 toObject 轉換
        this.schema.set('toObject', {
            transform: (doc, ret) => {
                // 轉換 _id 為 id
                if (ret._id) {
                    ret.id = ret._id;
                    delete ret._id;
                }
                
                // 轉換時間戳記格式
                if (ret.created_at) {
                    ret.created_at = ret.created_at.toISOString();
                }
                if (ret.updated_at) {
                    ret.updated_at = ret.updated_at.toISOString();
                }
                
                // 移除 __v
                delete ret.__v;
                
                return ret;
            }
        });
        
        this.model = mongoose.model(modelName, schema);
    }

    // Get model instance
    getModel() {
        return this.model;
    }

    // Get schema
    getSchema() {
        return this.schema;
    }
}

module.exports = BaseModel; 
// 代码生成时间: 2025-09-19 08:20:31
// 导入必要的依赖和模块
const faker = require('faker'); // 用于生成假数据
const fs = require('fs');       // 用于文件操作

class DataGenerator {
  /**
   * 构造函数
   * 初始化测试数据配置
   * @param {object} config - 测试数据配置
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * 生成单个测试数据对象
   * @returns {object} - 测试数据对象
   */
  generateDataObject() {
    try {
      const data = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        age: faker.random.number({ min: 18, max: 65 }),
        address: faker.address.streetAddress(),
      };

      return data;
    } catch (error) {
      console.error('生成数据对象时发生错误:', error);
      throw error;
    }
  }

  /**
   * 生成测试数据数组
   * @param {number} count - 要生成的数据对象数量
   * @returns {array} - 测试数据数组
   */
  generateDataArray(count) {
    try {
      const dataArray = [];

      for (let i = 0; i < count; i++) {
        const dataObject = this.generateDataObject();
        dataArray.push(dataObject);
      }

      return dataArray;
    } catch (error) {
      console.error('生成数据数组时发生错误:', error);
      throw error;
    }
  }

  /**
   * 将测试数据写入文件
   * @param {array} dataArray - 测试数据数组
   * @param {string} filename - 输出文件名
   */
  writeDataToFile(dataArray, filename) {
    try {
      const dataString = JSON.stringify(dataArray, null, 2); // 格式化JSON字符串
      fs.writeFileSync(filename, dataString); // 写入文件
      console.log('数据已写入文件:', filename);
    } catch (error) {
      console.error('写入文件时发生错误:', error);
      throw error;
    }
  }
}

// 示例用法
const config = {
  count: 10,       // 生成10个测试数据对象
  filename: 'test_data.json', // 输出文件名
};

const dataGenerator = new DataGenerator(config);
const dataArray = dataGenerator.generateDataArray(config.count);
dataGenerator.writeDataToFile(dataArray, config.filename);
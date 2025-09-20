// 代码生成时间: 2025-09-20 22:48:42
class FolderStructureSorter {
  /**
   * 构造函数
   * @param {string} source 需要整理的文件夹路径
   */
  constructor(source) {
    this.source = source;
  }

  /**
   * 读取文件夹内容并按规则排序
   * @returns {Promise} 包含排序后文件夹内容的Promise
   */
  async sortFolderContents() {
    try {
      const files = await this.readDirectory();
      return this.sortFiles(files);
    } catch (error) {
      console.error('An error occurred while sorting folder contents:', error);
      throw error;
    }
  }

  /**
   * 读取文件夹中的所有文件和子文件夹
   * @returns {Promise<Array>} 包含所有文件和子文件夹的数组的Promise
   */
  async readDirectory() {
    try {
      const fs = require('fs');
      const path = require('path');
      const items = await fs.promises.readdir(this.source, { withFileTypes: true });
      return items;
    } catch (error) {
      throw new Error('Failed to read directory: ' + this.source);
    }
  }

  /**
   * 根据文件名排序文件和子文件夹
   * @param {Array} files 文件和子文件夹的数组
   * @returns {Array} 排序后的文件和子文件夹数组
   */
  sortFiles(files) {
    return files.sort((a, b) => {
      // 根据文件类型排序，文件夹在前，文件在后
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      // 根据文件名排序
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  }
}

// 使用示例
(async () => {
  const sorter = new FolderStructureSorter('./path/to/your/folder');
  try {
    const sortedContents = await sorter.sortFolderContents();
    console.log('Sorted Folder Contents:', sortedContents);
  } catch (error) {
    console.error('Error sorting folder contents:', error);
  }
})();
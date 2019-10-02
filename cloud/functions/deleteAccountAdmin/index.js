// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async ({ _id }) => {
  const db = cloud.database()
  const res = await db.collection('accounts')
    .where({ _id })
    .remove()

  return {
    removed: res.stats.removed
  }
}
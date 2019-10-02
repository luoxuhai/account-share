// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async () => {
  const db = cloud.database()
  const { data } = await db.collection('accounts')
    .where({})
    .get();

  return {
   accounts: data
  }
}
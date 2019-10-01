// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async ({_id}, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const { data } = await db.collection('accounts')
    .where({ _id })
    .get();

  return {
    password: data[0] && data[0].password
  }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  const db = cloud.database()
  delete event.userInfo;
  const result = await db.collection('accounts')
    .add({
      data: event,
    })

  return {
    _id: result._id
  }
}
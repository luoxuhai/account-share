// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  const db = cloud.database()
  const _id = event._id;
  delete event._id;
  delete event.userInfo;
  const result = await db.collection('accounts')
    .where({ _id }).update({
      data: event,
    })

  return {
    updated: result.stats.updated
  }
}
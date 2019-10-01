const cloud = require('wx-server-sdk')

cloud.init()


exports.main = async ({ integral }) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
 const result = await  db.collection('users').where({
    openid: wxContext.OPENID
  })
  .update({
    data: {
      integral
    },
  })

  return {
    updated: result.stats.updated
  }
}
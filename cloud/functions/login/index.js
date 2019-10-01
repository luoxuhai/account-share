const cloud = require('wx-server-sdk')

cloud.init()


exports.main = async () => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  
  const { data } = await db.collection('users').where({
    openid: wxContext.OPENID
  }).get();

  if (!data.length) {
   await db.collection('users').add({
      data: {
       openid: wxContext.OPENID,
       integral: 0
      }
    })
  }

  return {
    user: data[0]
  }
}
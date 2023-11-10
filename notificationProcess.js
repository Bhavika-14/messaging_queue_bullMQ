const notificationComplete=()=>new Promise((res,rej)=>setTimeout(()=>res(),2*1000));

async function notificationProcess(user_id,order_id){
    console.log(`Notify user ${user_id} about refund for order ${order_id}`)
    await notificationComplete()
    console.log("Notification Sent Successfully!")
}

exports.notificationProcess=notificationProcess
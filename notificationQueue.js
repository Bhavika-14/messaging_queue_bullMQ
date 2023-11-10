const { Queue } =require("bullmq")

const notificationQueue = new Queue("notification-queue",{
    connection:{
        host:"127.0.0.1",
        port:"6379"
    }
})

async function addNotificationTask(user_id,order_id){
    const response = await notificationQueue.add(`notification-to-${user_id}`,{
        order_id:order_id,
        user_id:user_id
    })

    console.log("Job added to notificationQueue with id: ",response.id)
}

exports.addNotificationTask=addNotificationTask
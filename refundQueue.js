const { Queue } =require("bullmq")

const refundQueue = new Queue("refund-queue",{
    connection:{
        host:"127.0.0.1",
        port:"6379"
    }
})

async function addRefundTask(order){
    const response = await refundQueue.add(`refund-to-${order.id}`,{
        amount:order.amount,
        id:order.id,
        user_id:order.user_id
    })

    console.log("Job added to refundQueue with id: ",response.id)
}

exports.addRefundTask=addRefundTask
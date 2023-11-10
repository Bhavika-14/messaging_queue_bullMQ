import { Queue } from "bullmq"

const refundQueue = new Queue("refund-queue",{
    connection:{
        host:"localhost:",
        port:6379
    }
})

async function addRefundTask(order){
    const response = await refundQueue.add(`refund-to-${order.id}`,{
        amount:order.amount,
        id:order.id
    })

    console.log("Job added to refundQueue with id: ",response.id)
}

export default addRefundTask;
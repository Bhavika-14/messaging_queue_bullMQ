import { Queue } from "bullmq"

const refundQueue = new Queue("refund-queue",{
    connection:{
        host:"localhost:",
        port:6379
    }
})

async function addRefundTask(order){
    const response = await refundQueue.add(order.id,{
        amount:order.amount
    })

    console.log("Job added to queue with id: ",response.id)
}

export default addRefundTask;
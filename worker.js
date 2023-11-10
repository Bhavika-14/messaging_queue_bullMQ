const { Worker } =require("bullmq")
const { refundProcess } =require("./refundProcess")
const { notificationProcess } =require("./notificationProcess")

const refundWorker = new Worker("refund-queue", async(job)=>{
    console.log(`Refund Job ${job.id} started`)
    await refundProcess(job.data.id,job.data.amount,job.data.user_id)
})

const notificationWorker = new Worker("notification-queue", async(job)=>{
    console.log(`Notification Job ${job.id} started`)
    await notificationProcess(job.data.user_id,job.data.order_id)
})

exports.refundWorker= refundWorker
exports.notificationWorker=notificationWorker
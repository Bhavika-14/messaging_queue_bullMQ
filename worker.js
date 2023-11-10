const { Worker } =require("bullmq")
const { refundProcess } =require("./refundProcess")

const refundWorker = new Worker("refund-queue", async(job)=>{
    console.log(`Refund Job ${job.id} started`)
    await refundProcess(job.data.id,job.data.amount)
})

exports.refundWorker= refundWorker
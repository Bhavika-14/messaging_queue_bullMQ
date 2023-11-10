import { Worker } from "bullmq";
import { refundProcess } from "./refundProcess";

const refundWorker = new Worker("refund-queue", async(job)=>{
    console.log(`Refund Job ${job.id} started`)
    await refundProcess(job.data.id,job.data.amount)
})

export {refundWorker}
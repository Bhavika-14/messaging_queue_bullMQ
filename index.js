const express=require('express')
const { addRefundTask } = require("./refundQueue")
const { refundWorker } = require("./worker")
const { addNotificationTask } = require('./notificationQueue')
const { notificationWorker }=require('./worker')

async function init(){
    const app=express()

    const PORT = 8000;
    
    const order1={
        id:"order1",
        amount:4000,
        user_id:"user1"
    }
    
    const order2={
        id:"order2",
        amount:10000,
        user_id:"user2"
    }

    app.listen(PORT,()=>{
        console.log("Server running at port 8000")
    })
    
    await addRefundTask(order1);
    await addRefundTask(order2)

    

    refundWorker.on('completed', async(job) => {
        console.log(`Refund Job ${job.id} has completed!`);
        await addNotificationTask(job.data.user_id,job.data.id);
    });
    
    refundWorker.on('failed', (job, err) => {
        console.log(`Refund Job ${job.id} has failed with ${err.message}`);
    });

    notificationWorker.on('completed', (job) => {
        console.log(`Notification Job ${job.id} has completed!`);
    });

    notificationWorker.on('failed', (job, err) => {
        console.log(`Notification Job ${job.id} has failed with ${err.message}`);
    });
    
    


}

init()
const express=require('express')
const { addRefundTask } = require("./refundQueue")
const { refundWorker } = require("./worker")

async function init(){
    const app=express()

    const PORT = 8000;
    
    const order1={
        id:"order1",
        amount:4000
    }
    
    const order2={
        id:"order2",
        amount:10000
    }
    
    await addRefundTask(order1);
    await addRefundTask(order2)

    refundWorker.run()

    refundWorker.on('completed', job => {
        console.log(`Refund Job ${job.id} has completed!`);
    });
    
    refundWorker.on('failed', (job, err) => {
        console.log(`Refund Job ${job.id} has failed with ${err.message}`);
    });
    
    app.listen(PORT,()=>{
        console.log("Server running at port 8000")
    })


}

init()
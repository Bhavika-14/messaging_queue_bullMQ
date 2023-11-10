const refundComplete=()=>new Promise((res,rej)=>setTimeout(()=>res(),4*1000));

async function refundProcess(id,amount){
    console.log(`Refund for order ${id} has started`);
    console.log(`Refund Amount: ${amount}`)
    await refundComplete()
    console.log("Refund Completed Successfully!")
}

exports.refundProcess=refundProcess
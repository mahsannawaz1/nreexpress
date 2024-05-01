// const promise = new Promise((resolve,reject)=>{
//     // pending
//     setTimeout(()=>{
//         // resolve({id:1,name:"Ahsan"}) // pending=>fulfilled,resolved
//         reject(new Error('unknown error occured')) // pending=>rejected
//     },2000)
// })

// promise
//         .then(res=>console.log(res))
//         .catch(err=>console.log(err.message))
const p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('Error')
    },1000)
})
const p2 = new Promise(resolve=>{
    setTimeout(()=>{
        resolve(2)
    },1000)
})

Promise.race([p1,p2]).then(res=>console.log(res)).catch(err=>console.log(err))
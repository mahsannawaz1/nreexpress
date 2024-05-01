console.log('Before')
// const promise = getUserRepos({id:1,name:"Ahsan"})
// promise
//     .then(repos=>{
//         console.log(repos)
//         return getCommits(repos[0])})
//     .then(commits=>console.log(commits))

console.log('After')

// function callDatabase(callback){
//     setTimeout(()=>{
//         console.log('Accessing database')
//         callback({id:1,username:"Ahsan"})
         
//     },3000)
// }

async function displayResult(){
    try{

        const repos = await getUserRepos({id:1,name:"Ahsan"})
        console.log(repos)
        const commits = await getCommits(repos[0])
        console.log(commits)
    }
    catch(err){
        console.log('Error: ',err)
    }
}
displayResult()


function getCommits(repo){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Getting Commits for Repo: ',repo.repId)
            resolve(['commit1','commit2','commit3'])
        },2000)
    })
}
function displayCommits(commits){
    console.log(commits)

}    
function displayRepository(repos){
    console.log('Repos: ',repos)
    const repo = repos[0]
    getCommits(repo,displayCommits)
}
function getUserRepos(user){
    return new Promise((resolve,reject)=>{
        console.log('User: ',user)
        setTimeout(()=>{
            console.log('Fetching repositories for user: ',user.name)
            // resolve([{repId:1,name:"Node"},{repId:2,name:"JS"}])
            reject('Error in fetching repos')
        },2000)
       
    })
    
}
const validCollections =(collection='',valids=[])=>{
    if(!valids.includes(collection)){
     throw new Error(`${collection} is not a valid collection, must be one of ${valids}`);
 }
 return true;
}
module.exports={validCollections};
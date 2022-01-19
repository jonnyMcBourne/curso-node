const pagination = (limit, page = 1 )=>{

    Number(limit);
    Number(page);
    if(!isNaN(limit) && !isNaN(page) && page !== 1 ){
        return { skipTo:(limit*page)-limit, setLimit:limit};
    }
    return {skipTo:0,setLimit: limit ?? 10 };
}
const isValidNumber = (number)=>{
    Number(number);
    return !isNaN(number) && number;
}
module.exports = {pagination, isValidNumber}
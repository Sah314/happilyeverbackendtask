


const dayToNum=(day)=>{
    const dict = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    //console.log(dict.findIndex((d)=>d===day))
    return dict.findIndex((d)=>d===day);
}

module.exports = dayToNum;
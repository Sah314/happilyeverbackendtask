


const dayToNum=(day)=>{
    const dict = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    //console.log(dict.findIndex((d)=>d===day))
    return dict.findIndex((d)=>d===day);
}

module.exports = dayToNum;
mongoose=require('mongoose')

mongoose.connect("mongodb+srv://aditibm7235:zHPDgan9EhJ27Cyb@student.afeks2u.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log('connected successfully')
}).catch((error)=>{console.log(error)})


schema=mongoose.Schema({
    name:String,
    mail:String,
    pass:String,
    opt:String
})
console.log('schema created')

studentModel=mongoose.model('student',schema)
module.exports=studentModel

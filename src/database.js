mongoose=require('mongoose')

mongoose.connect("mongodb://127.0.0.1/adit4").then(()=>{
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
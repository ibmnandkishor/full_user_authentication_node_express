express=require('express')
path=require('path')
phash=require('bcrypt')
student=require('./src/database')
fs=require('fs')
captcha=require('trek-captcha')
nodemailer=require('nodemailer')
generate = require('otp-generator')


app=express()
port=3000

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'./public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/otpverify',(req,res)=>{
    res.render('otpverify')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/user',(req,res)=>{
    res.render('user')
})


app.post('/login',async(req,res)=>{
  try{
      const checkmail=await student.findOne({mail:req.body.mail})
      if(checkmail){
          const checkpass=await phash.compare(req.body.pass,checkmail.pass)
          if(checkpass){
            
            //   res.send('Login Successful')
               res.render('otpverify')
          }
          else{
              res.send('Incorrect password')
          }
      }
      else{
          res.send('User does not exist')
      }
  }
  catch(error){
      res.send(error)
  }
})


//////////captcha////////////////
async function run() {
    const { token, buffer } = await captcha()
    fs.createWriteStream('.//public/captcha.gif').on('finish', () =>
      gcaptcha=token
      ).end(buffer)
  }
  run()
  ///////////verify/////////////////////
app.post('/register',async(req,res)=>{
          usercaptcha=req.body.captcha
          if(usercaptcha==gcaptcha){

  const data={name:req.body.name,
              mail:req.body.mail,
              pass:req.body.pass,
              }
    
const existinguser=await student.findOne({name:data.name})
if(existinguser){
  res.send('User already exists')
}
else{
  hashp = await phash.hash(data.pass, 2);
        data.pass = hashp;
        const userdata = await student.insertMany(data);
        genotp=(n)=>{
            otp=generate.generate(4)
        //  console.log(otp)
        return(otp)
        
        }
        genotp(4)

        transport=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth:{
                user:'aditibm7235@gmail.com',
                pass:'tapi jcwh rhih jict'
            }
        })
        
        mail={
        from:'aditibm7235@gmail.com',
        to:req.body.mail,
        subject:'otp',
        text:"your otp is otp :"+genotp()
        }
        transport.sendMail(mail,(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(data)
            }
            })
        // console.log(userdata)
        //res.send('User saved successfully')
        res.redirect('otpverify')
}
// }  
}  
else{
    res.send('captcha not match')
}
})

//otp/////////////////////

///send otp///



/////////////////
app.post('/otpverify',(req,res)=>{
    userotp=req.body.userotp
    console.log(userotp)
    if(userotp==otp){
        res.redirect('user')
    }
    else{
        res.send('Otp not match')
    }
})
///////server//////////////////////////////////////////////
app.get('/register',(req,res)=>{
    res.render('register')
})

app.listen(port,()=>{
    console.log("server runing")
})






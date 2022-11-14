const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//console.log(path.join(__dirname,'../public'))

const app=express()

const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    //res.render('index')
    res.render('index',{
        title:'Weather App',
        name:'Jinal Shah'
    })
})

app.get('',(req,res)=>{
    res.send('Hello express')
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return res.send({
            error:'You must provide a address.'
        })
    }
//   res.send({
//         forecast:'It is snowing',
//         location:'Philadelphia',
//         address:req.query.address
//     })
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }
    
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error)
            {
                return res.send({error})
            }
    
           res.send({
                    forecast:forecastdata,
                    location,
                    address:req.query.address
                })
    })
    })

    // res.send({
    //     forecast:'It is snowing',
    //     location:'Philadelphia',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
       return res.send({
            error:'You must provide a search term.'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help',(req,res)=>{
    res.send('Help page')
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Us',
    })
})

app.get('/about/*',(req,res)=>{
    res.send('About article not found')
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Jinal Shah',
        errorMessage:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
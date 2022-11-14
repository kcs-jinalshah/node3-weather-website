const request = require('request');

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=f2713c75859746fa2e50d4ad4c6e4a79&query='+ latitude +','+longitude
    
 
     request({url,json:true},(error,{body})=>{
         if(error){
             callback('Unable to connect weather services!',undefined)
         }
         else if(body.error){
             callback('Unable to find location. Try another search.',undefined)
         }
         else{
             callback(undefined,'It is currently ' + body.current.temperature + ' degress out. It feel like '+ body.current.feelslike +' degree out.')
         }
     })
 }

 module.exports=forecast
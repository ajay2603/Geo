const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/gobot.html");
});

var at1;
var on1;
var at2 = 16.542159;
var on2 = 81.498039;
app.post('/',function(req,res){
  at1 = req.body.lat;
  on1 = req.body.lon;
  var dic = getDistanceFromLatLonInKm(at1,on1,at2,on2);
  dic = dic*1000;
 if(dic>1000){
  dic=dic/1000;
  dic= dic.toFixed(2);
  dic = dic+"km";
 }
 else{
  dic= dic.toFixed(2);
  dic = dic+"m";
 }
 res.send("<!DOCTYPE html><html ><head> <title>Distance</title></head><body><center> <h1>The Distance between you and me is</h1><br><h1>"+dic+"</h1></center></body></html>");

})

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    const earthRadiusKm = 6371; // radius of the earth in kilometers
    const dLat = deg2rad(lat2-lat1);
    const dLon = deg2rad(lon2-lon1);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = earthRadiusKm * c; // distance in kilometers
    return distance;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }
  
 

 app.listen(process.env.PORT || 3000,function(){
  console.log("Server running in port 3000 ");
 })

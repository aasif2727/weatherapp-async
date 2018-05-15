const yargs = require('yargs');
const request = require('request');
const axios = require('axios');

const command = yargs
.options('address',{
    address:{
        demand:true,
        describe:'address',
        alias:'a'
    }
})
.help()
.argv;

let location = encodeURIComponent(command.address);
let geoUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${location}`;

axios.get(geoUrl)
.then((response)=>{
   if(response.data.status === 'ZERO_RESULTS'){
       throw new Error('No record found');
   }
   else{
       let lat = response.data.results[0].geometry.location.lat;
       let lng = response.data.results[0].geometry.location.lng;
       let key = '428834b1b9105c7b7ab44d86bbc73246';
       let forecastUrl = `https://api.darksky.net/forecast/${key}/${lat},${lng}`;
       return axios.get(forecastUrl);
   }
})
.then((response)=>{
    console.log(response);
})
.catch((err)=>{
   if(err.code === 'ENOTFOUND'){
    console.log(err.code);
   }
   else{
       console.log(err.message);
   }
});



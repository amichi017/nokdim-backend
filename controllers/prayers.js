const mongoose = require('mongoose');
const Prayers = require('../models/prayers');
const KosherZmanim = require("kosher-zmanim");
const axios=require('axios')
let date=new Date();
let str='';
if(date.toString().includes('חורף')){
    str+='-2'
    }
    else{
    str+='-3'
    }


const options ={
    date: date,
    timeZoneId: 'Etc/GMT'+str,
   locationName: 'IL',
   latitude: 31.6333308,
   longitude: 35.244064,
   // complexZmanim: true,
   // elevation?: number = 0,
    

}
const zmanim = KosherZmanim.getZmanimJson(options);
const trnsfrom=(hours,minutes,seconds)=>{
    let str='';
    (hours<10)?str+='0':str+='';
    str+=String(hours);
    str+=':';
    (minutes<10)?str+='0':str+='';
    str+=String(minutes);
    str+=':';
    (seconds<10)?seconds+='0':seconds+='';
    str+=String(seconds);
    return str;
  
  }
  let dateBeforSub=new Date(zmanim.BasicZmanim.SeaLevelSunset);
  let sub=(dateBeforSub.getTime()-(10*60*1000));
  let timeAfterMinusDay=new Date(sub);
  const rows = [
    trnsfrom(timeAfterMinusDay.getHours(),timeAfterMinusDay.getMinutes(),0),
  ]

  function createData(name, calories, ) {
    return { name, calories,  };
  }
  






module.exports = {
    getAllPrayers: (req, res) => {
        Prayers.find().then((prayers)=>{
            res.status(200).json({
                prayers
            })
        }).catch((err)=>{
            res.status(200).json({
                err
            })
        })
    },
    createPrayers: (req, res) => {
    
            const {
                    morningPrayerOfSand,//שחרית חול 
                    afternoonPrayerOfSand ,//מנחה חול
                    nightgPrayerOfSandA,// ערבית חול מנין ראשון
                    nightgPrayerOfSandB,//ערבית חול מניין שני
                    Parasha,//פרשת השבוע
                    afternoonPrayerOfFridayNight,//תפילת מנחה ערב שבת
                    morningPrayerOfSabbath,//תפילת שחרית של שבת
                    Psalms,//תהילים
                    afternoonPrayerOfSabbath,//תפילת מנחה של שבת
                    rabbiYosefChaim,//שיעור בן איש חי 
                    thirdMeal,//סעודה שלישית 
                    nightgPrayerOfShabbatCameOut,//ערבית של מוצאי שבת
                    Extensions,  
            }=req.body;
            let rowsShbat=[];

            axios.get("https://www.hebcal.com/shabbat?cfg=json&m=44&latitude=31.6333308&longitude=35.2166658&tzid=Etc/GMT"+str)
              .then(response =>response.data)
              .then((resp )=> {
            
            
                resp.items.map((item,index)=>{
                  let date=new Date(item.date);
                  let timeBeforSub =new Date(item.date)
                  let subForMinusDay=(timeBeforSub.getTime()-(60*60*1000*24));
                  let timeAfterMinusDay=new Date(subForMinusDay);
                  if(item.hebrew.slice(0,4) === 'פרשת'){
                    dateOfShbat = timeAfterMinusDay.getDate()+"/"+(timeAfterMinusDay.getMonth()+1)+"/"+timeAfterMinusDay.getFullYear();
                    rowsShbat[0]=String(item.hebrew) // ,"פרשת השבוע") )
            
                }
                  if(item.hebrew === 'הדלקת נרות'){
                     let timeBeforSub =new Date(item.date)
                    //  let sub=(timeBeforSub.getTime()+(5*60*1000));
                    //  let timeAfterSub=new Date(sub);
                    rowsShbat[1]=trnsfrom(timeBeforSub.getHours(),timeBeforSub.getMinutes(),timeBeforSub.getSeconds())
                    rowsShbat[2]='07:45:00' // תפילת שחרית של שבת
            
                   // rowsShbat[2]=(  createData("07:45:00", 'תפילת מחה של שבת' ) )
                 
                  }
                  if(item.hebrew === 'הבדלה'){
                   
                    let timeBeforSub =new Date(item.date)
                    let subForMinusDay=(timeBeforSub.getTime()-(10*60*1000));
                    let timeAfterMinusDay=new Date(subForMinusDay);
                    rowsShbat[3]='תפילת מנחה של שבת',
                    rowsShbat[4]=trnsfrom(timeAfterMinusDay.getHours(),timeAfterMinusDay.getMinutes(),timeAfterMinusDay.getSeconds())//תפילת ערבית של מוצאי שבת
                 }
               
                    
                    // rowsShbat.push( createData( trnsfrom ( date.getHours(),date.getMinutes(),date.getSeconds() ) , String(item.hebrew) ))
                })
                
                const objPrayers=new Prayers({
                    _id: new mongoose.Types.ObjectId(),
                    morningPrayerOfSand:morningPrayerOfSand || '06:45:00',//שחרית חול 
                    afternoonPrayerOfSand:afternoonPrayerOfSand || rows[0],//מנחה חול
                    nightgPrayerOfSandA:nightgPrayerOfSandA || 'לאחר תפילת מנחה',
                    nightgPrayerOfSandB:nightgPrayerOfSandB || '20:00:00',//ערבית חול מניין שני
                    Parasha:Parasha|| rowsShbat[0],//פרשת השבוע
                    afternoonPrayerOfFridayNight:afternoonPrayerOfFridayNight ||  rowsShbat[1],//תפילת מנחה ערב שבת
                    morningPrayerOfSabbath:morningPrayerOfSabbath || '07:45:00',//תפילת שחרית של שבת
                    Psalms:Psalms || '12:30:00',//תהילים
                    afternoonPrayerOfSabbath:afternoonPrayerOfSabbath || 'מופיע בלוח המודעות',//תפילת מנחה של שבת
                    rabbiYosefChaim:rabbiYosefChaim || 'מופיע בלוח המודעות',//שיעור בן איש חי 
                    thirdMeal:thirdMeal || 'מופיע בלוח המודעות',//סעודה שלישית 
                    nightgPrayerOfShabbatCameOut:nightgPrayerOfShabbatCameOut || rowsShbat[4],//ערבית של מוצאי שבת
                    Extensions, 
                });
                console.log(objPrayers,'objComplaint')
                objPrayers.save().then(()=>{
                    res.status(200).json({
                        message: 'Create a new objPrayers'
                    })
                }).catch((err)=>{
                    res.status(200).json({
                        err
                    })
                })          
              });
            
    },
    updatePrayers: (req, res) => {
        const prayersId = req.params.prayersId
        Prayers.findById(prayersId).then(() => {
            
            Prayers.updateOne({ _id: prayersId }, req.body).then(() => {
                res.status(200).json({
                    message: `Update Complaint - ${prayersId}`
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });
        }).catch(error => {
            res.status(404).json({
                message: 'complaint not found'
            })
        });
       
    },
    deletePrayers: (req, res) => {
        const prayersId = req.params.prayersId
        console.log(prayersId,"prayersId")
        Prayers.findById(prayersId).then(() => {
            
            Prayers.deleteOne({ _id: prayersId }).then(() => {
                res.status(200).json({
                    message: `prayersId _id:${prayersId} Deleted`
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });
        }).catch(error => {
            res.status(404).json({
                message: 'prayersId not found'
            })
        });
        
    }
}
 

    
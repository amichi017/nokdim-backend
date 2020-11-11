
const mongoose = require('mongoose');
const Presence = require('../models/presence');

const craeteMonth=(month)=>{
    let arrMonth=[];
    let day=new Date(new Date().getFullYear(), (month+1), 0).getDate();
    
    for (let index = 1; index <=day; index++) {
        arrMonth.push({
            morningPrayerOfSand:[],
            afternoonPrayerOfSand:[],
            nightgPrayerOfSandA:[],
            nightgPrayerOfSandB:[],
            date:new Date(new Date().getFullYear(), month, index)
        })
        
    }
   return arrMonth;
}
module.exports = {
    getAllPresence: (req, res) => {
        
    
        Presence.find().then((Presence)=>{
          
            res.status(200).json({
                Presence
            })
        }).catch((err)=>{
            res.status(200).json({
                err
            })
        })
    },
    createPresence: (req, res) => {
    
            const {user,complaint}=req.body;
            
            const objPresence=new Presence({
                _id: new mongoose.Types.ObjectId(),
                date:new Date(),
                January:craeteMonth(0),
                February:craeteMonth(1) ,
                March:craeteMonth(2) ,
                April:craeteMonth(3) ,
                May:craeteMonth(4) ,
                June:craeteMonth(5) ,
                July:craeteMonth(6) ,
                August:craeteMonth(7),
                September:craeteMonth(8),
                October:craeteMonth(9),
                November:craeteMonth(10),
                December:craeteMonth(11) ,
            });
            console.log(objPresence,'objPresence')
            objPresence.save().then(()=>{
                res.status(200).json({
                    message: 'Create a new objPresence'
                })
            }).catch((err)=>{
                res.status(200).json({
                    err
                })
            })
    },
    updatePresence: (req, res) => {
        const {month,day,obj}=req.body;
        
        let monthNunber=parseInt(month);
        let dayNumber =parseInt(day);
        const presenceId = req.params.presenceId
        Presence.findById(presenceId).then((presence) => {
            let saveRes=presence[month];
            let {morningPrayerOfSand,afternoonPrayerOfSand,nightgPrayerOfSandA,nightgPrayerOfSandB}=obj;
            if(morningPrayerOfSand){
                saveRes[dayNumber].morningPrayerOfSand=morningPrayerOfSand;
            }
            if(afternoonPrayerOfSand){
                saveRes[dayNumber].morningPrayerOfSand=afternoonPrayerOfSand;
            }
            if(nightgPrayerOfSandA){
                saveRes[dayNumber].morningPrayerOfSand=nightgPrayerOfSandA;
            }
            if(nightgPrayerOfSandB){
                saveRes[dayNumber].morningPrayerOfSand=nightgPrayerOfSandB;
            }
           
            let finalRes={};
            switch (month) {
                case 'January':
                    finalRes={January:saveRes}
                break;
                case 'February':
                    finalRes={February:saveRes}
                break;
                case 'March':
                    finalRes={March:saveRes}
                break;
                case 'April':
                    finalRes={April:saveRes}
                break;
                case 'May':
                    finalRes={May:saveRes}
                break;
                case 'June':
                    finalRes={June:saveRes}
                break;
                case 'July':
                    finalRes={July:saveRes}
                break;
                case 'August':
                    finalRes={August:saveRes}
                break;
                case 'September':
                    finalRes={September:saveRes}
                break;
                case 'October':
                    finalRes={October:saveRes}
                break;
                case 'November':
                    finalRes={November:saveRes}
                break;
                case 'December':
                    finalRes={December:saveRes}
                break;
            
                default:
                    break;
            }
           
          
                Presence.updateOne({ _id: presenceId },finalRes ).then(() => {
                    res.status(200).json({
                        message: `presence Complaint - ${presenceId}`
                    })
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                });
            
        }).catch(error => {
            res.status(404).json({
                message: 'presence not found'
            })
        });
       
       
    },
    deletePresence: (req, res) => {
        const presenceId = req.params.presenceId
        console.log(presenceId,"presenceId")
        Presence.findById(presenceId).then(() => {
            
            Presence.deleteOne({ _id: presenceId }).then(() => {
                res.status(200).json({
                    message: `Presence _id:${presenceId} Deleted`
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });
        }).catch(error => {
            res.status(404).json({
                message: 'presenceId not found'
            })
        });
        
    }
}
 

    
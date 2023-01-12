var express=require('express');
var mongoose=require('mongoose');
var schema=mongoose.Schema;
var router=express.Router();

var Fac=new schema({
    id:Number,
    name:String,
    email:String,
    experience:Number
});

const FD=mongoose.model('faculty',Fac,'faculty');

router.get("/faculty",function(req,resp){
    FD.find().exec(function(err,data){
        if(err)
        {
            resp.send(err);
        }
        else{
            resp.send(data);
        }
    })
});

router.get("/faculty/:id",function(req,resp){
    FD.findOne({id:req.params.id}).exec(function(err,data){
        if(err)
        {
            resp.send(err);
        }
        else{
            resp.send(data);
        }
    })
});

router.post("/faculty",function(req,resp){
    var newfaculty=new FD({id:req.body.id,name:req.body.name,email:req.body.email,experience:req.body.experience});

    newfaculty.save(function(err,data){
        if(err)
        {
            resp.send(err);
        }
        else{
            resp.send(data);
        }
    })
});

router.put("/faculty/:id",function(req,resp){
    FD.findOne({id:req.params.id},function(err,doc){
        if(err)
        {
            resp.send(err);
        }
        else{
            doc.id=req.body.id;
            doc.name=req.body.name,
            doc.email=req.body.email,
            doc.experience=req.body.experience

            doc.save(function(data){
                resp.send("Saved Succcessfully");
            })
        }
    });
})


router.delete("/faculty/:id",function(req,resp){
    FD.remove({id:req.params.id},function(err,data){
        if(err)
        {
            resp.send(err);
        }
        else{
            resp.send("Deleted Succesddfully!!!!!!!!");
        }
    })
});
module.exports=router;



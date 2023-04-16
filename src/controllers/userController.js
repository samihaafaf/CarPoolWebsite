const Student = require("../models/registers");
const Complain = require("../models/complain");


/*

user profile editing, user delete account, user lodge complaint
*/

module.exports.edit_get = async (req,res) =>{
    const id = req.session.userID;
    const data = await Student.findOne({_id:id});
    res.render("editProfile",{data:data});
}


module.exports.edit_post = async (req,res) =>{
    try{
    console.log("body is");
    console.log(req.body);
    const id = req.session.userID;
    console.log("id is");
    console.log(id);
    await Student.updateOne({_id:id},{
        $set:{
            first_name:req.body.first_name
        }

    });

    res.redirect('/user_dash')
    } catch (error){
        res.status(400).send(error);
    }
    

    
}

module.exports.delete_get = async (req,res) =>{
    const id = req.session.userID;
    const data = await Student.findOne({_id:id});
    res.render("delAccount",{data:data});
}


module.exports.delete_post = async (req,res) =>{
    try{

        const id = req.body.selected_id;
        const as = await Student.deleteOne({_id:id});
        //destroy the session now
        req.session.destroy( err => {
            if (err){
                return res.redirect('/');
            }
    
            res.clearCookie('sid');
            res.redirect('/login');
        });


        //res.render("index");  /// can still view the dashboard (kill the session)


    } catch (error){
        res.status(400).send(error);
    }
    
}

module.exports.complain_post = async (req,res) =>{
    try{

        const newComp = new Complain({   //show a prompt that the email or password is
            // not unique
            category: req.body.comp,
            details: req.body.details,
            lodged_by: req.session.userID,
            
            })
            const lodged = await newComp.save();
            res.status(201).render("user_dash");


        //res.render("index");  /// can still view the dashboard (kill the session)


    } catch (error){
        res.status(400).send(error);
    }
}
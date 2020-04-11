const express = require('express');
const fs = require('fs');
const router = express.Router();


   const  data = fs.readFileSync('./data/users.json');
let json = JSON.parse(data);


 const  da = fs.readFileSync('./data/logiin.json');
let js = JSON.parse(da);



router.get('/home', (req, res) => {
  
  res.render('Home',{json});
});
router.get('/', (req, res) => {
  
  res.render('login',{json});
});

router.post('/login', (req, res) => {
  
       const us = req.body.username;
       console.log(us)
       const ps = req.body.password;
      for (let i = 0; i < js.length; i++) {
      
              if (js[i].username == us && js[i].password == ps) {

                 res.redirect("/home")
                  

              }

      }
       

});




router.post('/home', (req, res) => {
  
     
  const { Nom, Email, role, Identifiant,Mdp } = req.body;

  
  let newprod = {
    id:json.length + 1,
    Nom,
    Email,
    role,
    Identifiant,
    Mdp
    
  };


  json.push(newprod);

     

  // saving the array in a file
  const data = JSON.stringify(json);
  fs.writeFileSync('./data/users.json', data, 'utf-8');
    

  res.redirect('/home');
});


  // ----------delete---------------
router.get('/delete/:id', (req, res) => {
  json = json.filter(d => d.id != req.params.id);

  // saving data
  const data = JSON.stringify(json);
  fs.writeFileSync('./data/users.json', data, 'utf-8');

  res.redirect('/home')
  }); //---end


  // -------Update-----------
   router.post('/up', (req, res) => {
    console.log(req.body, req.params)
    const { id } = req.body;
    const { Nom,Email,role,Identifiant,Mdp } = req.body;

  json.forEach((pro) => {
    if (pro.id == id) {
        pro.Nom = Nom;
        pro.Email = Email;
        pro.role = role;
        pro.Identifiant = Identifiant;
        pro.Mdp = Mdp;

    }
  });
  res.redirect('/home');

}); //end--------
module.exports = router;



const express = require('express');
const fs = require('fs');
const router = express.Router();


  const  data = fs.readFileSync('./data/users.json');
  let json = JSON.parse(data);


 const  data1 = fs.readFileSync('./data/logiin.json');
 let Dlogin = JSON.parse(data1);



router.get('/home', (req, res) => {
  
  res.render('Home',{json});
});
router.get('/', (req, res) => {
  
  res.render('login',{json});
});
// PARTIE LOGIIN
router.post('/login', (req, res) => {
  
       const user = req.body.username;
       console.log(user)
       const psw = req.body.password;
      for (let i = 0; i < Dlogin.length; i++) {
      
              if (Dlogin[i].username == user && Dlogin[i].password == psw) {

                 res.redirect("/home")
                  

              }

      }
       

});


// PARTIE HOME

// ----------Ajouter---------------

router.post('/home', (req, res) => {
  
     
  const { Nom, Email, role, Identifiant,Mdp } = req.body;

  
  let newproduit = {
    id:json.length + 1,
    Nom,
    Email,
    role,
    Identifiant,
    Mdp
    
  };


  json.push(newproduit);

     

  // saving the array in a file
  const data = JSON.stringify(json);
  fs.writeFileSync('./data/users.json', data, 'utf-8');
  res.redirect('/home');
});


  // ----------delete---------------
router.get('/delete/:id', (req, res) => {
  json = json.filter(Userr => Userr.id != req.params.id);

  // saving data
  const data = JSON.stringify(json);
  fs.writeFileSync('./data/users.json', data, 'utf-8');
  res.redirect('/home')
  }); //---end


  // -------Update-----------
   router.post('/update', (req, res) => {
    const { id } = req.body;
    const { Nom,Email,role,Identifiant,Mdp } = req.body;

  json.forEach((produit) => {
    if (produit.id == id) {
        produit.Nom = Nom;
        produit.Email = Email;
        produit.role = role;
        produit.Identifiant = Identifiant;
        produit.Mdp = Mdp;

    }
  });
  const data = JSON.stringify(json);
  fs.writeFileSync('./data/users.json', data, 'utf-8');
  res.redirect('/home')
  });
   //---end


module.exports = router;



var express = require('express');
var router = express.Router();
const db = require("../models");
const SCategorie=db.scategorie
const Categorie=db.categorie
// afficher la liste des scategories.
router.get('/', async (req, res, )=> {
 await SCategorie.findAll({
 include: [
 { model: Categorie, as: 'categorie' }
 ]
}).then(data => {
res.send(data);
})
.catch(err => {
res.status(500).send({
 message:
 err.message || "Some error occurred while retrieving sous catégorie."
});
});
});
// créer une nouvelle scatégorie
router.post('/', async (req, res) => {
 await SCategorie.create(req.body).then(data => {
 res.send(data);
 })
 .catch(err => {
 res.status(500).send(err)
 });
});
// chercher une scatégorie
router.get('/:scategorieId',async(req, res)=>{
 await SCategorie.findByPk(req.params.scategorieId)
 .then(data => {
 if(data) res.send(data);
 else res.send({message:"not found"});
 })
 .catch(err => {
 res.status(500).send({message:err.message || "Some error occurred whileretrieving scategories." });
 })
});
// modifier une scatégorie
router.put('/:scategorieId', async (req, res)=> {
 const {scategorieId} = req.params


 await SCategorie.update(req.body, {
 where: {
 id:scategorieId
 }
 }).then((result) => {
 if(result[0]!=0) res.json("Enregistrement modifié");
 else res.send({message:"not found"});

 })
 .catch (err=> {
 res.send(err);
 })
});
// Supprimer une scatégorie
router.delete('/:scategorieId', async (req, res)=> {
 const { scategorieId } = req.params;
 await SCategorie.findByPk(scategorieId).then(async(cat) => {
 await cat.destroy().then(() => {
 res.send(`SCatégorie num ${cat.id} est supprimée`);
 })
 .catch (err=>{ res.json({ message: err}); })
 }).catch (err=>{ res.json({ message: 'Not Found'}); })
});
module.exports = router; 
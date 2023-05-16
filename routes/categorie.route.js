var express = require('express');
var router = express.Router();
const db = require("../models");
const Categorie=db.categorie
// afficher la liste des categories.
router.get('/', async (req, res, )=> {
 await Categorie.findAll()
 .then(data => {
 res.send(data);
 })
 .catch(err => {
 res.status(500).send({
 message:
 err.message || "Some error occurred while retrieving categories."
 });
 });
});
// créer une nouvelle catégorie
router.post('/', async (req, res) => {
 await Categorie.create(req.body).then(data => {
 res.send(data);
 })
 .catch(err => {
 res.status(500).send(err)
 });
});
// chercher une catégorie
router.get('/:categorieId',async(req, res)=>{
 await Categorie.findByPk(req.params.categorieId)
 .then(data => {
 if(data) res.send(data);
 else res.send({message:"not found"});
 })
 .catch(err => {
 res.status(500).send({message:err.message || "Some error occurred whileretrieving categories." });
 })
});
// modifier une catégorie
router.put('/:categorieId', async (req, res)=> {
 const {categorieId} = req.params


 await Categorie.update(req.body, {
 where: {
 id:categorieId
 }
 }).then((result) => {
 if(result[0]!=0) res.json("Enregistrement modifié");
 else res.send({message:"not found"});

 })
 .catch (err=> {
 res.send(err);
 })
});
// Supprimer une catégorie
router.delete('/:categorieId', async (req, res)=> {
 const { categorieId } = req.params;
 await Categorie.findByPk(categorieId).then(async(cat) => {
 await cat.destroy().then(() => {
 res.send(`Catégorie num ${cat.id} est supprimée`);
 })
 .catch (err=>{ res.json({ message: err}); })
 }).catch (err=>{ res.json({ message: 'Not Found'}); })
});
module.exports = router; 

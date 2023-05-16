var express = require('express');
var router = express.Router();
const db = require("../models");
const Article=db.article
const SCategorie=db.scategorie
const Categorie=db.categorie
// afficher la liste des articles.
router.get('/', async (req, res, )=> {
 await Article.findAll({
 include: [
 { model: SCategorie, as: 'scategorie',
 include: [
 { model: Categorie, as: 'categorie' }
 ] }
 ]
 }).then(data => {
 res.send(data);
 })
 .catch(err => {
 res.status(500).send({
 message:
 err.message || "Some error occurred while retrieving articles."
 });
 });
});
// créer un nouvel article
router.post('/', async (req, res) => {
 await Article.create(req.body).then(data => {
 res.send(data);
 })
 .catch(err => {
 res.status(500).send(err)
 });
});
// chercher un article
router.get('/:articleId',async(req, res)=>{
 await Article.findByPk(req.params.articleId)
 .then(data => {
 if(data) res.send(data);
 else res.send({message:"not found"});
 })
 .catch(err => {
 res.status(500).send({message:err.message || "Some error occurred whileretrieving article." });
 })
});
// modifier un article
router.put('/:articleId', async (req, res)=> {
 const {articleId} = req.params


 await Article.update(req.body, {
 where: {
 id:articleId
 }
 }).then((result) => {
 if(result[0]!=0) res.json("Enregistrement modifié");
 else res.send({message:"not found"});

 })
 .catch (err=> {
 res.send(err);
 })
});
// Supprimer un article
router.delete('/:articleId', async (req, res)=> {
 const { articleId } = req.params;
 await Article.findByPk(articleId).then(async(cat) => {
 await cat.destroy().then(() => {
 res.send(`Article num ${cat.id} est supprimé`);
 })
 .catch (err=>{ res.json({ message: err}); })
 }).catch (err=>{ res.json({ message: 'Not Found'}); })
});
module.exports = router;
const server = require('express').Router();
const { Reviews } = require('../db');
const {isAdmin, isAuthenticated} =require('../middleware/helper');

server.post("/:id/user/:idUser", function (req, res) {
    var { comentarios, puntaje } = req.body;
    Reviews.create(
      {
        comentarios: comentarios, 
        puntaje: puntaje,
        productId: req.params.id,
        userId: req.params.idUser
      }
    )
    .then(newReview => res.status(201).json({
		message: 'Nueva Review!',
		newReview
	}))
	.catch(error => res.status(400).json({
		message: 'No se creó la review',
		error: error
	}));
      });

//S55: Modifica Review
// server.put('/:id/review/:idReview', (req, res) =>{
//   const { id, idReview } = req.params;
//   Product.findByPk(id)
//       .then(res =>{
//           res.findByPk(idReview)
//               .then(reviews =>{
//                   reviews.update({
//                       comentarios: req.body.comentarios,
//                       puntaje: req.body.puntaje
//                   })
//                   res.status(200)
//                   .json({ message: 'Modificado'})
//               })
//       })
//       .catch(err =>{
//           res.status(404)
//           .json({ message: 'No se encuentra Review', err })
//       })
// });

//S55: Modifica Review
server.put('/:id/review/:idReview', (req, res)=>{
  const { id, idReview } = req.params;
  Reviews.update({
    comentarios: req.body.comentarios,
    puntaje: req.body.puntaje
  },
  {
    where: {
      productId: id,
      id: idReview
    }
  })
  .then(resp =>{
    res.status(200)
    .json({ message: 'modificado'})
  })
  .catch(err =>{
    res.status(404)
    .json({ message: 'No existe', err})
  })
  
})

server.delete('/:idReview/product/:id', (req, res)=>{
  const {id, idReview} = req.params;
    
  Reviews.destroy({
      where:{
          id:idReview,
          productId: id,
      }
  })
  .then(resp=>{
      res.json({ message: "success"})
  })
  .catch(err=>{
      res.status(400).json({message: err})
  })
})

//Obtener TODA la tabla Reviews
server.get('/', (req, res) =>{
  Reviews.findAll()
    .then(resp =>{
      res.status(200)
      .json(resp)
    })
    .catch(err =>{
      res.status(404)
      .json({ message: 'No se pudo Obtener la Tabla Revies', err})
    })
    
})


module.exports = server;
const agent = require('express');
const server = agent();

server.use((require('cors'))());

const data = require('./product.json');

//All Products
server.get('/',(req,res) => {
	if( req.query['category'] === undefined ) {
		res.send({count: data.length,data: data.products});
	}else {
		if( /^[a-z]{1,15}$/i.test(req.query['category']) ) {
			const d = data.products.filter(product => product.category === req.query['category']);
		res.send({count: d.length, data: d});
		}
		else {
			res.sendStatus(403);
		}
	}
})
// =======================================================================
//Single Product
server.get('/:productId',(req,res) => {
	const productId = Number(req.params['productId']);

	const productData = data['products'].find(product => product.id == productId);

	if( productData == undefined ) {
		res.sendStatus(404);
	}else {
		res.send(JSON.stringify(productData));
	}
});

// =========================================================================

server.get('/search', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';

  if (!q) return res.json({ count: 0, data: [] });

  const results = data.products.filter(product =>
    product.name.toLowerCase().includes(q)
  );

  res.json({ count: results.length, data: results.slice(0, 6) });
});
// ========================================================================
server.listen(8000,() => {
  console.log('Server running on http://localhost:8000');
});
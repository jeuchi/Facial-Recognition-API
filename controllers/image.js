const Clarifai = require('clarifai');
//REPLACE .FACE_DETECT_MODEL c0c0ac362b0C3416da06ab3fa36fb58e3
const app = new Clarifai.App({
 apiKey: 'e54bed8cdc51471d8709ed1970867ad9'
});

const handleApiCall = (req, res) => {
	 app.models
    // This part has been updated with the recent Clarifai changed. Used to be:
    // .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}
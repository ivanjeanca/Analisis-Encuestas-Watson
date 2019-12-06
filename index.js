const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
const corsConfig = { origin: '*', optionsSuccessStatus: 200 }

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const APIKey = 'Qx4OrTV_Zxjw7U23BOGtUzYHXLow-2SIb_aWsiGoe0LR';
const toneAnalyzer = new ToneAnalyzerV3({
    authenticator: new IamAuthenticator({ apikey: APIKey }),
    version: '2016-05-19',
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors(corsConfig))

app.listen(port, () => { console.log(`App running on port ${port}.`)})

app.post("/api/comentario", function (req, res, next) {
    //res.send('{"tones": [{"score": 0.218064,"tone_id": "anger","tone_name": "Anger"},{"score": 0.129389,"tone_id": "disgust","tone_name": "Disgust"},{"score": 0.229805,"tone_id": "fear","tone_name": "Fear"},{"score": 0.042736,"tone_id": "joy","tone_name": "Joy"},{"score": 0.479246,"tone_id": "sadness","tone_name": "Sadness"}],"category_id": "emotion_tone","category_name": "Emotion Tone"}');
    toneAnalyzer.tone(
    {
        toneInput: req.body.comentario,
        contentType: 'text/plain'
    })
    .then(response => {
        res.statusCode = 200;
        res.send(JSON.stringify(response.result.document_tone.tone_categories[0].tones, null, 2));
    })
    .catch(err => {
        console.log(err);
        res.statusCode = 404;
        res.send('{"Error": "La peticion no fue realizada correctamente"}');
    });
});
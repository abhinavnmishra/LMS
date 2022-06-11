const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const number = process.env.NUMBER;
const host = process.env.HOST;

const client = require('twilio')(accountSid, authToken);
const asyncHandler = require('../middleware/async');

exports.sendResourceUrl = asyncHandler(async (req, res, next) => {
    client.messages
        .create({
            body: 'Kindly go through the resource link provided below. '+host+'/whatsapp/redirect?id=123',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+917044025570'
        })
        .then(message => console.log(message.sid))
        .done();

    res.status(200).send('<iframe width="560" height="315" src="https://www.youtube.com/embed/JWN6qNGJQbI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
});



exports.sendLoginUrl = asyncHandler(async (req, res, next) => {
    client.messages
        .create({
            body: 'This is your unique Login URL : xyz',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+917044025570'
        })
        .then(message => console.log(message.sid))
        .done();

    res.status(200).send('Success!');
});

exports.redirect = asyncHandler(async (req, res, next) =>{
    if(req.query.id === '123'){
        return res.redirect('https://youtu.be/JWN6qNGJQbI');
    }
    else if(req.query.id === '234'){
        return res.redirect('https://youtu.be/JWN6qNGJQbI');
    }
    else{
        return res.redirect('https://youtu.be/JWN6qNGJQbI');
    }
});




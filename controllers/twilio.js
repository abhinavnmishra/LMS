const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const number = process.env.NUMBER;
const host = process.env.HOST;
const fetch = require('node-fetch-commonjs');

const client = require('twilio')(accountSid, authToken);
const asyncHandler = require('../middleware/async');

exports.sendResourceUrl = asyncHandler(async (req, res, next) => {
    client.messages
        .create({
            body: 'Kindly go through the resource link provided below. '+host+'whatsapp/redirect?id=123',
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


exports.otp = asyncHandler(async (req, res, next) => {

    const encodedParams = new URLSearchParams();
    encodedParams.append("to", "+917044025570");
    encodedParams.append("p", "zJJDjqvan7BApoHq3kbnkK9y5lstodkfArgcrvuROaaY1kPjdJYhbNVJCaAMvbid");
    encodedParams.append("text", "Your otp is 3456");

    const url = 'https://sms77io.p.rapidapi.com/sms';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '4f4cce1780msh079ce874cfd1627p1b64dcjsn80984404a809',
            'X-RapidAPI-Host': 'sms77io.p.rapidapi.com'
        },
        body: encodedParams
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));

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




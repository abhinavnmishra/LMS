const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const number = process.env.TWILIO_NUMBER;
const host = process.env.HOST;
const rapidAuth = process.env.SMS_AUTH;
const fetch = require('node-fetch-commonjs');

const client = require('twilio')(accountSid, authToken);
const asyncHandler = require('../middleware/async');

exports.sendResourceUrl = asyncHandler(async (req, res, next) => {
    client.messages
        .create({
            body: 'Kindly go through the resource link provided below. '+host+'whatsapp/redirect?id=123',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+919501750557'
        })
        .then(message => console.log(message.sid))
        .done();

    res.status(200).send('<iframe width="560" height="315" src="https://www.youtube.com/embed/JWN6qNGJQbI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
});

exports.sendUrl = function (token, contact){
    client.messages
        .create({
            body: 'This is your unique Login URL : '+token,
            from: 'whatsapp:'+number,
            to: 'whatsapp:+91'+contact
        })
        .then(message => console.log(message.sid))
        .done();
}


exports.otp = asyncHandler(async (req, res, next) => {

    const encodedParams = new URLSearchParams();
    encodedParams.append("to", "+91"+req.body.number);
    encodedParams.append("p", rapidAuth);
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
        .then(json => {
            console.log(json);
            res.status(200).json({
                success: true,
                data: json,
            });
        })
        .catch(err => {
            console.error('error:' + err);
            res.status(500).json({
                success: false,
                data: 'null',
            });
        });

});

exports.validateOtp = asyncHandler(async (req, res, next) => {

    if(req.body.otp === '3456')
        res.status(200).send('Success');
    else
        res.status(403).send('Failed');
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




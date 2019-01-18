const express = require('express');
const bodyParser = require('body-parser');

const SerialPort = require("serialport");

const app = express();

const webport = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(webport, () => {
  console.log('We are live on ' + webport);
});
 
app.post('/sendSMS', (req, res) => {

	const sms = sendSMS(req.body.phone, req.body.message);
	sms.then(function (result) {
		res.send(result);
	})
	.catch(function(err){
		res.send(`Error: ${err}`);
	});
	
});



const sendSMS = (phone, message) => {
	return new Promise((resolve, reject) => {
			const port = new SerialPort(`/dev/${process.env.device}`);
			port.on('open', () => {
	
				port.on('data', (data) => {
					const result  = data.toString('utf8').trim();
					console.log('Receive: ' + result);
					if (result.includes('+CMGS:')) {
						console.log("enviado com sucesso");
						port.close();
						resolve('enviado com sucesso');
					} else if(result.includes('ERROR')) {
						port.close();
						reject('ERRO AO ENVIAR');
					}
				});
	
				port.on('close', (data) => {
					console.log('Close: ' + data);
				});
	
				port.on('error', (err) =>{
					console.log(`Error: ${err}`);
					reject(err);
				});
	
				port.write('AT+CMGF=1\r');
				port.write('AT+CMGS="'+phone+'"\r');
				port.write(message);
				port.write(new Buffer([0x1a]));
			});
	});
}

// const mock = {
// 	device: 'tty.HUAWEIMobile-Modem',
// 	phone: '11984228775',
// 	message: 'NodeJS SMS test by Thiago Vito'
// }

// sendSMS(mock.device, mock.phone, mock.message);
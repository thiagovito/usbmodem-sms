# USBMODEM-SMS

The intention of this project is to USE any USB Modem (GSM/3G/4G) to send SMS using NodeJS libs:

  - Express
  - BodyParser
  - serialport
 
### How to run

Requires [Node.js](https://nodejs.org/) v4+ to run.
In order to run you need also to install **serialport-list** as per bellow steps, to identify the device ID so it can be read by the serial-port lib.

```sh
$ npm install -g @serialport/list
$ serialport-list
```

Once you ran serialport-list it shows all the available serial port devices. Identify the modem and use it on the command below 

Install the dependencies and devDependencies and start the server.

```sh
$ cd usbmodem-sms
$ npm install
$ device=[deviceName] node .
```

### Testing Request

In order to test the API request use the following Curl command:

```code
curl -X POST \
  http://localhost:8000/sendSMS/ \
  -H 'Content-Type: application/json' \
  -d '{
        "phone": "11999999999",
        "message": "This is the message"
      }'
```
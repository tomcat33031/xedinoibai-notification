// Setting Express server
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res, next) {
    res.send("<h1>Hello Server</h1>");
});

app.post('/send', function (req, res, next) {
    // Config mail server
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.USER_NAME,
            pass: process.env.PASS_WORD
        }
    });
    var mainOptions = { // Setting sender
        from: 'tongdaigoixe8888@gmail.com',
        to: 'Dieuhanhxenoibai@gmail.com',
        subject: 'Đơn đặt xe được hoàn thành',
        html: '<p>Bạn nhận được đơn đặt xe từ khách hàng  : ' + req.body.name + ' . Số điện thoại : ' + req.body.phone + '</p><ul><li>Loại xe :' + req.body.cartype + '</li><li>Chuyến đi :' + req.body.drivetype + '</li><li>Thời Gian và địa điểm đón :' + req.body.desc + '</li></ul>'
    };

    console.log(req.body);

    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            res.json({
                "status": "ERROR",
                "message": err
            });
        } else {
            console.log('Message sent: ' + info.response);
            res.json({
                "status": "OK",
                "message": "Send email successfully."
            });
        }
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

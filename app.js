const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(`${__dirname}/index.html`);
});

app.post("/", function (req, res) {
    let power = Number(req.body.power);
    let head = Number(req.body.head);
    let rpm = Number(req.body.rpm);
    let discharge = Number(req.body.discharge);
    let diameter = Number(req.body.diameter);
    let ratio = Number(req.body.ratio);

    const specificSpeed = rpm * ((Math.sqrt(power)) / (Math.pow(head, 1.25)));

    const efficiency = (power * 1000) / (1000 * discharge * head * 9.81);

    const Radps = (Math.PI * diameter * rpm) / (60);

    const speedRatio = (Radps) / Math.sqrt(2 * 9.81 * head);

    const hubDiameter = ratio * diameter;

    const flowVelocity = (discharge * 4) / (Math.PI * (Math.pow(diameter, 2) - Math.pow(hubDiameter, 2)));

    const flowRatio = (flowVelocity) / (Math.sqrt(2 * 9.81 * head));

    res.send(`These are your answers:\n Turbine Efficiency = ${efficiency} \n Specific Speed = ${specificSpeed} \n Speed Ratio = ${speedRatio} \n Flow Ratio = ${flowRatio}`);
})

app.listen(3000, function () {
    console.log("Server is running successfully at port 3000");
});
const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
	res.send("Hello World mama!");
});

const services = [
	{
		id: 1,
		name: "Rice",
		supplier: "Motalab",
		price: "$15",
		description:
			"We have imported rice from thailand, where we have stored variety of rices",
		img: "https://i.ibb.co/YL0d57D/images.jpg",
	},
	{
		id: 2,
		name: "fruits",
		supplier: "Diago",
		price: "$10",
		description:
			"There are many types of fruits available from diffrent region. We are serving a affordable price. ",
		img: "https://i.ibb.co/3ckMtBk/Background-4.png",
	},
	{
		id: 3,
		name: "sneaks",
		supplier: "alfard",
		price: "$12",
		description:
			"We have imported the cookies and all types of snakes from UAE, the quality is good and price also affordable . ",
		img: "https://i.ibb.co/DRkVrtY/Background-3.png",
	},
	{
		id: 4,
		name: "soft drinks",
		supplier: "Poh wee",
		price: "$10",
		description:
			"Our drinks are certified by INSAN, WHO also authorised our product.",
		img: "https://i.ibb.co/Zzvb00z/Background-10.png",
	},
	{
		id: 5,
		name: "Dry food",
		supplier: "Malvin Mabi",
		price: "$15",
		description: "We imported from USA, our product quality is good ",
		img: "https://i.ibb.co/vkknjx1/Background-8.png",
	},
	{
		id: 6,
		name: "Fresh vegetable",
		supplier: "Indrojit",
		price: "$10",
		description: "We are serving our local product as well as imported one. ",
		img: "https://i.ibb.co/7Jgpw75/Background.png",
	},
];

app.get("/service", (req, res) => {
	res.send(service);
});
app.get("/services/:id", (req, res) => {
	console.log(req.params);
	const id = req.params.id;
	const service = services.find((f) => f.id == id);
	res.send(service);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

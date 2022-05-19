// user: FreshGoods
// W7VRyyyISJEvRPfm
const express = require("express");
require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//password added
const uri =
	"mongodb+srv://FreshGoods:jylUOzhc3yInOVlF@cluster0.hrdrz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

async function run() {
	try {
		await client.connect();
		console.log("db connected");

		const productCollection = client.db("FreshGoods").collection("product");
		app.get("/products", async (req, res) => {
			try {
				const cursor = productCollection.find({});
				const product = await cursor.toArray();
				res.send(product);
			} catch (err) {
				res.send(err);
			}
		});
		// app.get("/products", async (req, res) => {
		// 	const query = {};
		// 	const cursor = productCollection.find(query);
		// 	const product = await cursor.toArray();
		// 	res.send(product);
		// });
		app.get("/products/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const products = await productCollection.findOne(query);
			res.send(products);
		});
		app.put("/products/:id", async (req, res) => {
			const id = req.params.id;
			const updateProduct = req.body.quantities;
			const filter = { _id: ObjectId(id) };
			const options = { upsert: true };
			const updateDoc = {
				$set: {
					quantity: updateProduct,
				},
			};
			const result = await productCollection.updateOne(
				filter,
				updateDoc,
				options
			);
			res.send(result);
		});
		app.post("/products", async (req, res) => {
			const doc = req.body;
			const result = await productCollection.insertOne(doc);
			res.send(result);
		});
		//delete
		app.delete("/products/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await productCollection.deleteOne(query);
			res.send(result);
		});
		// will use later
	} finally {
		// await client.close();
	}
}
run().catch(console.dir);
app.get("/", (req, res) => {
	res.send("yes running key-two-telecom server site");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

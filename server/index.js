const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const asyncHandler = require("./asyncHandler");
const errorHandler = require("./errorHandler");
// MiddleWare
app.use(cors());
app.use(express.json());
app.use(errorHandler);
/* MongoDB Start */

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@bistro-begin.f9obfsm.mongodb.net/?retryWrites=true&w=majority&appName=bistro-begin`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const menuCollection = client.db("bistroDB").collection("menu");
    const userCollection = client.db("bistroDB").collection("users");
    const reviewCollection = client.db("bistroDB").collection("reviews");
    const cartCollection = client.db("bistroDB").collection("carts");

    /**
     *-------------------------  User Related APIs start----------------
     */

    app.patch("/users/admin/:id", async (req, res) => {
      res.send(
        await userCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: { role: "admin" } }
        )
      );
    });

    app.get(
      "/users",
      asyncHandler(async (req, res) => {
        res.send(await userCollection.find().toArray());
      })
    );

    app.post(
      "/users",
      asyncHandler(async (req, res) => {
        const user = req.body;
        // Insert user if doesn't exist
        // Ways(1. email unique , 2. upsert 3. query)
        const query = { email: user.email };
        const isExist = await userCollection.findOne(query);
        if (isExist) {
          return res.send({ message: "User already exist", insertedId: null });
        }
        const result = await userCollection.insertOne(user);
        res.send(result);
      })
    );

    app.delete(
      "/users/:id",
      asyncHandler(async (req, res) => {
        res.send(
          await userCollection.deleteOne({ _id: new ObjectId(req.params.id) })
        );
      })
    );

    /**
     * -------------------------  User Related APIs end --------------
     */

    /* _______MENU START */

    app.get(
      "/menu",
      asyncHandler(async (req, res) => {
        res.send(await menuCollection.find().toArray());
      })
    );

    /* _______MENU END */

    app.get(
      "/reviews",
      asyncHandler(async (req, res) => {
        res.send(await reviewCollection.find().toArray());
      })
    );

    /**
     * Cart Collection Start
     */
    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const { menuId, email } = req?.body;

      const isExists = await cartCollection.findOne({ menuId, email });
      if (isExists)
        return res
          .status(400)
          .send({ message: "Item already in your cart", exists: true });

      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });

    app.get("/carts", async (req, res) => {
      const email = req.query?.email;
      const query = { email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });

    /* Delete an item */
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
      res.send([]);
    });
    /**
     * Cart Collection End
     */

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

/* MongoDB End */

app.get("/", (req, res) => {
  res.send("Bistro is being hyped");
});

app.listen(port, () => {
  console.log(`Bistro in firing`);
});

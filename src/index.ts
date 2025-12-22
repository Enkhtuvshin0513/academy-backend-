import { MongoClient, ObjectId } from "mongodb";

const uri =
  "mongodb+srv://enkhtuvshinej_db_user:7aLod5Z9aBfk23pu@backend-lesson.pfxqeun.mongodb.net/sample_mflix?appName=backend-lesson";

const client = new MongoClient(uri);

const run = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db("sample_mflix");

    // const movies = await db
    //   .collection("movies")
    //   .find({ "imdb.rating": 7.2 })
    //   .toArray();
    // console.log(movies);

    const comments = await db
      .collection("comments")
      .find({ movie_id: new ObjectId("573a1390f29313caabcd4323") })
      .toArray();

    console.log(comments);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

run();

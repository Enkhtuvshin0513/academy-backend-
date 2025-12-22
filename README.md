# 1. npm init // package.json suulgah

# 2. npn install npm install typescript --save-dev // typescript init hiih command

# 3. npx tsc -init // tsconfig.json

# 4. npm install ts-node

# find().toArray() buh object butsaan -> []

## find().limit(20).toArray() ehnii 20n object butsaan -> []

## find().limit(20).sort(year:-1).toArray() jileer sortolj ehnii 20iig bustaan -> []

    const movies = await db
      .collection("movies")
      .find()
      .sort({ year: -1 })
      .limit(10)
      .toArray();

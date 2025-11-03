import readline from "readline/promises";

const ql = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuetion = text => {
  return new Promise(resolve => {
    ql.question(text, answer => {
      resolve(answer);
    });
  });
};

try {
  const nas = await askQuetion("Nasaa oruulna uu");
  console.log(nas);
} catch (e) {
  console.log(e, "123123");
}

process.exit();

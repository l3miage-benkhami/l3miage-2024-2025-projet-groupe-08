const { CAMIONS } = require("./camion.data.ts");
const fs = require("fs");

for (let i = 0; i < CAMIONS.length; i++) {
  CAMIONS[i]["tournee_id"] = -1;
}

fs.writeFile("output.json", JSON.stringify(CAMIONS, null, 2), (err) => {
  if (err) console.error("Error writing to file", err);
  else console.log("Data written to output.json");
});

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, () => console.log(`Server began dancing on PORT ${PORT}`));

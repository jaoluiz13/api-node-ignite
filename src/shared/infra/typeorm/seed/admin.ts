import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
  const conection = await createConnection("localhost");
  const id = uuidv4();
  const password = await hash("admin", 8);
  await conection.query(`INSERT INTO users (id,name,email,password,"is_admin",created_at,driver_license) 
  VALUES ('${id}','userAdmin','admin@rentx.com.br','${password}',true,'NOW()','XXXXXXX')`);

  await conection.close();
}
create().then(() => {
  console.log("User admin created successfully");
});

import { hash } from 'bcryptjs';
import { createConnection } from 'typeorm';
import { v4 as uuid } from 'uuid';

async function create() {
  const connection = await createConnection();

  const id = uuid();
  const password = await hash('admin', 8);
  const queryStatement = `INSERT INTO USERS(id, name, email, password, cpf, is_deliveryman, created_at, updated_at)
  values('${id}', 'admin', 'admin@fastfeet.com.br', '${password}', '38888888869', false, 'now()', 'now()')`;

  await connection.query(queryStatement);

  await connection.close();
}

create().then(() => console.log('User admin created'));

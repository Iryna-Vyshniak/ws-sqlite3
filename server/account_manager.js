// bcrypt
const bcrypt = require('bcrypt');

let db = null;
let dbmysql = null;

function setDatabase(dbm) {
  db = dbm;
}
function setDatabaseMysql(dbm) {
  dbmysql = dbm;
}

function control(ws) {
  ws.on('message', async (message) => {
    try {
      const { type, data } = JSON.parse(message);
      if (type === 'login') {
        const { login, password } = data;
        const user = await getUserByLogin(login);
        //                const userMysql = await getUserByLogin2(login);
        if (!user) {
          ws.send(JSON.stringify({ type: 'loginError', message: 'userFailed' }));
          return;
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
          ws.send(JSON.stringify({ type: 'loginSuccess', user }));
          //                        console.log('data:'+ JSON.stringify(userMysql));
        } else {
          ws.send(JSON.stringify({ type: 'loginError', message: 'passwdFailed' }));
        }
      } else if (type === 'register') {
        const existingUser = await getUserByLogin(data.login);
        if (existingUser) {
          ws.send(
            JSON.stringify({
              type: 'registerError',
              message: 'Користувач з таким логіном вже існує',
            })
          );
          return;
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = { ...data, password: hashedPassword };

        db.run(
          'INSERT INTO users (login, password, name, surname, accessLevel, email, dateCreate, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [
            newUser.login,
            newUser.password,
            newUser.name,
            newUser.surname,
            newUser.accessLevel || 0,
            newUser.email,
            new Date().toISOString(),
            newUser.icon || '',
          ],
          function (err) {
            if (err) {
              console.error(err.message);
              ws.send(JSON.stringify({ type: 'registerError', message: 'accountFailed' }));
            } else {
              newUser.id = this.lastID;
              ws.send(JSON.stringify({ type: 'registerSuccess', user: newUser }));
            }
          }
        );
      } else if (type === 'get_users') {
        db.all('SELECT * FROM users', (err, rows) => {
          if (err) {
            console.error(err);
            return;
          }

          ws.send(JSON.stringify({ type: 'users_data', users: rows }));
        });
      } else if (type === 'edit-user') {
        const { id, updates } = data;
        const updateFields = Object.keys(updates)
          .map((key) => `${key} = ?`)
          .join(', ');
        const stmt = db.prepare(`UPDATE users SET ${updateFields} WHERE id = ?`);
        const values = [...Object.values(updates), id];

        stmt.run(...values);
        stmt.finalize();
      } else if (type === 'delete-user') {
        db.run('DELETE FROM users WHERE id = ?', [data.id], (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }
    } catch (error) {
      console.error('Помилка при розборі повідомлення:', error);
    }
  });
}

function getUserByLogin(login) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE login = ?', [login], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
function getUserByLogin2(login) {
  return new Promise((resolve, reject) => {
    dbmysql.query('SELECT * FROM users WHERE login = ?', [login], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

module.exports = { control, setDatabase, setDatabaseMysql };

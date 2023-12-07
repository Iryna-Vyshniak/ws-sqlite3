const insert = (tableName, placeholders, values, db) => {
  const columns = placeholders.join(', ');
  // console.log('columns: ', columns); // name, orgname
  const placeholdersString = values.map(() => '?').join(', ');
  //   console.log('placeholdersString: ', placeholdersString); // ?, ?
  const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholdersString});`;

  db.run(sql, values, (err) => {
    if (err) {
      return console.log(err.message);
    }

    console.log(`A row has been inserted`);
  });
};

export default insert;

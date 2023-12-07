const update = (tableName, placeholders, values, where, db) => {
  const setClause = placeholders.map((placeholder) => `${placeholder} = ?`).join(', ');
  // console.log('setClause:', setClause); // setClause: name = ?, orgname = ?, datacreate = ?
  const sql = `UPDATE ${tableName} SET ${setClause} WHERE ${where};`;
  // console.log('Generated SQL:', sql); // Generated SQL: UPDATE projects SET name = ?, orgname = ?, datacreate = ? WHERE id = 4;
  const params = [...values];
  // console.log('Params:', params); // Params: [ 'Alexander Nguyens', 'MNO Inc.', '2023-12-07' ]

  db.run(sql, params, (err) => {
    if (err) {
      return console.log('Error updating row:', err.message);
    }

    console.log(`A row has been updated where ${where}`); // A row has been updated where id = 4
  });
};

export default update;

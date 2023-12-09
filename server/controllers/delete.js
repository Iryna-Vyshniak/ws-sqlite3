const deleteData = (tableName, where, db) => {
  const sql = `DELETE FROM ${tableName} WHERE ${where}`;

  db.run(sql, (err) => {
    err
      ? console.log('Error deleting row:', err.message)
      : console.log(`A row has been deleted where ${where}`);
  });
};

export default deleteData;

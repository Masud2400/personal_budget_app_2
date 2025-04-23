const express = require('express');
const app = express();
const {Pool} = require('pg');

const pool = new Pool({
    user: 'masud',
    host: 'localhost',
    database: 'postgres',
    password: 'new_password',
    port: 5432,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.post('/submit-summary', async (req, res) => {
    const { totalSpent, remainingBalance, salary, categoryBreakdown } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO transactions (totalSpent, remainingBalance, salary) VALUES ($1, $2, $3) RETURNING id',
        [totalSpent, remainingBalance, salary]
      );
      const transactionId = result.rows[0].id;
  
      const categories = JSON.parse(categoryBreakdown);
      for (const [category, amount] of Object.entries(categories)) {
        await pool.query(
          'INSERT INTO categories (category, amount, transactionId) VALUES ($1, $2, $3)',
          [category, amount, transactionId]
        );
      }
  
      res.sendStatus(200);
    } catch (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Server error');
    }
});  

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server listening on port ' + port);
})

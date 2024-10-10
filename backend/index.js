import express from 'express'
import cors from 'cors'

import db from './config/db.js'

const app = express()
const PORT = 5000
app.use(cors());
app.use(express.json());

app.post('/api/standings', async (req, res) => {
    const { option } = req.body;

    console.log(option)

    try {
        if (option !== 'MLS') {
            const result = await db.query('SELECT * FROM teams WHERE conference = $1 ORDER BY id', [option]);
            res.json(result.rows);
        } else {
            const result = await db.query('SELECT * FROM teams ORDER BY id');
            res.json(result.rows);
        }
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
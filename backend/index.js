import express from 'express'
import cors from 'cors'

import db from './config/db.js'

const app = express()
const PORT = 5000
app.use(cors());

app.get('/api/teams', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM teams ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
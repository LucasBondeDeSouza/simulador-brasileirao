import express from 'express'
import cors from 'cors'

import db from './config/db.js'

const app = express()
const PORT = 5000
app.use(cors());
app.use(express.json());

app.post('/api/standings', async (req, res) => {
    const { option } = req.body;

    try {
        if (option !== 'MLS') {
            const result = await db.query(`
                SELECT teams.id, teams.name, teams.logo_url, standings.games, standings.wins, standings.draws, standings.losses, standings.goals_for, standings.goals_against, standings.goal_difference, standings.points
                FROM teams
                INNER JOIN standings ON teams.id = standings.team_id
                WHERE conference = $1;
            `, [option]);
            res.json(result.rows);
        } else {
            const result = await db.query(`
                SELECT teams.id, teams.name, teams.logo_url, standings.games, standings.wins, standings.draws, standings.losses, standings.goals_for, standings.goals_against, standings.goal_difference, standings.points
                FROM teams
                INNER JOIN standings ON teams.id = standings.team_id
            `);
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
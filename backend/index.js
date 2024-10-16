import express from 'express'
import cors from 'cors'

import db from './config/db.js'

const app = express()
const PORT = 5000
app.use(cors());
app.use(express.json());

app.get('/api/standings', async (req, res) => {

    try {
        const result = await db.query(`
            SELECT teams.id, teams.name, teams.logo_url, standings.games, standings.wins, standings.draws, standings.losses, standings.goals_for, standings.goals_against, standings.goal_difference, standings.points
            FROM teams
            INNER JOIN standings ON teams.id = standings.team_id
        `);

        console.log(result.rows)
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados' });
    }
});

app.get('/api/matches', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT
                matches.id AS match_id,
                home_team.id AS home_team_id,
                home_team.alternative_name AS home_team_name,
                home_team.logo_url AS home_team_logo,
                away_team.id AS away_team_id,
                away_team.alternative_name AS away_team_name,
                away_team.logo_url AS away_team_logo,
                matches.home_score,
                matches.away_score,
                matches.round
            FROM matches
            JOIN teams AS home_team ON matches.home_team_id = home_team.id
            JOIN teams AS away_team ON matches.away_team_id = away_team.id;
        `);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' }); // Enviando uma resposta de erro adequada
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
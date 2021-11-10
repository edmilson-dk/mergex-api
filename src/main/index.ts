import 'module-alias/register';
import dotenv from 'dotenv';

dotenv.config();

import { app } from './setup/app';

const PORT = Number(process.env.PORT) || 8080;

app.get('/github', (request, response) => {
  response.redirect(`${process.env.GITHUB_AUTH_URL}?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

app.get('/github/callback', (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

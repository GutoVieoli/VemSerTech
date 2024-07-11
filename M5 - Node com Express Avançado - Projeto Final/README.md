# Earth Engine Demo: Server-Side Authentication in Node.js

This example shows how to build a simple Google App Engine web application that
communicates with Google Earth Engine. Upon successful deployment, you will see
a webpage with an interactive map showing terrain slope zoomed into the east
coast of Australia.

To set the app up yourself, download the Earth Engine API repository from
GitHub:

```
git clone https://github.com/google/earthengine-api.git
```

Navigate to the Node.js Server Auth example code:

```
cd ./earthengine-api/demos/server-auth-nodejs
```

Then follow the instructions in the Developer Docs to
[deploy an EE-based App Engine app](https://developers.google.com/earth-engine/app_engine_intro#deploying-app-engine-apps-with-earth-engine).
For the credentials section, you'll need a Service Account, not an OAuth2 Client
ID. Next:

1.  Rename the downloaded Service Account JSON private key file to
    `.private-key.json` and move it into the `demos/server-auth-nodejs` folder.
2.  [Create an API key](https://developers.google.com/maps/documentation/javascript/get-api-key)
    and include it in `index.html` to properly initialize the Google Maps API.


---
---
---
---

Para organizar uma API backend que faz uso do Google Earth Engine e segue uma estrutura de pastas padrão (controllers, routes, etc), você pode adotar a seguinte organização:

# Estrutura de Pastas Sugerida

```
/src
  /config
  /controllers
  /models
  /routes
  /services
  /utils
  /middlewares
  index.js (ou app.js)
```

### Explicação das Pastas

1. **config**: Arquivos de configuração da aplicação, como configurações do banco de dados, variáveis de ambiente, etc.
2. **controllers**: Controladores que lidam com as requisições HTTP e contêm a lógica de negócios.
3. **models**: Modelos de dados para interagir com o banco de dados.
4. **routes**: Definição das rotas da API e sua associação com os controladores.
5. **services**: Serviços que contêm a lógica de integração com APIs externas, como o Google Earth Engine.
6. **utils**: Utilitários e funções auxiliares que podem ser reutilizadas em várias partes da aplicação.
7. **middlewares**: Middlewares que processam as requisições antes de chegarem aos controladores.

### Onde Colocar as Requisições ao Google Earth Engine

Os arquivos que fazem as requisições ao Google Earth Engine e retornam os dados aos clientes devem ser colocados na pasta **services**. Isso ajuda a separar a lógica de integração externa do restante da lógica de negócios e controle.

### Exemplo de Organização dos Arquivos

#### /src/services/earthEngineService.js

```javascript
// Importação de dependências necessárias
const { auth } = require('google-auth-library');
const { ee } = require('@google/earthengine');

// Função para autenticar e inicializar o Earth Engine
async function initializeEarthEngine() {
  const client = await auth.getClient({
    scopes: ['https://www.googleapis.com/auth/earthengine.readonly'],
  });
  ee.data.authenticateViaOauth(client.credentials);
}

// Função para fazer requisições ao Earth Engine
async function fetchEarthEngineData(params) {
  await initializeEarthEngine();

  // Lógica para fazer a requisição ao Earth Engine usando os parâmetros fornecidos
  const result = await new Promise((resolve, reject) => {
    ee.ImageCollection('COPERNICUS/S2')
      .filterDate(params.startDate, params.endDate)
      .getRegion(params.region, params.scale)
      .evaluate((data, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
  });

  return result;
}

module.exports = {
  fetchEarthEngineData,
};
```

#### /src/controllers/mapController.js

```javascript
const earthEngineService = require('../services/earthEngineService');

// Função para lidar com a rota que solicita dados do Earth Engine
async function getEarthEngineData(req, res) {
  try {
    const params = req.query;
    const data = await earthEngineService.fetchEarthEngineData(params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getEarthEngineData,
};
```

#### /src/routes/mapRoutes.js

```javascript
const express = require('express');
const mapController = require('../controllers/mapController');

const router = express.Router();

// Definição da rota que solicita dados do Earth Engine
router.get('/earth-engine-data', mapController.getEarthEngineData);

module.exports = router;
```

#### index.js (ou app.js)

```javascript
const express = require('express');
const mapRoutes = require('./src/routes/mapRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Registro das rotas
app.use('/api/maps', mapRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### Resumo

- **services**: Coloque os arquivos responsáveis por interagir com o Google Earth Engine.
- **controllers**: Lógica de negócios e tratamento das requisições HTTP.
- **routes**: Definição e associação das rotas.

Essa estrutura modulariza sua aplicação, tornando-a mais organizada e facilitando a manutenção e escalabilidade futura.
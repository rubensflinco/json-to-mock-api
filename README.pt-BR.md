# Json-To-Mock-Api

[English](README.md) | [Português (Brasil)](README.pt-BR.md)

Uma CLI simples para criar servidores REST a partir de um arquivo JSON ou de uma pasta com vários arquivos JSON, com **documentação Swagger integrada automaticamente**.

[![Versão no NPM](https://img.shields.io/npm/v/json-to-mock-api.svg)](https://www.npmjs.com/package/json-to-mock-api)
[![Licença: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/rubensflinco/json-to-mock-api/blob/main/LICENSE)
[![GitHub](https://img.shields.io/github/stars/rubensflinco/json-to-mock-api?style=social)](https://github.com/rubensflinco/json-to-mock-api)

## ✨ Funcionalidades

- 📋 **Documentação Swagger automática**: interface interativa para testar e documentar APIs
- 🔧 **Headers personalizados**: suporte a headers de resposta para simulações realistas
- 🍪 **Cookies personalizados**: suporte a cookies de resposta com opções avançadas
- 🔄 **Schemas inline**: geração automática de schemas com base nos dados
- 🚀 **Vários métodos HTTP**: suporte a GET, POST, PUT, DELETE, PATCH, OPTIONS e HEAD
- 📁 **Modo arquivo ou pasta**: carregue vários arquivos JSON ou um único arquivo
- 🌐 **CORS habilitado**: pronto para aplicações web
- 🔗 **Parâmetros de rota**: suporte automático a parâmetros como `:id` e `:userId`
- 🏷️ **Agrupamento inteligente**: endpoints agrupados pela pasta ou arquivo de origem

## Instalação

```bash
# Instalação global
npm install -g json-to-mock-api

# Ou execute diretamente com npx
npx --yes json-to-mock-api
```

## Início rápido

### 1. Crie um arquivo JSON chamado `db.json`:

```json
{
  "endpoints": {
    "users": {
      "GET": {
        "body": [
          { "id": 1, "name": "John Doe", "email": "john@email.com" },
          { "id": 2, "name": "Jane Smith", "email": "jane@email.com" }
        ],
        "headers": {
          "X-Total-Count": "2"
        },
        "cookies": {
          "session": "abc123"
        }
      },
      "POST": {
        "body": { "id": 3, "name": "New User", "email": "new@email.com" }
      }
    },
    "users/:id": {
      "GET": {
        "body": { "id": 1, "name": "John Doe", "email": "john@email.com" }
      }
    }
  }
}
```

### 2. Execute o comando:

```bash
npx --yes json-to-mock-api -f db.json
```

### 3. Acesse:

- **Swagger UI**: `http://localhost:3000/` (documentação interativa)
- **Endpoint da API**: `http://localhost:3000/users`
- **Especificação OpenAPI**: `http://localhost:3000/swagger.json`

## Modos de uso

### Modo arquivo

```bash
json-to-mock-api -f db.json
```

### Modo pasta

```bash
json-to-mock-api -d ./data
```

## Opções da CLI

- `-f, --file <path>`: caminho para o arquivo JSON
- `-d, --directory <path>`: caminho para a pasta com arquivos JSON
- `-p, --port <number>`: porta do servidor (padrão: 3000)
- `-h, --host <string>`: host do servidor (padrão: localhost)

## 📚 Documentação completa

Consulte a [documentação oficial](https://json-to-mock-api.fdoma.in/) para guias de configuração, exemplos e recursos avançados, incluindo headers, cookies, parâmetros de rota e organização de vários arquivos.

## Licença

MIT

---

**[📖 Documentação completa](https://json-to-mock-api.fdoma.in/)** | **[🐛 Reportar um problema](https://github.com/rubensflinco/json-to-mock-api/issues)** | **[💬 Discussões](https://github.com/rubensflinco/json-to-mock-api/discussions)**

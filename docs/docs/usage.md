# Uso

## Sintaxe Básica

### Modo Arquivo
```bash
json-to-mock-api -f db.json
```

### Modo Pasta
```bash
json-to-mock-api -d ./data
```

## Sintaxe Completa

```bash
json-to-mock-api [opções]
```

## Exemplos Práticos

### Exemplo 1: Arquivo JSON Simples
```bash
json-to-mock-api -f db.json
```

### Exemplo 2: Pasta com Porta Personalizada  
```bash
json-to-mock-api -d ./mock-data -p 8080
```

### Exemplo 3: Host e Porta Específicos
```bash
json-to-mock-api -f db.json -h 0.0.0.0 -p 3000
```

### Exemplo 4: Usando npx
```bash
npx --yes json-to-mock-api -d ./data
```

## 📁 Estrutura de Arquivos

### Modo Arquivo

No modo arquivo, toda a configuração fica em um único arquivo JSON:

```json title="db.json"
{
  "endpoints": {
    "users": {
      "GET": {
        "body": [...],
        "headers": {...},
        "cookies": {...}
      },
      "POST": {
        "body": {...}
      }
    },
    "products": {
      "GET": {
        "body": [...]
      }
    }
  }
}
```

### Modo Pasta

No modo pasta, você pode organizar endpoints em múltiplos arquivos:

```
data/
├── users.json          # Endpoint: /users
├── products.json       # Endpoint: /products
├── api/
│   ├── orders.json     # Endpoint: /api/orders
│   └── users.json      # Endpoint: /api/users (estrutura completa)
└── config/
    └── settings.json   # Endpoint: /config/settings
```

#### Arquivos JSON Simples

Cada arquivo JSON simples vira automaticamente um endpoint GET:

```json title="data/users.json"
[
  { "id": 1, "name": "João Silva", "email": "joao@email.com" },
  { "id": 2, "name": "Maria Santos", "email": "maria@email.com" }
]
```

**Resultado:** Endpoint `GET /users`

#### Arquivos com Estrutura Completa

Para controle total, use a estrutura de endpoints:

```json title="data/api/users.json"
{
  "endpoints": {
    "users": {
      "GET": {
        "body": [...],
        "headers": {
          "X-Total-Count": "2"
        }
      },
      "POST": {
        "body": {...},
        "cookies": {
          "user_created": "true"
        }
      }
    },
    "users/:id": {
      "GET": {
        "body": {...}
      }
    }
  }
}
```

## 🔗 Parâmetros de Path

O Json-To-Mock-Api suporta parâmetros dinâmicos usando a sintaxe `:parametro`. Para usar um segmento **literal** (ex.: a URL exata `/users/:id` sem ser dinâmico), use **`::param`** — veja [Status Code e Rotas Literais](./status-code-e-rotas-literais#rotas-literais-desativar-parâmetro-dinâmico).

```json
{
  "endpoints": {
    "users/:id": {
      "GET": {
        "body": { "id": 1, "name": "João Silva" }
      }
    },
    "users/:userId/posts/:postId": {
      "GET": {
        "body": { "id": 1, "userId": 1, "title": "Post" }
      }
    }
  }
}
```

### Parâmetros Suportados

- `:id` → `{id}` (detectado como integer)
- `:userId` → `{userId}` (detectado como integer)
- `:name` → `{name}` (detectado como string)
- `:slug` → `{slug}` (detectado como string)
- **Rotas literais:** use `::param` para que o segmento seja literal (ex.: `users/::id` casa com a URL `/users/:id`). Ver [documentação](./status-code-e-rotas-literais#rotas-literais-desativar-parâmetro-dinâmico).

## 🌐 Métodos HTTP Suportados

Todos os métodos HTTP principais são suportados:

```json
{
  "endpoints": {
    "users": {
      "GET": { "body": [...] },
      "POST": { "body": {...} },
      "PUT": { "body": {...} },
      "DELETE": { "body": {...} },
      "PATCH": { "body": {...} },
      "OPTIONS": { "body": {...} },
      "HEAD": { "body": {...} },
      "ALL": { "body": {...} }
    }
  }
}
```

## 📚 Documentação Swagger Automática

### Acessando a Documentação

Quando o servidor está rodando, você tem acesso a:

- **Interface Swagger UI**: `http://localhost:3000/`
- **Especificação JSON**: `http://localhost:3000/swagger.json`

### Funcionalidades da Documentação

1. **Interface Interativa**: Teste endpoints diretamente no navegador
2. **Schemas Automáticos**: Gerados baseados nos dados reais
3. **Parâmetros de Path**: Automaticamente detectados e documentados
4. **Agrupamento**: Endpoints organizados por pasta/arquivo de origem
5. **Headers e Cookies**: Documentação automática de headers e cookies customizados

### Personalização da Documentação

A documentação é gerada automaticamente com base em:

- **Tags**: Nome da pasta ou arquivo de origem
- **Descrições**: Geradas automaticamente para cada endpoint
- **Exemplos**: Baseados nos dados reais dos arquivos JSON
- **Schemas**: Inferidos automaticamente dos dados

## 📊 Status Code de Resposta

Você pode definir o código HTTP de resposta com o campo `status` em cada método (ex.: `201` para POST, `204` para DELETE). Sem `status`, o padrão é `200`. Ver [Status Code e Rotas Literais](./status-code-e-rotas-literais#status-code-de-resposta).

## 🔧 Headers Mockados

Configure headers personalizados que serão enviados nas respostas:

```json
{
  "endpoints": {
    "users": {
      "GET": {
        "body": [...],
        "headers": {
          "X-Total-Count": "100",
          "X-API-Version": "2.0",
          "Cache-Control": "max-age=3600",
          "ETag": "\"abc123\""
        }
      }
    }
  }
}
```

### Headers Úteis

- **Paginação**: `X-Total-Count`, `X-Page`, `X-Per-Page`
- **Cache**: `Cache-Control`, `ETag`, `Last-Modified`
- **Versionamento**: `X-API-Version`
- **Rate Limiting**: `X-Rate-Limit`, `X-Rate-Remaining`
- **Localização**: `Location` (para recursos criados)

## 🍪 Cookies Mockados

Configure cookies que serão enviados nas respostas:

### Cookies Simples

```json
{
  "endpoints": {
    "auth/login": {
      "POST": {
        "body": { "success": true },
        "cookies": {
          "session_id": "abc123",
          "user_id": "1",
          "theme": "dark"
        }
      }
    }
  }
}
```

### Cookies Avançados

```json
{
  "endpoints": {
    "auth/login": {
      "POST": {
        "body": { "success": true },
        "cookies": {
          "session_id": {
            "value": "sess_abc123def456",
            "options": {
              "httpOnly": true,
              "secure": true,
              "sameSite": "strict",
              "maxAge": 3600000,
              "path": "/",
              "domain": ".exemplo.com"
            }
          }
        }
      }
    }
  }
}
```

### Opções de Cookie

- **`httpOnly`**: Cookie acessível apenas via HTTP
- **`secure`**: Cookie só enviado via HTTPS
- **`sameSite`**: Controle CSRF (`strict`, `lax`, `none`)
- **`maxAge`**: Duração em milissegundos
- **`path`**: Caminho onde o cookie é válido
- **`domain`**: Domínio onde o cookie é válido

## 🎯 Casos de Uso Práticos

### 1. API de E-commerce

```json title="ecommerce.json"
{
  "endpoints": {
    "products": {
      "GET": {
        "body": [
          { "id": 1, "name": "Notebook", "price": 2500.00 },
          { "id": 2, "name": "Mouse", "price": 50.00 }
        ],
        "headers": {
          "X-Total-Count": "2",
          "X-Currency": "BRL"
        }
      }
    },
    "cart": {
      "GET": {
        "body": {
          "items": [],
          "total": 0
        },
        "cookies": {
          "cart_id": "cart_123",
          "currency": "BRL"
        }
      },
      "POST": {
        "body": {
          "message": "Item adicionado ao carrinho"
        },
        "cookies": {
          "last_added": {
            "value": "product_1",
            "options": {
              "maxAge": 86400000
            }
          }
        }
      }
    }
  }
}
```

### 2. API de Autenticação

```json title="auth.json"
{
  "endpoints": {
    "auth/login": {
      "POST": {
        "body": {
          "user": { "id": 1, "name": "João" },
          "token": "jwt_token_here"
        },
        "headers": {
          "X-Auth-Status": "success"
        },
        "cookies": {
          "session_id": {
            "value": "sess_abc123",
            "options": {
              "httpOnly": true,
              "secure": true,
              "maxAge": 3600000
            }
          }
        }
      }
    },
    "auth/logout": {
      "POST": {
        "body": { "message": "Logout realizado" },
        "cookies": {
          "session_id": {
            "value": "",
            "options": { "maxAge": 0 }
          }
        }
      }
    }
  }
}
```

### 3. API com Paginação

```json title="pagination.json"
{
  "endpoints": {
    "posts": {
      "GET": {
        "body": [
          { "id": 1, "title": "Post 1" },
          { "id": 2, "title": "Post 2" }
        ],
        "headers": {
          "X-Total-Count": "100",
          "X-Page": "1",
          "X-Per-Page": "2",
          "Link": "</posts?page=2>; rel=\"next\""
        }
      }
    }
  }
}
```

## 🔄 CORS

O CORS está habilitado por padrão, permitindo requisições de qualquer origem. Isso torna o servidor pronto para uso em desenvolvimento frontend.

## 🐛 Debugging e Logs

O servidor exibe informações úteis no console:

```
📂 Modo pasta: Carregando arquivos JSON recursivamente...
📁 Carregado: users.json
📁 Carregado: api/orders.json
📚 Gerando documentação Swagger automaticamente...

📋 Endpoints disponíveis:
  [GET] http://localhost:3000/users
  [POST] http://localhost:3000/users
  [GET] http://localhost:3000/api/orders

📚 Documentação Swagger:
  [GET] http://localhost:3000/ (Interface Swagger UI)
  [GET] http://localhost:3000/swagger.json (Especificação JSON)

📊 Total de endpoints: 3
🎉 Documentação automática gerada com sucesso!
```

## 💡 Dicas e Melhores Práticas

### Organização de Arquivos

1. **Use modo pasta** para projetos grandes
2. **Agrupe endpoints relacionados** em pastas
3. **Use nomes descritivos** para arquivos e pastas
4. **Mantenha estrutura consistente**

### Performance

1. **Evite arquivos JSON muito grandes**
2. **Use headers de cache** quando apropriado
3. **Organize endpoints por funcionalidade**

### Desenvolvimento

1. **Use parâmetros de path** para endpoints dinâmicos
2. **Configure headers realistas** para simular APIs reais
3. **Use cookies** para simular autenticação e sessões
4. **Documente comportamentos especiais** nos dados

---

**Próximos passos:** Explore [Headers Mockados](./headers), [Cookies Mockados](./cookies) e [Status Code e Rotas Literais](./status-code-e-rotas-literais)! 🚀
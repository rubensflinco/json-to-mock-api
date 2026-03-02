---
sidebar_position: 4
---

# Status Code e Rotas Literais

Duas funcionalidades avançadas para controlar o comportamento da API mock: **código de status HTTP configurável** e **rotas literais** (desativar parâmetros dinâmicos na URL).

## 📊 Status Code de Resposta

Por padrão, todas as respostas da API mock retornam **HTTP 200**. É possível definir um código de status diferente por método e endpoint usando o campo `status` na configuração.

### Como Funciona

Adicione a propriedade `status` (número) no objeto de configuração do método HTTP. O valor será usado como código de status da resposta.

```json
{
  "endpoints": {
    "users": {
      "GET": {
        "status": 200,
        "body": [{ "id": 1, "name": "João" }]
      },
      "POST": {
        "status": 201,
        "body": { "id": 3, "name": "Novo Usuário" },
        "headers": {
          "Location": "/users/3"
        }
      },
      "DELETE": {
        "status": 204,
        "body": null
      }
    }
  }
}
```

### Status Codes Comuns

| Status | Uso típico |
|--------|------------|
| **200** | OK – sucesso (padrão) |
| **201** | Created – recurso criado (ex.: POST) |
| **204** | No Content – sucesso sem corpo (ex.: DELETE) |
| **400** | Bad Request – requisição inválida |
| **401** | Unauthorized – não autenticado |
| **403** | Forbidden – sem permissão |
| **404** | Not Found – recurso não encontrado |
| **500** | Internal Server Error – erro do servidor |

### Status 204 (No Content)

Para `204`, o servidor **não envia corpo** na resposta, mesmo que `body` esteja definido no JSON. Use quando quiser simular um DELETE ou atualização que retorna sucesso sem conteúdo.

```json
"DELETE": {
  "status": 204,
  "body": null
}
```

### Documentação Swagger

O status configurado aparece automaticamente na documentação Swagger: a resposta correspondente ao código definido é documentada como resposta de sucesso (ou erro) do endpoint.

---

## 🔗 Rotas Literais (Desativar Parâmetro Dinâmico)

Rotas no formato `:parametro` são **dinâmicas**: o Express trata o segmento como parâmetro (ex.: `users/:id` casa com `/users/1`, `/users/abc`, etc.). Às vezes você precisa de uma rota em que o segmento seja **literal** — por exemplo, a URL exata `/users/:id` (com os caracteres `:id` no path).

Para isso, use **dois pontos** antes do nome do parâmetro: **`::param`**. Assim, esse segmento deixa de ser dinâmico e passa a casar apenas com o texto literal `:param` na URL.

### Sintaxe

- **`:param`** → parâmetro **dinâmico** (ex.: `/users/123` casa com `users/:id`)
- **`::param`** → segmento **literal** (apenas a URL que contém exatamente `:param` casa; ex.: `/users/:id`)

O uso de `::` evita confusão com query params (que usam `?`).

### Exemplo: Rota Dinâmica vs Literal

**Rota dinâmica** — casa com qualquer valor no lugar de `:id`:

```json
"users/:id": {
  "GET": {
    "body": { "id": 1, "name": "João" }
  }
}
```

- ✅ `GET /users/1` → 200 + body  
- ✅ `GET /users/999` → 200 + body  
- ❌ `GET /users/:id` → não casa com esta rota (seria outra rota ou 404)

**Rota literal** — casa apenas com o segmento literal `:id`:

```json
"users/::id": {
  "GET": {
    "status": 200,
    "body": {
      "message": "Rota literal: a URL exata é /users/:id"
    }
  }
}
```

- ❌ `GET /users/1` → não casa  
- ✅ `GET /users/:id` → 200 + body (URL exatamente `/users/:id`)

### Casos de Uso

1. **Documentação ou convenção de API**  
   Endpoint que existe apenas como “path fixo” com o texto `:id` (ex.: documentação de exemplos).

2. **Evitar conflito com rotas dinâmicas**  
   Ter ao mesmo tempo `users/:id` (dinâmico) e `users/::id` (literal) para comportamentos diferentes.

3. **Testes**  
   Garantir que o cliente chame exatamente a URL `/recurso/:nome` em cenários específicos.

### Combinando Dinâmico e Literal

É possível misturar segmentos dinâmicos e literais na mesma rota:

```json
{
  "endpoints": {
    "api/:version/::docs": {
      "GET": {
        "body": {
          "message": "Documentação da versão; o segmento ':docs' é literal"
        }
      }
    }
  }
}
```

- `GET /api/v1/:docs` → casa (segmento `:version` = `v1`, segmento literal `:docs`)
- `GET /api/v1/outro` → não casa

### Documentação Swagger

- Rotas com **`::param`** aparecem no Swagger com o path mostrando o segmento literal **`:param`** (não como `{param}`).
- Apenas segmentos **dinâmicos** (`:param` sem `::`) entram na lista de **path parameters** da operação.

---

## 📋 Resumo

| Recurso | Configuração | Efeito |
|--------|---------------|--------|
| **Status code** | `"status": 201` no método | Resposta HTTP usa o código informado (padrão: 200). Para 204, o corpo não é enviado. |
| **Rota literal** | `::param` no path do endpoint | O segmento é tratado como literal `:param` na URL, não como parâmetro dinâmico. |

---

**Próximo:** Veja [Exemplos Práticos](./examples) para mais cenários de uso.

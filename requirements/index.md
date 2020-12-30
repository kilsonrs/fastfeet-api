# Transportadora FastFeet

## Resumo das funcionalidades

- administrador
  - autentica no sistema
   - email e senha
  - gerencia entregadores
    - cadastra/atualiza
  - gerencia encomendas
    - lista/cadastra/atualiza/remove

- entregador
  - autentica no sistema
    - cpf e senha
  - lista encomendas
    - histórico
      - encomendas entregues por ele
      - filtra por bairro
    - pendentes
      - não entregues e não canceladas
      - filtra por bairro
  - retira encomenda
    - até 5 por dia
    - entre 8h e 12h
  - entrega encomenda
    - foto da assinatura


## Casos de uso


### deliveries
- list-delivery
- create-delivery
- update-delivery
- delete-delivery
- finalize-deliveryman-delivery
- pick-deliveryman-delivery
- upload-delivery-signature

### users
- authenticate-user
- create-user
- update-user

# Gestão de usuários

- Rotas autenticadas.
- Apenas administradores

# Gestão de encomendas

- Rotas autenticadas

- Administrador
  - listagem/cadastro/autalização/remoção
  - **Data de início** deve ser cadastrada apenas na retirada do produto
  - **Data de término** deve ser cadastrada quando finalizar a entrega
  - **recipient_id** e **deliveryman_id** deve ser cadastrados no momento do cadastro da encomenda.
- Entregador
  - Visualizar encomendas
    - Atribuídas a ele
    - Ainda não entregues ou não canceladas
    - Entregues por ele
    - Filtro por bairro
  - Alterar o status de encomendas
    - Incluir data de retirada (**start_date**)
    - Incluir data de entrega (**end_date**)
      - envio da imagem (**signature_id**)
- Retiradas
  - apenas 5 por dia
  - apenas entre 8h e 12h

/users
/sessions
/deliveries

/deliveryman/sessions
/deliveryman/:deliveryman_id/deliveries

- pendentes
- feitas (por ele)

# Atualizar usuários

## Caso de sucesso

1. Recebe uma requisição do tipo **put** na rota **/api/users/{user_id}**
2. Recebe os dados **nome**, **email**, **is_deliveryman**, **password** e **password_confirmation**
3. Verifica se existe um usuário com o **user_id** fornecido
4. Se **password** fornecido, valida se **password** e **password_confirmation** são iguais
5. Valida se **email** fornecido é válido
6. Valida se já exite um usuário com o **email** fornecido
7. Encrypta o **password** fornecido
8. Atualiza o usuário com os dados fornecidos
9. Retorna **200**

## Exceções

1. Retorna **404** se a rota não existir
2. Retorna **400** se user_id não for fornecido
2. Retorna **400** se password fornecido sem o campo password_confirmation
3. Retorna **403** se usuário não encontrado
4. Retorna **400** se password e password_confirmation não forem iguais
5. Retorna **400** se o email fornecido é inválido
6. Retorna **403** se já o email fornecido estiver em uso
7. Retorna **500** se der erro ao tentar gerar senha criptografada
8. Retorna **500** se der erro ao tentar criar o usuário com os dados fornecidos

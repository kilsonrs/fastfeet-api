# Cadastrar usuários

## Caso de sucesso

1. Recebe uma requisição do tipo **post** na rota **/api/users**
2. Valida dados obrigatórios: **nome**, **cpf**, **email**, **is_deliveryman**, **password** e **password_confirmation**
3. Valida **password** e **password_confirmation** são iguais
4. Valida o **cpf** fornecido é válido
5. Valida se já exite um usuário com o **cpf** fornecido
6. Valida o **email** fornecido é válido
7. Valida se já exite um usuário com o **email** fornecido
8. Encrypta o **password**
9. Cria o usuário com os dados fornecidos
10. Retorna **200**

## Exceções

1. Retorna **404** se a rota não existir
2. Retorna **400** se os dados obrigatórios não forem fornecidos
3. Retorna **400** se password e password_confirmation não forem iguais
4. Retorna **400** se cpf fornecido é inválido
5. Retorna **400** se já exitir um usuário com o cpf fornecido
6. Retorna **400** se o email fornecido é inválido
7. Retorna **403** se já o email fornecido estiver em uso
8. Retorna **500** se der erro ao tentar gerar senha criptografada
9. Retorna **500** se der erro ao tentar criar o usuário com os dados fornecidos

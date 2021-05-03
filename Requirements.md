# Transportadora FastFeet



# Cadastro de entregadores

**RF**
Deve ser possível cadastrar um entregador


**RN**
Não deve ser possível cadastrar um entregador com cpf já existente
Não deve ser possível cadastrar um entregador com email já existente
O usuário deve ser cadastrado, por padrão, como entregador.
O usuário responsável pelo cadastro deve ser um administrador.



# Listagem de entregadores


**RF**
Deve ser possível listar todos os entregadores


**RN**
A listagem deve ser feita apenas por usuário administrador



# Atualização de usuários

**RF**
O Administrador deve ser podem atualizar seu cadastro


**RN**
Não deve ser possível atualizar um usuário que não existe.
Não deve ser possível atualizar o cpf.
Não deve ser possível atualizar o email para um email já existente.
Não deve ser possível atualizar a senha se ela e a confirmação de senha não baterem.
O usuário responsável pela atualização deve ser um administrador.





# Autenticação de administradores


**RF**
Deve ser possível autenticar os administradores

**RNF**
Os administradores devem se autenticar numa rota diferente da dos entregadores

**RN**
O administrador deve se autenticar com email e senha
Não deve ser possível se autenticar com a senha incorreta
Não deve ser possível a autenticação de um usuário não administrador.


# Autenticação de entregadores


**RF**
Deve ser possível autenticar os entregadores


**RNF**
Os entregadores devem se autenticar numa rota diferente da dos administradores


**RN**
O entregador deve se autenticar com cpf e senha
Não deve ser possível se autenticar com a senha incorreta
Não deve ser possível a autenticação de um usuário não entregador.


# Cadastro de destinatários


**RF**
Deve ser possível cadastrar o destinatário


**RNF**
Deve usar uma api para busca de endereços por CEP


**RN**
Não deve ser possível cadastrar um destinatário sem nome
Não deve ser possível cadastrar um destinatário com nome já existente.
Não deve ser possível cadastrar um destinatário sem endereço


# Listagem de destinatários


**RF**
Deve ser possível listar todos os destinatários


**RN**
A listagem deve ser feita apenas por usuário administrador




# Cadastro de encomendas


**RF**
Deve ser possível cadastrar uma encomenda
Deve ser possível listar os entregadores
Deve ser possível listar os destinatários


**RN**
Não deve ser possível cadastrar uma encomenda com destinatário inexistente
Não deve ser possível cadastrar uma encomenda com entregador inexistente
Não deve ser possível cadastrar uma encomenda sem o nome do pacote



# Listagem das encomendas


**RF**
Deve ser possível o entregador listar as encomendas que ainda não foram retiradas.
Deve ser possível o entregador listar as encomendas que foram entregues por ele
Deve ser possível o entregador listar as encomendas filtrando por bairro


**RN**
Não deve ser possível o entregador listar as encomendas entregues por outro entregador.




# Retirada da encomenda


**RF**
Deve ser possível o entregador registrar a retirar a encomenda para entrega


**RNF**


**RN**
Deve ser possível retirar apenas das 8h às 12h
Não deve ser possível retirar mais que 5 encomendas por dia.



# Entrega da encomenda


**RF**
Deve ser possível o entregador registrar a entrega da encomenda.


**RNF**
Usar o react-native-camera para registrar a fota da assinatura do destinatário


**RN**
Não deve ser possível registrar a entrega de uma encomenda que não foi retirada.




# Cadastro de problemas


**RF**
Deve ser possível cadastrar problemas na entrega das encomendas


**RN**
O cadastro deve ser feita apenas por usuário entregador.




# Listagem de problemas

**RF**
Deve ser possível listar todos problemas na entrega das encomendas

**RN**
O usuário administrador pode listar todos os problemas.
O usuário entregador pode listar apenas os problemas das encomendas retiradas por ele.

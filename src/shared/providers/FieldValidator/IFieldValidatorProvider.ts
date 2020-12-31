interface IFieldValidatorProvider {
  isEmail(email: string): boolean,
  isCpf(cpf: string): boolean,
}

export { IFieldValidatorProvider }

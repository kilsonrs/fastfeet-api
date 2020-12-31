import { IFieldValidatorProvider } from "../IFieldValidatorProvider";
import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import Joi from 'joi'

class FieldValidatorProvider implements IFieldValidatorProvider {
  isCpf(cpf: string) {
    return cpfValidator.isValid(cpf)
  }

  isEmail(email: string) {
    const emailValidation = Joi.string().email().validate(email)
    const isValid = !emailValidation.error
    return isValid
  }
}

export default FieldValidatorProvider

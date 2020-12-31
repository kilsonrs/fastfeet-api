import { hash } from "bcryptjs"

class HashProvider implements IHashProvider {
  async generateHash(payload: string) {
    return hash(payload, 8)
  }
}

export default HashProvider

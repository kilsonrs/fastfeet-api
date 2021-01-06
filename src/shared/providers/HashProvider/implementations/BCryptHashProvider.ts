import { hash } from 'bcryptjs';
import IHashProvider from '../IHashProvider';

class HashProvider implements IHashProvider {
  async generateHash(payload: string) {
    return hash(payload, 8);
  }
}

export default HashProvider;

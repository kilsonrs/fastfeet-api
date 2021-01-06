import IHashProvider from '../IHashProvider';

class FakeHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return payload;
  }
}

export default FakeHashProvider;

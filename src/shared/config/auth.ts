export default {
  jwt: {
    secret: process.env.APP_SECRET || '990df9a832d4f12662183d318b79b4d4',
    expiresIn: '1d',
  },
};

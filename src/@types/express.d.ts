declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    query: {
      neighborhood: string;
    };
  }
}

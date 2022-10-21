export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

// esse é o tipo do objeto vai ser usado para onstruir a resposta da API
type ErrorResponseObject = {
  message: string;
  httpStatus: number;
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Id must be a 24 characters hexadecimal',
    httpStatus: 400,
  },
};

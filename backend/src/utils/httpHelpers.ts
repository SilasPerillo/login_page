export const ok = (data: any) => ({
  statusCode: 200,
  message: data,
});

export const created = (data: any) => ({
  statusCode: 201,
  message: data,
});

export const badRequest = (message: string) => ({
  statusCode: 400,
  message: { message },
});

export const unauthorized = (message: string) => ({
  statusCode: 401,
  message: { message },
});

export const notFound = (message: string) => ({
  statusCode: 404,
  message: { message },
});

export const conflict = (message: string) => ({
  statusCode: 409,
  message: { message },
})

export const unprocessableEntity = (message: string) => ({
  statusCode: 422,
  message: { message },
});
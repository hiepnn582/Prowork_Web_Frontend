export enum APP_CODE {
  // 1xx Informational (Thông tin)
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,

  // 2xx Success (Thành công)
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // 3xx Redirection (Chuyển hướng)
  MOVED_PERMANENTLY = 301,
  SEE_OTHER = 303,

  // 4xx Client Error (Lỗi phía Client)
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,

  // 5xx Server Error (Lỗi phía Server)
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  SERVICE_UNAVAILABLE = 503,
}

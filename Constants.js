const baseUrl = 'http://192.168.1.30:8082'// TODO Change it

export const NetworkConstants = {
  baseUrl: baseUrl,
  unAuthUrl: baseUrl + '/no-auth/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json; charset=utf-8'
  },
  requestPageSize: 20
}

export const StatusCodes = {
  internal: 500,
  ok: 200
}

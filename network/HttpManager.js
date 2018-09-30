import Axios from 'axios'
import { NetworkConstants, StatusCodes } from './../Constants'
import GraphQLQueryCompress from 'graphql-query-compress'

let instance = null

export class HttpManager {
  static getInstance () {
    if (instance == null) {
      instance = new HttpManager()
    }
    return instance
  }
  search (value) {
    return new Promise((resolve) => {
      const onParsedResponseIsReady = (parsedResponse) => {
        const statusCode = Number(parsedResponse.search.statusCode)
        resolve({statusCode: statusCode, res: parsedResponse.search.res})
      }
      const query = GraphQLQueryCompress(`query{
        search(text:"${value}"){
          statusCode,
          res{
            url,
            previewTitle,
            previewBody
          }
        }
      }`)
      Axios.get(`${NetworkConstants.unAuthUrl}?query=${query}`)
        .then(response => {
          if (Number(response.status) !== StatusCodes.ok) {
            resolve({err: response.statusText, statusCode: Number(response.status)})
            return
          }
          onParsedResponseIsReady(response.data.data)
        })
        .catch(error => resolve({err: error, statusCode: StatusCodes.internal}))
    })
  }
}

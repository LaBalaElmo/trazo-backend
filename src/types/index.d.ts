import { TokenSet } from 'openid-client'
import 'express-session'
declare global {
  type PassportOidcUser = {
    id: string
    roles: Array<string>
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: PassportOidcUser
  }
}
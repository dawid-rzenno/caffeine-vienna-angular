import { PathSegment } from "./path-segment.enum";

export enum AuthDirectRouteKey {
  SignIn = 'SignIn',
  SignOut = 'SignOut',
  SignUp = 'SignUp',
}

export const AUTH_DIRECT_ROUTE: Record<string, any> = {
  [AuthDirectRouteKey.SignIn]: ['/', PathSegment.Auth, PathSegment.LogIn],
  [AuthDirectRouteKey.SignOut]: ['/', PathSegment.Auth, PathSegment.LogOut],
  [AuthDirectRouteKey.SignUp]: ['/', PathSegment.Auth, PathSegment.SignUp]
}

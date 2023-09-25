import { Component } from '@angular/core';
import { AUTH_DIRECT_ROUTE, AuthDirectRouteKey } from "./features/common/constants/auth-direct-route.const";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  AuthDirectRoute = AUTH_DIRECT_ROUTE;
  AuthDirectRouteKey = AuthDirectRouteKey;
}

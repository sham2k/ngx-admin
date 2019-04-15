import { NgModule } from "@angular/core";
import { ThemeModule } from "../../@theme/theme.module";

import { UserRoutingModule } from "./user-routing.module";

import { ModifyPasswdComponent } from "./modify-passwd/modify-passwd.component";
import { LogoutComponent } from "./logout/logout.component";

@NgModule({
  imports: [ThemeModule, UserRoutingModule],
  declarations: [ModifyPasswdComponent, LogoutComponent],
  exports: []
})
export class UserModule {}

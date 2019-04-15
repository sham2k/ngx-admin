import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthService } from "../../services";
import { ModifyPasswdComponent } from "./modify-passwd/modify-passwd.component";
import { LogoutComponent } from "./logout/logout.component";

export const routes: Routes = [
  // 用户管理类
  {
    path: "modify-passwd",
    component: ModifyPasswdComponent,
    canActivate: [AuthService]
  },
  {
    path: "logout",
    component: LogoutComponent,
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}

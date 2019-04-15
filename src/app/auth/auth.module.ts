import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  NbAlertModule,
  NbCardModule,
  NbCheckboxModule,
  NbLayoutModule,
} from '@nebular/theme';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './components/auth.component';
import { AuthBlockComponent } from './components/auth-block/auth-block.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { routes } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    NbAlertModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    AuthComponent,
    AuthBlockComponent,
    LoginComponent,
    RegisterComponent,
  ],
  exports: [
    AuthComponent,
    AuthBlockComponent,
    LoginComponent,
    RegisterComponent,
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: AuthModule,
      providers: [
      ],
    };
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageComponent } from './image/image.component';
import { provideHttpClient } from '@angular/common/http';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component';
import { DatagridComponent } from './datagrid/datagrid.component';
import { EmployeeService } from './employee.service';
import { DxDataGridModule, DxButtonModule, DxTemplateModule, DevExtremeModule, DxDropDownButtonModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    ImageComponent,
    InputComponent,
    OutputComponent,
    DatagridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxTemplateModule,
    DevExtremeModule,
    DxDropDownButtonModule
  ],
  providers: [
    provideHttpClient(),
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
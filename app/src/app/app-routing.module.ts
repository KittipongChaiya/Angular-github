import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ImageComponent } from './image/image.component';
import { InputComponent } from './input/input.component';
import { DatagridComponent } from './datagrid/datagrid.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'image', component: ImageComponent },
    { path: 'input', component: InputComponent },
    { path: 'datagrid', component: DatagridComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
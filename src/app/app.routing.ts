import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import UserEditComponent
import { UserEditComponent } from './components/user-edit.component';

const appRoutes: Routes = [
	{path: '', component: UserEditComponent},
	{path: 'mis-datos', component: UserEditComponent},
	{path: '**', component: UserEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


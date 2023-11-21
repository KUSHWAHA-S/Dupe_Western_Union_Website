import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyReceiverComponent } from './my-receiver/my-receiver.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AddReceiverComponent } from './add-receiver/add-receiver.component';
import { EditReceiverComponent } from './edit-receiver/edit-receiver.component';


const routes: Routes = [
  { path:"login" , component:LoginComponent},
  // { path:"" ,redirectTo:"login"},
  { path:"addReceiver" ,canActivate:[AuthGuard], component:AddReceiverComponent},
  { path:"myReceiver" ,canActivate:[AuthGuard], component:MyReceiverComponent},
  { path:"editReceiver" ,canActivate:[AuthGuard], component:EditReceiverComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

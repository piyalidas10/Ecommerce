import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyprofileComponent } from './myprofile.component';
import { ProfilemenuComponent } from './profilemenu/profilemenu.component';
import { ProfilecontentComponent } from './profilecontent/profilecontent.component';


const routes: Routes = [
  {
    path: '',
    component: MyprofileComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MyprofileComponent,
    ProfilemenuComponent,
    ProfilecontentComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: []
})
export class LoginModule { }

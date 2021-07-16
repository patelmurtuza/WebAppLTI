import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from '@angular/material/table'  
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { UpdateuserComponent } from './components/updateuser/updateuser.component';
import { MattableComponent } from './components/mattable/mattable.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { UpdateComponent } from './components/update/update.component'



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingpageComponent,
    AdminComponent,
    CreateuserComponent,
    UpdateuserComponent,
    MattableComponent,
    AdduserComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TooltipModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

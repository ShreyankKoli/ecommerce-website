import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutComponent } from './Component/Pages/layout/layout.component';
import { DashboardComponent } from './Component/Pages/dashboard/dashboard.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminDashboardComponent } from './Component/Pages/admin-dashboard/admin-dashboard.component';
import { SellerDashboardComponent } from './Component/Pages/seller-dashboard/seller-dashboard.component';
import { LoginComponent } from './Component/Pages/login/login.component';
import { SellerFormComponent } from './Component/Pages/seller-form/seller-form.component';
import { NgFor,NgStyle } from '@angular/common';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { DashLayoutComponent } from './Component/Pages/dash-layout/dash-layout.component';
import { AdminLayoutComponent } from './Component/Pages/admin-layout/admin-layout.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort,MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CartComponent } from './Component/Pages/cart/cart.component';
import { ThemePalette } from '@angular/material/core';
import { SignupComponent } from './Component/Pages/signup/signup.component';
import { MatSelectModule } from '@angular/material/select';

//import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AdminDashboardComponent,
    SellerDashboardComponent,
    LoginComponent,
    SellerFormComponent,
    DashboardComponent,
    DashLayoutComponent,
    AdminLayoutComponent,
    CartComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterOutlet,
    RouterModule,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgFor,
    NgStyle,
    MatCardModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    HttpClientModule,
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatSort,
    MatSortModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSelectModule
    //MatProgressSpinnerModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

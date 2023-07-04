import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from '../hello.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViaCepService } from './services/via-cep.service';
import { FormComponent } from './components/forms/form.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MaterialModule,
  ],
  declarations: [AppComponent, FormComponent, HelloComponent],
  bootstrap: [AppComponent],
  providers: [ViaCepService],
})
export class AppModule {}

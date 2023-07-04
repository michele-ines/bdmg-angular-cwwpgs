import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';

const modules = [
  MatCardModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  FlexLayoutModule,
  MatInputModule,
  MatButtonModule,
  MatExpansionModule,
];

@NgModule({
  declarations: [],
  exports: [...modules],
  providers: [],
})
export class MaterialModule {}

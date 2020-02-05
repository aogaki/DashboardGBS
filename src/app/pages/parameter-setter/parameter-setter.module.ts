import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ParameterSetterRoutingModule } from './parameter-setter-routing.module';
import { FluxParameterComponent } from './flux-parameter/flux-parameter.component';
import { ParameterSetterComponent } from './parameter-setter.component';
import {
  MatSliderModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { PolarimeterParameterComponent } from './polarimeter-parameter/polarimeter-parameter.component';

const components = [ParameterSetterComponent, FluxParameterComponent];

@NgModule({
  declarations: [...components, PolarimeterParameterComponent],
  imports: [
    CommonModule,
    ThemeModule,
    ParameterSetterRoutingModule,
    MatSliderModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class ParameterSetterModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParameterSetterComponent } from './parameter-setter.component';
import { FluxParameterComponent } from './flux-parameter/flux-parameter.component';
import { PolarimeterParameterComponent } from './polarimeter-parameter/polarimeter-parameter.component';

const routes: Routes = [
  {
    path: '',
    component: ParameterSetterComponent,
    children: [
      {
        path: 'flux',
        component: FluxParameterComponent
      },
      {
        path: 'polarimeter',
        component: PolarimeterParameterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParameterSetterRoutingModule {}

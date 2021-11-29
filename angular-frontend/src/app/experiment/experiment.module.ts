import { NgModule } from '@angular/core';
import { ExperimentsComponent } from './components/experiments/experiments.component';
import { MyExperimentsComponent } from './components/my-experiments/my-experiments.component';
import { OldExperimentsComponent } from './components/old-experiments/old-experiments.component';
import { ExperimentTemplateComponent } from './components/experiment-template/experiment-template.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MyExperimentsComponent,
    OldExperimentsComponent,
    ExperimentsComponent,
    ExperimentTemplateComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class ExperimentModule { }

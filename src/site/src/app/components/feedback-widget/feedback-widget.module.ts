import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackWidgetComponent } from './feedback-widget.component';
import { FeedbackWidgetService } from './feedback-widget.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ FeedbackWidgetComponent ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ FeedbackWidgetComponent ],
  providers: [ FeedbackWidgetService ]
})
export class FeedbackWidgetModule { }

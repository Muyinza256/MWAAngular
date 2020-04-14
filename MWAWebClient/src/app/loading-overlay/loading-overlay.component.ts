import { Component, ElementRef } from "@angular/core";
import { IgxCardModule } from "igniteui-angular";

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.css']
})
export class LoadingOverlayComponent {

  constructor(public elementRef: ElementRef) { }

  ngOnInit(): void {
  }

}

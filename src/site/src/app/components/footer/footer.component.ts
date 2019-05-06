import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LibraryService } from '../../shared/library.service';

@Component({
  selector: 'site-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Output() idsVersion = new EventEmitter();
  public version: string;

  constructor(
    private libraryService: LibraryService
  ) { }

  ngOnInit() {
    this.getIdsVersion('ids-enterprise');
  }

  getIdsVersion(library) {
    this.libraryService.loadAllLibraryVersions(library)
      .subscribe(res => {
        this.version = res[0];
        this.idsVersion.emit(this.version);
      });
  }

}

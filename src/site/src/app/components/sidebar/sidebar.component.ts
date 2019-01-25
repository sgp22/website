import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { LibraryService } from '../../shared/library.service';
import { HelpersService } from '../../shared/helpers.service';
import * as semver from 'semver';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public sidebarPath: string;
  public sidebarNav: any;
  public libraries: any;
  public versionPaths: any;
  public currentLibrary: string;
  public currentVersion: string;
  public loading: boolean;
  public expandedLevel1: any = [];

  constructor(
    private sidebarService: SidebarService,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private router: Router,
    private helpers: HelpersService
  ) { }

  ngOnInit() {
    this.loading = true;

    this.route.params.subscribe(params => {

      this.sidebarPath = `${params.library}/${params.version}`;
      this.currentLibrary = `${params.library}`;
      this.currentVersion = `${params.version}`;

      this.sidebarService.loadSitemap(this.sidebarPath).subscribe(res => {
        this.sidebarNav = res['sections'];
        this.loading = false;
      })

      this.libraryService.loadAllLibraries().subscribe(res => {
        this.libraries = res;
      });

      this.libraryService.loadAllLibraryVersions(this.currentLibrary)
        .subscribe(res => {
          this.versionPaths = res['files']
            .map(file => {
              const versions = {};
              versions['full'] = file.replace(/docs/, '');
              versions['label'] = file.split('/').slice(-2, -1).join('');
              return versions;
            })
            .sort((a, b) => {
              return semver.compare(a.label, b.label);
            })
            .reverse();

          this.versionPaths.unshift({
            full: `/${this.currentLibrary}/latest/`,
            label: `Latest (${this.versionPaths[0]['label']})`
          });
        })
    });

  }

  onLibraryChange(library) {
    this.router.navigate([library]);
  }

  onVersionChange(version) {
    this.router.navigate([version]);
  }

}

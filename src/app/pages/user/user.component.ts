import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  orgUserList: Array<any> = [];
  dupUserList: Array<any> = [];
  tableHeader: Array<string> = [
    'ID',
    'First Name',
    'Last Name',
    'Gender',
    'Email Id',
    'Phone Number',
    'Birth Date',
    'Image',
    'Edit',
    'Details',
  ];
  search = '';
  search$: Subject<string> = new Subject<string>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _apiService: ApiService) {}
  ngOnInit(): void {
    this.setupSearchDebouncing();
    this.getUserList();
  }

  getUserList(): void {
    const query = `limit=12`;
    this._apiService
      .getUserList(query)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.orgUserList = this.dupUserList = res.users;
        }
      });
  }

  searchChange(event: string): void {
    this.search$.next(event);
  }

  setupSearchDebouncing(): void {
    this.search$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        this.orgUserList = this.filterUser(value);
      });
  }

  filterUser(value: string): Array<any> {
    if (!value) return this.dupUserList;
    return this.orgUserList.filter((item) =>
      item.firstName.toLowerCase().includes(value.toLowerCase())
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

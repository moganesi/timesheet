/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DataentryComponent } from './dataentry.component';

describe('DataentryComponent', () => {
  let component: DataentryComponent;
  let fixture: ComponentFixture<DataentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

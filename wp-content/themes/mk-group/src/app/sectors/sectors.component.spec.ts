import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsComponentComponent } from './sectors.component';

describe('SectorsComponentComponent', () => {
  let component: SectorsComponentComponent;
  let fixture: ComponentFixture<SectorsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

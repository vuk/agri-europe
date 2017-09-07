import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSectorComponent } from './single-sector.component';

describe('SingleSectorComponent', () => {
  let component: SingleSectorComponent;
  let fixture: ComponentFixture<SingleSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

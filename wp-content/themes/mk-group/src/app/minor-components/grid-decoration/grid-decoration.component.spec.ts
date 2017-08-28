import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDecorationComponent } from './grid-decoration.component';

describe('GridDecorationComponent', () => {
  let component: GridDecorationComponent;
  let fixture: ComponentFixture<GridDecorationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridDecorationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDecorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

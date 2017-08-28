import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriSwiperComponent } from './agri-swiper.component';

describe('AgriSwiperComponent', () => {
  let component: AgriSwiperComponent;
  let fixture: ComponentFixture<AgriSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgriSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgriSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

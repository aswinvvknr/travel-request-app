import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelList } from './travel-list';

describe('TravelList', () => {
  let component: TravelList;
  let fixture: ComponentFixture<TravelList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

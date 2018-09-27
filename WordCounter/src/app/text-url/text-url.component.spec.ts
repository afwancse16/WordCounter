import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextUrlComponent } from './text-url.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CountComponent } from '../count/count.component';
import { CountService } from '../count.service';

describe('TextUrlComponent', () => {
  let component: TextUrlComponent;
  let fixture: ComponentFixture<TextUrlComponent>;
  let mockCountService;

  beforeEach(async(() => {
    mockCountService = jasmine.createSpyObj(['getOutputArray', 'sortedArrayfromObject', 'validateInputandreturnarray']);
    mockCountService.getOutputArray.and.returnValue([]);
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        TextUrlComponent,
        CountComponent
      ],
      providers: [
        FormBuilder,
        { provide: CountService, useValue: mockCountService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

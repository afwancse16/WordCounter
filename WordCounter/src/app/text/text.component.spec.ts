import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextComponent } from './text.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CountComponent } from '../count/count.component';
import { CountService } from '../count.service';
import { StoreText, eType } from '../Model';
import { By } from '../../../node_modules/@angular/platform-browser';

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;
  let mockCountService;
  const dummyTextdata = new StoreText();
  dummyTextdata.Inputstring = 'hello';
  dummyTextdata.OutputArray = [['hello', 1]];
  dummyTextdata.Type = eType.Text;

  beforeEach(async(() => {
    mockCountService = jasmine.createSpyObj(['getOutputArray', 'sortedArrayfromObject', 'validateInputandreturnarray']);
    mockCountService.getOutputArray.and.returnValue([]);
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        TextComponent,
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
    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('The length of lengthcount should be 5 when the input is "afwan"', () => {
    component.textForm.get('inputstr').setValue('afwan');
    fixture.detectChanges();
    expect(component.lengthcount).toBe(5);
  });

  it('The form should be invalid when the text box is empty', () => {
    component.textForm.get('inputstr').setValue('');
    fixture.detectChanges();
    expect(component.textForm.valid).toBe(false);
  });

  it('The form should be valid when the text box is not empty', () => {
    component.textForm.get('inputstr').setValue('a');
    fixture.detectChanges();
    expect(component.textForm.valid).toBe(true);
  });

  it('the checkvisibility method should return true when there is only outputarray is empty.', () => {
    expect(component.checkVisiblity()).toBe(true);
  });

  it('the checkvisibility method should return false when outputarray is not empty.', () => {
    mockCountService.getOutputArray.and.returnValue([dummyTextdata]);
    fixture.detectChanges();

    expect(component.checkVisiblity()).toBe(false);
  });

  it('the isvalidstring variable should be false when input contain only spaces.', () => {
    component.textForm.get('inputstr').setValue('     ');
    component.submit();
    fixture.detectChanges();

    expect(component.isvalidstring).toBe(false);
  });

  it('the submit function should set output as the above object "dummyTextData"', () => {
    component.textForm.get('inputstr').setValue('hello');
    mockCountService.validateInputandreturnarray.and.returnValue(['hello']);
    component.output = mockCountService.getOutputArray.and.returnValue([dummyTextdata])[0];
    component.submit();
    fixture.detectChanges();
    expect(component.output).toEqual(dummyTextdata);
  });

});

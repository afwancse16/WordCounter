import { TestBed, inject, ComponentFixture } from '@angular/core/testing';

import { CountService } from './count.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { eType } from './Model';

describe('CountService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });

  const arr = ['hey', 'hey', 'how', 'are'];

  it('Testing sortedArrayfromObject method :should have length of outputarray as 1 if we pass two or more input from text box.',
    inject([CountService], (service: CountService) => {
      service.getOutputArray(eType.Text);

      service.sortedArrayfromObject(arr, 10, eType.Text, 'hey hey how are you?');
      service.sortedArrayfromObject(arr, 10, eType.Text, 'hey hey how are you?');
      service.sortedArrayfromObject(arr, 10, eType.Text, 'hey hey how are you?');

      expect(service.getOutputArray(eType.Text).length).toBe(1);

    }));

  it('Testing sortedArrayfromObject method : should have 2 occurences of "hey" in outputarray.', inject([CountService], (service: CountService) => {

    service.sortedArrayfromObject(arr, 10, eType.Text, 'hey hey how are you?');

    expect(service.getOutputArray(eType.Text)[0].OutputArray.filter(i => i[0] === 'hey')[0][1]).toBe(2);

  }));

  it('Testing getTextFromUrl method :should expect a string after calling the api', inject([CountService], (service: CountService) => {
    service.getTextFromUrl('api/gettext').subscribe(data => {
      expect(data).toBe('hey man how are you?');
    });

    const req = httpTestingController.expectOne('api/gettext');
    req.flush({ text_out: 'hey man how are you?' });
  }));

  it('Testing validateInputandreturnarray method : should return an array of size 5 when passing "hey hey how are you?"', inject([CountService], (service: CountService) => {
    expect(service.validateInputandreturnarray('hey hey how are you?').length).toBe(5);
  }));

  it('Testing validateInputandreturnarray method : should return an empty when passing special character "!!....?"', inject([CountService], (service: CountService) => {
    expect(service.validateInputandreturnarray('!!....?').length).toBe(0);
  }));
});

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _addresses = new BehaviorSubject<any>([]);

  get addresses() {
    return this._addresses.asObservable();
  }

  constructor() { }

  async addAddress(formData: any) {
    try {
      let addresses = this._addresses.value;
      if(addresses?.length == 0) {
        formData = { ...formData, primary: true };
      }

      const address = {
        ...formData,
        id: '1'
      };
      addresses = addresses.concat(address);
      this._addresses.next(addresses);
      return address;
    } catch(e) {
      throw(e);
    }
  }

  async getAddresses() {
    const dummyData = [
      { pincode: '414002', address: 'Svedi Naka', house_no: '33', city: 'Ahmednagar', state: 'Maharashta', country: 'India', save_as: 'Home', landmark: 'Near Iskon temple', primary: false },
      { pincode: '414002', address: 'MIDC',' Floor no': '6', city: 'Ahmednagar', state: 'Maharashtra', country: 'India', save_as: 'Work', landmark: 'Near renuka mata mandir', primary: true },
      { pincode: '414002', address: 'Bhingar', house_no: '4', city: 'Ahmednagar', state: 'Maharashtra', country: 'India', save_as: 'Other', landmark: 'Statebank Office', primary: false }
    ];
    this._addresses.next(dummyData);
    return dummyData;
  }

}
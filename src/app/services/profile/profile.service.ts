import { Injectable } from '@angular/core';

export interface Profile {
  name: string;
  email: string;
  photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _profile: Profile = {
    name: 'John Doe',
    email: 'john@example.com',
    photo: 'assets/default-profile.png'
  };

  get profile(): Profile {
    return this._profile;
  }

  updateProfile(name: string, email: string) {
    this._profile = { ...this._profile, name, email };
  }

  updatePhoto(photo: string) {
    this._profile = { ...this._profile, photo };
  }
}

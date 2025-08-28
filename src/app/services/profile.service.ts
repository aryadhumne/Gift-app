import { Injectable } from '@angular/core';

export interface Profile {
  name: string;
  email: string;
  photo: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profile: Profile = {
    name: 'John Doe',
    email: 'john@example.com',
    photo: 'assets/default-profile.png', // fallback image
  };

  updateProfile(name: string, email: string) {
    this.profile.name = name;
    this.profile.email = email;
  }

  updatePhoto(photo: string) {
    this.profile.photo = photo;
  }
}

import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../auth.service";
import {radioOutline} from "ionicons/icons";
import { UserModel } from 'src/app/models/user.model';
import {v4} from "uuid";
import {getAuth} from "@angular/fire/auth";
import {UsersService} from "../../../users.service";
import {FotoService} from 'src/app/foto.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {

  public user: UserModel = {
    name: "",
    authUserId: "",
    photoUrl: "",
    id: "-1",
    favorites: new Set(),
    cart: new Map(),
    role: 'USER'
  };

  constructor(private router: Router, private authService: AuthService, private userService: UsersService, private photoService: FotoService) {
  }

  async takePhoto() {
    let photo = await this.photoService.takePhoto();

    if (photo.base64String != null) {
      this.user.photoUrl = "data:image/jpeg;charset=utf-8;base64," + photo.base64String
    }
  }

  get showURL() {
    return this.user.photoUrl === "";
  }

  ngOnInit() {
    if (this.authService.user() !== null) {
      console.log("Moving you ;)...")
      this.router.navigate(["/"]);

      return
    }

    getAuth().authStateReady().then(value => {
      if (this.authService.authUser() === null) {
        console.log("Moving you ;)...")
        this.router.navigate(["/"]);

        return;
      }

      this.user = {
        id: v4(),
        // @ts-ignore we know it isn't null lol.
        authUserId: this.authService.authUser().uid,
        name: this.authService.authUser()?.displayName || "",
        photoUrl: this.authService.authUser()?.photoURL || "",
        favorites: new Set(),
        cart: new Map(),
        role: 'USER'
      }
    })
  }

  submit() {
    this.userService.save(this.user).then(ignored => {
      this.authService.updateUser(this.user);
      this.router.navigate(["/"]);
    })
  }
}

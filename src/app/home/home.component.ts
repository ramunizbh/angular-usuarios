import { Component, OnInit } from '@angular/core';

import { UserList, UserResult, User } from '../models/user';
import { UserService } from '../user.service';
import { faTrash, faUserEdit, faUserAlt } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
    userList: UserList[];
    faTrash=faTrash;
    faUserEdit=faUserEdit;
    faUserAlt=faUserAlt;
    permiteCarregar: boolean = true;

    constructor(private userService: UserService) { }

    ngOnInit() {
      this.getUsers();
    }

    getUsers(): void {
      this.userService.getUsers(false)
      .subscribe((userList: UserResult) => {
        this.userList = userList.data;
        console.log(this.userList);
      });
      
    }

    carregarMais() {
      this.userService.getUsers(true)
      .subscribe((userList: UserResult) => {
        if (userList.data.length == 0) {
          this.permiteCarregar = false;
        }else {
          this.userList.push(...userList.data);
          console.log(this.userList);
        }
      });
    }

    deleteUser(user: UserList): void {
      console.log(user.id);
      this.userList = this.userList.filter(v => v.id != user.id)
      this.userService.deleteUser(user).subscribe();
      //this.userList = [];
      //this.getUsers();
    }
}

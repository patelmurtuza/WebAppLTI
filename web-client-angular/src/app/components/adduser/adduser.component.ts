import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../models/users'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  constructor(private service: UsersService, private toastr: ToastrService, public router: Router) { }
  @Output() newUserEvent = new EventEmitter<User[]>();

  addNewUser(value) {
    this.newUserEvent.emit(value);
  }
  
  
    model = new User("", "", "", "");
    brands: string[] = ["Brand 1", "Brand 2", "Brand 3"];
    enableBtn: boolean = true;
    ngOnInit(): void {
    }

    onSubmit(a: User) {
      this.enableBtn = false;
      a.firstname = a.firstname.toLowerCase();
      a.lastname = a.lastname.toLowerCase();
      a.email = a.email.toLowerCase();
      this.service.AddData(a);
      this.toastr.success("User Created", 'Done', {
        timeOut: 2000
      });
      this.addNewUser(this.service.fetchData());
      this.enableBtn = true;
    }
}

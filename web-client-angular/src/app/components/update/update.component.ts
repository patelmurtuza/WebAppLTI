import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/users'
import { UsersService } from '../../services/users.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private service: UsersService, private router: Router, private toastr: ToastrService) { }

  @Input() User: User;
  @Output() newUserEvent = new EventEmitter<User[]>();

  model = new User("", "", "", "");
  brands: string[] = ["Brand 1", "Brand 2", "Brand 3"];
  enableBtn: boolean = true;

  ngOnInit(): void {
    let a = this.service.fetchUsertoUpdate();
    this.model = new User(a.firstname, a.lastname, a.email, a.brand);
  }

  ngOnChanges() {
    //console.log(this.User)
    this.model = this.User;
  }

  updateExistingUsers(value) {
    this.newUserEvent.emit(value);
  }

  gotoAdmin() {
    this.router.navigate([`${'admin'}`]);

  }
  onSubmit(data: User) {

    this.enableBtn = false;
    try {
      let prevdata = this.service.fetchData();
      let previousUser = this.service.fetchUsertoUpdate();

      for (let i = 0; i < prevdata.length; i++) {
        if (prevdata[i].email == previousUser.email)
          prevdata[i] = data;
      }
      this.service.UpdateData(prevdata);
      this.toastr.success("User updated", 'Done', {
        timeOut: 2000
      });
      this.updateExistingUsers(this.service.fetchData());
    }

    catch (e) {
      this.toastr.error("Oops", 'User not updated', {
        timeOut: 2000
      });

    }
    this.enableBtn = true;
  }

}

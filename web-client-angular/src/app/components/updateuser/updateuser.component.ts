import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users'
import { UsersService } from '../../services/users.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css', '../../styles/form.css', '../../styles/table.css']
})
export class UpdateuserComponent implements OnInit {

  constructor(private service: UsersService, private router: Router, private toastr: ToastrService) { }

  model = new User("", "", "", "");

  brands: string[] = ["Brand 1", "Brand 2", "Brand 3"];
  enableBtn: boolean = true;

  ngOnInit(): void {
    let a = this.service.fetchUsertoUpdate();
    this.model = new User(a.firstname, a.lastname, a.email, a.brand);
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
      this.router.navigate([`${'admin'}`]);
      this.toastr.success("User updated", 'Done', {
        timeOut: 2000
      });

    }

    catch (e) {
      this.toastr.error("Done", 'User updated', {
        timeOut: 2000
      });

    }
    this.enableBtn = true;
  }

}

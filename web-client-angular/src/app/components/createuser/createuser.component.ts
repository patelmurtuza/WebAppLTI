import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../models/users'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css', '../../styles/form.css', '../../styles/table.css']
})
export class CreateuserComponent implements OnInit {

  constructor(private service: UsersService, private toastr: ToastrService, public router: Router) { }
  @Output() newItemEvent = new EventEmitter<string>();

  addNewItem(value) {
    this.newItemEvent.emit(value);
  }


  model = new User("", "", "", "");
  brands: string[] = ["Brand 1", "Brand 2", "Brand 3"];
  enableBtn: boolean = true;
  ngOnInit(): void {
  }

  gotoAdmin() {
    this.router.navigate([`${'admin'}`]);

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
    this.addNewItem(this.service.fetchData());
    this.enableBtn = true;
  }
}

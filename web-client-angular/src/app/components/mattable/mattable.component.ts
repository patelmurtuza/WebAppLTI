import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/users'
import { UsersService } from '../../services/users.service'
import { Router } from '@angular/router';
import { rowsAnimation, fadeOut, fade, blub } from '../../animations/animation';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-mattable',
  templateUrl: './mattable.component.html',
  styleUrls: ['./mattable.component.css'],
  animations: [rowsAnimation, fadeOut, fade, blub],
})
export class MattableComponent implements OnInit {

  constructor(private service: UsersService, private router: Router, private cdr: ChangeDetectorRef) {
    
   }
  displayedColumns: string[] = ['First Name', 'Last Name', 'Email ID', 'Brand', "Actions"];
  public userList: User[] = [];
  public showAddUserForm: boolean = false;
  public userToEdit: User;
  public showEditUserForm: boolean = false;
  public displayList: User[] = [];
  public delete:boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.userList = this.service.userData;
  }
  
  ngAfterViewInit()
  {
    this.displayList = this.userList.slice(this.paginator.pageIndex* this.paginator.pageSize, this.paginator.pageSize + this.paginator.pageIndex* this.paginator.pageSize );
    //console.log(this.displayList)
    this.cdr.detectChanges();
  }
 
  addUser(newArray) {
    this.showAddUserForm = false;
    //this.userlist = [...newArray];
    this.displayList =  this.userList.slice(this.paginator.pageIndex* this.paginator.pageSize, this.paginator.pageSize + this.paginator.pageIndex* this.paginator.pageSize );
  }

  updateUser(newArray) {
    this.showEditUserForm = false;
    //this.userlist = [...newArray];
    this.displayList =  this.userList.slice(this.paginator.pageIndex* this.paginator.pageSize, this.paginator.pageSize + this.paginator.pageIndex* this.paginator.pageSize );

  }

  deleteUser(_email: string) {
    this.delete = true;
    setTimeout(() => {

    },5000);

    // let data = this.service.fetchData();
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i].email === _email) {
    //     data.splice(i, 1);
    //   }
    // }
    // this.userList = data;
    // this.service.UpdateData(data);
    // this.displayList =  this.userList.slice(this.paginator.pageIndex* this.paginator.pageSize, this.paginator.pageSize + this.paginator.pageIndex* this.paginator.pageSize );
  }

  editUser(user: User) {
    this.service.UpdateUser(user);
    this.showEditUserForm = true;
    this.userToEdit = user;
  }

  handleEditUser()
  {
      this.showEditUserForm = false;
  }
  handleAddNewUser() {
    this.showAddUserForm = !this.showAddUserForm;
  }

  handlePagination(event)
  {
    this.displayList = this.userList.slice(event.pageIndex* event.pageSize, event.pageSize + event.pageIndex* event.pageSize );
  }
}

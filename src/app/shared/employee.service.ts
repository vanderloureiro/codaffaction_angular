import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public firebase: AngularFireDatabase) { }

  employeeList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    departament: new FormControl(0),
    hideDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });
  
  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      departament: 0,
      hideDate: '',
      isPermanent: false
    });
  }

  getEmployees(){
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }

  insertEmployee(employee){
    this.employeeList.push({
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      departament: employee.departament,
      hideDate: employee.hideDate,
      isPermanent: employee.isPermanent
    });
  }

  updateEmployee(employee){
    this.employeeList.update(employee.$key,
      {
        fullName: employee.fullName,
        email: employee.email,
        mobile: employee.mobile,
        city: employee.city,
        gender: employee.gender,
        departament: employee.departament,
        hideDate: employee.hideDate,
        isPermanent: employee.isPermanent
      });
  }

  deleteEmployee($key: string){
    this.employeeList.remove($key);
  }
  
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User;
  title: string = "Cadastro de Usuário";
  typeForm: string = 'N';
  msgErro: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private location: Location
    ){}

  idRecebido?: string | null;
  formDisabled = false;

  userForm = this.fb.group({
    title: [''],
    firstName: ['',[Validators.required]],
    lastName: ['', [Validators.required]],
    gender: [''],
    email: ['', [Validators.required]],
    phone: [''],
    dateOfBirth: [''],
    picture: ['']
  })

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    
    
    this.idRecebido = this.route.snapshot.paramMap.get('id');

    let type =  this.route.snapshot.queryParamMap.get('type');

    if (this.idRecebido) {
      this.title = type=='edit' ? "Atualizar Usuário" : "Consultar Usuário";
      this.typeForm = type=='edit' ? "E" : "C";

      this.userService.getUser(this.idRecebido)
        .subscribe(user => {
          this.user = user
          console.log(this.user)
          this.atualizarCampos(user);

          if (type != 'edit') this.userForm.disable();
        });
    }
  }

  addUser(form: any): void {

    this.userService.addUser(form).subscribe(value => {
      console.log(value)
      this.location.back();
    }, err => {
      console.log(err.error.data?.email)
      if (err.error.data?.email){
        this.msgErro = "E-mail já cadastrado!"
      }
    });
  }

  updateUser(form: any): void {

    this.userService.updateUser({...form, id: this.idRecebido}).subscribe(value => {
      console.log(value)
      this.location.back();
    });
  }

  save() {
    console.log(this.userForm.value);
    if (this.typeForm == 'N'){
      this.addUser(this.userForm.value)
    } else {
      this.updateUser(this.userForm.value)
    }
      
  }

  atualizarCampos(user: User) {
    this.userForm.setValue({
      title: user.title,
      firstName: user.firstName,
      lastName:  user.lastName,
      gender: user.gender,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      picture: user.picture
    });
  }
}

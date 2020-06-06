import { Component, OnInit } from '@angular/core';

import { GLOBAL } from './services/global';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit{
  public title = 'Gibbyfy';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url: string;

  constructor(
  	private _userService:UserService
  ){
  	this.user = new User('', '', '', '', '', 'ROLE_USER', '');
  	this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
  	this.url = GLOBAL.url;
  }

  ngOnInit(){
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();

  	console.log(this.identity);
  	console.log(this.token);
  }

  public onSubmit(){
  	console.log(this.user);

  	//conseguir los datos del usuario identificado
  	this._userService.signup(this.user).subscribe(
  		response => {

  			var respuesta: any = response;
        	this.identity = respuesta.hola;

        	if (!this.identity._id) {
          		alert('El usuario no esta correctamente logueado.');
        	} else {
        		//Crear elemento en el local storage para tener al usuario en sesión
        		localStorage.setItem('identity', JSON.stringify(this.identity));

        		//Conseguir el token para enviarselo a cada peticion HTTP
        		this._userService.signup(this.user, 'true').subscribe(
        			response => {
        				var respuesta2: any = response;
        				this.token = respuesta2.token;

        				if(this.token.length <= 0){
        					alert('El token no se ha generado');
        				}else{
        					//Crear elemento en el local storage para tener token disponible
        					localStorage.setItem('token', this.token);
        					this.user = new User('', '', '', '', '', 'ROLE_USER', '');
        				}
        			},
        			error => {

        			}
        		);
        	}
  		},
  		error => {
  			var errorMessage = <any> error;

  			if(errorMessage != null){
  				this.errorMessage = errorMessage.error.message;
  				console.log(error);
  				console.log(errorMessage);
  				console.log(this.errorMessage);
  			}
  		}
  	);
  }

  logout(){
  	localStorage.removeItem('identity');
  	localStorage.removeItem('token');
  	localStorage.clear();
  	this.identity = null;
  	this.token = null;
  }

  onSubmitRegister(){
  	console.log(this.user_register);

  	this._userService.register(this.user_register).subscribe(
  		response => {
  			var respuesta: any = response;
        	this.user_register = respuesta.user;

  			if(!this.user_register._id){
  				this.alertRegister = 'Error al registrarse';
  			}else{
  				this.alertRegister = 'El registro se ha realizado correctamente, identificate con '+this.user_register.email;
  				this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
  			}
  		},
  		error => {
  			var errorMessage = <any> error;

  			if(errorMessage != null){
  			this.alertRegister = errorMessage.error.message;
  			//	console.log(error);
  			//	console.log(errorMessage);
  			//	console.log(this.errorMessage);
  			}
  		}
  	);  		
  }
}

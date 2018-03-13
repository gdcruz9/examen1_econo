import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {
	
    name: string;
    last: string;
    email: string;
    pwd: string;

    constructor() {
        this.name = 'Blank';
        this.last = 'Name';
        this.email = 'Name';
        this.pwd = 'Name';
    }
 
    setName(firstName) {
        this.name = firstName;
    }

    setLast( lastName) {
        this.last = lastName;       
    }

    setEmail(em) {
      this.email=em;
    }

    setPswd(psswd) {
        this.pwd=psswd;
    }
 
    getName() {
        return this.name;
    }  

    getLast() {
        return this.last;
    }  

    getEmail() {
        return this.email;
    }  

    getPwd() {
        return this.pwd;
    }  
}
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Admin } from '../models/admin.model';

import { environment } from '../../../environments/environment';
import {Error} from 'tslint/lib/error';
import {current} from 'codelyzer/util/syntaxKind';
@Injectable({
    providedIn: 'root'
})
export class AdminapiService {

    constructor(private http: HttpClient) { }

    baseURl = environment.apiURL;

    getApiHeader() {
        let Option = {headers: new HttpHeaders({
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).access_token
            })};
        return Option;
    }


    updateProfile(param: object) {
        return this.http.post<any>(this.baseURl + '/updateProfile', param, this.getApiHeader())
            .pipe(map(response => {
                return response;
        }));
    }

    getUsers(param) {
        return this.http.post<any>(this.baseURl + '/getUsers', param, this.getApiHeader())
            .pipe(map(response => {
                if (response.status) {
                    return response;
                } else {
                    return [];
                }
            }));
    }

    addUser(param) {
        return this.http.post<any>(this.baseURl + '/addUser', param, this.getApiHeader())
            .pipe(map(response => {
                return response;
            }));
    }

    updateUser(param) {
        return this.http.post<any>(this.baseURl + '/updateUser', param, this.getApiHeader())
            .pipe(map(response => {
                return response;
            }));
    }

    removeUser(param) {
        return this.http.post<any>(this.baseURl + '/removeUser',{ user_id: param }, this.getApiHeader())
            .pipe(map(response => {
                return response;
            }));
    }

    getUsersList() {
        return this.http.get<any>(this.baseURl + '/getUsersList', this.getApiHeader())
            .pipe(map(response => {
                if (response.status) {
                    return response;
                } else {
                    return [];
                }
        }));
    }

    addDocument(param, fileToUpload) {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        formData.append('title', param.title);
        formData.append('user', param.user);
        return this.http.post<any>(this.baseURl + '/addDocument', formData, this.getApiHeader())
            .pipe(map(response => {
                if (response.status) {
                    return response;
                } else {
                    return [];
                }
        }));
    }

    getDocumentList(param) {
        return this.http.post<any>(this.baseURl + '/getDocumentList', param, this.getApiHeader())
            .pipe(map(response => {
                if (response.status) {
                    return response;
                } else {
                    return [];
                }
            }));
    }


    updateDocument(param) {
        return this.http.post<any>(this.baseURl + '/updateDocument', param, this.getApiHeader())
            .pipe(map(response => {
                return response;
            }));
    }

    deleteDocument(param) {
        return this.http.post<any>(this.baseURl + '/deleteDocument', { doc_id: param.id }, this.getApiHeader())
            .pipe(map(response => {
                return response;
            }));
    }

    getProduct() {
        return this.http.get<any>(this.baseURl + '/getProducts', this.getApiHeader())
            .pipe(map(response => {
                return response;
            }));
    }

    addProduct(param) {
        return this.http.post<any>(this.baseURl + '/addProduct', param , this.getApiHeader())
            .pipe(map(response => {
                return response;
        }));
    }

    updateProduct(param) {
        return this.http.post<any>(this.baseURl + '/updateProduct', param , this.getApiHeader())
            .pipe(map(response => {
                return response;
            }));
    }

    deleteProduct(product_id) {
        return this.http.post<any>(this.baseURl + '/deleteProduct', {product_id: product_id} , this.getApiHeader())
            .pipe(map(response => {
                return response;
            }));
    }

    getPlans() {
        return this.http.get<any>(this.baseURl + '/getPlans', this.getApiHeader())
            .pipe(map(response => {
                return response;
            }));
    }

    addPlan( param ) {
        return this.http.post<any>(this.baseURl + '/addPlan', param , this.getApiHeader())
            .pipe(map(response => {
                return response;
            }));
    }

    updatePlan( param ) {
        return this.http.post<any>(this.baseURl + '/updatePlan', param , this.getApiHeader())
            .pipe(map(response => {
                return response;
            }));
    }



}


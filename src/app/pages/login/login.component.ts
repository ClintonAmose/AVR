import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, BaseAPIURL } from '../common/common.service';
import 'rxjs/add/operator/toPromise';


@Component( {
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
    providers: [CommonService]
} )
export class Login implements OnInit {

    public form: FormGroup;
    public username: AbstractControl;
    public password: AbstractControl;
    //public branch: AbstractControl;
    public submitted: boolean = false;
    isDisabled: boolean = false;
    getuserLoginURL: string = '';
    errorMessage: string = '';
    private headers: Headers;
    //branches = [];

    constructor( fb: FormBuilder, private router: Router, private http: Http,
        private commonService: CommonService ) {
        this.form = fb.group( {
            'username': ['', Validators.compose( [Validators.required, Validators.minLength( 4 )] )],
            'password': ['', Validators.compose( [Validators.required, Validators.minLength( 4 )] )]
            //'branch': ['', Validators.compose( [Validators.required] )]
        } );


        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
        //this.branch = this.form.controls['branch'];
        this.getuserLoginURL = BaseAPIURL + 'Adminaccount_api/login_adminuser';
        //this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.headers = new Headers();
        this.headers.append( 'Content-Type', 'application/json;charset=UTF-8' );
        this.headers.append( 'Authorization', 'Basic ' + btoa( 'lmxretail:lmx@2017' ) );
        //this.branch=this.commonService.getAllBranch();
        // this.commonService.getAllBranch().then(( data ) => {
        //        this.branches = data;
        //        console.log(this.branches);
        //    } );

        if ( localStorage.getItem( 'currentUser' ) != null ) {
            let curuserdet = JSON.parse( localStorage.getItem( 'currentUser' ) );
            if ( curuserdet.is_logged_in ) {
                this.commonService.updateLogin( curuserdet.username, curuserdet.userid, curuserdet.userdisplayname, true );
                this.router.navigate( ['pages/dashboard'] );
            }
        }

    }

    ngOnInit() {
    }

    public onSubmit( values: Object ): void {//console.log( btoa('lmxretail:lmx@2017'));
        //console.log(values);
        this.submitted = true;
        if ( this.form.valid ) {
            // your code goes here
            // console.log(values);
            this.errorMessage = 'Logging in...';
            this.isDisabled = true;
            let options = new RequestOptions( { headers: this.headers } );
            this.http.post( this.getuserLoginURL, JSON.stringify( values ), options ).subscribe(
                response => {
                    let result = response.json();
                    this.errorMessage = result.message;
                    //localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    localStorage.setItem( 'currentUser', JSON.stringify( result.responsedata ) );
                    this.commonService.updateLogin( result.responsedata.username, result.
                        responsedata.userid, result.responsedata.userdisplayname, true );
                    this.router.navigate( ['pages/dashboard'] );
                },
                error => {
                    this.isDisabled = false; console.log( error );
                    if ( error.status == 400 ) {
                        this.errorMessage = JSON.parse( error._body ).message;
                    } else {
                        this.errorMessage = 'Internal server error. please contact admin.';
                    }
                }, () => {
                } );
        }
    }
}

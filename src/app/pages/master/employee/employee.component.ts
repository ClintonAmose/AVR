import { Component, OnInit, EventEmitter, NgZone } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { CommonService } from '../../common/common.service';
import { ModalComponent } from '../../common/modal/modal.component';
import { IMyDpOptions } from 'mydatepicker';
import { Location } from '@angular/common';
import { NgUploaderOptions, UploadedFile, UPLOAD_DIRECTIVES } from 'ngx-uploader';
@Component( {
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css', '../../tables/components/dataTables/dataTables.scss']
} )
export class EmployeeComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'id_employee';
    sortOrder = 'Desc';
    empmodal: ModalComponent;
    credmodal: ModalComponent;
    imgmodal: ModalComponent;
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    agree: boolean = false;
    employdet = this.getEmptyEmployee();
    countries = [];
    states = [];
    cities = [];
    branches = [];
    departments = [];
    designations = [];
    profiles = [];

    uploadFile: any;
    uploadProgress: number;
    uploadResponse: Object;
    uploadInput: EventEmitter<UploadedFile>;
    zone: NgZone;
    employeeimage = this.getEmptyEmpImgData();
    private serverurl: string;
    public defaultPicture = 'assets/img/theme/no-photo.png';
    public profile: any = {
        picture: 'assets/img/app/profile/Nasta.png'
    };
    public uploaderOptions: NgUploaderOptions;
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };
	accessData;
	records =[];
	public loadingPicture = 'assets/img/theme/loading.gif';
	
    constructor(private location: Location, private router: Router, private service: EmployeeService, private commonservice: CommonService ) {
		
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
		
        this.serverurl = service.getServerurl();
        this.uploadProgress = 0;
        this.uploadResponse = {};
        this.zone = new NgZone( { enableLongStackTrace: false } );

    }

    ngOnInit() {
        this.getEmployeelist();
        //this.getAllCountry();
        this.getAllBranches();
        this.getAllDepartments();
        this.getAllDesignations();
        this.getAllProfile();
    }
    getEmptyEmpImgData() {
        return {
            id_employee: '',
            image: '',
            imgurl: ''
        }
    }
    getEmptyEmployee() {
        let date = new Date();
        return {
            id_employee: '',
            dob: {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            },
            doj: {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            },
            id_branch: '',
            lastname: '',
            firstname: '',
            date_of_birth: '',
            emp_code: '',
            dept: '',
            designation: '',
            date_of_join: '',
            address1: '',
            address2: '',
            address3: '',
            email: '',
            mobile: '',
            active: '1',
            phone: '',
            image: '',
            comments: '',
            username: '',
            passwd: '',
            id_profile: '',
            createdby: 1,
        };
    }
    getAllBranches() {
        this.commonservice.getAllBranch().then( res => {
            if ( res ) {
                this.branches = res;
            }
        }, error => {

        } );
    }
    getAllDepartments() {
        this.service.getDepartmentData().then( res => {
            if ( res ) {
                this.departments = res;
            }
        }, error => {

        } );
    }
    getAllDesignations() {
        this.service.getDesignationData().then( res => {
            if ( res ) {
                this.designations = res;
            }
        }, error => {

        } );
    }
    getAllProfile() {
        this.service.getProfileData().then( res => {
            if ( res ) {
                this.profiles = res;
            }
        }, error => {

        } );
    }
    getAllCountry() {
        this.commonservice.getCountryData().then( res => {
            if ( res ) {
                this.countries = res;
            }
        }, error => {

        } );
    }
    getStateforCountry( country_id ) {
        this.commonservice.getStatebyCountryData( country_id ).then( res => {
            if ( res ) {
                this.states = res;
            }
        }, error => {

        } );
    }
    getCityforState( state_id ) {
        this.commonservice.getCitybyStateData( state_id ).then( res => {
            if ( res ) {
                this.cities = res;
            }
        }, error => {

        } );
    }

    getEmployeelist() {
        this.service.getData().then(( data ) => {
            this.data = data;
			console.log(this.data);
         if(this.data.length <=0)
			  {
				  setTimeout(() => {
					this.battleInit(); 
					}, 2000);
			  }
			  else if(this.data.length>0)
			  {
				  this.records =this.data;
			  }
        } );
		
    }
	battleInit()
	{
		this.records.push('wholesale');
	}
    getEmployeeDetailById( empid ) {
        this.service.getemployeedetailById( empid ).then( res => {
            if ( res ) {

                this.employdet.id_branch = res.id_branch;
                this.employdet.id_employee = res.id_employee;
                this.employdet.active = res.active;
                this.employdet.lastname = res.lastname;
                this.employdet.firstname = res.firstname;
                if ( res.date_of_join != null && res.date_of_join != '' ) {
                    let date = new Date( res.date_of_join );
                    this.employdet.doj = {
                        date: {
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            day: date.getDate()
                        }
                    }
                } else {
                    this.employdet.doj = res.date_of_join;
                }
                if ( res.date_of_birth != null && res.date_of_birth != '' ) {
                    let date = new Date( res.date_of_birth );
                    this.employdet.dob = {
                        date: {
                            year: date.getFullYear(),
                            month: date.getMonth() + 1,
                            day: date.getDate()
                        }
                    }
                } else {
                    this.employdet.dob = res.date_of_birth;
                }
                this.employdet.emp_code = res.emp_code;
                this.employdet.dept = res.dept;
                this.employdet.designation = res.designation;
                this.employdet.email = res.email;
                this.employdet.mobile = res.mobile;
                this.employdet.address1 = res.address1;
                this.employdet.address2 = res.address2;
                this.employdet.address3 = res.address3;
                this.employdet.phone = res.phone;
                this.employdet.image = res.image;
                this.employdet.comments = res.comments;
                this.employdet.username = res.username;
                this.employdet.id_profile = res.id_profile;
                this.employdet.active = res.active;
                this.employdet.createdby = 1;


            }
        }, error => {
            console.log( error );
        } );
    }
    createnewemployeedetails() {
        this.title = 'Create New Employee';
        this.isAddMode = true;
        this.isEditMode = false;
        this.employdet = this.getEmptyEmployee();
        this.empmodal.open();
    }
    updateemployeedetails( id_employee ) {
        this.title = 'Update Employee';
        this.isAddMode = false;
        this.isEditMode = true;
        this.getEmployeeDetailById( id_employee );
        this.empmodal.open();
    }
    updatelogincredential( userid ) {
        this.title = 'Update Credential';
        this.agree = false;
        this.getemployeeCredentialbyId( userid );
        this.credmodal.open();
    }
    bindEmployeeModal( _modal ) {
        this.empmodal = _modal;
    }
    bindCredentialModal( _modal ) {
        this.credmodal = _modal;
    }
    bindImageModal( _modal ) {
        this.imgmodal = _modal;
    }
    closeemployeemodal() {
        this.empmodal.close();
    }
    close(){
        this.imgmodal.close();
    }
    closecredential() {
        this.credmodal.close();
    }
    closeimgpopup() {
        this.employeeimage = this.getEmptyEmpImgData();
        this.imgmodal.close();
    }
    saveemploydetails( isUpdate, canClose ) {
        if ( this.employdet.doj != null ) {
            this.employdet.date_of_join = this.employdet.doj.date.day + "-" + this.employdet.doj.date.month + "-" + this.employdet.doj.date.year;
        }
        if ( this.employdet.dob != null ) {
            this.employdet.date_of_birth = this.employdet.dob.date.day + "-" + this.employdet.dob.date.month + "-" + this.employdet.dob.date.year;
        }

        if ( isUpdate ) {
            if ( this.employdet.id_employee != '' ) {
                this.service.updateemployee( JSON.stringify( this.employdet ) ).then( res => {
                    if ( res ) {
                        this.getEmployeelist();
                        this.empmodal.close();
                        if ( res.success ) {
                            this.commonservice.showAlertMSG( 1, res.message );
                        } else {
                            this.commonservice.showAlertMSG( 2, res.message );
                        }
                    }
                }, error => {

                } );
            }
        } else {
            this.service.createemployee( JSON.stringify( this.employdet ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.getEmployeelist();
                    if ( canClose ) {
                        this.empmodal.close();
                    }
                    this.clearData();
                }
            }, error => {

            } );
        }
    }
    clearData() {
        this.employdet = this.getEmptyEmployee();
    }

    getemployeeCredentialbyId( userid ) {
        this.service.getusercredential( userid ).then( res => {
            if ( res ) {
                this.employdet.username = res.username;
                this.employdet.id_employee = res.id_employee;
            }
        }, error => {
            console.log( error );
        } );
    }
    updatecredential( userid ) {
        if ( userid ) {
            this.service.updateemployeecredential( JSON.stringify( { id: userid, username: this.employdet.username, passwd: this.employdet.passwd } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    this.credmodal.close();
                }
            }, error => {
                console.log( error );
            } );
        }
    }
    updateimage( empid ) {
        this.employeeimage = this.getEmptyEmpImgData();
        this.title = 'Update Employee Image';
        for ( let data of this.data ) {
            if ( data.id_employee == empid ) {
                if ( data.imgurl != null && data.imgurl != '' ) {
                    this.employeeimage = {
                        id_employee: empid,
                        image: data.image,
                        imgurl: data.imgurl
                    }
                } else {
                    this.employeeimage = {
                        id_employee: empid,
                        image: '',
                        imgurl: 'assets/img/theme/no-photo.png'
                    }
                }
                this.uploadFile = "";
                this.uploadProgress = 0;;
                this.uploadResponse = null;
                this.uploaderOptions = new NgUploaderOptions( {
                    // url: 'http://website.com/upload'
                    url: this.serverurl + 'adminaccount_api/employeeimageupload',
                    method: 'POST',
                    data: this.employeeimage,
                    authToken: this.service.getAuthtoken(),
                    authTokenPrefix: this.service.getauthTokenPrefix(),
                    previewUrl: true,
                    calculateSpeed: true,
                    fieldName: 'employee'
                } );
                this.imgmodal.open();
                //setTimeout(() => { this.imgmodal.open() }, 1000 );
            }
        }
    }
    handleUpload( data ): void {
        this.uploadFile = data;
        this.zone.run(() => {
            this.uploadProgress = data.progress.percent;
        } );

        let resp = JSON.parse( JSON.stringify( data ) );
        if ( resp.progress.percent == 100 ) {
            //resp = JSON.parse( resp );
            //this.uploadResponse = resp;
            this.clearData();
            this.getEmployeelist();
            this.imgmodal.close();
            this.commonservice.showAlertMSG( 1, "Image Uploaded successfully" );
        }

    }

}

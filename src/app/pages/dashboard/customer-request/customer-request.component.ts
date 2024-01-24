import { Component, OnInit } from '@angular/core';
import { CustomerrequestService } from './customerrequest.service';
import { Router } from '@angular/router';
import { CommonService } from '../../common/common.service';
import { ModalComponent } from '../../common/modal/modal.component';
@Component( {
    selector: 'customer-request',
    templateUrl: './customer-request.component.html',
    styleUrls: ['./customer-request.component.css', '../../tables/components/dataTables/dataTables.scss']
} )
export class CustomerRequestComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'orderno';
    sortOrder = 'desc';

    orderdetailsmodal: ModalComponent;
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    orderdetails = [];
    vendors = [];
    assignvendor = "";
    constructor( private router: Router, private service: CustomerrequestService, private commonservice: CommonService ) {

    }

    ngOnInit() {
        this.getCustomerOrderlist();
        this.getVendorslist();
    }
    getCustomerOrderlist() {
        this.service.getData().then(( data ) => {
            this.data = data;
        } );
    }
    getVendorslist() {
        this.service.getVendorData().then(( data ) => {
            this.vendors = data;
        } );
    }
    bindOrderDetailModal( _modal ) {
        this.orderdetailsmodal = _modal;
    }
    closeorderdetailmodal() {
        this.orderdetails = [];
        this.orderdetailsmodal.close();
    }
    vieworderdetails( id_order ) {
        this.title = 'View Order Details';
        this.isAddMode = false;
        this.isEditMode = false;
        this.getOrderDetailById( id_order );
        this.orderdetailsmodal.open();
    }
    getOrderDetailById( orderid ) { }
    assignordertovendor() {
        let assignorders = [];
        this.data.forEach(( orders ) => { // foreach statement  
            if ( orders.isChecked == true ) {
                //deliveryorders
                assignorders.push( orders );
            }
        } )
        if ( assignorders.length > 0 && this.assignvendor != "" ) {
            this.service.assignordertovendor( JSON.stringify( { assignorders: assignorders, vendorid: this.assignvendor } ) ).then( res => {
                if ( res ) {
                    this.getCustomerOrderlist();
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                }
            }, error => {
                this.commonservice.showAlertMSG( 2, "Please select any one order" );
            } );
        } else {
            if ( this.assignvendor == "" ) {
                this.commonservice.showAlertMSG( 2, "Please select karigar" );
                return;
            }
            this.commonservice.showAlertMSG( 2, "Please select any one order" );
        }
    }
    rejectcustomerorder() {
        let rejectorders = [];
        this.data.forEach(( orders ) => { // foreach statement  
            if ( orders.isChecked == true ) {
                let rejorders = {
                    id_orderdetails: orders.id_orderdetails
                };
                rejectorders.push( rejorders );
            }
        } )
        if ( rejectorders.length > 0 ) {
            this.service.rejectcustomerorder( JSON.stringify( { rejectorders: rejectorders } ) ).then( res => {
                if ( res ) {
                    this.getCustomerOrderlist();
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                    } else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                }
            }, error => {

            } );
        } else {
            this.commonservice.showAlertMSG( 2, "Please select any one order" );
        }
    }
}

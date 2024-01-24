import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignService } from '../design.service';
import { PurityService } from '../../purity/purity.service';
import { ItemService } from '../../item/item.service';
import { ItemcategoryService } from '../../itemcategory/itemcategory.service';
import { CommonService, BaseAPIURL } from '../../../common/common.service';
import { CompleterCmp, CompleterData, CompleterService, CompleterItem, RemoteData } from 'ng2-completer';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ModalComponent } from '../../../common/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { Location } from '@angular/common';

@Component( {
    selector: 'app-bomdetails',
    templateUrl: './bomdetails.component.html',
    styleUrls: ['./bomdetails.component.css', '../../../tables/components/dataTables/dataTables.scss']
} )
export class BomdetailsComponent implements OnInit {

    bomdetails = [];
    purities = [];
    BOMLines = [];
    itemcategories = [];
	rowsOnPage = 50;
	rowsOnPageSet = [50,100,150];
    rawitems = [];
    public itemsRemote: RemoteData;
    public dieRemote: RemoteData;
    public semifinishitemsRemote: RemoteData;
    public finisheditemsRemote: RemoteData;
    private _header: Headers;
    //protected dataService: CompleterData;
    //rawitems: Array<any>;
    modal: ModalComponent;
    deletemodal: ModalComponent;
    priorityLDtitle = '';
    title: string = '';
    isEditMode: boolean = false;
    isAddMode: boolean = false;
    bomdatadetails = this.getBOMEmptyData();
	accessData;


    filterQuery = '';
    designid = "";
    currentbomid = "";
    @ViewChild( "remoteDataExample" ) private remoteDataExample: CompleterCmp;

    constructor( private location: Location,completerService: CompleterService, http: Http, private service: DesignService, private commonservice: CommonService, private route: ActivatedRoute, private router: Router, private purityservice: PurityService, private itemservice: ItemService, private itecat: ItemcategoryService ) {
		//Get User rights
		let currentURL = this.location.path();
		let path = currentURL.split('/');
		this.accessData = this.commonservice.getUserAccessByMenuPath(path[3])[0];
		
        //this.rawitems = commonservice.getItemData();

        this._header = new Headers();
        //this._header.append( 'Content-Type', 'application/json;charset=UTF-8' );
        this._header.append( 'Authorization', 'Basic ' + btoa( 'lmxretail' + ':' + 'lmx@2017' ) );
        this.itemsRemote = completerService.remote( BaseAPIURL + 'Master_api/autocompleteitems?search=',
            "name",
            "name" );
        this.itemsRemote.headers( this._header );
        this.itemsRemote.dataField( "responseData" );
        this.semifinishitemsRemote = completerService.remote( BaseAPIURL + 'Master_api/autocompleteitems?search=',
            "name",
            "name" );
        this.semifinishitemsRemote.headers( this._header );
        this.semifinishitemsRemote.dataField( "responseData" );

        this.finisheditemsRemote = completerService.remote( BaseAPIURL + 'Master_api/autocompleteitems?search=',
            "name",
            "name" );
        this.finisheditemsRemote.headers( this._header );
        this.finisheditemsRemote.dataField( "responseData" );

        this.dieRemote = completerService.remote( BaseAPIURL + 'Master_api/autocompletedieno?search=',
            "name",
            "name" );
        this.dieRemote.headers( this._header );
        this.dieRemote.dataField( "responseData" );

    }
    getBOMEmptyData() {
        return { id_bom: "", 'isChecked': false, 'linetype_bom': "", 'rawitem_id': "", 'rawitem_name': "", 'semifinishitem_id': "", 'semifinishitem_name': "", 'finishitem_id': "", 'finishitem_name': "", 'item_category': "", 'purity': "", 'netweight': 0, 'primaryitem': false, 'noofstone': 0, 'dierefnumber': "", 'dienumber': "", 'qty' : "" }
    }


    // Form Open And Close 
    open() {
        this.modal.open();
    }
    close() {
        this.modal.close();
    }
    bindModal( _modal ) {
        this.modal = _modal;
    }
    closedeletepopup() {
        this.deletemodal.close();
    }
    binddeleteModal( _modal ) {
        this.deletemodal = _modal;
    }

    ngOnInit() {
        this.route.params.subscribe( params => {
            this.designid = params['id'];
            this.getBOMByDesignId( this.designid );
            this.getAllBOMLinetypes();
            this.getAllItemCategory();
            this.getAllPurity();
            //this.getAllRawITems();
        } );
    }
    getAllPurity() {
        this.purityservice.getPurityData().then(( data ) => {
            this.purities = data;
        } );
    }
    getAllBOMLinetypes() {
        this.commonservice.getAllBOMLineType().then(( data ) => {
            this.BOMLines = data;
        } );
    }
    getAllRawITems() {
        this.service.getSelectItemData().then(( data ) => {
            this.rawitems = data;
        } );
        // this.service.getSelectItemData().subscribe( data => { this.rawitems = data } );
    }
    getAllItemCategory() {
        this.itecat.getitemcategoryData().then(( data ) => {
            this.itemcategories = data;
        } );
    }
    btnCloseDesign() {
        this.router.navigate( ['pages/master/design'] );
    }
    btncreateNewRow() {
        this.bomdetails.push( this.getBOMEmptyData() );
    }
    btnRemoveRow() {
        this.bomdetails.forEach(( bom ) => { // foreach statement  
            if ( bom.isChecked == true ) {
                let index: number = this.bomdetails.indexOf( bom );
                if ( index !== -1 ) {
                    this.bomdetails.splice( index, 1 );
                }
            }
        } )
    }

    // cretae the Bom Detalis
    createnewbomdetails( design_id ) {
        this.title = 'New Bom Detalis';
        this.bomdetails.push( this.getBOMEmptyData() );
        this.isEditMode = false;
        this.isAddMode = true;
        this.open();
    }
    editbom( bom ) {
        this.bomdatadetails = bom;
        this.title = 'Update Bom Detalis';
        this.isEditMode = true;
        this.isAddMode = false;
        this.open();
    }

    saveBom( isUpdate, canClose, id_design ) {
        if ( isUpdate ) {
            if ( id_design != '' ) {
                this.service.editBom( JSON.stringify( { 'design_id': this.designid, 'bomdetails': this.bomdatadetails } ) ).then( res => {
                    if ( res ) {
                        this.modal.close();
                        if ( res.success ) {
                            this.commonservice.showAlertMSG( 1, res.message );
                            this.getBOMByDesignId( this.designid )
                        } else {
                            this.commonservice.showAlertMSG( 2, res.message );
                        }
                    }
                }, error => {

                } );

            }

        }
        else {
            this.service.saveBom( JSON.stringify( { 'design_id': this.designid, 'bomdetails': this.bomdatadetails } ) ).then( res => {
                if ( res ) {
                    if ( res.success ) {
                        this.commonservice.showAlertMSG( 1, res.message );
                        this.getBOMByDesignId( this.designid );
                    }
                    else {
                        this.commonservice.showAlertMSG( 2, res.message );
                    }
                    if ( canClose ) {
                        this.modal.close();
                    }
                    this.bomdatadetails = this.getBOMEmptyData();
                }
            } );
        }

    }

    // Delete bom Records
    deletebom( bomid ) {
        this.currentbomid = bomid;
        console.log( this.currentbomid );
        this.title = 'Delete Bom Detalis';
        this.deletemodal.open();
    }

    // Delete Bom Records

    removebom( bomid ) {
        this.service.deleteBom( JSON.stringify( { 'id_bom': bomid } ) ).then( res => {
            if ( res ) {
                if ( res.success ) {
                    this.commonservice.showAlertMSG( 1, res.message );
                    this.getBOMByDesignId( this.designid );
                } else {
                    this.commonservice.showAlertMSG( 2, res.message );
                }
                this.deletemodal.close();
                this.bomdatadetails = this.getBOMEmptyData();
            }
        }, error => {

        } );
    }


    getBOMByDesignId( designid ) {
        this.service.getBOMByDesignId( designid ).then(( data ) => {
            if ( data.success ) {
                this.bomdetails = data.responseData;
            }
        } );
    }

    onRawItemSelected( selected: CompleterItem ) {
        if ( selected ) {
            this.bomdatadetails.rawitem_id = selected.originalObject.id;
        } else {

        }
    }

    onSemiFinishedSelected( selected: CompleterItem ) {
        if ( selected ) {
            this.bomdatadetails.semifinishitem_id = selected.originalObject.id;
        } else {

        }
    }
    onDieSelected( selected: CompleterItem ) {
        if ( selected ) {
            this.bomdatadetails.dienumber = selected.originalObject.id;
        } else {
            this.bomdatadetails.dienumber = "";
        }
    }
    onFinishedSelected( selected: CompleterItem ) {
        if ( selected ) {
            this.bomdatadetails.finishitem_id = selected.originalObject.id
            console.log( this.bomdatadetails.finishitem_id );
        } else {

        }
    }
}

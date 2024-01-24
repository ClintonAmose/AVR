import { Component, Input, Output, ElementRef, EventEmitter, AfterViewInit } from '@angular/core';
declare var jQuery: any;

@Component( {
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
} )
export class ModalComponent implements AfterViewInit {


    @Input() title: string;
    @Input() showClose: boolean = true;
    @Input() size: string = '';
    @Output() onOpen: EventEmitter<any> = new EventEmitter();
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    modalEl = null;
    modal_id: number = 0;
    id: string = this.uniqueId( 'modal_' );

    private firstTime: boolean = true;
    constructor( private _rootNode: ElementRef ) { }
    open() {
        if ( this.assignValidSize() ) {
            this.modalEl.modal( 'show' );
            this.onOpen.next( null );
        }
    }
    close() {
        this.modalEl.modal( 'hide' );
    }
    closeInternal() { // close modal when click on times button in up-right corner
        this.onClose.next( null ); // emit event
        this.close();
    }
    ngAfterViewInit() {
        if ( this.firstTime ) {
            if ( this.assignValidSize() ) {
                this.modalEl = jQuery( this._rootNode.nativeElement ).find( 'div.modal' );
            }
            jQuery( document ).on( 'shown.bs.modal', function( e ) {
                jQuery( '.auto-focus', e.target ).focus();
            } );
            this.firstTime = false;
        }
    }
    has( selector ) {
        return jQuery( this._rootNode.nativeElement ).find( selector ).length;
    }
    private assignValidSize() {
        if ( this.size == 'max' ) {
            this.size = 'modal-max';
        } else if ( this.size == 'small' ) {
            this.size = 'modal-sm'
        } else if ( this.size == 'large' ) {
            this.size = 'modal-lg'
        } else if ( this.size == 'medium' ) {
            this.size = ''
        }
        return true;
    }

    uniqueId( prefix: string ): string {
        return prefix + ++this.modal_id;
    }
}

/*let modal_id: number = 0;
export function uniqueId( prefix: string ): string {
    return prefix + ++modal_id;
}*/

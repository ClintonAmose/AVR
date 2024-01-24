import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
    name: 'dataFilter'
} )
export class DataFilterPipe implements PipeTransform {

    /*transform( array: any[], query: string ): any {
        if ( query ) {
            return _.filter( array, row => row.name.toLocaleLowerCase().indexOf( query ) > -1 );
        }
        return array;
    }*/

    /* transform( valueArray: any, term: any ) {
         if ( term ) {
             let filterKeys = Object.keys( valueArray[0] );
             return valueArray.filter(( item: any ) =>
                 filterKeys.reduce(( memo, keyName ) =>
                   memo && item[keyName].toLowerCase().indexOf( term.toLowerCase() ) > -1, true ) );
         } else {
             return valueArray;
         }
     }*/

    /*transform( value: any, args: string[] ): any {
        let filter = args[0];

        if ( filter && Array.isArray( value ) ) {
            let filterKeys = Object.keys( filter );
            return value.filter( item =>
                filterKeys.reduce(( memo, keyName ) =>
                    memo && item[keyName] === filter[keyName], true ) );
        } else {
            return value;
        }
    }*/

    transform( value, args ) {
        if ( !args ) {
            return value;
        } else if ( value ) {
            return value.filter( item => {
                for ( let key in item ) {
                    if ( ( typeof item[key] === 'string' || item[key] instanceof String ) &&
                        ( item[key].toLowerCase().indexOf( args.toLowerCase() ) !== -1 ) ) {
                        return true;
                    }
                }
            } );
        }
    }

}

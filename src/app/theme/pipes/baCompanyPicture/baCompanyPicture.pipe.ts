import { Pipe, PipeTransform } from '@angular/core';
import { layoutPaths } from '../../../theme';
import { LogoURL, PoweredbyURL } from '../../../pages/common/common.service';

@Pipe( { name: 'baCompanyPicture' } )
export class BaCompanyPicturePipe implements PipeTransform {

    transform( input: string, ext = 'png' ): string {
        //return layoutPaths.images.root + input + '.' + ext;
        if ( input == 'logo' )
            return LogoURL;
        else
            return PoweredbyURL;
    }
}

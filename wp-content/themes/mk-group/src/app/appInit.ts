import {ConfigService} from "./services/config.service";
import 'rxjs/add/operator/toPromise';

export function init(configService: ConfigService){
    // Do initing of services that is required before app loads
    // NOTE: this factory needs to return a function (that then returns a promise)
    return () => configService.init().toPromise();
}
import type { Expert } from "./Expert";
import type { Service } from "./Service";

export interface Formation {
    
    id : number;
    expert : Expert;
    service : Service;

}
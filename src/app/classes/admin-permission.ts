export enum Admin {
    admin = 'l.dolidze11@gmail.com'
}


export class AdminPermission {
    public adminPermission(email: any): boolean {
        if (email !== Admin.admin) {
            return false;
        } else {
            return true;
        }
    };
}
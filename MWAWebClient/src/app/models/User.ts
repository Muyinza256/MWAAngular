export class User
{
    _username? : string;
    _email?: string;
    _password?: string;
    _status?: boolean;
    _id?:string;
    _firstname?:string;
    _lastname?:string;
    _tokens?:string[];
    _role?:string;
    _isFollowing?:boolean;
    _following?:{_id:string,user:User};
    _dateOfBirth?:Date;
    _address?:{
        _city?:string,
        _state?:string,
        _street?:string,
        _zip?:string,
    }
    _image:string;
}
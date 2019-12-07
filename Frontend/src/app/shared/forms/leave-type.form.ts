import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveType } from '../models/leave-type.model';

export class LeaveTypeForm extends FormGroup {
    public id: number;
    public name: FormControl;
    public shortCode: FormControl;
    public isActive: number;
    private model: LeaveType;

    constructor(model: LeaveType = null) {

        super({});
        this.model = model || new LeaveType();

        this.id = this.model.id;
        this.name = new FormControl(this.model.name, Validators.required);
        this.shortCode = new FormControl(this.model.shortCode, Validators.required);
        this.isActive = this.model.isActive;

        this.registerControl("name", this.name);
        this.registerControl("surname", this.shortCode);

    }

    public save(): LeaveType {
        this.model.name = this.name.value;
        this.model.shortCode = this.shortCode.value;
        return this.model;
    }
}

export enum ComponentState {
    Undefined,
    Loading,
    Error,
    DataLoaded
  }
  
  export class ComponentBase {
    public errorMsg: string;
    public hasError: boolean;
    public isBusy: boolean;
    public isSaving: boolean;
    public loaded: boolean;
    public type: ComponentState;
  
    /**
     * Creates an instance of ComponentBase.
     *
     * @memberOf ComponentBase
     */
    constructor() {
      this.type = ComponentState.Undefined;
    }
  
    /**
     *
     *
     * @param {boolean} value
     *
     * @memberOf ComponentBase
     */
    public SetLoading(value: boolean) {
      this.type = value ? ComponentState.Loading : ComponentState.DataLoaded;
      this.isBusy = value;
      this.hasError = false;
      this.loaded = !value;
    }
  
    public SetSaving(value: boolean) {
      this.isSaving = value;
      this.hasError = false;
    }
  
    /**
     *
     *
     * @param {string} msg
     *
     * @memberOf ComponentBase
     */
    public SetError(msg: any) {
      this.type = ComponentState.Error;
      this.isBusy = false;
      this.hasError = true;
      this.loaded = false;
      this.errorMsg = msg;
      this.onError(msg);
    }
  
    /**
     *  Can be overwritten if errors in the component have
     *  to be processed
     *
     * @protected
     * @param {string} error
     *
     * @memberOf ComponentBase
     */
    protected onError(error: string) {}
  }
  
<?php


namespace App\Http\Controllers;

use App\Model\LeaveType;
use App\Enums\Status\TypeEnum;
use App\Enums\Status\MessageEnum;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Collection;
class LeaveTypeController extends Controller
{

     /**
     * Create a new controller instance.
     *
     * @return void
     */
    protected $leaveType; 
    public function __construct(LeaveType $leaveType_)
    {
        $this->leaveType = $leaveType_;
    }

    public function GetLeaveTypes()
    {   
       $_leaveType = $this->leaveType->where(['isActive'=>1])->get();

       if(count($_leaveType) > 0){
        return response()->json($_leaveType,200);
       }
       else{
        return response()->json(['message' => MessageEnum::NotFound,'type'=>TypeEnum::Danger,'response'=>404], 404);
       }
    
    }

    public function GetLeaveType($id)
    {   
       $_leaveType = $this->leaveType->where(['id'=>$id])->first();

       if(isset($_leaveType) > 0){
        return response()->json($_leaveType,200);
       }
       else{
        return response()->json(['message' => MessageEnum::NotFound,'type'=>TypeEnum::Danger,'response'=>404], 404);
       }
    
    }

    public function Store(Request $request)
    {

        if(!LeaveType::insert($request->all())){
            return response()->json(['message' => MessageEnum::WentWrong,'type'=>TypeEnum::Danger,'response'=>500], 500);
        }
        else{
            return response()->json(['message' => MessageEnum::Inserted,'type'=>TypeEnum::Success,'response'=>201], 201);
        }
    }

    public function Update(Request $request, $id)
    {
       $_leaveType = $this->leaveType->find($id);
       $_leaveType->name = $request->input('name');
       $_leaveType->shortCode = $request->input('shortCode');

       if(!$_leaveType->save()){
        return response()->json(['message' => MessageEnum::WentWrong,'type'=>TypeEnum::Danger,'response'=>500], 500);
       }
       else{
        return response()->json(['message' => MessageEnum::Inserted,'type'=>TypeEnum::Success,'response'=>201], 201);
       }
    }
   
}
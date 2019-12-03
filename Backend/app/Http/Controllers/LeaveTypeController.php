<?php


namespace App\Http\Controllers;

use App\Model\LeaveType;
use App\Enums\Status\TypeEnum;
use App\Enums\Status\MessageEnum;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB;
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
        return response()->json(['Message' => MessageEnum::NotFound,'Type'=>TypeEnum::Danger], 404);
       }
    
    }

    public function GetLeaveType($id)
    {   
       $_leaveType = $this->leaveType->where(['id'=>$id])->first();

       if(isset($_leaveType) > 0){
        return response()->json($_leaveType,200);
       }
       else{
        return response()->json(['Message' => MessageEnum::NotFound,'Type'=>TypeEnum::Danger], 404);
       }
    
    }

    public function Store(Request $request)
    {
        $_leaveType = new LeaveType(); 
        $_leaveType->name = $request->input('name');
        $_leaveType->shortCode = $request->input('shortCode');

        if(!$_leaveType->save()){
            return response()->json(['Message' => MessageEnum::WentWrong,'Type'=>TypeEnum::Danger], 500);
        }
        else{
            return response()->json(['Message' => MessageEnum::Inserted,'Type'=>TypeEnum::Success], 201);
        }
    }

    public function Update(Request $request, $id)
    {
       $_leaveType = $this->leaveType->find($id);
       $_leaveType->name = $request->input('name');
        $_leaveType->shortCode = $request->input('shortCode');

       if(!$_leaveType->save()){
        return response()->json(['Message' => MessageEnum::WentWrong,'Type'=>TypeEnum::Danger], 500);
       }
       else{
        return response()->json(['Message' => MessageEnum::Inserted,'Type'=>TypeEnum::Success], 201);
       }
    }
   
}
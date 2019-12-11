<?php


namespace App\Http\Controllers;

use App\Model\Holiday;

use App\Enums\Status\TypeEnum;
use App\Enums\Status\MessageEnum;
use App\Shared\Session;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB;
class HolidayController extends Controller
{

     /**
     * Create a new controller instance.
     *
     * @return void
     */
    protected $holiday; 
    public function __construct(Holiday $holiday_)
    {
        $this->holiday = $holiday_;
    }

    public function GetHolidays($data = null)
    {   
      
        if (preg_match("/([0-9]{2})\-([0-9]{2})\-([0-9]{4})/", $data)) {
             return $this->GetHolidayByDate($data); 
        }
        else if(preg_match("/([0-9]{4})\-([0-9]{4})/", $data)){
            return $this->GetHolidaysBySession($data);
        }
        else if($data == null) {
             return $this->GetAllHolidays();
        }
        else{
            return response()->json(['message' => MessageEnum::WentWrong,'type'=>TypeEnum::Danger], 500);
        }
    }

    private function GetHolidayByDate($date)
    {
        $official_holiday = $this->holiday->where(['isActive'=>1,'date'=>date('Y-m-d',strtotime($date))])->with('event')->first();

        if(isset($official_holiday)){

         $official_holiday = Session::AddConstant($official_holiday);
        //  $official_holiday[Session::Session] = Session::GetSessionByDate($official_holiday->date);
         return response()->json($official_holiday,200);
        }
        else{
            return response()->json(['message' => MessageEnum::NotFound,'type'=>TypeEnum::Danger], 404);
        }
    }
    private function GetAllHolidays(){

        $official_holiday = $this->holiday->where(['isActive'=>1])->with('event')->get();
      
        if(count($official_holiday) > 0){
           
           $official_holiday = Session::AddConstant($official_holiday);

           return response()->json($official_holiday,200);
        }
        else{
            return response()->json(['message' => MessageEnum::NotFound,'type'=>TypeEnum::Danger], 404);
        }
    }
    private function GetHolidaysBySession($session){
        if (preg_match("/([0-9]{4})\-([0-9]{4})/", $session)) {
            $session_date = Session::GetSessionDate($session);   
        }
        else{
            return response()->json(['message' => MessageEnum::InCorrectFormat,'type'=>TypeEnum::Danger], 408);
        }
             
       $official_holiday = $this->holiday->where(['isActive'=>1])
                                           ->whereBetween('date',
                                           [
                                           date('Y-m-d',strtotime($session_date[Session::StartDate])),
                                           date('Y-m-d',strtotime($session_date[Session::EndDate]))
                                           ]
                                           )->with('event')->get();

      if(count($official_holiday) > 0){
        return response()->json($official_holiday,200);
      }
      else{
        return response()->json(['message' => MessageEnum::NotFound,'type'=>TypeEnum::Danger], 404);
      }                                     
    }

    public function Store(Request $request)
    {
        $official_holiday = new Holiday(); 
        $official_holiday->eventId = $request->input('eventId');
        $official_holiday->date = date('Y-m-d',strtotime($request->input('date')));
        $official_holiday->createdBy = 1;
        $official_holiday->updatedBy = 1;

        if(!$official_holiday->save()){
            return response()->json(['message' => MessageEnum::WentWrong,'type'=>TypeEnum::Danger], 500);
        }
        else{
            return response()->json(['message' => MessageEnum::Inserted,'type'=>TypeEnum::Success], 201);
        }
    }

    public function Update(Request $request, $id)
    {
       $official_holiday = $this->holiday->find($id);
       $official_holiday->eventId = $request->input('eventId');
       $official_holiday->date = date('Y-m-d',strtotime($request->input('date')));
       $official_holiday->createdBy = 1;
       $official_holiday->updatedBy = 1;
       $official_holiday->updatedAt = date('Y-m-d H:i:s');
       
       if(!$official_holiday->save()){
        return response()->json(['message' => MessageEnum::WentWrong,'type'=>TypeEnum::Danger], 500);
       }
       else{
        //return $official_holiday;
        return response()->json(['message' => MessageEnum::Inserted,'type'=>TypeEnum::Success], 201);
       }
    }
   
}
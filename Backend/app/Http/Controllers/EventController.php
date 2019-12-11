<?php


namespace App\Http\Controllers;

use App\Model\Event;
use App\Enums\Status\TypeEnum;
use App\Enums\Status\MessageEnum;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB;
class EventController extends Controller
{

     /**
     * Create a new controller instance.
     *
     * @return void
     */
    protected $events; 
    public function __construct(Event $events_)
    {
        $this->events = $events_;
    }

    public function GetEvents()
    {   
       $_events = $this->events->where(['isActive'=>1])->get();

       if(count($_events) > 0){
        return response()->json($_events,200);
       }
       else{
        return response()->json(['message' => MessageEnum::NotFound,'type'=>TypeEnum::Danger], 404);
       }
    
    }


    public function Store(Request $request)
    {
        $_events = new Event(); 
        $_events->name = $request->input('name');

        if(!$_events->save()){
            return response()->json(['message' => MessageEnum::WentWrong,'type'=>TypeEnum::Danger], 500);
        }
        else{
            return response()->json(['message' => MessageEnum::Inserted,'Type'=>TypeEnum::Success], 201);
        }
    }

    public function Update(Request $request, $id)
    {
       $_events = $this->events->find($id);
       $_events->name = $request->input('name');

       if(!$_events->save()){
        return response()->json(['message' => MessageEnum::WentWrong,'type'=>TypeEnum::Danger], 500);
       }
       else{
        return response()->json(['message' => MessageEnum::Inserted,'type'=>TypeEnum::Success], 201);
       }
    }
   
}
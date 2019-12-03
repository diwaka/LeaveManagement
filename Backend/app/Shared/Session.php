<?php

namespace App\Shared;
use Carbon\Carbon;
use Illuminate\Support\Collection;

abstract class Session
{

  const Session = "session";
  const StartDate = "startDate";
  const EndDate = "endDate";

  public static function GetSessionByDate($date)
  {
   $_date =  Carbon::parse($date);
   $_session = "";
   if($_date->month < 4){
    $_session = ($_date->year - 1) .'-'. ($_date->year);
   }
   else{
      $_session = ($_date->year) .'-'. ($_date->year + 1);
   }
    return $_session;
  }

  public static function AddConstant($data){

     if($data instanceof Collection) { 
      foreach ($data as $single) {
        $single[Session::Session] = Session::GetSessionByDate($single->date);
      }
     }
     else{
       $data[Session::Session] = Session::GetSessionByDate($data->date);
     }

     return $data;
  }
 
  public static function GetSessionDate($session)
  {
 
   $year =  explode('-',trim($session));
   
   $year_start_date = "01-01-".$year[0];
   $year_end_date = "31-12-".$year[0];
 
   $session_start_date = Carbon::parse($year_start_date)->addMonth(3);
   $session_end_date = Carbon::parse($year_end_date)->addMonth(3);  
 
   $session_date[Session::StartDate] = $session_start_date;
   $session_date[Session::EndDate] = $session_end_date;
  
   return $session_date;  
 }
}
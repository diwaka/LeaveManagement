<?php

namespace App\Enums\Status;

abstract class MessageEnum
{
    const Inserted = 'Successfully inserted in Database !';
    const Updated = 'Successfully updated the records in Database !';
    const Created = 'Successfully created the records in Database !';
    const Delete = 'Successfully deleted the record in Database !';
    const NotFound = 'No records Found in Database !';
    const WentWrong = 'Somethings went wrong. Please try again !';
    const InCorrectFormat = 'Data is not in Correct Format. Please try again !';
}
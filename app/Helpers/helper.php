<?php
/**
 * @param int $length
 * @return string
 */
function randomNumber($length = 10)
{
    $x = '123456789';
    $c = strlen($x) - 1;
    $response = '';
    for ($i = 0; $i < $length; $i++) {
        $y = rand(0, $c);
        $response .= substr($x, $y, 1);
    }

    return $response;
}

function sendOTP(string $number, $otp, $senderId): array {
    $message = "Dear Customer, Your One-Time Password is $otp for Fantasy island, Uttara E-ticket purchase. Please use this OTP to complete the transaction within 2.5 mins.";
    return sendSms($number, $message, $senderId);
}

function sendGeneralSms(string $numbers, string $messageBody, string $senderId): array {
    return sendSms($numbers, $messageBody, $senderId);
}
function sendSms(string $numbers, string $messageBody, string $senderId): array {
    try {
        $url = env('BRAIN_WAVE_SENDING_URL');
        $data = [
            "apiKey"=> env('BRAIN_WAVE_API_KEY'),
            "contactNumbers"=> $numbers,
            "senderId"=> $senderId,
            "textBody"=> $messageBody
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        $response = curl_exec($ch);

        $decodedValue = json_decode($response, true);
        if(!isset($decodedValue)) return ['success' => False, 'data' => null, 'message' => "Something went wrong to sms api server"];

        if (array_key_exists('dlrRef', $decodedValue) && !empty($decodedValue['dlrRef'])) {
            return ['success' => True, 'data' => null, 'message' => "Message is sent successfully!!"];
        }

        return ['success' => False, 'data' => null, 'message' => "Message seding failed, may be number format is invalid!"];
    } catch (Exception $e) {

        return ['success' => False, 'data' => null, 'message' => $e->getMessage()];
    }
}

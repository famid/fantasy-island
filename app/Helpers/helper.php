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
    return sendSms($number, $otp, $senderId);
}

function sendGeneralSms(string $numbers, string $messageBody, string $senderId): array {
    return sendSms($numbers, $messageBody, $senderId);
}
function sendSms(string $numbers, string $messageBody, string $senderId): array {
    try {
        $url = "https://sms.brainwavebd.com/api/sms/send";
        $data = [
            "apiKey"=> "A0000620588b24c-34e3-45bf-88ff-1aac3e275717",
//            "contactNumbers"=> "01521331717, 01864682913",
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

        if (array_key_exists('dlrRef', $decodedValue)) {
            return ['success' => True, 'data' => null, 'message' => "Message is sent successfully!!"];
        }

        return ['success' => False, 'data' => null, 'message' => "Message is sent successfully!!"];
    } catch (Exception $e) {

        return ['success' => False, 'data' => null, 'message' => "Message is Failed!!"];
    }
}

<?php

namespace App\Http\Services;


use App\Http\Repositories\UserRepository;
use App\Http\Services\Boilerplate\BaseService;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Exception;

class UserService extends BaseService {

     /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

     /**
     * UserService constructor.
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    /**
     * @param $request
     * @return array
     */
    public function registration($request): array {
        try {
            $user = $this->userRepository->firstWhere(['phone' => $request->phone]);
            if(!$user) {
                $userCreateResponse =$this->createUser($request);

                if(!$userCreateResponse['success']) return $userCreateResponse;
                $user = $userCreateResponse['data'];
            }

            if($this->userIsAlreadyVerified($user)) return $this->response()->error("User is already verified");

            $otp = rand(1000, 9999);
            return $this->sendOtp($user, $otp);
        } catch (Exception $e) {

            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param $user
     * @param $otp
     * @return array
     */
    private function sendOtp($user, $otp): array {
        try {
            $updateOtpStoreResponse = $this->userRepository->updateWhere(
                ['id' => $user->id],
                [
                    'phone_verification_code' => $otp,
                    'phone_verification_expiry' => Carbon::now()->addMinutes(5),
                    'updated_at' => Carbon::now(),
                ]
            );

            if(!$updateOtpStoreResponse) return $this->response()->error("Otp does not updated successfully");

            //Send Opt via any service
            $otpResponse = sendOTP ($user->phone, $otp, SMS_SENDER_ID);

            Log::info("OTP sent to {$user->phone} (SID: {})");

            return $this->response()->success("Otp is send successfully");
        } catch (Exception $e) {

            Log::error("Failed to send OTP to {$user->phone}: " . $e->getMessage());
            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param $user
     * @return bool
     */
    private function userIsAlreadyVerified($user): bool {
        return $user->phone_verification_code == null &&
            $user->phone_verification_expiry == null &&
            $user->is_phone_verified == ACTIVE_STATUS &&
            $user->status == USER_ACTIVE;
    }

    /**
     * @param $request
     * @return array
     */
    public function createUser($request): array {
        try {
            $createUserResponse = $this->userRepository->create(
                $this->preparedCreateUserData($request)
            );

            return !$createUserResponse ?
                $this->response()->error() :
                $this->response($createUserResponse)->success('User is created successfully');
        } catch(QueryException $e) {

            return $this->response()->error();
        }
    }

    /**
     * @param object $request
     * @return array
     */
    private function preparedCreateUserData(object $request): array {
        return [
            'name' => $request->name,
            'phone' => $request->phone,
            'password' => Hash::make($request->password)
        ];
    }

    /**
     * @param $request
     * @return array
     */
    public function login($request): array
    {
        try {
            $user = $this->userRepository->firstWhere(['phone' => $request->phone]);
            if(!$user || !$this->userIsAlreadyVerified($user)) return $this->response()->error("User is not verified yet");

            if (!Hash::check($request->password, $user->password)) {
                return $this->response()->error("Invalid phone number or password");
            }

            $this->updateSession($user);

            // Log in the user
            Auth::login($user);

            return $this->response()->success('Login successful');
        } catch (Exception $e) {
            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param $request
     * @return array
     */
    public function verifyOtp($request): array {
        try {
            $user = $this->userRepository->firstWhere(['phone' => $request->phone]);

            if (!$user || !$this->verifyOtpCode($request->phone_verification_code, $user->phone_verification_code)) {
                return $this->response()->error("Invalid OTP");
            }

            $updateOptVerifyResponse = $this->userRepository->updateWhere(['phone' => $request->phone],[
                'phone_verification_code' => null,
                'phone_verification_expiry' => null,
                'is_phone_verified' => ACTIVE_STATUS,
                'status' => USER_ACTIVE,
            ]);

            if(!$updateOptVerifyResponse) return $this->response()->error("Otp verification failed!");

            $this->updateSession($user);

            // Log in the user
            Auth::login($user);

            return $this->response()->success('OTP is verified successfully');
        } catch (Exception $e) {

            return $this->response()->error($e->getMessage());
        }
    }

    private function updateSession($user): void {
        session([
            'user_id' => $user->id,
            'phone' => $user->phone,
            'is_phone_verified' => ACTIVE_STATUS,
            'status' => USER_ACTIVE
        ]);
    }

    /**
     * @param $otp
     * @param $otpCode
     * @return bool
     */
    private function verifyOtpCode($otp, $otpCode): bool {
        return $otp == $otpCode;
    }

    /**
     * @param $userId
     * @param $quantity
     * @return array
     */
    public function updatePlayableGame($userId, $quantity): array {
        try {
            $user = $this->userRepository->firstWhere(['id' => $userId]);

            if(!isset($user->total_playable_game) || !isset($user->remaining_game)) {
                return $this->response()->error("User total_playable_game or remaining_game column not found.");
            }

            $user->total_playable_game += $quantity;
            $user->remaining_game += $quantity;
            $user->save();

            return $this->response()->success("Added playable game successfully");
        } catch (Exception $e) {

            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param $userId
     * @return array
     */
    public function decrementTotalRemainingGame($userId): array {
        try {
            $user = $this->userRepository->firstWhere(['id' => $userId]);

            if(!isset($user->remaining_game) || $user->remaining_game <= 0) {
                return $this->response()->error("You don't have available game.");
            }

            $user->remaining_game -= 1;
            $user->save();

            return $this->response()->success("Added playable game successfully");
        } catch (Exception $e) {

            return $this->response()->error($e->getMessage());
        }
    }

    public function fetchUserGamePlayInfo($userId): array {
        try {
            $user = $this->userRepository->firstWhere(['id' => $userId]);

            if(!$user) return $this->response()->error("You don't have available game.");

            return $this->response($user)->success("User game play info is fetched successfully");
        } catch (Exception $e) {

            return $this->response()->error($e->getMessage());
        }
    }


}

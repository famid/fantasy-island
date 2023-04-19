<?php

namespace App\Http\Services;


use App\Http\Repositories\TicketRepository;
use App\Http\Services\Boilerplate\BaseService;
use Exception;
use Illuminate\Database\QueryException;
use Yajra\DataTables\DataTables;

class TicketService extends BaseService {

     /**
     * @var TicketRepository
     */
    private TicketRepository $ticketRepository;

     /**
     * TicketService constructor.
     * @param TicketRepository $ticketRepository
     */
    public function __construct(TicketRepository $ticketRepository) {
        $this->ticketRepository = $ticketRepository;
    }

    /**
     * @param $order
     * @return array
     */
    function insertTickets($order): array {
        try {
            $payload = $this->createTicketPayload($order, $order->quantity);
            $inserted = $this->ticketRepository->insert($payload);

            if (!$inserted) return $this->response()->error("Tickets are not inserted!");

            return $this->response()->success("Tickets are created successfully");
        } catch (Exception $e) {

            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param $order
     * @param $quantity
     * @return array
     */
    private function createTicketPayload($order, $quantity): array {
        $payload = [];
        for ($i = 0; $i < $quantity; $i++) {
            $unique_code = $this->generateUniqueCode();
            $payload[] = [
                'order_id' => $order->id,
                'unique_code' => $unique_code,
                'user_id' => $order->user_id
            ];
        }

        return $payload;
    }

    /**
     * @return string
     */
    private function generateUniqueCode(): string {
        return uniqid();
    }

    /**
     * @param $orderId
     * @return array
     */
    public function fetchOrderTicketsInfo($orderId): array{
        try {
            $ticketsInfoResponse = $this->ticketRepository->fetchTicketsByOrderId($orderId);

            return $ticketsInfoResponse->isEmpty() ?
                $this->response()->error("No tickets is founded") :
                $this->response($ticketsInfoResponse)->success("Tickets are created successfully");
        } catch (Exception $e) {

            return $this->response()->error($e->getMessage());
        }
    }
}

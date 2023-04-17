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
    private $ticketRepository;

     /**
     * TicketService constructor.
     * @param TicketRepository $ticketRepository
     */
    public function __construct(TicketRepository $ticketRepository) {
        $this->ticketRepository = $ticketRepository;
    }
    //=========================Template=================================//

    public function functionName(): array {
        try {
            //Write code here

            return $this->response()->error();
        } catch (Exception $e) {

            return $this->response()->error();
        }
    }
    //=========================Template=================================//
    /**
     * @param $request
     * @return array
     */
    public function createTicket($request): array {
        try {
            $createTicketResponse = $this->ticketRepository->create(
                $this->preparedCreateTicketData($request)
            );

            return !$createTicketResponse ?
                $this->response()->error() :
                $this->response()->success('Ticket is created successfully');
        } catch(QueryException $e) {

            return $this->response()->error();
        }
    }

    /**
     * @param object $request
     * @return array
     */
    private function preparedCreateTicketData(object $request): array {
        return [
            'test' => $request->test,
            'test' => $request->test,
            'test' => $request->test,
            'test' => $request->test,
            'test' => $request->test,
            'test' => $request->test,
            'test' => $request->test,
            'test' => isset($request->test) ?? $request->test,
        ];
    }

    /**
     * @param $request
     * @return array
     */
    public function updateTicket($request): array {
        try {
            $updateTicketResponse = $this->ticketRepository->updateWhere(
                ['id' => $request->ticket_id],
                $this->preparedUpdateTicketData($request)
            );

            return !$updateTicketResponse ?
                $this->response()->error() :
                $this->response()->success('Ticket is updated successfully');
        } catch(QueryException $e) {

            return $this->response()->error();
        }
    }

    /**
     * @param object $request
     * @return array
     */
    private function preparedUpdateTicketData (object $request): array {
        return [
            'test' => $request->test,
            'test' => $request->test,
            'test' => $request->test,
            'test' => $request->test,
            'test' => $request->test,
            'test' => $request->test,
            'test' => $request->test,
            'test' => isset($request->test) ?? $request->test,
        ];
    }

    /**
     * @param $id
     * @return array
     */
    public function deleteTicketById($id): array {
        try{
            $deleteTicketResponse = $this->ticketRepository->deleteWhere(
                ['id' => $id]
            );

            return $deleteTicketResponse <= 0 ?
                $this->response()->error() :
                $this->response()->success('Ticket is deleted successfully');
        } catch(QueryException $e) {

            return $this->response()->error();
        }
    }

    /**
     * @param int $id
     * @return array
     */
    public function getTicketById (int $id): array {
        try {
            $ticket = $this->ticketRepository->find($id);

            return !isset($ticket) ?
                $this->response()->error('No Ticket is founded') :
                $this->response($ticket)->success();
        } catch (QueryException $e) {

            return $this->response()->error();
        }
    }

    /**
     * @param int $testId
     * @return array
     */
    public function getTicketsByTestId (int $testId): array {
        try {
            $tickets = $this->ticketRepository->getData(['area_id' => $testId]);

            return $tickets->isEmpty() ?
                $this->response()->error('No Ticket is founded') :
                $this->response($tickets)->success();
        } catch (QueryException $e) {

            return $this->response()->error();
        }
    }

    /**
     * @return array
     */
    public function getAllTickets (): array {
        try {
            $allTicket = $this->ticketRepository->getData();

            return $allTicket->isEmpty() ?
                $this->response()->error('No Ticket is founded') :
                $this->response($allTicket)->success();
        } catch (QueryException $e) {

            return $this->response()->error();
        }
    }
}

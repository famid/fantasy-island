<form action="{{ route('admin.orders.list') }}" method="GET">
    <div class="form-group">
        <input type="text" name="name" placeholder="Search by name">
    </div>
    <div class="form-group">
        <input type="text" name="phone" placeholder="Search by phone">
    </div>
    <div class="form-group">
        <select name="payment_type">
            <option value="">All Payment Types</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
        </select>
    </div>
    <div class="form-group">
        <button type="submit">Search</button>
    </div>
</form>

<table>
    <thead>
    <tr>
        <th>Order ID</th>
        <th>User</th>
        <th>Payment Type</th>
        <th>Status</th>
        <th>Tickets</th>
    </tr>
    </thead>
    <tbody>
    @foreach ($orders['data'] as $order)
        <tr>
            <td>{{ $order->id }}</td>
            <td>{{ $order->name }}</td>
            <td>{{ $order->payment_type }}</td>
            <td>{{ $order->status }}</td>
            <td>{{ $order->ticket_ids }}</td>
        </tr>
    @endforeach
    </tbody>
</table>

{{ $orders['data']->links() }}

@dd(json_encode($orders['data']))

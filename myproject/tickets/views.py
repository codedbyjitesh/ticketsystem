from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connection


@api_view(["GET"])
def get_tickets(request):

    with connection.cursor() as cursor:

        cursor.execute("""
            SELECT id,  customerName , email, category, description,createdAt, status

            FROM tickets
        """)

        rows = cursor.fetchall()

    tickets = []

    for row in rows:

        tickets.append({
            "id": row[0],
            "customerName": row[1],
            "email": row[2],
            "category": row[3],
            "description": row[4],
            "createdAt": row[5],
            "status": row[6]
        })

    return Response({
        "tickets": tickets
    })

@api_view(["POST"])
def create_ticket(request):

    data = request.data

    customerName = data.get('customerName')
    email = data.get('email')
    category = data.get('category')
    description = data.get('description')

    with connection.cursor() as cursor:

        cursor.execute(
            """
            INSERT INTO tickets
            (customerName, email, category, description)
            VALUES (%s, %s, %s, %s)
            """,
            [customerName, email, category, description]
        )

    return Response({
        "message": "Ticket created successfully"
    })


@api_view(["PUT"])
def update_ticket_status(request, id):

    status_value = request.data.get("status")

    with connection.cursor() as cursor:

        cursor.execute(
            """
            UPDATE tickets
            SET status = %s
            WHERE id = %s
            """,
            [status_value, id]
        )

    return Response({
        "message": "Ticket status updated"
    })
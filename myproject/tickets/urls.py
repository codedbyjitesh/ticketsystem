from django.urls import path
from .views import get_tickets, create_ticket, update_ticket_status

urlpatterns = [
    path('', get_tickets),
    path('create/', create_ticket),
    path('<int:id>/', update_ticket_status),
]
from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_order_confirmation_email(user_email, order_id):
    send_mail(
        f'Order Confirmation #{order_id}',
        f'Your order {order_id} has been placed successfully!',
        'nandhakumarid023@gmail.com',
        [user_email]
    )

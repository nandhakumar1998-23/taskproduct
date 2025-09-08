from products.models import Product, Category
from django.contrib.auth import get_user_model

User = get_user_model()

user = User.objects.get(username='admin')  # fetch existing admin


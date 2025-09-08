from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from .models import CustomUser
from products.models import Category, Product
from orders.models import CartItem, Order, OrderItem


# ✅ Register CustomUser with UserAdmin features
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("username", "email", "is_staff", "is_active")
    list_filter = ("is_staff", "is_active", "groups")
    search_fields = ("username", "email")
    ordering = ("username",)


# ✅ Category Admin
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


# ✅ Product Admin with Image Preview
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "category", "created_by", "created_at", "image_preview")
    list_filter = ("category", "created_by")
    search_fields = ("name", "description")
    readonly_fields = ("image_preview",)

    def image_preview(self, obj):
        if getattr(obj, "image", None):
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "No Image"
    image_preview.short_description = "Image Preview"


# ✅ Cart Item Admin
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("user", "product", "quantity")
    list_filter = ("user", "product")


# ✅ Order Admin
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("user", "total_price", "created_at", "payment_status_display")
    list_filter = ("created_at", "user", "status")
    search_fields = ("user__username", "user__email", "payment_id")

    def payment_status_display(self, obj):
        if obj.status == "paid":
            return "✅ Payment Received"
        elif obj.status == "failed":
            return "❌ Payment Failed"
        return "⏳ Pending"
    payment_status_display.short_description = "Payment Status"


# ✅ Order Item Admin
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "product", "quantity")
    list_filter = ("order", "product")

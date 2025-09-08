import uuid
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().prefetch_related("items")
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # ✅ Mock payment success (always true for now)
        payment_success = True
        payment_id = str(uuid.uuid4())

        order = serializer.save(
            user=request.user,
            status="paid" if payment_success else "failed",
            payment_id=payment_id,
        )

        return Response(
            {
                "message": "Payment successful" if payment_success else "Payment failed",
                "order": OrderSerializer(order).data,
            },
            status=status.HTTP_201_CREATED,
        )

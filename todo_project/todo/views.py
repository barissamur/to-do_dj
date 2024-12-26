from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer
from rest_framework.permissions import AllowAny
from django.middleware.csrf import get_token
from django.views.decorators.csrf import (
    ensure_csrf_cookie,
)  # Doğru konumdan import edildi
from django.http import JsonResponse


@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({"csrfToken": get_token(request)})


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Sadece oturum açan kullanıcının görevlerini döndür
        # return Task.objects.filter(user=self.request.user)
        return Task.objects.all()

    def perform_create(self, serializer):
        # Görev oluşturulurken user alanını otomatik olarak ekle
        serializer.save(user=self.request.user)

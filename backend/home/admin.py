from django.contrib import admin
from .models import   *

# Register your models here.
admin.site.register(Service)
admin.site.register(Reservation)
admin.site.register(Client)
admin.site.register(Tarifs)
admin.site.register(Expert)
admin.site.register(ExpertService)
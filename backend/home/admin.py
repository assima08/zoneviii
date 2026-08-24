from django.contrib import admin
from .models import   *

# Register your models here.
admin.site.register(Service)
admin.site.register(Reservation)
admin.site.register(Client)
admin.site.register(Tarifs)
admin.site.register(Expert)
admin.site.register(ExpertService)
admin.site.register(Formation)
admin.site.register(ContactMessage)
admin.site.register(Realisation)


class PortfolioPhotoInline(admin.TabularInline):
    model = PortfolioPhoto
    extra = 1
    fields = ("ordre", "titre", "photo", "date")
    readonly_fields = ("date",)
    ordering = ("ordre", "id")


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ("titre", "date_shooting", "est_publie", "created_at")
    list_editable = ("est_publie",)
    list_filter = ("est_publie", "date_shooting")
    search_fields = ("titre", "description")
    inlines = [PortfolioPhotoInline]


@admin.register(PortfolioPhoto)
class PortfolioPhotoAdmin(admin.ModelAdmin):
    list_display = ("titre", "portfolio", "ordre", "date")
    list_editable = ("ordre",)
    list_filter = ("portfolio",)
    search_fields = ("titre", "portfolio__titre")
    ordering = ("portfolio", "ordre", "id")

from django.db import models

# Create your models here.
class Service(models.Model):
    nomService = models.CharField(max_length =100)
    description = models.CharField(max_length = 1000)

class Tarifs(models.Model):
    TYPE_TARIF = [
        ('heure', 'À l’heure'),
        ('forfait', 'Forfaitaire'),
    ]
    nomTarif = models.CharField(max_length = 100)
    typeTarif = models.CharField(
        max_length = 20,
        choices = TYPE_TARIF
    )
    prix = models.DecimalField(
        max_digits = 10,
        decimal_places =2
    )
    service = models.ForeignKey(Service,on_delete = models.CASCADE)

class Client(models.Model):
    nomClient = models.CharField(max_length =100)
    prenomClient = models.CharField(max_length =100)
    telephone = models.CharField(max_length =20)
    email = models.EmailField(max_length = 254, unique=True)
    photo = models.ImageField(upload_to='experts/',null=True, blank=True)

class Reservation(models.Model):
    TYPE_STATUT = [
        ('attente', 'en attente'),
        ('confirme', 'confirmé'),
        ('decline','decliné'),
    ]
    date = models.DateField()
    heure = models.TimeField()
    duree = models.DurationField()
    client = models.ForeignKey(Client,on_delete = models.CASCADE)
    tarif = models.ForeignKey(Tarifs, on_delete = models.CASCADE)
    statut = models.CharField(
        max_length=20,
        choices= TYPE_STATUT,
        default='attente'
    )

class Expert(models.Model):
    nomExpert = models.CharField(max_length =100)
    telephone = models.CharField(max_length =20)
    email = models.EmailField(max_length = 254)

class ExpertService(models.Model):
    expert = models.ForeignKey(Expert, on_delete = models.CASCADE)
    service = models.ForeignKey(Service, on_delete = models.CASCADE)


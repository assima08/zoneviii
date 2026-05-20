from django.db import models

# Create your models here.
class Service(models.Model):
    nomService = models.CharField(max_length =100)
    description = models.CharField(max_length = 1000)
    def __str__(self):
        return self.nomService

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
    service = models.ForeignKey(Service,
                                on_delete = models.CASCADE,
                                related_name="tarifs")
    def __str__(self):
        return self.nomTarif

class Client(models.Model):
    nomClient = models.CharField(max_length =100)
    prenomClient = models.CharField(max_length =100)
    telephone = models.CharField(max_length =20)
    email = models.EmailField(max_length = 254, unique=True)
    photo = models.ImageField(upload_to='experts/',null=True, blank=True)
    def __str__(self):
        return self.nomClient 

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
    def __str__(self):
        return f"{self.client} | {self.date.strftime('%d/%m/%Y')} à {self.heure.strftime('%H:%M')} | {self.tarif}"

class Expert(models.Model):
    nomExpert = models.CharField(max_length =100)
    telephone = models.CharField(max_length =20)
    email = models.EmailField(max_length = 254)
    photo = models.ImageField(upload_to='experts/',null=True, blank=True)
    def __str__(self):
        return self.nomExpert

class ExpertService(models.Model):
    expert = models.ForeignKey(Expert, on_delete = models.CASCADE)
    service = models.ForeignKey(Service, on_delete = models.CASCADE)
    def __str__(self):
        return f"{self.expert} - {self.service}"

#model formation
class Formation(models.Model):
    nomFormation = models.CharField(max_length=100)
    expert = models.ForeignKey(Expert, on_delete=models.CASCADE)
    cout = models.DecimalField(
        max_digits = 10,
        decimal_places =2
    )
    duree = models.DurationField()
#fonction qui permettra d'afficher chaque instance de la BD par le nom de la formation
    def __str__(self):
        return self.nomFormation


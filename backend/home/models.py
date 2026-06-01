from django.db import models


class Service(models.Model):
    nomService = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.nomService


class Tarifs(models.Model):
    TYPE_TARIF = [
        ("heure", "A l heure"),
        ("forfait", "Forfaitaire"),
    ]

    nomTarif = models.CharField(max_length=100)
    typeTarif = models.CharField(max_length=20, choices=TYPE_TARIF)
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name="tarifs",
    )

    def __str__(self):
        return self.nomTarif


class Client(models.Model):
    nomClient = models.CharField(max_length=100)
    prenomClient = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20)
    email = models.EmailField(max_length=254, unique=True)
    photo = models.ImageField(upload_to="experts/", null=True, blank=True)

    def __str__(self):
        return self.nomClient


class Reservation(models.Model):
    TYPE_STATUT = [
        ("attente", "en attente"),
        ("confirme", "confirme"),
        ("decline", "decline"),
    ]

    date = models.DateField()
    heure = models.TimeField()
    duree = models.DurationField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    tarif = models.ForeignKey(Tarifs, on_delete=models.CASCADE)
    statut = models.CharField(
        max_length=20,
        choices=TYPE_STATUT,
        default="attente",
    )

    def __str__(self):
        return f"{self.client} | {self.date.strftime('%d/%m/%Y')} a {self.heure.strftime('%H:%M')} | {self.tarif}"


class Expert(models.Model):
    nomExpert = models.CharField(max_length=100)
    role = models.CharField(max_length=120, blank=True)
    specialite = models.CharField(max_length=160, blank=True)
    description = models.TextField(blank=True)
    telephone = models.CharField(max_length=20)
    email = models.EmailField(max_length=254)
    photo = models.ImageField(upload_to="experts/", null=True, blank=True)
    image = models.ImageField(upload_to="experts/", null=True, blank=True)
    instagram = models.URLField(max_length=255, blank=True)

    def __str__(self):
        return self.nomExpert


class ExpertService(models.Model):
    expert = models.ForeignKey(Expert, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.expert} - {self.service}"


class Formation(models.Model):
    nomFormation = models.CharField(max_length=100)
    expert = models.ForeignKey(Expert, on_delete=models.CASCADE)
    cout = models.DecimalField(max_digits=10, decimal_places=2)
    duree = models.DurationField()

    def __str__(self):
        return self.nomFormation


class ContactMessage(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    telephone = models.CharField(max_length=30)
    sujet = models.CharField(max_length=160)
    message = models.TextField(max_length=2500)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.prenom} {self.nom} - {self.sujet}"

class Realisation(models.Model):
    titre = models.CharField(max_length=150)
    description = models.TextField()

    expert = models.ForeignKey(
        Expert,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="realisations"
    )

    services = models.ManyToManyField(
        Service,
        related_name="realisations",
        blank=True
    )

    categorie = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    image = models.ImageField(
        upload_to="realisations/",
        blank=True,
        null=True
    )

    lien = models.URLField(
        blank=True,
        null=True
    )

    date_realisation = models.DateField(
        blank=True,
        null=True
    )

    est_publiee = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titre
    
    
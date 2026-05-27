from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0007_alter_reservation_statut_alter_tarifs_typetarif"),
    ]

    operations = [
        migrations.AddField(
            model_name="contactmessage",
            name="telephone",
            field=models.CharField(default="", max_length=30),
            preserve_default=False,
        ),
    ]

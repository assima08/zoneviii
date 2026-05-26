from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0005_formation"),
    ]

    operations = [
        migrations.AddField(
            model_name="expert",
            name="description",
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="expert",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="experts/"),
        ),
        migrations.AddField(
            model_name="expert",
            name="instagram",
            field=models.URLField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="expert",
            name="role",
            field=models.CharField(blank=True, max_length=120),
        ),
        migrations.AddField(
            model_name="expert",
            name="specialite",
            field=models.CharField(blank=True, max_length=160),
        ),
        migrations.CreateModel(
            name="ContactMessage",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nom", models.CharField(max_length=100)),
                ("prenom", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=254)),
                ("sujet", models.CharField(max_length=160)),
                ("message", models.TextField(max_length=2500)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("is_read", models.BooleanField(default=False)),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
    ]

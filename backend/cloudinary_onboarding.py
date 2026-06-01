import os

import cloudinary
import cloudinary.api
import cloudinary.uploader
from cloudinary import CloudinaryImage
from dotenv import load_dotenv

load_dotenv()

cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
api_key = os.getenv("CLOUDINARY_API_KEY")
api_secret = os.getenv("CLOUDINARY_API_SECRET")

if not all([cloud_name, api_key, api_secret]):
    raise SystemExit("Missing CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET")

cloudinary.config(
    cloud_name=cloud_name,
    api_key=api_key,
    api_secret=api_secret,
    secure=True,
)

sample_image_url = "https://res.cloudinary.com/demo/image/upload/sample.jpg"

upload_result = cloudinary.uploader.upload(
    sample_image_url,
    folder="zoneviii/onboarding",
    overwrite=True,
)

secure_url = upload_result["secure_url"]
public_id = upload_result["public_id"]

print(f"Uploaded secure URL: {secure_url}")
print(f"Public ID: {public_id}")

resource = cloudinary.api.resource(public_id)

print(f"Width: {resource['width']}")
print(f"Height: {resource['height']}")
print(f"Format: {resource['format']}")
print(f"File size bytes: {resource['bytes']}")

optimized_url = CloudinaryImage(public_id).build_url(
    secure=True,
    fetch_format="auto",  # f_auto lets Cloudinary choose the best image format for the browser.
    quality="auto",       # q_auto lets Cloudinary choose an efficient quality level automatically.
)

print("Done! Click link below to see optimized version of the image. Check the size and the format.")
print(optimized_url)

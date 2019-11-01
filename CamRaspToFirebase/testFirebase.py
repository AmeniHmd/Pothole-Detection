from firebase import firebase
from PIL import Image
import base64

with open("1.png", "r") as image_file:
    encoded_string = base64.b64encode(image_file.read())

firebase = firebase.FirebaseApplication('https://testhasni1234.firebaseio.com/',None)
result = firebase.post('/images',encoded_string)
